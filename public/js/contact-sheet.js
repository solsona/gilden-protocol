// Darkroom Contact Sheet Lab: Leica Akademie Edition
// Renders classic analog-style film contact sheets with red grease pencil annotations

class ContactSheetRenderer {
  static renderContactSheet(containerId, photos, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    const sheetWrapper = document.createElement("div");
    sheetWrapper.className = "contact-sheet-board";

    // Header strip
    const header = document.createElement("div");
    header.className = "contact-sheet-header";
    header.innerHTML = `
      <div class="sheet-meta">
        <span class="sheet-title">LEICA AKADEMIE MEXICO • MASTERCLASS BRUCE GILDEN</span>
        <span class="sheet-date">DATE: JAN 2027 • PHOTOGRAPHER: SOLSONA • CAMERA: LEICA SL3-P (44MP)</span>
      </div>
      <div class="sheet-instructions">
        <span class="grease-pen-indicator">🔴 Chinagraph Red Pencil Mode: Click any frame to toggle selection ring</span>
      </div>
    `;
    sheetWrapper.appendChild(header);

    // Film grid
    const grid = document.createElement("div");
    grid.className = "contact-sheet-grid";

    photos.forEach((photo, idx) => {
      const frameNum = String(idx + 1).padStart(2, "0");
      const card = document.createElement("div");
      card.className = `contact-frame ${photo.selected ? "grease-selected" : ""} ${photo.vault || "comfort"}`;
      card.dataset.photoId = photo.id;

      card.innerHTML = `
        <div class="rebate-top">
          <span>LEICA M / L-MOUNT</span>
          <span class="rebate-num">${frameNum}</span>
          <span>▲ ${frameNum}A</span>
        </div>
        <div class="frame-image-wrapper">
          <img src="${photo.imageUrl}" alt="${photo.title || 'Street frame'}" loading="lazy" />
          <div class="grease-ring-overlay"></div>
          <div class="frame-tag-badge ${photo.vault}">
            ${photo.vault === 'discomfort' ? '🔥 DISCOMFORT' : '🌱 COMFORT'}
          </div>
        </div>
        <div class="rebate-bottom">
          <span>${photo.focalLength || 24}mm • f/${photo.aperture || 8} • ${photo.flashFired ? '⚡ FLASH' : '☀️ AMBIENT'}</span>
          <span class="bravery-badge">B:${photo.braveryScore || 5}/10</span>
        </div>
      `;

      card.addEventListener("click", () => {
        photo.selected = !photo.selected;
        card.classList.toggle("grease-selected", photo.selected);
      });

      grid.appendChild(card);
    });

    sheetWrapper.appendChild(grid);
    container.appendChild(sheetWrapper);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContactSheetRenderer;
}
