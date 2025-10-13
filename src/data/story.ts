import type { CombatEncounter, StoryNode } from "../systems/types";

const goblinAmbush: CombatEncounter = {
  id: "goblin-ambush",
  description:
    "A cunning goblin scout lunges from the shadows with a wicked blade.",
  enemy: {
    id: "goblin-scout",
    name: "Goblin Scout",
    level: 1,
    maxHP: 10,
    currentHP: 10,
    armorClass: 13,
    attackBonus: 3,
    damage: "1d6+1",
    portrait: "/assets/enemies/goblin.png",
  },
  victoryNode: "verdyn-road",
  fleeNode: "tavern-common-room",
  victoryEffects: [
    { type: "grantGold", amount: 8 },
    {
      type: "grantItem",
      item: {
        id: "ember-shard",
        name: "Ember Shard",
        description:
          "A warm fragment of crystal humming with latent fire magic.",
        type: "trinket",
      },
    },
    {
      type: "achievement",
      achievement: {
        id: "first-blood",
        title: "First Blood",
        description: "Defeated an enemy in single combat.",
        unlockedAt: Date.now(),
      },
    },
  ],
  defeatEffects: [
    { type: "modifyHP", delta: -5 },
    { type: "updateFaction", factionId: "town-guard", delta: -1 },
    { type: "setNode", nodeId: "tavern-common-room" },
  ],
};

const emberArchonEncounter: CombatEncounter = {
  id: "ember-archon",
  description:
    "Archon Pyrel unfurls wings of molten glass, laughter echoing like clashing bells.",
  enemy: {
    id: "archon-pyrel",
    name: "Archon Pyrel",
    level: 5,
    maxHP: 42,
    currentHP: 42,
    armorClass: 17,
    attackBonus: 6,
    damage: "2d8+4",
    portrait: "/assets/enemies/archon_pyrel.png",
  },
  victoryNode: "ember-rift-epilogue",
  fleeNode: "ember-rift-threshold",
  victoryEffects: [
    {
      type: "achievement",
      achievement: {
        id: "rift-savior",
        title: "Rift Savior",
        description:
          "Defeated Archon Pyrel before the Ember Rift consumed Verdyn.",
        unlockedAt: Date.now(),
      },
    },
    {
      type: "log",
      entry:
        "Pyrel tumbles into the Rift, his incandescent crown dimming to ash.",
    },
    {
      type: "updateQuest",
      questId: "archon-awakening",
      status: "completed",
      summary:
        "Archon Pyrel has been cast back into the rift, sparing Verdyn from ruin.",
      progress: 1,
      completeObjectives: [
        "learn-true-name",
        "break-the-chorus",
        "banish-pyrel",
      ],
    },
  ],
  defeatEffects: [
    { type: "modifyHP", delta: -8 },
    {
      type: "log",
      entry:
        "Pyrel hurls you from the sanctum. Verdyn will need its hero to rise again.",
    },
    { type: "setNode", nodeId: "ember-rift-threshold" },
  ],
};

