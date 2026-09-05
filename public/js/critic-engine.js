// Multi-Agent Critique Engine: The Magnum Council
// Features: Bruce Gilden Persona, Technical Flash Master, Leica Akademie Curator, and Bravery Score

class CriticEngine {
  static evaluatePhoto(data) {
    const {
      focalLength = 24,
      aperture = 8.0,
      shutterSpeed = "1/250s",
      iso = 200,
      flashFired = true,
      distance = 1.2,
      isHipShot = false,
      userFeeling = "nervous", // "comfortable", "nervous", "terrified", "in_control"
      title = "Untitled Frame"
    } = data;

    // 1. Calculate Bravery Score (1 - 10)
    let bravery = 5;

    // Proximity factor
    if (distance <= 0.9) bravery += 3;
    else if (distance <= 1.3) bravery += 2;
    else if (distance <= 2.0) bravery += 0;
    else if (distance > 3.0) bravery -= 3;

    // Flash factor
    if (flashFired) {
      if (distance <= 1.2) bravery += 2;
      else bravery += 1;
    } else {
      if (distance <= 1.0) bravery += 1; // brave even without flash
    }

    // Focal length factor (24mm forces extreme closeness)
    if (focalLength <= 24) bravery += 1;
    else if (focalLength >= 50 && distance > 2.0) bravery -= 1;

    // Hip-shot penalty (the classic anti-Gilden crutch)
    if (isHipShot) bravery -= 3;

    // Emotional state
    if (userFeeling === "terrified" || userFeeling === "nervous") {
      if (distance <= 1.5) bravery += 1; // conquered fear
    }

    bravery = Math.min(10, Math.max(1, bravery));

    // 2. Proximity Zone Description
    let proximityZone = "";
    if (distance < 1.0) proximityZone = "Gilden Strike (<1.0m / In-Your-Face)";
    else if (distance <= 1.5) proximityZone = "Decisive Zone (1.0m–1.5m / Arm's Reach)";
    else if (distance <= 2.5) proximityZone = "Conversational (1.5m–2.5m)";
    else proximityZone = "Safe Distance (>2.5m / Distant)";

    // 3. Recommended Vault
    let recommendedVault = "comfort";
    if (bravery >= 7 || distance <= 1.3 || (flashFired && distance <= 1.8) || isHipShot) {
      recommendedVault = "discomfort";
    }

    // 4. Multi-Agent Critiques
    const bruceCritique = CriticEngine.generateBruceCritique({
      focalLength,
      distance,
      flashFired,
      isHipShot,
      bravery,
      userFeeling
    });

    const techCritique = CriticEngine.generateTechCritique({
      focalLength,
      aperture,
      shutterSpeed,
      iso,
      flashFired,
      distance
    });

    const curatorCritique = CriticEngine.generateCuratorCritique({
      focalLength,
      distance,
      flashFired,
      bravery,
      recommendedVault
    });

    return {
      braveryScore: bravery,
      proximityZone,
      recommendedVault,
      critiques: {
        bruce: bruceCritique,
        tech: techCritique,
        curator: curatorCritique
      }
    };
  }

  static generateBruceCritique({ focalLength, distance, flashFired, isHipShot, bravery, userFeeling }) {
    if (isHipShot) {
      return "Listen to me: You shot this from the hip, didn't you? Look at that crooked angle! You're afraid of being seen. If you're afraid, don't photograph people on the street! Bring that Leica to your eye. Stand tall. Look them in the face. You have a right to be on that sidewalk just like they do!";
    }

    if (distance > 3.0) {
      return "Why are you standing in another zip code? What is this, surveillance? Photography isn't about hiding across four lanes of traffic. If you want to photograph a face, go up to the face. I don't care about the empty pavement or the parked cars. Get close enough to see the sweat on their forehead!";
    }

    if (distance <= 1.0 && flashFired) {
      return "NOW WE'RE TALKING! That's what I want to see! You popped that flash right in their grille at arm's length! Look at that expression—that's life, that's raw energy, that's the theater of the street! You didn't ask for permission, you took the picture. Next time, don't even blink after you shoot—just give 'em that big smile and keep walking. Put this in the masterclass deck!";
    }

    if (distance <= 1.3 && !flashFired) {
      return "Good proximity! You're in their personal bubble, and you committed to the eye level. But why didn't you pop the strobe? Flash gives it that punch, that explosion of reality. Next time, grab that flash in your left hand, raise it high, and blind the daylight!";
    }

    if (distance <= 2.2 && flashFired) {
      return "You're getting warmer. The flash froze the moment, but you're still playing it a little safe at 5 or 6 feet. Take two steps forward next time. Remember: If your pictures aren't good enough, you're not close enough. Robert Capa said it, and he was damn right!";
    }

    return "It's an okay picture. But 'okay' doesn't cut it in Mexico City. I don't want polite pictures. I want pictures that grab you by the lapels and shake you. Push harder on the next roll.";
  }

  static generateTechCritique({ focalLength, aperture, shutterSpeed, iso, flashFired, distance }) {
    const lines = [];

    if (focalLength === 24) {
      lines.push("• 24mm Perspective: The wide field of view creates dynamic geometric stretch on facial features. At " + distance + "m, the subject dominates the frame while keeping environmental context crisp.");
    } else if (focalLength === 35) {
      lines.push("• Summicron-M APO 35mm: Exceptional optical clarity and microcontrast. The mechanical zone-focus range at f/" + aperture + " provides sharp depth from roughly " + Math.max(0.8, (distance * 0.75)).toFixed(1) + "m to " + (distance * 1.35).toFixed(1) + "m.");
    } else {
      lines.push("• 50mm Normal Focal Length: Flattens perspective and isolates features gracefully, though requiring greater working distance (" + distance + "m).");
    }

    if (flashFired) {
      lines.push("• Flash Sync & Strobe Falloff: At " + shutterSpeed + ", daylight ambient is suppressed. Inverse square law gives dramatic falloff behind the subject, isolating them from distracting urban background clutter.");
    } else {
      lines.push("• Ambient Light Balance: Highlights and shadows rely solely on available light. Consider testing 1/16th manual fill flash to punch specular highlights into the eyes.");
    }

    lines.push("• Leica SL3-P 44MP Sensor: Massive resolving power captures pore-level texture, eyelash crispness, and fabric weaves.");

    return lines.join("\n");
  }

  static generateCuratorCritique({ focalLength, distance, flashFired, bravery, recommendedVault }) {
    if (recommendedVault === "discomfort") {
      return "Definitive entry for your Discomfort Vault. The visual tension, immediacy, and high Bravery Index (" + bravery + "/10) fulfill the exact criteria Bruce Gilden demands at the Leica Akademie. It demonstrates an active willingness to overcome social hesitation and embrace spontaneous collision.";
    } else {
      return "Solid candidate for the Comfort Vault. It exhibits compositional control, balanced framing, and thoughtful observational patience. Ensure it contrasts sharply with your aggressive flash frames when sequencing the final 50/50 submission.";
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CriticEngine;
}
