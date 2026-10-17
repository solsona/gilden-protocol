// Field Companion: Street Sprint Timer & Audio Drills
// Designed to break overthinking, eliminate hip-shooting, and trigger flow state

class FieldTimer {
  constructor() {
    this.mode = "street";
    this.totalSeconds = 15 * 60; // 15 mins default
    this.remainingSeconds = this.totalSeconds;
    this.timerId = null;
    this.isRunning = false;
    this.currentPromptIndex = 0;
    this.streetPrompts = [
      {
        title: "DRILL 1: The Gaze Anchor (No Shooting Yet)",
        instruction: "For the next 3 minutes: Walk with shoulders back and head high. Hold eye contact with approaching strangers for 1 full second until they break contact. Train your nervous system that you belong here.",
        mindset: "Fear lives in the hesitation. Walk like you own the sidewalk."
      },
      {
        title: "DRILL 2: Viewfinder to Eye (Anti-Hip-Shot)",
        instruction: "Lock zone focus at 1.5 meters. When you spot an interesting face 5 meters away, raise the Leica SL3-P directly to your eye NOW. Wait for them to walk through the frame. Zero hip-shots allowed.",
        mindset: "Put the camera to your eye or leave it in the hotel room."
      },
      {
        title: "DRILL 3: The 3-Foot Flash Strike",
        instruction: "Left hand high with flash angled 45 degrees down. Squeeze inside 1 meter (arm's reach). Pop the strobe! Savor the flash burst.",
        mindset: "Freeze reality with violence and grace."
      },
      {
        title: "DRILL 4: The Bruce Follow-Through",
        instruction: "Immediately after pressing the shutter, lower the camera, flash a genuine smile, say 'Great outfit!' or give a solid nod, and keep your forward momentum.",
        mindset: "Never run away. Never look guilty."
      },
      {
        title: "DRILL 5: Character Hunter",
        instruction: "Find someone with 50 years of life etched into their face. Wrinkles, dramatic eyeglasses, a fedora, intense cigar smoke. Get in close!",
        mindset: "I love the people I photograph. They just don't know it yet."
      }
    ];

    this.zombiePrompts = [
      {
        title: "ZOMBIE DRILL 1: The 45° Horde Intercept (Week 4)",
        instruction: "Do not stand on the curb like a spectator. Stride diagonally into the zombie procession at 1.2m. Take the shot as they walk into your 1.1m focal plane.",
        mindset: "Don't ask for permission. They came to be seen."
      },
      {
        title: "ZOMBIE DRILL 2: Left-Arm High Strobe (Weeks 9–11)",
        instruction: "Extend your left arm high at 45 degrees, pointing the flash down. Fire at 1 meter! The high angle casts deep jawline shadows and makes fake blood glisten like wet enamel.",
        mindset: "Flash is sculpture and violence. Blast through the daylight."
      },
      {
        title: "ZOMBIE DRILL 3: The Snarl & Mouth Hunter (Week 14)",
        instruction: "Reject closed mouths and static poses! Wait for the split second they roar, bare decaying teeth, or reach bloody hands at your lens.",
        mindset: "Catch them in motion, not in posing."
      },
      {
        title: "ZOMBIE DRILL 4: In-Your-Face 24mm Proximity (<0.9m) (Week 13)",
        instruction: "Step inside 3 feet. The 24mm on your Leica SL3-P will make their prosthetics loom terrifyingly large. Embrace the proximity adrenaline!",
        mindset: "If your zombies aren't scary enough, you're not close enough."
      },
      {
        title: "ZOMBIE DRILL 5: The Friendly Mexican Exit",
        instruction: "Immediately after the pop, drop the camera, big smile, give them a warm thumb up: '¡Qué chingón tu maquillaje, hermano!' and keep moving forward.",
        mindset: "You take the photo without apology, but you treat them with warmth."
      }
    ];

    this.prompts = this.streetPrompts;
  }

  setMode(mode, minutes = null) {
    this.mode = mode;
    this.prompts = mode === "zombie" ? this.zombiePrompts : this.streetPrompts;
    this.currentPromptIndex = 0;
    const defaultMins = mode === "zombie" ? 25 : 15;
    this.reset(minutes || defaultMins);
  }

  start(onTick, onPromptChange) {
    if (this.isRunning) return;
    this.isRunning = true;
    this.playTone(440, 0.15); // Start chime

    this.timerId = setInterval(() => {
      if (this.remainingSeconds > 0) {
        this.remainingSeconds--;
        if (onTick) onTick(this.remainingSeconds);

        // Every 3 minutes (180s), rotate prompt
        const elapsed = this.totalSeconds - this.remainingSeconds;
        if (elapsed > 0 && elapsed % 180 === 0) {
          this.currentPromptIndex = (this.currentPromptIndex + 1) % this.prompts.length;
          this.playTone(880, 0.25); // Prompt change alert chime
          if (onPromptChange) onPromptChange(this.prompts[this.currentPromptIndex]);
        }
      } else {
        this.pause();
        this.playTone(587.33, 0.6); // Finish bell
      }
    }, 1000);
  }

  pause() {
    this.isRunning = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  reset(minutes = 15) {
    this.pause();
    this.totalSeconds = minutes * 60;
    this.remainingSeconds = this.totalSeconds;
    this.currentPromptIndex = 0;
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  playTone(freq = 440, duration = 0.2) {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio might be blocked by browser policy before first interaction
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = FieldTimer;
}
