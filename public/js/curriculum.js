// The 18-Week Street Photography Desensitization & Flash Curriculum
// Tailored for Leica SL3-P (44MP) with Lumix 24mm, Summicron-M APO 35mm, and Lumix 50mm

const CURRICULUM_DATA = {
  title: "The Gilden Protocol: 18 Weeks to Leica Mexico 2027",
  specialEventDrill: {
    id: "zombie-walk-cdmx-2026",
    badge: "OCTOBER 17-18, 2026 • CDMX SPECIAL EVENT",
    title: "Marcha Zombie México: The Gilden Intensive",
    subtitle: "Consolidating Weeks 4 through 14 into One High-Voltage 3-Hour Street Session",
    summary: "Parades eliminate the #1 barrier in street photography: social fear. Zombie Walk participants are actively in character, adorned in extreme prosthetics and theatrical blood, expecting to perform. This is the ultimate crucible to compress 10 weeks of footwork, zone focus, left-hand off-camera flash, and 3-foot proximity into one afternoon.",
    consolidatedWeeks: [
      { week: "Week 4", name: "The 45° Intercept Step", takeaway: "Don't shoot from the sidewalk curb. Stride diagonally into the zombie procession at 1.2m, pivot hips, frame, click, follow through." },
      { week: "Weeks 5–6", name: "Zone Focus & Harsh Daylight", takeaway: "Lock manual focus at 1.1m (3.5 ft) on Lumix 24mm or APO 35mm. 1/250s at f/8, ISO 200. Underexpose ambient daylight by 1.5 stops so the flash isolates the subject." },
      { week: "Week 7", name: "Character & Texture Hunting", takeaway: "Hunt for rotting latex textures, exposed teeth, fake blood sheen, and manic character intensity." },
      { week: "Weeks 9–11", name: "Left-Hand High Flash Strike", takeaway: "Left arm raised 45° above lens axis pointing down. Pop strobe at 1.0m to create harsh sculptural shadows." },
      { week: "Week 13", name: "The 3-Foot Collision Strike", takeaway: "Commit to arm's-length proximity (<1.0m). The 24mm wide angle makes the zombie loom terrifyingly large." },
      { week: "Week 14", name: "Raw Emotional Expression", takeaway: "Avoid smiling posed zombies. Trigger only when they snarl, scream, or thrust bloody hands toward the lens." }
    ],
    gearRecipe: {
      camera: "Leica SL3-P (44MP)",
      lens: "Panasonic Lumix S 24mm f/1.8 (or Summicron-M APO 35mm f/2 ASPH)",
      exposure: "Manual: 1/250s (Max Sync) • f/8.0 • ISO 200 • Daylight WB",
      focusMode: "Locked Manual Zone Focus at 1.1m / 3.5 ft (DoF: 0.81m to 1.75m)",
      flash: "Off-Camera Strobe in left hand • Manual 1/16 to 1/32 power • Angled 45° down"
    },
    tacticalChecklist: [
      "1. Calibration: Before leaving home, lock focus at 1.1m, set 1/250s @ f/8, test flash burst.",
      "2. Footwork: Walk against or across the parade flow along Reforma / Monumento a la Revolución.",
      "3. Isolate: Single out one compelling character. Ignore the spectators.",
      "4. The Strike: Diagonal step to 1.0m, raise flash high with left hand, frame at eye level, click!",
      "5. Follow-through: Big genuine smile, nod, '¡Qué chingón tu maquillaje!', and keep moving."
    ],
    targetQuota: "25 Discomfort Frames (≤1.2m + Flash) + 10 Comfort Frames (Contextual)"
  },
  phases: [
    {
      phaseNumber: 1,
      title: "Phase 1: Eradicating the Hip-Shot & Finding 1.2 Meters",
      weeks: "Weeks 1–4",
      description: "Break the habit of hiding behind hip-shots and telephoto distances. Re-wire your instinct to bring the camera to your eye and claim your physical space on the sidewalk.",
      bruceMotto: "If you shoot from the hip, you don't know what you're doing. You're not seeing the picture. Put the camera to your eye!",
      challenges: [
        {
          week: 1,
          title: "The Eye-Level Pledge (Zero Hip-Shooting)",
          objective: "Complete a 90-minute street walk where every single exposure is made with the Leica SL3-P viewfinder held firmly against your eye.",
          psychologicalBarrier: "The fear of being 'caught' looking through the viewfinder at a stranger.",
          theDrill: "Choose a busy commercial avenue. Set a rule: if the camera does not touch your brow, you do not touch the shutter. When someone notices you, don't jerk the camera away like a thief. Hold your position, lower the camera smoothly, smile or nod, and continue your stride.",
          gearRecipe: {
            lens: "Summicron-M APO 35mm f/2 (or Lumix 24mm)",
            settings: "f/8, 1/250s, Auto ISO (max 1600)",
            focusMode: "Zone Focus: Set distance index to 1.5m (approx. 5 feet). Everything from 1.1m to 2.3m is razor sharp.",
            flash: "Off (Focus purely on body posture and eye-contact resilience)"
          },
          targetVault: "discomfort",
          quota: "Shoot at least 30 frames at eye level. Select 3 for review."
        },
        {
          week: 2,
          title: "The 1.2-Meter Island (Pedestrian Confluence)",
          objective: "Stand completely still in a high-density pedestrian flow and let subjects walk into your pre-set 1.2m focal plane.",
          psychologicalBarrier: "Overcoming the urge to step backwards when a stranger walks straight toward you.",
          theDrill: "Find a pedestrian island, crosswalk corner, or metro station exit. Anchor your feet. Do not chase anyone. Raise the camera as they cross 2 meters; squeeze the shutter at exactly 1.2 meters (arm's reach plus one step).",
          gearRecipe: {
            lens: "Lumix S 24mm (or Summicron 35mm APO)",
            settings: "f/8, 1/320s, ISO 400-800",
            focusMode: "Manual Zone Focus locked at 1.2m (4 feet).",
            flash: "Off"
          },
          targetVault: "discomfort",
          quota: "20 frames where the subject's torso or face fills >60% of the frame height."
        },
        {
          week: 3,
          title: "Direct Eye Contact & The Friendly Nod",
          objective: "Capture 10 portraits where the subject is looking directly into your lens, followed by the Bruce Gilden follow-through.",
          psychologicalBarrier: "The awkward moment after the click.",
          theDrill: "Gilden's golden rule: You don't ask for permission before, but you never act guilty after. When your eyes meet their eyes through the glass, click! As you lower the camera, give a confident two-second nod, say 'Looking great!' or 'Good afternoon!', and keep walking with purpose.",
          gearRecipe: {
            lens: "Summicron-M APO 35mm f/2",
            settings: "f/5.6 - f/8, 1/250s",
            focusMode: "Zone 1.5m",
            flash: "Off"
          },
          targetVault: "discomfort",
          quota: "10 sharp frames with direct pupil contact."
        },
        {
          week: 4,
          title: "The 45-Degree Intercept Step",
          objective: "Learn the footwork: stepping at a 45-degree angle across a moving pedestrian's path without blocking them.",
          psychologicalBarrier: "Hesitation at the moment of collision.",
          theDrill: "Spot a distinctive silhouette or face walking toward you 10 meters away. Maintain your pace. At 2 meters, take one deliberate lateral step at 45 degrees, pivoting your torso toward them. Frame, click at 1 meter, and pivot through without breaking cadence.",
          gearRecipe: {
            lens: "Lumix S 24mm",
            settings: "f/8, 1/500s (freeze footwork motion)",
            focusMode: "Manual 1.0m - 1.2m",
            flash: "Off"
          },
          targetVault: "discomfort",
          quota: "15 dynamic walking captures with foreground presence."
        }
      ]
    },
    {
      phaseNumber: 2,
      title: "Phase 2: Tactile Zone Focusing with Summicron-M APO 35mm & 24mm",
      weeks: "Weeks 5–8",
      description: "Autofocus is too slow for in-your-face street work. Master the mechanical focus tab of your APO 35mm and the hyperfocal geometry of your 24mm until your fingers know the distance before your mind does.",
      bruceMotto: "I don't look through the rangefinder to focus. I already know where my focus is. If they are at 4 feet, they are in focus. Period.",
      challenges: [
        {
          week: 5,
          title: "Blind Distance Finger Muscle Memory",
          objective: "Calibrate your muscle memory on the Summicron-M focus tab without looking at the distance scale.",
          psychologicalBarrier: "Fear of missing critical focus on Leica 44MP sensor.",
          theDrill: "At home and in the street, close your eyes. Rotate the Summicron-M focus tab to what you feel is 1 meter, 1.5 meters, and 2 meters. Open eyes and check the engravings. Practice until you hit within 10cm accuracy 9 out of 10 times.",
          gearRecipe: {
            lens: "Summicron-M APO 35mm f/2 with M-to-L adapter",
            settings: "f/8, 1/250s, peaking disabled in EVF to avoid distraction",
            focusMode: "Pure mechanical tab feel",
            flash: "Off"
          },
          targetVault: "comfort",
          quota: "25 rapid-draw street frames. At least 20 must be tack sharp on the SL3-P 44MP sensor."
        },
        {
          week: 6,
          title: "High-Contrast Hard Daylight & Deep Shadows",
          objective: "Master exposing for direct midday sunlight while crushing background clutter into dramatic deep shadows.",
          psychologicalBarrier: "Conventional advice says 'shoot in golden hour'. Gilden loves harsh midday light.",
          theDrill: "Go out between 12:00 PM and 2:30 PM under full sun. Expose for the sunlit skin tones (underexpose ambient by -1.5 EV). The background will fall off into pitch black.",
          gearRecipe: {
            lens: "Lumix S 24mm or APO 35mm",
            settings: "f/11, 1/500s, ISO 100",
            focusMode: "Zone 1.2m",
            flash: "Off"
          },
          targetVault: "comfort",
          quota: "15 high-contrast frames emphasizing facial lines, jawlines, and graphic contrast."
        },
        {
          week: 7,
          title: "Character Hunting: Hands, Wrinkles & Archetypes",
          objective: "Train your eye to seek out intense, idiosyncratic human features—the hallmark of Bruce Gilden's Magnum work.",
          psychologicalBarrier: "Shooting only conventional 'pretty' or safe subjects.",
          theDrill: "Look for people who look like they stepped out of a 1940s film noir or a Damon Runyon novel: fedoras, heavy jewelry, cigar smoke, weathered skin, dramatic eyeglasses, intense scowls.",
          gearRecipe: {
            lens: "Lumix S 50mm or Summicron-M 35mm",
            settings: "f/5.6, 1/250s",
            focusMode: "Zone 1.5m",
            flash: "Off"
          },
          targetVault: "comfort",
          quota: "12 portraits of intense characters."
        },
        {
          week: 8,
          title: "The Comfort Milestone Review (First 25 Comfort Vault)",
          objective: "Curate your first batch of 25 strong, beautiful, well-crafted street photographs for the Comfort Vault.",
          psychologicalBarrier: "Self-editing: being able to discard good photos to keep only exceptional ones.",
          theDrill: "Review your library of parade portraits, geometric compositions, and candid moments. Select the top 25 that demonstrate your mastery of framing, light, and connection.",
          gearRecipe: {
            lens: "Lumix S 50mm / 24mm / APO 35mm",
            settings: "Any optimal street setting",
            focusMode: "Selective",
            flash: "Ambient only"
          },
          targetVault: "comfort",
          quota: "25 finalized Comfort Vault entries."
        }
      ]
    },
    {
      phaseNumber: 3,
      title: "Phase 3: Off-Camera Daylight Flash Drills",
      weeks: "Weeks 9–12",
      description: "Introduce the off-camera strobe. Learn to hold the flash in your left hand high above the subject's eye line while framing with your right hand on the Leica SL3-P.",
      bruceMotto: "Flash gives the photograph an explosion of reality. It freezes the moment with violence and grace.",
      challenges: [
        {
          week: 9,
          title: "The Inanimate Strobe & Texture Test",
          objective: "Dial in your flash-to-ambient exposure ratio on inanimate street objects without any social pressure.",
          psychologicalBarrier: "Technical confusion over sync speed, manual flash power, and ambient daylight balance.",
          theDrill: "Walk the street with your flash connected via sync cord or wireless trigger. Left hand holds flash at 45 degrees; right hand holds camera. Shoot fire hydrants, crushed beverage cans, store mannequins, and textured brick at 1 meter.",
          gearRecipe: {
            lens: "Lumix S 24mm or Summicron-M 35mm",
            settings: "f/8 - f/11, 1/250s (max sync speed), ISO 100",
            focusMode: "1.0 meter",
            flash: "Manual mode: 1/16th to 1/32nd power, pointed down from 45 degrees."
          },
          targetVault: "comfort",
          quota: "20 perfectly balanced flash exposures where flash highlights subject while background is 1 stop dark."
        },
        {
          week: 10,
          title: "Street Still-Lifes & Gestures (No Faces Yet)",
          objective: "Shoot flash at street level on human gestures: hands holding bags, smoking cigars, counting cash, dogs on leashes.",
          psychologicalBarrier: "Fear of firing the flash near people.",
          theDrill: "Keep the camera and flash below waist level. Look for interesting shoes, canine companions, hands resting on cane handles. Fire the flash at 1 meter. Notice that 95% of people don't even realize what happened.",
          gearRecipe: {
            lens: "Lumix S 24mm",
            settings: "f/8, 1/250s, ISO 200",
            focusMode: "Zone 1.0m",
            flash: "Manual 1/32nd, bare bulb or diffused"
          },
          targetVault: "discomfort",
          quota: "15 dynamic flash captures of street gestures."
        },
        {
          week: 11,
          title: "The High-Angle Flash Strike on Busy Crossings",
          objective: "Take your off-camera flash to crowded street corners and capture walking pedestrians from 1.5 to 2 meters.",
          psychologicalBarrier: "The visible pop of the flash in broad daylight on human faces.",
          theDrill: "Raise your left arm high with the flash unit angled 30 degrees forward and down. As crowds cross during pedestrian green, take 5 flash exposures of distinct faces at 1.8 meters. Keep smiling, keep moving.",
          gearRecipe: {
            lens: "Summicron-M APO 35mm or Lumix 24mm",
            settings: "f/8, 1/250s, ISO 200",
            focusMode: "Zone 1.8m",
            flash: "Manual 1/16th power, high left hand grip"
          },
          targetVault: "discomfort",
          quota: "15 illuminated street portraits in pedestrian flow."
        },
        {
          week: 12,
          title: "The Twilight & Night Strobe Primer",
          objective: "Experience the pure drama of flash against falling twilight, creating theater on the sidewalk.",
          psychologicalBarrier: "Flash at night feels much more conspicuous than in daylight.",
          theDrill: "Shoot during dusk when ambient light is low (1/60s, f/5.6, ISO 800). The flash will freeze the subject instantly while background neon and car headlights streak with slight motion blur.",
          gearRecipe: {
            lens: "Lumix S 24mm or 50mm",
            settings: "f/5.6, 1/60s (shutter drag), ISO 800",
            focusMode: "Zone 1.2m",
            flash: "Manual 1/32nd power"
          },
          targetVault: "discomfort",
          quota: "10 cinematic night street portraits."
        }
      ]
    },
    {
      phaseNumber: 4,
      title: "Phase 4: The Gilden Maneuver (<1.2m Confrontational Portraits)",
      weeks: "Weeks 13–16",
      description: "The full Bruce Gilden technique: 24mm wide angle, under 4 feet, left hand high with flash, right hand framing, no apologies, pure visceral human drama.",
      bruceMotto: "I'm not trying to hurt anyone. I love the people I photograph. They're my friends, they just don't know it yet!",
      challenges: [
        {
          week: 13,
          title: "The 3-Foot Collision Strike",
          objective: "Capture 10 portraits at under 1 meter (3 feet) with the 24mm lens and daylight flash.",
          psychologicalBarrier: "The absolute peak of street photography social anxiety.",
          theDrill: "Lock focus at 0.9m (3 feet). With the 24mm on the SL3-P, you will feel uncomfortably close. You must be close enough to smell their cologne or coffee. One decisive step, flash pops, direct framing at eye level. Your heart will hammer—welcome the adrenaline!",
          gearRecipe: {
            lens: "Panasonic Lumix S 24mm f/1.8",
            settings: "f/8, 1/250s, ISO 100-200",
            focusMode: "Locked manual focus at 0.9m (3 feet)",
            flash: "1/16th power, held 30cm above and 20cm to the left of the lens axis"
          },
          targetVault: "discomfort",
          quota: "10 ultra-close confrontational frames with Bravery Index > 8."
        },
        {
          week: 14,
          title: "Expressions of Raw Emotion: Grimaces, Laughs & Scowls",
          objective: "Move beyond passive blank faces. Capture moments of active speech, toothy smiles, frowns, or mid-sentence gestures.",
          psychologicalBarrier: "Anticipating the split second of human reaction.",
          theDrill: "Observe mouth and eyebrow tension as people walk. Look for people engaged in heated phone calls, intense conversations, or animated laughter. Strike right at the crest of their emotional expression.",
          gearRecipe: {
            lens: "Lumix S 24mm or Summicron-M 35mm",
            settings: "f/8, 1/250s, ISO 200",
            focusMode: "1.0m",
            flash: "1/16th power"
          },
          targetVault: "discomfort",
          quota: "12 emotionally charged, high-expression portraits."
        },
        {
          week: 15,
          title: "Inclement Weather & Rain Reflections",
          objective: "Shoot in rain or heavy wind with flash. Water droplets suspended in mid-air by the flash burst create sheer visual electricity.",
          psychologicalBarrier: "Bad weather and wet gear (SL3-P is weather-sealed!).",
          theDrill: "Take advantage of the Leica SL3-P's IP54 weather sealing. Hit the street in a downpour or heavy drizzle. Flash pops will illuminate rain droplets frozen against dark coats and glossy umbrella domes.",
          gearRecipe: {
            lens: "Lumix S 24mm (weather sealed)",
            settings: "f/8, 1/250s, ISO 400",
            focusMode: "Zone 1.2m",
            flash: "1/16th power with plastic zip cover if wet"
          },
          targetVault: "discomfort",
          quota: "15 high-voltage rain portraits."
        },
        {
          week: 16,
          title: "The Discomfort Milestone: 50 Raw Frames",
          objective: "Cross the finish line of your 50 Discomfort photographs. Audit every single frame for proximity, boldness, and tension.",
          psychologicalBarrier: "Honesty: Did you include 'safe' shots in the Discomfort vault to pad the numbers?",
          theDrill: "Review your Discomfort vault. Any shot taken from beyond 1.8 meters or without an elevated heart rate must be evicted to the Comfort vault or deleted. Only the fearless survive here.",
          gearRecipe: {
            lens: "Your choice of 24mm, 35mm, or 50mm",
            settings: "Street tuned",
            focusMode: "Manual zone focus",
            flash: "Active"
          },
          targetVault: "discomfort",
          quota: "Reach exactly 50 validated Discomfort Vault entries."
        }
      ]
    },
    {
      phaseNumber: 5,
      title: "Phase 5: Masterclass Portfolio Editing & Sequencing",
      weeks: "Weeks 17–18 (January 2027 Countdown)",
      description: "Prepare the physical contact sheets and prints for Bruce Gilden and the Leica Akademie curators in Mexico City.",
      bruceMotto: "A great photographer is a great editor of their own work. If you show me 100 pictures and 10 are bad, you're a bad photographer. Show me only the killers.",
      challenges: [
        {
          week: 17,
          title: "The Magnum 50/50 Sieve",
          objective: "Sequence your 50 Comfort and 50 Discomfort photographs into two cohesive visual narratives.",
          psychologicalBarrier: "Killing your darlings.",
          theDrill: "Pair each Comfort photo with a corresponding Discomfort photo (e.g. quiet parade smile vs. intense rush-hour flash collision; quiet shadow geometry vs. in-your-face toothy snarl). Study the dialogue between control and chaos in your photography.",
          gearRecipe: {
            lens: "N/A (Curatorial Studio Phase)",
            settings: "Export high-res 44MP DNG/TIFF",
            focusMode: "Visual Sequencing",
            flash: "N/A"
          },
          targetVault: "curation",
          quota: "Complete 50 Comfort + 50 Discomfort paired selection."
        },
        {
          week: 18,
          title: "The Contact Sheet & Chinagraph Deck",
          objective: "Generate and print the Leica Akademie Contact Sheet Deck with red grease pencil crop and select marks.",
          psychologicalBarrier: "Readying yourself for Bruce's legendary tough-love critique in CDMX.",
          theDrill: "Use the Contact Sheet Lab in the app to render traditional black-border film contact sheets. Draw your selection circles and crop lines. Print on luster paper. Pack your bags for Mexico City!",
          gearRecipe: {
            lens: "Leica SL3-P + 24mm + 35mm APO + 50mm + Flash",
            settings: "Masterclass Ready",
            focusMode: "Ready",
            flash: "Charged & Synced"
          },
          targetVault: "curation",
          quota: "Final presentation ready for Bruce Gilden @ Leica Mexico."
        }
      ]
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CURRICULUM_DATA;
}
