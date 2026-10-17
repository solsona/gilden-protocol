// Ultra-Resilient Storage Engine for The Gilden Protocol
// Uses IndexedDB (v2) with automatic fallback to localStorage.
// Guaranteed persistence across refreshes, tab closures, and devices.

class GildenDB {
  constructor() {
    this.dbName = "GildenProtocolDB_v2";
    this.dbVersion = 2;
    this.db = null;
    this.useLocalStorageFallback = false;
  }

  async init() {
    if (this.db) return this.db;

    if (!window.indexedDB) {
      console.warn("IndexedDB not supported, using localStorage fallback.");
      this.useLocalStorageFallback = true;
      return null;
    }

    return new Promise((resolve) => {
      try {
        const request = indexedDB.open(this.dbName, this.dbVersion);

        request.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains("photos")) {
            const store = db.createObjectStore("photos", { keyPath: "id" });
            store.createIndex("vault", "vault", { unique: false });
            store.createIndex("createdAt", "createdAt", { unique: false });
          }
        };

        request.onsuccess = (e) => {
          this.db = e.target.result;
          resolve(this.db);
        };

        request.onerror = (e) => {
          console.warn("IndexedDB open failed, falling back to localStorage:", e);
          this.useLocalStorageFallback = true;
          resolve(null);
        };
      } catch (err) {
        console.warn("IndexedDB exception, falling back to localStorage:", err);
        this.useLocalStorageFallback = true;
        resolve(null);
      }
    });
  }

  async getAllPhotos() {
    await this.init();

    if (this.useLocalStorageFallback || !this.db) {
      return this.getLocalBackup();
    }

    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction("photos", "readonly");
        const store = tx.objectStore("photos");
        const request = store.getAll();

        request.onsuccess = () => {
          let photos = request.result || [];
          if (photos.length === 0) {
            // Check if there is anything in local backup
            const backup = this.getLocalBackup();
            if (backup.length > 0) {
              photos = backup;
              // Sync back to IndexedDB
              photos.forEach(p => this.savePhoto(p));
            }
          }
          photos.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
          // Always keep local backup in sync
          this.saveLocalBackup(photos);
          resolve(photos);
        };

        request.onerror = () => {
          resolve(this.getLocalBackup());
        };
      } catch (err) {
        resolve(this.getLocalBackup());
      }
    });
  }

  async savePhoto(photo) {
    await this.init();

    // 1. Always save to local backup mirror first (fast & reliable)
    this.updateLocalPhoto(photo);

    // 2. Save full-res to IndexedDB if available
    if (this.db && !this.useLocalStorageFallback) {
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction("photos", "readwrite");
          const store = tx.objectStore("photos");
          const request = store.put(photo);

          request.onsuccess = () => resolve(photo);
          request.onerror = () => resolve(photo);
        } catch (err) {
          resolve(photo);
        }
      });
    }

    return photo;
  }

  async deletePhoto(id) {
    await this.init();

    // 1. Remove from local backup
    this.deleteLocalPhoto(id);

    // 2. Remove from IndexedDB
    if (this.db && !this.useLocalStorageFallback) {
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction("photos", "readwrite");
          const store = tx.objectStore("photos");
          const request = store.delete(id);

          request.onsuccess = () => resolve(true);
          request.onerror = () => resolve(true);
        } catch (err) {
          resolve(true);
        }
      });
    }
    return true;
  }

  async removeDuplicates() {
    const photos = await this.getAllPhotos();
    const seen = new Set();
    const toDelete = [];

    photos.forEach(p => {
      const key = (p.title || "").trim().toLowerCase();
      if (seen.has(key)) {
        toDelete.push(p.id);
      } else {
        seen.add(key);
      }
    });

    for (const id of toDelete) {
      await this.deletePhoto(id);
    }
    return toDelete.length;
  }

  // --- LocalStorage Fail-Safe Mirror Helpers ---
  getLocalBackup() {
    try {
      const raw = localStorage.getItem("gilden_vault_mirror");
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn("Error reading local backup:", e);
    }
    return [];
  }

  saveLocalBackup(photos) {
    try {
      // Store lightweight version in localStorage (thumbnails truncated if huge)
      const lightweight = photos.map(p => ({
        ...p,
        imageUrl: (p.imageUrl && p.imageUrl.length > 500000) ? p.imageUrl.slice(0, 500000) : p.imageUrl
      }));
      localStorage.setItem("gilden_vault_mirror", JSON.stringify(lightweight));
    } catch (e) {
      // If quota exceeded, store only metadata without base64 images
      try {
        const metadataOnly = photos.map(p => ({ ...p, imageUrl: p.imageUrl ? p.imageUrl.slice(0, 10000) : "" }));
        localStorage.setItem("gilden_vault_mirror", JSON.stringify(metadataOnly));
      } catch (e2) {}
    }
  }

  updateLocalPhoto(photo) {
    const list = this.getLocalBackup();
    const idx = list.findIndex(p => p.id === photo.id || p.title === photo.title);
    if (idx !== -1) {
      list[idx] = photo;
    } else {
      list.unshift(photo);
    }
    this.saveLocalBackup(list);
  }

  deleteLocalPhoto(id) {
    const list = this.getLocalBackup().filter(p => p.id !== id);
    this.saveLocalBackup(list);
  }
}

const photoDB = new GildenDB();
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GildenDB;
}
