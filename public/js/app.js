// The Gilden Protocol - Master Application Coordinator

document.addEventListener("DOMContentLoaded", () => {
  // 1. Countdown Calculator to Leica Masterclass (Jan 15, 2027)
  initCountdown();

  // 2. Tab Navigation
  initTabs();

  // 3. Render 18-Week Roadmap
  initRoadmap();

  // 4. Initialize Zone Focus Simulator
  initZoneSimulator();

  // 5. Initialize Photo Upload & Critique Engine
  initCritiqueUploader();

  // 6. Initialize 50/50 Dual Vault with Resilient Dual Storage
  initVault();

  // 7. Initialize Field Companion Sprint Timer
  initFieldTimer();
});

// Global state
let currentPhotos = [];
let currentVaultFilter = "all";
let uploadedImageBase64 = null;
let currentEvaluatedPhoto = null;

/* ==========================================================================
   TOAST NOTIFICATION HELPER
   ========================================================================== */
function showToast(message, isSuccess = true) {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast ${isSuccess ? "success" : ""}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(30px)";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ==========================================================================
   IMAGE COMPRESSION HELPER (Converts 44MP raw inputs to fast Retina display)
   ========================================================================== */
async function compressImageFile(file, maxDimension = 1600, quality = 0.85) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}

/* ==========================================================================
   1. COUNTDOWN CALCULATOR
   ========================================================================== */
function initCountdown() {
  const targetDate = new Date("2027-01-15T09:00:00");
  const display = document.getElementById("countdown-display");

  function update() {
    const now = new Date();
    const diffMs = targetDate - now;
    if (diffMs <= 0) {
      display.textContent = "TODAY IN MEXICO CITY!";
      return;
    }
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const remDays = days % 7;
    display.textContent = `${days} Days (${weeks}w ${remDays}d) to CDMX`;
  }

  update();
  setInterval(update, 60000);
}

/* ==========================================================================
   2. TAB NAVIGATION
   ========================================================================== */
function initTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  const panes = document.querySelectorAll(".tab-pane");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panes.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      const targetPane = document.getElementById(`pane-${tab.dataset.tab}`);
      if (targetPane) {
        targetPane.classList.add("active");
      }

      if (tab.dataset.tab === "contact-sheet") {
        renderContactSheet();
      }
    });
  });
}

/* ==========================================================================
   3. ROADMAP & CURRICULUM
   ========================================================================== */
