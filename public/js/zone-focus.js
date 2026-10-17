// Zone Focusing & Hyperfocal Optical Engine
// Calibrated for Leica SL3-P (44MP Full-Frame sensor, CoC = 0.025mm)

class ZoneFocusCalculator {
  constructor(coc = 0.025) {
    this.coc = coc; // Circle of confusion in mm (0.025mm for high-res 44MP full frame)
  }

  // Calculate Hyperfocal Distance in meters
  calculateHyperfocal(focalLengthMm, aperture) {
    const f = focalLengthMm;
    const N = aperture;
    const c = this.coc;
    // H = (f^2 / (N * c)) + f in mm
    const H_mm = (f * f) / (N * c) + f;
    return H_mm / 1000; // in meters
  }

  // Calculate Depth of Field limits for a given focus distance (in meters)
  calculateDoF(focalLengthMm, aperture, focusDistanceM) {
    const f = focalLengthMm;
    const N = aperture;
    const c = this.coc;
    const s_mm = focusDistanceM * 1000;
    const H_mm = (f * f) / (N * c) + f;

    // Near limit
    const dNear_mm = (s_mm * (H_mm - f)) / (H_mm + s_mm - 2 * f);
    const dNear_m = Math.max(0, dNear_mm / 1000);

    // Far limit
    let dFar_m = Infinity;
    if (s_mm < H_mm) {
      const dFar_mm = (s_mm * (H_mm - f)) / (H_mm - s_mm);
      dFar_m = dFar_mm / 1000;
    }

    const totalDoF_m = dFar_m === Infinity ? Infinity : (dFar_m - dNear_m);

    return {
      focalLengthMm,
      aperture,
      focusDistanceM,
      hyperfocalM: H_mm / 1000,
      nearLimitM: Number(dNear_m.toFixed(2)),
      farLimitM: dFar_m === Infinity ? "∞" : Number(dFar_m.toFixed(2)),
      totalDoF: dFar_m === Infinity ? "Infinite" : Number(totalDoF_m.toFixed(2)) + "m"
    };
  }

  // Common Lens Presets for Solsona's Gear
  getPresets() {
    return [
      {
        id: "zombie-walk-cdmx",
        name: "🧟 Marcha Zombie CDMX Preset (1.1m / f8)",
        desc: "Parade Crucible: 24mm at f/8 gives 0.81m to 1.75m tack-sharp DoF. Ideal for diagonal intercepts.",
        focalLength: 24,
        aperture: 8.0,
        focusDistance: 1.1
      },
      {
        id: "gilden-strike",
        name: "Bruce Gilden 1.2m Strike",
        desc: "The classic in-your-face distance. Crisp focus from arm's reach to walking distance.",
        focalLength: 24,
        aperture: 8.0,
        focusDistance: 1.2
      },
      {
        id: "gilden-extreme",
        name: "Extreme Close Collision (0.9m / 3ft)",
        desc: "Under 1 meter. 24mm wide angle, flash pops right in the subject's face.",
        focalLength: 24,
        aperture: 11.0,
        focusDistance: 0.9
      },
      {
        id: "summicron-sidewalk",
        name: "Summicron-M APO 35mm Sidewalk Sweep",
        desc: "Tactile zone focus with M-adapter. Ideal for crossing pedestrians from 1.1m to 2.2m.",
        focalLength: 35,
        aperture: 8.0,
        focusDistance: 1.5
      },
      {
        id: "summicron-hyperfocal",
        name: "Summicron-M APO 35mm Infinity Trap",
        desc: "Everything from 2.5 meters to infinity is razor-sharp for fast environmental street.",
        focalLength: 35,
        aperture: 8.0,
        focusDistance: 5.1
      },
      {
        id: "lumix-50-portrait",
        name: "Lumix S 50mm Comfort Portrait",
        desc: "Safe conversational distance (2.0m). Sharp facial features with creamy background falloff.",
        focalLength: 50,
        aperture: 4.0,
        focusDistance: 2.0
      }
    ];
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ZoneFocusCalculator;
}
