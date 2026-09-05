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

  // 6. Initialize 50/50 Dual Vault
  initVault();

  // 7. Initialize Field Companion Sprint Timer
  initFieldTimer();
});

// Global state
let currentPhotos = [];
let currentVaultFilter = "all";
let uploadedImageBase64 = null;

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

      // Re-render contact sheet if switching to contact sheet tab
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

    // Map distance limits to visual percentage (0.5m -> 0%, 6.0m -> 100%)
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

    // Tactical advice logic
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

  // Populate presets
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

  const btnSubmit = document.getElementById("btn-submit-critique");

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

  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("dragover");
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener("change", () => {
    if (fileInput.files && fileInput.files[0]) {
      handleFile(fileInput.files[0]);
    }
  });

  async function handleFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImageBase64 = e.target.result;
      imagePreview.src = uploadedImageBase64;
      previewWrapper.style.display = "flex";
      inputTitle.value = file.name.replace(/\.[^/.]+$/, "");
    };
    reader.readAsDataURL(file);

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
  }

  btnSubmit.addEventListener("click", () => {
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
      userFeeling: inputFeeling.value,
      reflection: inputReflection.value,
      createdAt: new Date().toISOString()
    };

    // Run Critique
    const evalResult = CriticEngine.evaluatePhoto(photoData);

    photoData.braveryScore = evalResult.braveryScore;
    photoData.vault = evalResult.recommendedVault;
    photoData.critique = evalResult.critiques;

    // Display in UI
    resBravery.textContent = evalResult.braveryScore;
    resProximity.textContent = evalResult.proximityZone;
    resVaultTag.textContent = `RECOMMENDED: ${evalResult.recommendedVault.toUpperCase()} VAULT`;
    resVaultTag.style.color = evalResult.recommendedVault === "discomfort" ? "var(--leica-red)" : "var(--green)";

    resBruce.textContent = `"${evalResult.critiques.bruce}"`;
    resTech.textContent = evalResult.critiques.tech;
    resCurator.textContent = evalResult.critiques.curator;

    // Save to Vault
    savePhotoToVault(photoData);
  });
}

/* ==========================================================================
   6. 50/50 DUAL VAULT
   ========================================================================== */
async function initVault() {
  // Load photos from server or fallback to initial store
  try {
    const res = await fetch("/api/vault");
    if (res.ok) {
      const data = await res.json();
      currentPhotos = data.photos || [];
    } else {
      loadFallbackPhotos();
    }
  } catch (e) {
    loadFallbackPhotos();
  }

  updateVaultDisplay();

  // Filter buttons
  const btnAll = document.getElementById("filter-all-btn");
  const btnComfort = document.getElementById("filter-comfort-btn");
  const btnDiscomfort = document.getElementById("filter-discomfort-btn");

  btnAll.addEventListener("click", () => { currentVaultFilter = "all"; updateVaultDisplay(); });
  btnComfort.addEventListener("click", () => { currentVaultFilter = "comfort"; updateVaultDisplay(); });
  btnDiscomfort.addEventListener("click", () => { currentVaultFilter = "discomfort"; updateVaultDisplay(); });
}

function loadFallbackPhotos() {
  const local = localStorage.getItem("gilden_protocol_photos");
  if (local) {
    currentPhotos = JSON.parse(local);
  } else {
    // Initial demo seed
    currentPhotos = [
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
        reflection: "Felt completely relaxed. Approached them at the parade, complimented their headpiece. Total comfort zone."
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
        reflection: "Heart was beating at 145 BPM. Flash held high in left hand, stepped right into his path at 3 feet. Terrifying but exhilarating."
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
        reflection: "Standing across the street waiting for someone to enter the light beam. Safe distance."
      }
    ];
  }
}

function savePhotoToVault(photo) {
  currentPhotos.unshift(photo);
  localStorage.setItem("gilden_protocol_photos", JSON.stringify(currentPhotos));
  
  // Also send to server
  fetch("/api/vault/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(photo)
  }).catch(() => {});

  updateVaultDisplay();

  // Switch to Vault tab
  const vaultTab = document.querySelector('[data-tab="vault"]');
  if (vaultTab) vaultTab.click();
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

window.togglePhotoVault = function(id) {
  const p = currentPhotos.find(x => x.id === id);
  if (p) {
    p.vault = p.vault === "comfort" ? "discomfort" : "comfort";
    localStorage.setItem("gilden_protocol_photos", JSON.stringify(currentPhotos));
    updateVaultDisplay();
  }
};

window.deletePhoto = function(id) {
  if (confirm("Remove this frame from your masterclass portfolio?")) {
    currentPhotos = currentPhotos.filter(x => x.id !== id);
    localStorage.setItem("gilden_protocol_photos", JSON.stringify(currentPhotos));
    updateVaultDisplay();
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
    timer.reset(15);
    display.textContent = "15:00";
    btnStart.style.display = "inline-flex";
    btnPause.style.display = "none";
    drillTitle.textContent = timer.prompts[0].title;
    drillText.textContent = timer.prompts[0].instruction;
    drillMindset.textContent = `"${timer.prompts[0].mindset}"`;
  });
}