function initRoadmap() {
  const container = document.getElementById("roadmap-container");
  if (!container || !CURRICULUM_DATA) return;

  container.innerHTML = "";

  // Render Special Event Intensive if defined
  if (CURRICULUM_DATA.specialEventDrill) {
    const s = CURRICULUM_DATA.specialEventDrill;
    const specialCard = document.createElement("div");
    specialCard.className = "special-event-card";

    const consolidatedItemsHtml = s.consolidatedWeeks.map(item => `
      <div class="consolidated-item ${item.name.toLowerCase().includes('flash') || item.name.toLowerCase().includes('strike') || item.name.toLowerCase().includes('collision') ? 'strike' : ''}">
        <div class="consolidated-tag">${item.week} • ${item.name}</div>
        <div style="font-size: 13px; color: var(--text-main); line-height: 1.4;">${item.takeaway}</div>
      </div>
    `).join("");

    const checklistHtml = s.tacticalChecklist.map(step => `
      <li>✓ ${step}</li>
    `).join("");

    specialCard.innerHTML = `
      <div class="special-badge">${s.badge}</div>
      <h3 style="font-size: 22px; font-weight: 800; text-transform: uppercase; color: #fff;">${s.title}</h3>
      <div style="font-size: 13px; color: var(--gold); font-weight: 600; margin-top: 4px; margin-bottom: 12px; font-family: var(--font-mono);">
        ${s.subtitle}
      </div>
      <p style="color: var(--text-muted); font-size: 13px; line-height: 1.6; max-width: 900px;">
        ${s.summary}
      </p>

      <div style="margin-top: 18px; display: flex; gap: 14px; flex-wrap: wrap;">
        <div class="recipe-box" style="flex: 1; min-width: 280px;">
          <div style="color: var(--leica-red); font-weight: 800; font-size: 12px; margin-bottom: 6px; font-family: var(--font-mono);">⚡ CRUCIBLE GEAR RECIPE</div>
          <div><strong>📷 CAMERA:</strong> ${s.gearRecipe.camera}</div>
          <div><strong>🔘 LENS:</strong> ${s.gearRecipe.lens}</div>
          <div><strong>⚙️ SETTINGS:</strong> ${s.gearRecipe.exposure}</div>
          <div><strong>🎯 FOCUS:</strong> ${s.gearRecipe.focusMode}</div>
          <div><strong>⚡ FLASH:</strong> ${s.gearRecipe.flash}</div>
        </div>
        <div class="checklist-box" style="flex: 1; min-width: 280px; margin-top: 0;">
          <div style="color: var(--gold); font-weight: 800; font-size: 12px; margin-bottom: 6px; font-family: var(--font-mono);">📋 5-STEP PARADE PROTOCOL</div>
          <ul>${checklistHtml}</ul>
          <div style="margin-top: 10px; font-size: 11px; font-weight: 700; color: var(--leica-red); font-family: var(--font-mono);">
            QUOTA: ${s.targetQuota}
          </div>
        </div>
      </div>

      <div style="margin-top: 20px;">
        <div style="font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-main);">
          Consolidated Weeks 4–14 Field Takeaways
        </div>
        <div class="consolidated-grid">
          ${consolidatedItemsHtml}
        </div>
      </div>
    `;
    container.appendChild(specialCard);
  }

  CURRICULUM_DATA.phases.forEach(phase => {
    const phaseCard = document.createElement("div");
    phaseCard.className = "roadmap-phase-card";

    let challengesHtml = phase.challenges.map(c => `
      <div class="challenge-card">
        <div class="challenge-card-top">
          <span class="week-badge">WEEK ${c.week} • ${c.targetVault.toUpperCase()}</span>
          <h4>${c.title}</h4>
          <p class="challenge-desc"><strong>Objective:</strong> ${c.objective}</p>
          <p style="font-size: 12px; color: #ffb8bb; margin-bottom: 8px;">
            <strong>Psychological Barrier:</strong> ${c.psychologicalBarrier}
          </p>
          <p style="font-size: 12px; color: var(--text-muted); line-height: 1.5;">
            ${c.theDrill}
          </p>
        </div>
        <div>
          <div class="recipe-box">
            <div><strong>📷 LENS:</strong> ${c.gearRecipe.lens}</div>
            <div><strong>⚙️ SETTINGS:</strong> ${c.gearRecipe.settings}</div>
            <div><strong>🎯 FOCUS:</strong> ${c.gearRecipe.focusMode}</div>
            <div><strong>⚡ FLASH:</strong> ${c.gearRecipe.flash}</div>
          </div>
          <div style="margin-top: 10px; font-size: 11px; font-weight: 700; color: var(--gold); font-family: var(--font-mono);">
            QUOTA: ${c.quota}
          </div>
        </div>
      </div>
    `).join("");

    phaseCard.innerHTML = `
      <div class="phase-header">
        <div>
          <div class="phase-tag">${phase.weeks}</div>
          <h3 style="font-size: 18px; font-weight: 800; margin-top: 2px;">${phase.title}</h3>
        </div>
      </div>
      <div class="bruce-quote-banner">
        "${phase.bruceMotto}" — Bruce Gilden
      </div>
      <div class="challenges-grid">
        ${challengesHtml}
      </div>
    `;

    container.appendChild(phaseCard);
  });
}

/* ==========================================================================
   4. ZONE FOCUS SIMULATOR
   ========================================================================== */