export const storyNodes: StoryNode[] = [
  {
    id: "prologue-awakening",
    title: "Chronicles Begin",
    summary: "You awaken to a world poised on the brink of change.",
    body: [
      "Verdyn, frontier of the Ember Wilds, breathes in hues of violet dawn. Thunderheads of ember dust roll across the horizon while starlings carve sigils through the air above you.",
      "Lanterns gutter along the road ahead, painting the cobbles in honeyed light that flickers with glimpses of something colossal thrashing within the distant Rift.",
      "As the lone adventurer, you feel the tug of destiny drawing you toward the Ember Rift—a chasm where magic spills like molten light and a cruel laugh curls on the wind.",
    ],
    background:
      "linear-gradient(180deg, rgba(39,22,55,0.9), rgba(12,12,28,0.95))",
    ambient: "audio/ambience-wind.mp3",
    tags: ["Verdyn Outskirts"],
    choices: [
      {
        id: "enter-verdyn",
        text: "Approach the city of Verdyn",
        toNode: "tavern-common-room",
        effects: [
          {
            type: "addQuest",
            quest: {
              id: "ember-rift",
              title: "Ember Rift Mystery",
              summary:
                "Discover why the Ember Rift has begun to pulse with wild magic.",
              status: "active",
              faction: "Circle of Embers",
              location: "Ember Wilds",
              recommendedLevel: 1,
              progress: 0.25,
              objectives: [
                {
                  id: "verdyn-arrival",
                  description:
                    "Arrive in Verdyn and gather whispers about the Ember Rift.",
                },
                {
                  id: "choose-allies",
                  description:
                    "Earn the trust of Verdyn's factions for guidance.",
                },
                {
                  id: "secure-shard",
                  description:
                    "Secure an Ember Shard capable of unlocking the Rift.",
                },
              ],
            },
          },
          {
            type: "log",
            entry:
              "Destiny beckons you toward Verdyn and the Ember Rift beyond.",
          },
        ],
      },
    ],
  },
  {
    id: "tavern-common-room",
    title: "Emberlight Tavern",
    summary: "A haven of warmth, rumor, and opportunity.",
    body: [
      "The Emberlight Tavern is alive with lute music and the glow of enchanted lanterns. Spiced cider mingles with ozone from the warded hearth as laughter ricochets between banners of Verdyn's factions.",
      "Mira the barkeep juggles mugs with impossible grace, Captain Thalia rolls maps across a battle-scarred table, and a hooded broker watches you through jeweled lenses polished with suspicion.",
    ],
    background: "url(/assets/backgrounds/tavern.jpg)",
    ambient: "audio/tavern-chatter.mp3",
    tags: ["Verdyn"],
    choices: [
      {
        id: "speak-captain",
        text: "Speak with Captain Thalia of the Verdyn Watch",
        description: "Offer your aid to the town guard.",
        effects: [
          {
            type: "updateFaction",
            factionId: "town-guard",
            delta: 2,
          },
          {
            type: "log",
            entry: "You pledged assistance to the Verdyn Watch.",
          },
        ],
        toNode: "captain-briefing",
      },
      {
        id: "black-guild",
        text: "Meet the hooded broker of the Black Guild",
        description: "Whispers of relics and forbidden lore await.",
        effects: [
          {
            type: "updateFaction",
            factionId: "black-guild",
            delta: 2,
          },
          {
            type: "log",
            entry: "The Black Guild hints at relics buried in the Ember Wilds.",
          },
        ],
        toNode: "guild-offer",
      },
      {
        id: "mira-rumors",
        text: "Share a drink with Mira the barkeep",
        description: "She hears every secret worth retelling.",
        effects: [
          {
            type: "log",
            entry:
              "Mira pours a blazing Sizzlebrew and promises a tour of Verdyn's curiosities.",
          },
        ],
        toNode: "tavern-barkeep",
      },
      {
        id: "rest",
        text: "Take a moment to rest",
        description: "Restore a portion of your vitality.",
        effects: [{ type: "modifyHP", delta: 5 }],
        toNode: "tavern-common-room",
      },
    ],
  },
  {
    id: "guild-offer",
    title: "Shadowed Proposal",
    summary: "The Black Guild offers a perilous contract.",
    body: [
      'The broker slides a parchment across the table. "Retrieve an Ember Shard from the wilds, and the Guild will owe you."',
      "Accepting could earn powerful allies—or dangerous debts.",
    ],
    background:
      "linear-gradient(180deg, rgba(35,26,44,0.95), rgba(8,8,18,0.98))",
    ambient: "audio/whispers.mp3",
    tags: ["Verdyn", "Black Guild"],
    choices: [
      {
        id: "accept-guild-contract",
        text: "Accept the contract",
        effects: [
          {
            type: "addQuest",
            quest: {
              id: "guild-contract",
              title: "Guild Contract: Ember Shard",
              summary:
                "Secure an Ember Shard from the wilds for the Black Guild.",
              status: "active",
              faction: "Black Guild",
              reward: "Favor of the Black Guild",
              location: "Black Guild Network",
              recommendedLevel: 2,
              progress: 0.33,
              objectives: [
                {
                  id: "accept-contract",
                  description: "Seal your pact with the Black Guild broker.",
                  completed: true,
                },
                {
                  id: "retrieve-shard",
                  description: "Recover an Ember Shard from the Ember Wilds.",
                },
                {
                  id: "return-to-broker",
                  description:
                    "Return the shard to the broker to collect your favor.",
                  optional: true,
                },
              ],
            },
          },
        ],
        toNode: "verdyn-road",
      },
      {
        id: "decline",
        text: "Decline politely",
        effects: [
          {
            type: "updateFaction",
            factionId: "black-guild",
            delta: -1,
          },
        ],
        toNode: "tavern-common-room",
      },
    ],
  },
  {
    id: "tavern-barkeep",
    title: "Mira's Rumor Table",
    summary: "Stories swirl quicker than the Sizzlebrew.",
    body: [
      "Mira slides a copper mug your way. The foam sparks crimson and gold, tickling your nose with tiny fireflies of fizz.",
      "She points out figures worth knowing: a gnomish professor balancing a tower of books, a bard rehearsing a ballad about dancing owlbears, and an exhausted courier asleep on his feet.",
    ],
    background: "url(/assets/backgrounds/tavern-table.jpg)",
    ambient: "audio/tavern-soft.mp3",
    tags: ["Verdyn", "Social"],
    choices: [
      {
        id: "taste-sizzlebrew",
        text: "Down the Sizzlebrew in one go",
        description: "It tingles... a lot.",
        effects: [
          { type: "modifyHP", delta: 3 },
          {
            type: "log",
            entry:
              "The Sizzlebrew pops against your teeth like arcane popcorn. Mira cackles approvingly.",
          },
        ],
        toNode: "tavern-barkeep",
      },
      {
        id: "chat-professor",
        text: "Introduce yourself to Professor Brindlefuss",
        description:
          "The gnome insists on drafting tactical doodles on napkins.",
        toNode: "professor-brindlefuss",
      },
      {
        id: "market-tour",
        text: "Take Mira's map to the Verdyn Market Square",
        effects: [
          {
            type: "log",
            entry:
              "Mira's hand-drawn map includes doodles of smiling lampposts and a warning: Beware the mime mage.",
          },
        ],
        toNode: "market-square",
      },
      {
        id: "return-common-room",
        text: "Return to the common room",
        toNode: "tavern-common-room",
      },
    ],
  },
  {
    id: "professor-brindlefuss",
    title: "Professor Brindlefuss' Lecture",
    summary: "Strategy, slapstick, and startling revelations.",
    body: [
      "Professor Brindlefuss adjusts six separate pairs of spectacles before launching into a sprawling lecture about rift harmonics.",
      "He sketches diagrams featuring angry stick-figure goblins and a dashing caricature of you planting a boot in a molten archon's face.",
    ],
    background:
      "linear-gradient(180deg, rgba(44,33,52,0.9), rgba(14,9,22,0.95))",
    ambient: "audio/quill-scratch.mp3",
    tags: ["Verdyn", "Allies"],
    choices: [
      {
        id: "take-notes",
        text: "Take furious notes",
        skillCheck: {
          ability: "intelligence",
          difficultyClass: 12,
          flavor: "You attempt to decode the professor's spiral handwriting.",
          success: {
            resultText:
              "You capture a vital equation predicting Pyrel's weakness to resonant laughter.",
            effects: [
              {
                type: "log",
                entry:
                  "Brindlefuss beams and gifts you a tuning fork etched with sigils.",
              },
              {
                type: "grantItem",
                item: {
                  id: "resonant-fork",
                  name: "Resonant Fork",
                  description:
                    "A gnomish instrument that can shatter unstable magic when struck.",
                  type: "trinket",
                },
              },
            ],
            nextNode: "tavern-common-room",
          },
          failure: {
            resultText:
              "His notes fall into your cider, turning the equations into sticky abstract art.",
            effects: [
              {
                type: "log",
                entry:
                  "Brindlefuss promises to email you the slides, whatever that means.",
              },
            ],
            nextNode: "tavern-common-room",
          },
        },
      },
      {
        id: "ask-favor",
        text: "Ask for help reaching the Watch barracks",
        effects: [
          {
            type: "log",
            entry:
              "The professor scribbles a recommendation note for Captain Thalia, embellished with glitter.",
          },
        ],
        toNode: "captain-briefing",
      },
      {
        id: "return-barkeep",
        text: "Thank the professor and return to Mira",
        toNode: "tavern-barkeep",
      },
    ],
  },
  {
    id: "verdyn-road",
    title: "Road to the Ember Wilds",
    summary: "The wind carries the scent of char and wildflowers.",
    body: [
      "Beyond Verdyn's gate, the Ember Wilds stretch across crimson forests and obsidian ridges. Rumors speak of creatures warped by raw magic.",
      "A rustle in the underbrush betrays movement—someone (or something) watches you.",
    ],
    background: "url(/assets/backgrounds/forest.jpg)",
    ambient: "audio/wind-forest.mp3",
    tags: ["Ember Wilds"],
    choices: [
      {
        id: "perception-check",
        text: "Scan the treeline",
        description: "Use your perception to spot danger.",
        skillCheck: {
          ability: "wisdom",
          difficultyClass: 13,
          flavor: "You narrow your eyes and let instincts guide you.",
          success: {
            resultText: "You spot a goblin scout readying an ambush.",
            effects: [
              {
                type: "log",
                entry:
                  "You anticipated the goblin ambush and took the advantage.",
              },
              {
                type: "updateFaction",
                factionId: "town-guard",
                delta: 1,
              },
            ],
            nextNode: "forest-ambush",
          },
          failure: {
            resultText: "You miss the subtle clues as the goblin charges!",
            effects: [{ type: "modifyHP", delta: -2 }],
            nextNode: "forest-ambush",
          },
        },
      },
      {
        id: "call-out",
        text: "Call out to whoever hides",
        description: "Perhaps diplomacy will win the day.",
        skillCheck: {
          ability: "charisma",
          difficultyClass: 12,
          success: {
            resultText: "Your words startle the goblin into parley.",
            effects: [
              {
                type: "log",
                entry:
                  "The goblin shares rumors of glowing crystals falling from the sky.",
              },
              {
                type: "achievement",
                achievement: {
                  id: "silver-tongue",
                  title: "Silver Tongue",
                  description: "Defused a hostile encounter with words.",
                  unlockedAt: Date.now(),
                },
              },
            ],
            nextNode: "goblin-parley",
          },
          failure: {
            resultText: "Your shout provokes the goblin to attack!",
            nextNode: "forest-ambush",
          },
        },
      },
      {
        id: "press-on",
        text: "Press onward without caution",
        combat: goblinAmbush,
      },
    ],
  },
  {
    id: "forest-ambush",
    title: "Goblin Ambush",
    summary: "Steel flashes and magic flares.",
    body: [
      "The goblin leaps with a hiss, blade arcing toward you. Battle is inevitable.",
    ],
    background:
      "linear-gradient(180deg, rgba(67,28,28,0.9), rgba(18,10,10,0.95))",
    ambient: "audio/combat-drums.mp3",
    onEnter: [{ type: "log", entry: "Combat initiated: Goblin Scout." }],
    tags: ["Ember Wilds", "Combat Encounter"],
    choices: [
      {
        id: "fight",
        text: "Enter combat stance",
        combat: goblinAmbush,
      },
      {
        id: "flee",
        text: "Retreat toward Verdyn",
        toNode: "tavern-common-room",
        effects: [
          { type: "updateFaction", factionId: "town-guard", delta: -1 },
        ],
      },
    ],
  },
  {
    id: "goblin-parley",
    title: "Unexpected Ally",
    summary: "Not all goblins serve the darkness.",
    body: [
      "The goblin introduces himself as Skritch, a scout fleeing from warped chieftains. He offers to trade knowledge for safe passage.",
    ],
    background:
      "linear-gradient(180deg, rgba(26,44,35,0.9), rgba(8,18,12,0.95))",
    tags: ["Ember Wilds", "Allies"],
    choices: [
      {
        id: "trade-info",
        text: "Trade rations for secrets",
        effects: [
          { type: "grantGold", amount: -5 },
          {
            type: "log",
            entry: "Skritch reveals a hidden path to the Ember Rift gate.",
          },
          {
            type: "updateQuest",
            questId: "ember-rift",
            status: "completed",
            summary: "Skritch guided you to a secret way into the Ember Rift.",
            progress: 1,
            completeObjectives: [
              "verdyn-arrival",
              "choose-allies",
              "secure-shard",
            ],
          },
        ],
        toNode: "ember-gate",
      },
      {
        id: "dismiss",
        text: "Refuse and continue alone",
        toNode: "verdyn-road",
      },
    ],
  },
  {
    id: "captain-briefing",
    title: "Verdyn Watch Barracks",
    summary: "Serious vows beneath banners of smoldering gold.",
    body: [
      "Captain Thalia leads you through rows of halberds and training dummies charred from recent drills. The scent of steel, sweat, and healing poultices fills the air.",
      "She unrolls a map showing the Ember Rift's tremors radiating toward Verdyn, each marked with crimson ink and the note: Pyrel Laughs Here.",
    ],
    background: "url(/assets/backgrounds/barracks.jpg)",
    ambient: "audio/guard-drill.mp3",
    tags: ["Verdyn", "Verdyn Watch"],
    choices: [
      {
        id: "swear-oath",
        text: "Swear to defend Verdyn",
        effects: [
          {
            type: "log",
            entry:
              "Thalia clasps your forearm and entrusts you with a signet of the Verdyn Watch.",
          },
          {
            type: "grantItem",
            item: {
              id: "verdyn-signet",
              name: "Verdyn Signet",
              description:
                "A ring marked with the phoenix crest of the Watch. It warms when danger nears.",
              type: "trinket",
            },
          },
        ],
        toNode: "verdyn-road",
      },
      {
        id: "strategize",
        text: "Plan tactics with Thalia",
        skillCheck: {
          ability: "wisdom",
          difficultyClass: 13,
          flavor:
            "You weigh the Watch's reports and propose a daring approach.",
          success: {
            resultText:
              "Your plan earns a rare smile from Thalia. She promises reinforcements at the Ember Gate.",
            effects: [
              {
                type: "updateFaction",
                factionId: "town-guard",
                delta: 1,
              },
              {
                type: "log",
                entry: "The Watch prepares to strike when you give the signal.",
              },
            ],
            nextNode: "verdyn-road",
          },
          failure: {
            resultText:
              "Thalia respectfully declines, suggesting you gather more intel first.",
            nextNode: "tavern-common-room",
          },
        },
      },
      {
        id: "return-tavern",
        text: "Return to the tavern common room",
        toNode: "tavern-common-room",
      },
    ],
  },
  {
    id: "market-square",
    title: "Verdyn Market Square",
    summary: "Color, commerce, and comedic chaos.",
    body: [
      "Verdyn's market square glitters under strings of crystal lanterns. Aromas of cinnamon bread and sizzling salamander skewers drift over the clang of tinkers shaping brass curios.",
      "A mime mage silently mimes a thunderstorm over a befuddled goat while children chase clockwork fireflies that occasionally sing sea shanties.",
    ],
    background: "url(/assets/backgrounds/market.jpg)",
    ambient: "audio/market-day.mp3",
    tags: ["Verdyn", "Market"],
    choices: [
      {
        id: "buy-trinket",
        text: "Purchase a curious trinket",
        effects: [
          { type: "grantGold", amount: -10 },
          {
            type: "grantItem",
            item: {
              id: "laughing-lantern",
              name: "Laughing Lantern",
              description:
                "A lantern that chuckles at awkward silences. Rumored to irritate Pyrel greatly.",
              type: "trinket",
            },
          },
        ],
        toNode: "market-square",
      },
      {
        id: "aid-courier",
        text: "Wake the exhausted courier",
        skillCheck: {
          ability: "charisma",
          difficultyClass: 11,
          success: {
            resultText:
              "You rouse the courier with gentle humor. He blurts a warning about Archon Pyrel gathering a choir of burning shades.",
            effects: [
              {
                type: "log",
                entry:
                  "The courier thrusts a dispatch into your hands addressed to the Circle of Embers.",
              },
              {
                type: "updateFaction",
                factionId: "circle",
                delta: 1,
              },
            ],
            nextNode: "tavern-common-room",
          },
          failure: {
            resultText:
              "He mumbles nonsense about singing goats and falls back asleep.",
            nextNode: "tavern-common-room",
          },
        },
      },
      {
        id: "head-out",
        text: "Head for the road beyond Verdyn",
        toNode: "verdyn-road",
      },
    ],
  },
  {
    id: "ember-gate",
    title: "Gate of Emberlight",
    summary: "Flames dance along ancient runes as the Rift calls.",
    body: [
      "An enormous gate carved from obsidian and copper bars the way. The runes glow, reacting to the Ember Shard pulsing in your pack and humming in time with a distant choral laugh.",
      "Whorls of scarlet steam paint the night sky, revealing flashes of a horned silhouette lounging upon a throne of glass. Your next choice will define the course of your legend.",
    ],
    background: "url(/assets/backgrounds/gate.jpg)",
    ambient: "audio/arcane-hum.mp3",
    tags: ["Ember Rift", "Ancient Ruins"],
    choices: [
      {
        id: "use-shard",
        text: "Channel the Ember Shard to open the gate",
        requirements: [{ type: "item", id: "ember-shard" }],
        effects: [
          {
            type: "achievement",
            achievement: {
              id: "gate-breaker",
              title: "Gatebreaker",
              description: "Opened the Ember Gate using ancient magic.",
              unlockedAt: Date.now(),
            },
          },
        ],
        toNode: "ember-rift-threshold",
      },
      {
        id: "search-runes",
        text: "Study the runes for another solution",
        skillCheck: {
          ability: "intelligence",
          difficultyClass: 14,
          success: {
            resultText: "You decipher a rune that weakens the seal.",
            effects: [
              {
                type: "log",
                entry:
                  "Your knowledge of runes revealed a hidden release sequence.",
              },
            ],
            nextNode: "ember-rift-threshold",
          },
          failure: {
            resultText: "The runes flare angrily, searing your hand.",
            effects: [{ type: "modifyHP", delta: -4 }],
            nextNode: "verdyn-road",
          },
        },
      },
      {
        id: "return",
        text: "Return to Verdyn to prepare more",
        toNode: "tavern-common-room",
      },
    ],
  },
  {
    id: "ember-rift-threshold",
    title: "Threshold of the Rift",
    summary: "The beginning of countless possibilities.",
    body: [
      "Beyond the gate, a chasm of shimmering embers pulses with life. Pathways of floating stone beckon, each leading toward unknown adventures and echoing with snippets of mischievous song.",
      "A cathedral of light hangs inverted above you. Within, a figure reclines—Archon Pyrel, the Ember Regent—plucking strings of molten glass that send ripples of power through the Rift.",
      "Your chronicle has only begun, yet the world already shifts in response to your legend.",
    ],
    background:
      "linear-gradient(180deg, rgba(62,14,46,0.95), rgba(8,6,12,0.95))",
    ambient: "audio/epic-rise.mp3",
    tags: ["Ember Rift", "Threshold"],
    choices: [
      {
        id: "enter-rift",
        text: "Step into the Ember Rift (Coming Soon)",
        description: "Future modules will continue your saga.",
        toNode: "ember-rift-threshold",
      },
      {
        id: "follow-chorus",
        text: "Follow the echoing hymn toward the sanctum",
        toNode: "ember-rift-sanctum",
      },
      {
        id: "return-verdyn",
        text: "Return to Verdyn to regroup",
        toNode: "tavern-common-room",
      },
    ],
  },
  {
    id: "ember-rift-sanctum",
    title: "Sanctum of Shattered Choirs",
    summary: "Archon Pyrel awaits with incandescent mirth.",
    body: [
      "You stride along bridges of crystallized song, each note chiming beneath your boots. Curtains of emberlight part to reveal a vast amphitheater suspended over the Rift's heart.",
      "Archon Pyrel lounges upon a throne carved from fused meteors. His grin is all invitation and threat as dozens of lesser fire spirits harmonize in unsettling laughter.",
    ],
    background:
      "linear-gradient(180deg, rgba(118,34,54,0.92), rgba(22,6,18,0.96))",
    ambient: "audio/choir-embers.mp3",
    tags: ["Ember Rift", "Archon Pyrel"],
    choices: [
      {
        id: "pledge-stand",
        text: "Pledge to end the Archon's revel",
        effects: [
          {
            type: "addQuest",
            quest: {
              id: "archon-awakening",
              title: "Shatter the Ember Regent",
              summary:
                "Confront Archon Pyrel before his choir cracks Verdyn's defenses.",
              status: "active",
              faction: "Circle of Embers",
              reward: "Alliance of Verdyn's factions and Pyrel's dimmed crown",
              location: "Ember Rift",
              recommendedLevel: 3,
              progress: 0.5,
              objectives: [
                {
                  id: "learn-true-name",
                  description:
                    "Discover the truth behind Pyrel's exile from the Circle of Embers.",
                  completed: true,
                },
                {
                  id: "break-the-chorus",
                  description:
                    "Disrupt the sanctum's choir that feeds Pyrel's power.",
                },
                {
                  id: "banish-pyrel",
                  description:
                    "Defeat or outwit Archon Pyrel within his sanctum.",
                },
              ],
            },
          },
          {
            type: "log",
            entry:
              "You proclaim your challenge. Pyrel's laughter pitches higher, thrilled by your defiance.",
          },
        ],
        toNode: "archon-confrontation",
      },
      {
        id: "banter-spirits",
        text: "Exchange banter with the cackling sprites",
        skillCheck: {
          ability: "charisma",
          difficultyClass: 14,
          flavor: "Humor might crack their harmony.",
          success: {
            resultText:
              "The sprites dissolve into giggling steam, weakening Pyrel's choir.",
            effects: [
              {
                type: "addQuest",
                quest: {
                  id: "archon-awakening",
                  title: "Shatter the Ember Regent",
                  summary:
                    "Confront Archon Pyrel before his choir cracks Verdyn's defenses.",
                  status: "active",
                  faction: "Circle of Embers",
                  reward:
                    "Alliance of Verdyn's factions and Pyrel's dimmed crown",
                  location: "Ember Rift",
                  recommendedLevel: 3,
                  progress: 0.5,
                  objectives: [
                    {
                      id: "learn-true-name",
                      description:
                        "Discover the truth behind Pyrel's exile from the Circle of Embers.",
                      completed: true,
                    },
                    {
                      id: "break-the-chorus",
                      description:
                        "Disrupt the sanctum's choir that feeds Pyrel's power.",
                    },
                    {
                      id: "banish-pyrel",
                      description:
                        "Defeat or outwit Archon Pyrel within his sanctum.",
                    },
                  ],
                },
              },
              {
                type: "log",
                entry:
                  "Your quip about overcooked marshmallows sends the choir into disarray.",
              },
            ],
            nextNode: "archon-confrontation",
          },
          failure: {
            resultText: "Your joke lands with a hiss. Pyrel's grin widens.",
            effects: [
              {
                type: "addQuest",
                quest: {
                  id: "archon-awakening",
                  title: "Shatter the Ember Regent",
                  summary:
                    "Confront Archon Pyrel before his choir cracks Verdyn's defenses.",
                  status: "active",
                  faction: "Circle of Embers",
                  reward:
                    "Alliance of Verdyn's factions and Pyrel's dimmed crown",
                  location: "Ember Rift",
                  recommendedLevel: 3,
                  progress: 0.5,
                  objectives: [
                    {
                      id: "learn-true-name",
                      description:
                        "Discover the truth behind Pyrel's exile from the Circle of Embers.",
                      completed: true,
                    },
                    {
                      id: "break-the-chorus",
                      description:
                        "Disrupt the sanctum's choir that feeds Pyrel's power.",
                    },
                    {
                      id: "banish-pyrel",
                      description:
                        "Defeat or outwit Archon Pyrel within his sanctum.",
                    },
                  ],
                },
              },
              { type: "modifyHP", delta: -2 },
            ],
            nextNode: "archon-confrontation",
          },
        },
      },
      {
        id: "withdraw",
        text: "Withdraw to the threshold",
        toNode: "ember-rift-threshold",
      },
    ],
  },
  {
    id: "archon-confrontation",
    title: "Audience with Archon Pyrel",
    summary: "Humor and heroism clash with incandescent tyranny.",
    body: [
      "Pyrel rises, flames licking along ornate pauldrons shaped like cathedral spires. He applauds slowly, each clap releasing petals of fire that spin into miniature jesters.",
      "“Mortal,” he purrs, “will you dance, debate, or duel?” The sanctum hushes, waiting to see if wit or steel shall lead.",
    ],
    background:
      "linear-gradient(180deg, rgba(152,45,36,0.95), rgba(34,12,26,0.97))",
    ambient: "audio/heartbeat-flame.mp3",
    tags: ["Ember Rift", "Archon Pyrel", "Climactic Encounter"],
    choices: [
      {
        id: "negotiate",
        text: "Attempt to negotiate Pyrel's surrender",
        skillCheck: {
          ability: "persuasion",
          difficultyClass: 16,
          flavor: "Appeal to the Archon's pride and loneliness.",
          success: {
            resultText:
              "Pyrel concedes to a temporary truce, promising to await a rematch that amuses him.",
            effects: [
              {
                type: "log",
                entry:
                  "Pyrel gifts you a smoldering scale as collateral. Verdyn wins precious time.",
              },
              {
                type: "grantItem",
                item: {
                  id: "pyrel-scale",
                  name: "Pyrel's Tempered Scale",
                  description:
                    "Warm to the touch, it hums with restrained power.",
                  type: "trinket",
                },
              },
              {
                type: "updateQuest",
                questId: "archon-awakening",
                status: "completed",
                summary: "Pyrel's pride stays his hand—for now.",
                progress: 1,
                completeObjectives: [
                  "learn-true-name",
                  "break-the-chorus",
                  "banish-pyrel",
                ],
              },
            ],
            nextNode: "ember-rift-epilogue",
          },
          failure: {
            resultText:
              "Pyrel tires of talk and snaps his fingers for the duel to begin.",
            nextNode: "archon-confrontation-fight",
          },
        },
      },
      {
        id: "duel",
        text: "Challenge Pyrel to a duel of blazing blades",
        combat: emberArchonEncounter,
      },
      {
        id: "jest",
        text: "Crack a joke about overdramatic archons",
        description: "Humor can sting sharper than steel.",
        effects: [
          {
            type: "log",
            entry: "Pyrel sputters with laughter, but the duel is inevitable.",
          },
        ],
        toNode: "archon-confrontation-fight",
      },
      {
        id: "retreat-sanctum",
        text: "Retreat to regroup",
        toNode: "ember-rift-sanctum",
      },
    ],
  },
  {
    id: "archon-confrontation-fight",
    title: "The Ember Regent's Duel",
    summary: "Steel meets searing radiance.",
    body: [
      "The sanctum erupts as Pyrel's choir belts a triumphant chord. Heat waves warp the air, and shards of stained glass hover like attentive spectators.",
    ],
    background:
      "linear-gradient(180deg, rgba(191,76,37,0.93), rgba(42,16,21,0.97))",
    ambient: "audio/combat-drums.mp3",
    tags: ["Ember Rift", "Combat Encounter"],
    choices: [
      {
        id: "face-pyrel",
        text: "Strike against Archon Pyrel",
        combat: emberArchonEncounter,
      },
      {
        id: "fall-back",
        text: "Fall back to the threshold",
        toNode: "ember-rift-threshold",
        effects: [
          {
            type: "log",
            entry:
              "You withdraw as Pyrel's laughter reverberates through the Rift.",
          },
        ],
      },
    ],
  },
  {
    id: "ember-rift-epilogue",
    title: "Epilogue: Emberlight Reprieve",
    summary: "Verdyn breathes easier—for now.",
    body: [
      "The Rift's glow softens to a warm aurora as Verdyn's bells ring in relief. Refugees return to the market, and Mira promises a celebratory round of Sizzlebrew on the house.",
      'Captain Thalia organizes rebuilding efforts while Professor Brindlefuss drafts a comedic opera titled "Archon on Ice." Even the goblin Skritch sends a basket of slightly singed muffins.',
    ],
    background:
      "linear-gradient(180deg, rgba(54,24,54,0.95), rgba(14,6,18,0.96))",
    ambient: "audio/victory-soft.mp3",
    tags: ["Verdyn", "Resolution"],
    choices: [
      {
        id: "return-hero",
        text: "Return to Verdyn in triumph",
        toNode: "tavern-common-room",
      },
      {
        id: "linger-rift",
        text: "Linger at the Rift to contemplate future journeys",
        toNode: "ember-rift-threshold",
      },
    ],
  },
];

const nodesById = new Map(storyNodes.map((node) => [node.id, node] as const));

export function getNodeById(id: string): StoryNode | null {
  return nodesById.get(id) ?? null;
}