function initZoneSimulator() {
  const calc = new ZoneFocusCalculator(0.025); // Leica SL3-P 44MP

  const focalSelect = document.getElementById("sim-focal-select");
  const apertureSlider = document.getElementById("sim-aperture-slider");
  const distanceSlider = document.getElementById("sim-distance-slider");

  const labelFocal = document.getElementById("label-focal-val");
  const labelAperture = document.getElementById("label-aperture-val");
  const labelFocus = document.getElementById("label-focus-val");

  const statNear = document.getElementById("stat-near");
  const statFar = document.getElementById("stat-far");
  const statHyper = document.getElementById("stat-hyper");
  const scaleZoneBar = document.getElementById("scale-zone-bar");
  const adviceText = document.getElementById("zone-tactical-advice");
  const presetsContainer = document.getElementById("presets-button-container");

  function update() {
    const focal = Number(focalSelect.value);
    const aperture = Number(apertureSlider.value);
    const distance = Number(distanceSlider.value);

    labelFocal.textContent = `${focal}mm`;
    labelAperture.textContent = `f/${aperture.toFixed(1)}`;
    labelFocus.textContent = `${distance.toFixed(1)}m`;

    const result = calc.calculateDoF(focal, aperture, distance);

    statNear.textContent = `${result.nearLimitM}m`;
    statFar.textContent = result.farLimitM === "∞" ? "∞" : `${result.farLimitM}m`;
    statHyper.textContent = `${result.hyperfocalM.toFixed(2)}m`;

    const minScale = 0.5;
    const maxScale = 6.0;
    const leftPercent = Math.max(0, Math.min(100, ((result.nearLimitM - minScale) / (maxScale - minScale)) * 100));
    
    let rightPercent = 100;
    if (result.farLimitM !== "∞") {
      rightPercent = Math.max(0, Math.min(100, ((Number(result.farLimitM) - minScale) / (maxScale - minScale)) * 100));
    }
    const widthPercent = Math.max(4, rightPercent - leftPercent);

    scaleZoneBar.style.left = `${leftPercent}%`;
    scaleZoneBar.style.width = `${widthPercent}%`;

    let advice = "";
    if (focal === 24 && distance <= 1.2 && aperture >= 8) {
      advice = `With the 24mm at f/${aperture.toFixed(1)} set to ${distance.toFixed(1)}m, you have the classic Gilden setup. Anything between ${result.nearLimitM}m and ${result.farLimitM}m is tack sharp. Do not wait for autofocus! One decisive step forward, fire the flash, and keep your stride.`;
    } else if (focal === 35 && aperture >= 8) {
      advice = `On your Summicron-M APO 35mm with M-adapter, lock your mechanical focus ring to ${distance.toFixed(1)}m. Your sharp envelope spans from ${result.nearLimitM}m to ${result.farLimitM}m. This is tactile muscle memory gold.`;
    } else if (focal === 50) {
      advice = `With the 50mm, depth of field is significantly shallower (${result.totalDoF}). Excellent for composed portraits in your Comfort Vault, but too narrow and distant for in-your-face collisions.`;
    } else {
      advice = `Active sharpness zone: ${result.nearLimitM}m to ${result.farLimitM}m. Hyperfocal limit is at ${result.hyperfocalM.toFixed(2)}m.`;
    }
    adviceText.textContent = advice;
  }

  calc.getPresets().forEach(p => {
    const btn = document.createElement("button");
    btn.className = "action-btn";
    btn.style.padding = "6px 10px";
    btn.style.fontSize = "11px";
    btn.style.background = "var(--bg-elevated)";
    btn.style.border = "1px solid var(--border)";
    btn.style.justifyContent = "flex-start";
    btn.textContent = `⚡ ${p.name}`;
    btn.title = p.desc;
    btn.addEventListener("click", () => {
      focalSelect.value = p.focalLength;
      apertureSlider.value = p.aperture;
      distanceSlider.value = p.focusDistance;
      update();
    });
    presetsContainer.appendChild(btn);
  });

  focalSelect.addEventListener("change", update);
  apertureSlider.addEventListener("input", update);
  distanceSlider.addEventListener("input", update);

  update();
}

/* ==========================================================================
   5. CRITIQUE UPLOADER & ANALYSIS
   ========================================================================== */
function initCritiqueUploader() {
  const dropzone = document.getElementById("photo-dropzone");
  const fileInput = document.getElementById("file-input");
  const previewWrapper = document.getElementById("preview-wrapper");
  const imagePreview = document.getElementById("image-preview");

  const inputTitle = document.getElementById("input-title");
  const inputFocal = document.getElementById("input-focal");
  const inputAperture = document.getElementById("input-aperture");
  const inputShutter = document.getElementById("input-shutter");
  const inputFlash = document.getElementById("input-flash");
  const inputDistance = document.getElementById("input-distance");
  const inputHipshot = document.getElementById("input-hipshot");
  const inputFeeling = document.getElementById("input-feeling");
  const inputReflection = document.getElementById("input-reflection");

  const btnCritique = document.getElementById("btn-submit-critique");
  const saveVaultActions = document.getElementById("save-vault-actions");
  const saveStatusHint = document.getElementById("save-status-hint");
  const btnSaveDiscomfort = document.getElementById("btn-save-discomfort");
  const btnSaveComfort = document.getElementById("btn-save-comfort");

  // Output fields
  const resBravery = document.getElementById("res-bravery");
  const resProximity = document.getElementById("res-proximity");
  const resVaultTag = document.getElementById("res-vault-tag");
  const resBruce = document.getElementById("res-bruce-body");
  const resTech = document.getElementById("res-tech-body");
  const resCurator = document.getElementById("res-curator-body");

  dropzone.addEventListener("click", () => fileInput.click());

  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("dragover");
  });

  dropzone.addEventListener("dragleave", () => {
    dropzone.classList.remove("dragover");
  });

  dropzone.addEventListener("drop", async (e) => {
    e.preventDefault();
    dropzone.classList.remove("dragover");
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFile(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener("change", async () => {
    if (fileInput.files && fileInput.files[0]) {
      await handleFile(fileInput.files[0]);
    }
  });

  async function handleFile(file) {
    showToast("📷 Processing & optimizing image...");
    
    // Auto-compress high-res images for smooth browser performance
    uploadedImageBase64 = await compressImageFile(file, 1600, 0.85);
    imagePreview.src = uploadedImageBase64;
    previewWrapper.style.display = "flex";
    inputTitle.value = file.name.replace(/\.[^/.]+$/, "");

    // Extract EXIF
    const exif = await ExifReader.extractFromBlob(file);
    if (exif) {
      if (exif.focalLength) {
        if (exif.focalLength <= 28) inputFocal.value = "24";
        else if (exif.focalLength <= 40) inputFocal.value = "35";
        else if (exif.focalLength <= 60) inputFocal.value = "50";
        else inputFocal.value = "75";
      }
      if (exif.aperture) inputAperture.value = exif.aperture;
      if (exif.shutterSpeed) inputShutter.value = exif.shutterSpeed;
      if (exif.flashFired !== undefined) inputFlash.value = exif.flashFired ? "true" : "false";
    }
    
    showToast(`✓ Loaded "${inputTitle.value}" with EXIF metadata.`);
  }

  btnCritique.addEventListener("click", async () => {
    const inputIsZombie = document.getElementById("input-is-zombie");
    const isZombie = inputIsZombie ? inputIsZombie.checked : false;

    const photoData = {
      id: "photo-" + Date.now(),
      title: inputTitle.value.trim() || "Untitled Frame",
      imageUrl: uploadedImageBase64 || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
      focalLength: Number(inputFocal.value),
      aperture: Number(inputAperture.value),
      shutterSpeed: inputShutter.value,
      flashFired: inputFlash.value === "true",
      distance: Number(inputDistance.value),
      isHipShot: inputHipshot.value === "true",
      isZombieWalk: isZombie,
      userFeeling: inputFeeling.value,
      reflection: inputReflection.value,
      createdAt: new Date().toISOString()
    };

    // Run Critique
    const evalResult = CriticEngine.evaluatePhoto(photoData);

    photoData.braveryScore = evalResult.braveryScore;
    photoData.vault = evalResult.recommendedVault;
    photoData.critique = evalResult.critiques;

    currentEvaluatedPhoto = photoData;

    // Display in UI
    resBravery.textContent = evalResult.braveryScore;
    resProximity.textContent = evalResult.proximityZone;
    resVaultTag.textContent = `RECOMMENDED: ${evalResult.recommendedVault.toUpperCase()} VAULT`;
    resVaultTag.style.color = evalResult.recommendedVault === "discomfort" ? "var(--leica-red)" : "var(--green)";

    resBruce.textContent = `"${evalResult.critiques.bruce}"`;
    resTech.textContent = evalResult.critiques.tech;
    resCurator.textContent = evalResult.critiques.curator;

    // Automatically commit to the recommended vault so it is NEVER lost on refresh!
    await commitPhotoToVault(photoData);

    // Reveal and configure Quick Switch / Confirmation buttons
    saveVaultActions.style.display = "flex";
    updateSaveActionButtons(photoData);
  });

  btnSaveDiscomfort.addEventListener("click", async () => {
    if (!currentEvaluatedPhoto) return;
    currentEvaluatedPhoto.vault = "discomfort";
    await commitPhotoToVault(currentEvaluatedPhoto);
    updateSaveActionButtons(currentEvaluatedPhoto);
  });

  btnSaveComfort.addEventListener("click", async () => {
    if (!currentEvaluatedPhoto) return;
    currentEvaluatedPhoto.vault = "comfort";
    await commitPhotoToVault(currentEvaluatedPhoto);
    updateSaveActionButtons(currentEvaluatedPhoto);
  });

  function updateSaveActionButtons(photo) {
    if (photo.vault === "discomfort") {
      saveStatusHint.innerHTML = `✓ Filed in: <strong style="color: var(--leica-red);">DISCOMFORT VAULT</strong> (Bravery: ${photo.braveryScore}/10)`;
      btnSaveDiscomfort.textContent = "✓ In Discomfort Vault";
      btnSaveComfort.textContent = "⇄ Move to Comfort";
      btnSaveDiscomfort.style.boxShadow = "0 0 14px var(--leica-red-glow)";
      btnSaveComfort.style.boxShadow = "none";
    } else {
      saveStatusHint.innerHTML = `✓ Filed in: <strong style="color: var(--green);">COMFORT VAULT</strong> (Bravery: ${photo.braveryScore}/10)`;
      btnSaveComfort.textContent = "✓ In Comfort Vault";
      btnSaveDiscomfort.textContent = "⇄ Move to Discomfort";
      btnSaveComfort.style.boxShadow = "0 0 14px rgba(46, 204, 113, 0.4)";
      btnSaveDiscomfort.style.boxShadow = "none";
    }
  }
}

async function commitPhotoToVault(photo) {
  const existingIndex = currentPhotos.findIndex(p => p.title.trim().toLowerCase() === photo.title.trim().toLowerCase());

  if (existingIndex !== -1) {
    // Update existing photo instead of duplicating!
    photo.id = currentPhotos[existingIndex].id;
    currentPhotos[existingIndex] = photo;
    await photoDB.savePhoto(photo);
    showToast(`✓ Updated frame "${photo.title}" in ${photo.vault.toUpperCase()} Vault!`);
  } else {
    // Add new photo
    currentPhotos.unshift(photo);
    await photoDB.savePhoto(photo);
    showToast(`✓ Saved "${photo.title}" to ${photo.vault.toUpperCase()} Vault!`);
  }

  updateVaultDisplay();
}

/* ==========================================================================
   6. 50/50 DUAL VAULT (Persistent Storage with Multi-Photo Uploader)
   ========================================================================== */
async function initVault() {
  try {
    // 1. Initialize Storage Engine
    await photoDB.init();

    // 2. Load all photos
    currentPhotos = await photoDB.getAllPhotos();

    // 3. Seed initial sample photos only if completely empty
    if (!currentPhotos || currentPhotos.length === 0) {
      const initialSeeds = [
        {
          id: "sample-1",
          title: "Pride Parade Feather Portrait",
          vault: "comfort",
          imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
          focalLength: 50,
          aperture: 2.0,
          shutterSpeed: "1/1000s",
          flashFired: false,
          distance: 1.8,
          braveryScore: 5,
          critique: {
            bruce: "Nice face, clean light. But it's polite. You asked permission, they gave you their camera smile. Where is the surprise?",
            tech: "Sharp rendition on the eyes, beautiful shallow depth of field with the 50mm.",
            curator: "Strong entry for the Comfort Vault. Demonstrates connection and classical framing."
          },
          reflection: "Felt completely relaxed. Approached them at the parade, complimented their headpiece. Total comfort zone.",
          createdAt: "2026-08-15T14:30:00Z"
        },
        {
          id: "sample-2",
          title: "Subway Rush Hour Collision",
          vault: "discomfort",
          imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
          focalLength: 24,
          aperture: 8.0,
          shutterSpeed: "1/250s",
          flashFired: true,
          distance: 0.9,
          braveryScore: 9,
          critique: {
            bruce: "NOW we're talking! Look at that furrow in the brow! You didn't give him time to hide. The flash caught the sweat on his temple. That's a real character!",
            tech: "Masterful daylight flash sync at 1/250s. 24mm perspective freezes motion crisp edge-to-edge.",
            curator: "Exceptional Discomfort submission. Raw, confrontational, quintessential Magnum street energy."
          },
          reflection: "Heart was beating at 145 BPM. Flash held high in left hand, stepped right into his path at 3 feet. Terrifying but exhilarating.",
          createdAt: "2026-08-28T18:15:00Z"
        },
        {
          id: "sample-3",
          title: "Shadow Crosser (Safe Distance)",
          vault: "comfort",
          imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80",
          focalLength: 35,
          aperture: 8.0,
          shutterSpeed: "1/500s",
          flashFired: false,
          distance: 4.2,
          braveryScore: 3,
          critique: {
            bruce: "Why are you all the way across the street? The geometry is pretty, but get in the arena! Don't play safe!",
            tech: "Summicron-M APO 35mm optical perfection is visible in the pavement microcontrast.",
            curator: "Classic graphic street composition. Good contrast and silhouetting for the Comfort balance."
          },
          reflection: "Standing across the street waiting for someone to enter the light beam. Safe distance.",
          createdAt: "2026-08-20T11:00:00Z"
        }
      ];
      for (const p of initialSeeds) {
        await photoDB.savePhoto(p);
      }
      currentPhotos = await photoDB.getAllPhotos();
    }
  } catch (err) {
    console.warn("Vault initialization notice:", err);
    currentPhotos = photoDB.getLocalBackup();
  }

  updateVaultDisplay();

  // 1. Direct Multi-Photo Dropzone
  const vaultDropzone = document.getElementById("vault-direct-dropzone");
  const vaultDirectInput = document.getElementById("vault-direct-input");

  if (vaultDropzone && vaultDirectInput) {
    vaultDropzone.addEventListener("click", () => vaultDirectInput.click());

    vaultDropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      vaultDropzone.classList.add("dragover");
    });

    vaultDropzone.addEventListener("dragleave", () => {
      vaultDropzone.classList.remove("dragover");
    });

    vaultDropzone.addEventListener("drop", async (e) => {
      e.preventDefault();
      vaultDropzone.classList.remove("dragover");
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        await processBatchVaultUpload(e.dataTransfer.files);
      }
    });

    vaultDirectInput.addEventListener("change", async () => {
      if (vaultDirectInput.files && vaultDirectInput.files.length > 0) {
        await processBatchVaultUpload(vaultDirectInput.files);
      }
    });
  }

  // 2. Vault Controls
  const btnAll = document.getElementById("filter-all-btn");
  const btnComfort = document.getElementById("filter-comfort-btn");
  const btnDiscomfort = document.getElementById("filter-discomfort-btn");
  const btnCleanDupes = document.getElementById("btn-clean-duplicates");
  const btnExport = document.getElementById("btn-export-backup");
  const btnImport = document.getElementById("btn-import-backup");
  const backupFileInput = document.getElementById("backup-file-input");

  btnAll.addEventListener("click", () => { currentVaultFilter = "all"; updateVaultDisplay(); });
  btnComfort.addEventListener("click", () => { currentVaultFilter = "comfort"; updateVaultDisplay(); });
  btnDiscomfort.addEventListener("click", () => { currentVaultFilter = "discomfort"; updateVaultDisplay(); });

  // Clean duplicates button
  btnCleanDupes.addEventListener("click", async () => {
    const removedCount = await photoDB.removeDuplicates();
    currentPhotos = await photoDB.getAllPhotos();
    updateVaultDisplay();
    if (removedCount > 0) {
      showToast(`🧹 Removed ${removedCount} duplicate frame(s)! Vault is clean.`);
    } else {
      showToast(`✓ No duplicates found. Your portfolio is clean.`);
    }
  });

  // Export Backup JSON
  btnExport.addEventListener("click", () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentPhotos, null, 2));
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `gilden_vault_backup_${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchor.click();
    showToast("💾 Vault backup JSON downloaded.");
  });

  // Import Backup JSON
  btnImport.addEventListener("click", () => backupFileInput.click());
  backupFileInput.addEventListener("change", async () => {
    if (backupFileInput.files && backupFileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          if (Array.isArray(imported)) {
            for (const p of imported) {
              await photoDB.savePhoto(p);
            }
            currentPhotos = await photoDB.getAllPhotos();
            updateVaultDisplay();
            showToast(`📂 Successfully imported ${imported.length} photos into your Vault!`);
          }
        } catch (err) {
          alert("Invalid backup file format.");
        }
      };
      reader.readAsText(backupFileInput.files[0]);
    }
  });
}

// Batch upload handler for multiple street photos
async function processBatchVaultUpload(fileList) {
  showToast(`📥 Processing ${fileList.length} photo(s)...`);
  let added = 0;

  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];
    const compressedUrl = await compressImageFile(file, 1600, 0.85);
    const exif = await ExifReader.extractFromBlob(file);

    const focal = exif && exif.focalLength ? exif.focalLength : 24;
    const aperture = exif && exif.aperture ? exif.aperture : 8.0;
    const shutter = exif && exif.shutterSpeed ? exif.shutterSpeed : "1/250s";
    const flash = exif && exif.flashFired !== undefined ? exif.flashFired : false;
    const title = file.name.replace(/\.[^/.]+$/, "");

    // Initial critique evaluation
    const evalResult = CriticEngine.evaluatePhoto({
      focalLength: focal,
      aperture: aperture,
      shutterSpeed: shutter,
      flashFired: flash,
      distance: 1.2,
      isHipShot: false,
      title: title
    });

    const photoData = {
      id: "photo-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
      title: title,
      imageUrl: compressedUrl,
      focalLength: focal,
      aperture: aperture,
      shutterSpeed: shutter,
      flashFired: flash,
      distance: 1.2,
      braveryScore: evalResult.braveryScore,
      vault: evalResult.recommendedVault,
      critique: evalResult.critiques,
      reflection: "Added from Week 1 street walk.",
      createdAt: new Date().toISOString()
    };

    await photoDB.savePhoto(photoData);
    added++;
  }

  currentPhotos = await photoDB.getAllPhotos();
  updateVaultDisplay();
  showToast(`✓ Added ${added} photo(s) directly to your Masterclass Vault!`);
}

function updateVaultDisplay() {
  const comfortCountEl = document.getElementById("count-comfort");
  const discomfortCountEl = document.getElementById("count-discomfort");
  const progressComfortEl = document.getElementById("progress-comfort");
  const progressDiscomfortEl = document.getElementById("progress-discomfort");
  const comfortPercentText = document.getElementById("comfort-percent-text");
  const discomfortPercentText = document.getElementById("discomfort-percent-text");

  const comfortPhotos = currentPhotos.filter(p => p.vault === "comfort");
  const discomfortPhotos = currentPhotos.filter(p => p.vault === "discomfort");

  const comfortCount = comfortPhotos.length;
  const discomfortCount = discomfortPhotos.length;

  comfortCountEl.textContent = `${comfortCount} / 50`;
  discomfortCountEl.textContent = `${discomfortCount} / 50`;

  const comfortPct = Math.min(100, Math.round((comfortCount / 50) * 100));
  const discomfortPct = Math.min(100, Math.round((discomfortCount / 50) * 100));

  progressComfortEl.style.width = `${comfortPct}%`;
  progressDiscomfortEl.style.width = `${discomfortPct}%`;

  comfortPercentText.textContent = `${comfortPct}% of 50-photo quota`;
  discomfortPercentText.textContent = `${discomfortPct}% of 50-photo quota`;

  // Update tab navigation text
  const vaultTabBtn = document.querySelector('[data-tab="vault"]');
  if (vaultTabBtn) {
    vaultTabBtn.textContent = `🗄️ 50/50 Dual Vault (${comfortCount}🌱 / ${discomfortCount}🔥)`;
  }

  // Render gallery cards
  const gallery = document.getElementById("vault-gallery-grid");
  gallery.innerHTML = "";

  const filtered = currentPhotos.filter(p => {
    if (currentVaultFilter === "all") return true;
    return p.vault === currentVaultFilter;
  });

  filtered.forEach(photo => {
    const card = document.createElement("div");
    card.className = "challenge-card";
    card.style.background = "var(--bg-card)";
    card.style.border = "1px solid var(--border)";

    card.innerHTML = `
      <div style="position: relative; aspect-ratio: 3/2; overflow: hidden; border-radius: var(--radius-sm); margin-bottom: 12px; background: #000;">
        <img src="${photo.imageUrl}" alt="${photo.title}" style="width: 100%; height: 100%; object-fit: cover;">
        <div style="position: absolute; top: 8px; left: 8px; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 3px; background: ${photo.vault === 'discomfort' ? 'var(--leica-red)' : 'var(--green)'}; color: #fff; text-transform: uppercase;">
          ${photo.vault.toUpperCase()} VAULT
        </div>
        <div style="position: absolute; bottom: 8px; right: 8px; font-size: 11px; font-weight: 800; font-family: var(--font-mono); background: rgba(0,0,0,0.75); padding: 2px 6px; border-radius: 3px; color: #fff;">
          B: ${photo.braveryScore || 5}/10
        </div>
      </div>
      <h4 style="font-size: 16px; margin-bottom: 6px;">${photo.title}</h4>
      <div style="font-size: 12px; font-family: var(--font-mono); color: var(--text-muted); margin-bottom: 8px;">
        ${photo.focalLength}mm • f/${photo.aperture} • ${photo.shutterSpeed} • ${photo.flashFired ? '⚡ FLASH' : '☀️ AMBIENT'} • ${photo.distance}m
      </div>
      <div style="background: var(--bg-elevated); padding: 10px; border-radius: var(--radius-sm); font-size: 12px; font-style: italic; color: #dedee6; margin-bottom: 12px; border-left: 2px solid ${photo.vault === 'discomfort' ? 'var(--leica-red)' : 'var(--green)'};">
        "${photo.critique?.bruce || 'Keep shooting.'}"
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); padding-top: 10px;">
        <button class="action-btn" style="padding: 4px 10px; font-size: 11px; background: var(--bg-elevated); border: 1px solid var(--border);" onclick="togglePhotoVault('${photo.id}')">
          ⇄ Move to ${photo.vault === 'comfort' ? 'Discomfort' : 'Comfort'}
        </button>
        <button class="action-btn" style="padding: 4px 8px; font-size: 11px; background: transparent; color: var(--text-dim);" onclick="deletePhoto('${photo.id}')">
          ✕ Remove
        </button>
      </div>
    `;

    gallery.appendChild(card);
  });
}

window.togglePhotoVault = async function(id) {
  const p = currentPhotos.find(x => x.id === id);
  if (p) {
    p.vault = p.vault === "comfort" ? "discomfort" : "comfort";
    await photoDB.savePhoto(p);
    updateVaultDisplay();
    showToast(`⇄ Moved "${p.title}" to ${p.vault.toUpperCase()} Vault.`);
  }
};

window.deletePhoto = async function(id) {
  const target = currentPhotos.find(x => x.id === id);
  const title = target ? target.title : "this frame";
  
  if (confirm(`Remove "${title}" from your masterclass portfolio?`)) {
    await photoDB.deletePhoto(id);
    currentPhotos = currentPhotos.filter(x => x.id !== id);
    updateVaultDisplay();
    showToast(`🗑️ Removed "${title}" from portfolio.`);
  }
};

/* ==========================================================================
   7. CONTACT SHEET RENDERER
   ========================================================================== */
function renderContactSheet() {
  ContactSheetRenderer.renderContactSheet("contact-sheet-container", currentPhotos);
}

/* ==========================================================================
   8. FIELD COMPANION TIMER
   ========================================================================== */
function initFieldTimer() {
  const timer = new FieldTimer();

  const display = document.getElementById("timer-display");
  const drillTitle = document.getElementById("sprint-drill-title");
  const drillText = document.getElementById("sprint-drill-text");
  const drillMindset = document.getElementById("sprint-drill-mindset");

  const btnStart = document.getElementById("btn-timer-start");
  const btnPause = document.getElementById("btn-timer-pause");
  const btnReset = document.getElementById("btn-timer-reset");

  const btnModeStreet = document.getElementById("btn-mode-street");
  const btnModeZombie = document.getElementById("btn-mode-zombie");

  if (btnModeStreet && btnModeZombie) {
    btnModeStreet.addEventListener("click", () => {
      btnModeStreet.classList.add("active");
      btnModeZombie.classList.remove("active");
      timer.setMode("street", 15);
      display.textContent = "15:00";
      drillTitle.textContent = timer.prompts[0].title;
      drillText.textContent = timer.prompts[0].instruction;
      drillMindset.textContent = `"${timer.prompts[0].mindset}"`;
      btnStart.style.display = "inline-flex";
      btnPause.style.display = "none";
    });

    btnModeZombie.addEventListener("click", () => {
      btnModeZombie.classList.add("active");
      btnModeStreet.classList.remove("active");
      timer.setMode("zombie", 25);
      display.textContent = "25:00";
      drillTitle.textContent = timer.prompts[0].title;
      drillText.textContent = timer.prompts[0].instruction;
      drillMindset.textContent = `"${timer.prompts[0].mindset}"`;
      btnStart.style.display = "inline-flex";
      btnPause.style.display = "none";
    });
  }

  btnStart.addEventListener("click", () => {
    btnStart.style.display = "none";
    btnPause.style.display = "inline-flex";
    timer.start(
      (remaining) => {
        display.textContent = timer.formatTime(remaining);
      },
      (prompt) => {
        drillTitle.textContent = prompt.title;
        drillText.textContent = prompt.instruction;
        drillMindset.textContent = `"${prompt.mindset}"`;
      }
    );
  });

  btnPause.addEventListener("click", () => {
    timer.pause();
    btnStart.style.display = "inline-flex";
    btnPause.style.display = "none";
  });

  btnReset.addEventListener("click", () => {
    const mins = timer.mode === "zombie" ? 25 : 15;
    timer.reset(mins);
    display.textContent = `${mins}:00`;
    btnStart.style.display = "inline-flex";
    btnPause.style.display = "none";
    drillTitle.textContent = timer.prompts[0].title;
    drillText.textContent = timer.prompts[0].instruction;
    drillMindset.textContent = `"${timer.prompts[0].mindset}"`;
  });
}
