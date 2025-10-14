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
        id: "aid-caravan",
        text: "Answer the call of a stranded caravan",
        description:
          "The jangle of harness bells drifts from a copse where voices plead for help.",
        effects: [
          {
            type: "log",
            entry:
              "You veer toward the flicker of campfires, where Verdyn-bound travelers flag you down.",
          },
        ],
        toNode: "caravan-encampment",
      },
      {
        id: "scale-ridge",
        text: "Climb the ridge overlooking the Ember Rift",
        description:
          "Scholars and sentries maintain a vigil upon a basalt rise above the road.",
        effects: [
          {
            type: "log",
            entry:
              "You tread a switchback trail toward the ridge, the dawn breeze rich with ember-scent.",
          },
        ],
        toNode: "ridge-overlook",
      },
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
    id: "caravan-encampment",
    title: "Starlit Caravan Encampment",
    summary: "Travelers huddle around braziers while the wilds hiss beyond the light.",
    body: [
      "Canvas wagons form a crescent around a crackling bonfire. Sparks drift upward to mingle with the constellations, while muzzled steeds stamp and snort at the scent of distant predators.",
      "Seer Ysoria arranges tarot constellations across a silk cloth, Guard Jaryn heaves at a broken axle, and a lavender-haired minstrel tunes a viol strung with emberglass.",
    ],
    background:
      "linear-gradient(180deg, rgba(34,24,44,0.92), rgba(10,8,18,0.96))",
    ambient: "audio/campfire-night.mp3",
    tags: ["Verdyn Outskirts", "Travelers"],
    choices: [
      {
        id: "speak-ysoria",
        text: "Consult Seer Ysoria's star cards",
        toNode: "seer-ysoria",
        effects: [
          {
            type: "log",
            entry:
              "Ysoria's bracelets chime as she beckons you closer to witness constellations reshaping around your fate.",
          },
        ],
      },
      {
        id: "help-jaryn",
        text: "Help Guard Jaryn lift the wagon axle",
        skillCheck: {
          ability: "strength",
          skill: "athletics",
          difficultyClass: 12,
          flavor: "You brace beside the guard, muscles straining against stubborn wood.",
          success: {
            resultText:
              "Together you heave the axle into place, and the caravan cheers your swift aid.",
            effects: [
              {
                type: "updateFaction",
                factionId: "town-guard",
                delta: 1,
              },
              {
                type: "log",
                entry:
                  "Jaryn presses a polished waypoint token into your hand for safe travel through Verdyn's checkpoints.",
              },
              {
                type: "grantItem",
                item: {
                  id: "waypoint-token",
                  name: "Verdyn Waypoint Token",
                  description:
                    "A stamped bronze charm that convinces patrols you are an ally of the caravans.",
                  type: "trinket",
                },
              },
            ],
            nextNode: "verdyn-road",
          },
          failure: {
            resultText:
              "The axle slips, splashing pitch across your boots as the guard steadies the load without you.",
            effects: [
              {
                type: "modifyHP",
                delta: -1,
              },
              {
                type: "log",
                entry:
                  "Jaryn thanks you for trying and suggests visiting Captain Thalia for proper drills.",
              },
            ],
            nextNode: "tavern-common-room",
          },
        },
      },
      {
        id: "listen-minstrel",
        text: "Join the lavender-haired minstrel by the fire",
        toNode: "caravan-minstrel",
      },
      {
        id: "depart-caravan",
        text: "Bid the travelers farewell and return to the road",
        toNode: "prologue-awakening",
      },
    ],
  },
  {
    id: "seer-ysoria",
    title: "Ysoria's Starspread",
    summary: "Constellations swirl as the seer glimpses possible futures.",
    body: [
      "Ysoria scatters crystal tokens across a velvet cloth. Each piece blooms with miniature nebulae that reflect your silhouette in cosmic hues.",
      "Her eyes glaze silver as she whispers of shadowed choirs, laughing archons, and allies waiting in unexpected tavern corners.",
    ],
    background:
      "linear-gradient(180deg, rgba(48,30,62,0.94), rgba(16,8,28,0.97))",
    ambient: "audio/whispers.mp3",
    tags: ["Mysticism", "Allies"],
    choices: [
      {
        id: "seek-vision",
        text: "Seek a vision of the Ember Rift",
        skillCheck: {
          ability: "wisdom",
          skill: "insight",
          difficultyClass: 13,
          flavor: "You steady your breathing as starlight floods the cards.",
          success: {
            resultText:
              "The vision reveals a secret bridge of song leading directly to Pyrel's sanctum.",
            effects: [
              {
                type: "log",
                entry:
                  "Ysoria sketches the bridge's sigil onto your palm, the ink warm as candle flame.",
              },
            ],
            nextNode: "ember-rift-sanctum",
          },
          failure: {
            resultText:
              "The cards scatter, showing only a whirl of laughing embers that sting your thoughts.",
            effects: [
              {
                type: "modifyHP",
                delta: -2,
              },
            ],
            nextNode: "caravan-encampment",
          },
        },
      },
      {
        id: "purchase-map",
        text: "Purchase a hand-drawn map to Verdyn",
        effects: [
          { type: "grantGold", amount: -3 },
          {
            type: "log",
            entry:
              "Ysoria's map highlights hidden alleys and a discreet entrance to the Black Guild's back room.",
          },
        ],
        toNode: "tavern-common-room",
      },
      {
        id: "return-caravan",
        text: "Thank Ysoria and mingle with the caravan",
        toNode: "caravan-encampment",
      },
    ],
  },
  {
    id: "caravan-minstrel",
    title: "Ballads Beside the Emberfire",
    summary: "Songs weave camaraderie from weary travelers.",
    body: [
      "The minstrel's viol hums with chromatic warmth as she invites you to share the melody. Emberlight catches on her strings, scattering motes that dance like sprites.",
      "Merchants clap in rhythm, a young tinkerer taps a kettle drum, and even the anxious steeds settle as the song conjures memories of safer days.",
    ],
    background:
      "linear-gradient(180deg, rgba(56,22,40,0.92), rgba(18,8,24,0.95))",
    ambient: "audio/lute-soft.mp3",
    tags: ["Verdyn Outskirts", "Social", "Safe Rest", "Camp"],
    choices: [
      {
        id: "share-story",
        text: "Share a tale from your travels",
        effects: [
          {
            type: "log",
            entry:
              "Your tale of outwitting frost sprites earns hearty applause and new admirers.",
          },
          {
            type: "updateFaction",
            factionId: "circle",
            delta: 1,
          },
        ],
        toNode: "caravan-encampment",
      },
      {
        id: "learn-ballad",
        text: "Learn the Minstrel's Ember Ballad",
        effects: [
          {
            type: "grantItem",
            item: {
              id: "ember-ballad",
              name: "Ember Ballad Verses",
              description:
                "Lyrics that inspire allies, granting advantage during parley with fiery spirits.",
              type: "trinket",
            },
          },
        ],
        toNode: "tavern-common-room",
      },
      {
        id: "escort-caravan",
        text: "Escort the caravan toward Verdyn",
        effects: [
          {
            type: "log",
            entry:
              "Travelers fall in behind you, trusting your lead toward the city's lantern glow.",
          },
        ],
        toNode: "verdyn-road",
      },
      {
        id: "rest-by-fire",
        text: "Rest by the fire and regain composure",
        effects: [
          {
            type: "shortRest",
            hpRecovery: { kind: "flat", amount: 4 },
            downtimeCost: 1,
            narrative: "You share rations and mend gear beside the watchful caravan lanterns.",
          },
          {
            type: "log",
            entry: "Spent an hour trading road tales with caravan guards while patching wounds.",
          },
        ],
        toNode: "caravan-encampment",
      },
    ],
  },
  {
    id: "ridge-overlook",
    title: "Ridge of Emberwatch",
    summary: "Scholars and sentries study the Rift from a windswept vantage.",
    body: [
      "A basalt platform juts over the valley, strung with astrolabes and prism lenses that refract Riftlight into motes of ruby and teal.",
      "Archivist Izel charts constellations in a floating ledger while Sentinel Corin surveys the horizon, his spear planted beside a brazier of everburning coals.",
    ],
    background:
      "linear-gradient(180deg, rgba(28,32,56,0.9), rgba(8,10,24,0.95))",
    ambient: "audio/wind-high.mp3",
    tags: ["Verdyn Outskirts", "Observation"],
    choices: [
      {
        id: "speak-izel",
        text: "Review star charts with Archivist Izel",
        toNode: "ridge-archivist",
      },
      {
        id: "spar-corin",
        text: "Trade techniques with Sentinel Corin",
        toNode: "ridge-sentinel",
      },
      {
        id: "survey-rift",
        text: "Survey the Rift through a prism lens",
        skillCheck: {
          ability: "intelligence",
          skill: "arcana",
          difficultyClass: 13,
          flavor: "You align crystal rings to focus the Ember Rift's glow.",
          success: {
            resultText:
              "The lens reveals a side passage pulsing with patient laughter and golden smoke.",
            effects: [
              {
                type: "log",
                entry:
                  "Izel records your observations, promising to forward them to the Circle of Embers.",
              },
              {
                type: "updateFaction",
                factionId: "circle",
                delta: 1,
              },
            ],
            nextNode: "ember-gate",
          },
          failure: {
            resultText:
              "The intense light leaves your vision swimming with burning afterimages.",
            effects: [{ type: "modifyHP", delta: -1 }],
            nextNode: "ridge-overlook",
          },
        },
      },
      {
        id: "descend-road",
        text: "Descend back to the Verdyn road",
        toNode: "prologue-awakening",
      },
    ],
  },
  {
    id: "ridge-archivist",
    title: "Archivist Izel's Luminous Ledger",
    summary: "Arcane charts reveal cycles of laughter and flame.",
    body: [
      "Izel's ledger floats in midair, pages turning themselves with gusts of glittering dust. Each page maps the Rift's pulses to the moods of Verdyn's populace.",
      "She peers over moon-shaped spectacles, eager to annotate your every word in ink that glows like dawn.",
    ],
    background:
      "linear-gradient(180deg, rgba(36,28,68,0.92), rgba(14,10,30,0.96))",
    ambient: "audio/quill-scratch.mp3",
    tags: ["Scholarship", "Allies"],
    choices: [
      {
        id: "provide-testimony",
        text: "Describe the goblin activity on the road",
        effects: [
          {
            type: "log",
            entry:
              "Izel inks a report for Captain Thalia, citing your tactical insights.",
          },
          {
            type: "updateFaction",
            factionId: "town-guard",
            delta: 1,
          },
        ],
        toNode: "tavern-common-room",
      },
      {
        id: "request-chart",
        text: "Request a chart of Ember starfalls",
        effects: [
          {
            type: "grantItem",
            item: {
              id: "starfall-chart",
              name: "Starfall Chart",
              description:
                "A vellum chart marking predicted Ember starfalls and safe observation points.",
              type: "trinket",
            },
          },
        ],
        toNode: "verdyn-road",
      },
      {
        id: "return-ridge",
        text: "Return to the ridge to consult others",
        toNode: "ridge-overlook",
      },
    ],
  },
  {
    id: "ridge-sentinel",
    title: "Sentinel Corin's Vigil",
    summary: "A veteran of Verdyn studies every shifting shadow.",
    body: [
      "Corin's armor bears scorch marks that trace a lifetime of battles. He adjusts his grip on a spear wound with phoenix feathers while offering you a soldier's nod.",
      "Below, the Ember Wilds rustle. Corin invites you to practice footwork upon a chalk circle etched with runes that train reflexes against fiery foes.",
    ],
    background:
      "linear-gradient(180deg, rgba(44,24,28,0.9), rgba(20,12,18,0.95))",
    ambient: "audio/guard-drill.mp3",
    tags: ["Verdyn Watch", "Training"],
    choices: [
      {
        id: "spar-training",
        text: "Spar with Corin to hone your reflexes",
        skillCheck: {
          ability: "dexterity",
          skill: "acrobatics",
          difficultyClass: 13,
          flavor: "You pivot across the chalked sigils, matching Corin's disciplined strikes.",
          success: {
            resultText:
              "Corin applauds your agility and teaches a feint that confounds ember-touched foes.",
            effects: [
              {
                type: "log",
                entry:
                  "You master the Phoenix Step, a maneuver that dazzles opponents during duels.",
              },
            ],
            nextNode: "verdyn-road",
          },
          failure: {
            resultText:
              "A misstep sends you tumbling into the brazier's harmless illusionary flame.",
            effects: [{ type: "modifyHP", delta: -2 }],
            nextNode: "ridge-overlook",
          },
        },
      },
      {
        id: "exchange-news",
        text: "Exchange news of Verdyn's factions",
        effects: [
          {
            type: "log",
            entry:
              "Corin shares word that the Circle of Embers seeks brave envoys willing to walk the Rift.",
          },
          {
            type: "updateFaction",
            factionId: "circle",
            delta: 1,
          },
        ],
        toNode: "tavern-common-room",
      },
      {
        id: "return-overlook",
        text: "Return to the ridge's central platform",
        toNode: "ridge-overlook",
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
        id: "bard-stage",
        text: "Listen to Liora the traveling bard",
        description: "Her songs snag secrets from every corner of Verdyn.",
        effects: [
          {
            type: "log",
            entry:
              "Liora tips her wide-brimmed hat and beckons you closer to hear verses about the Ember Rift.",
          },
        ],
        toNode: "tavern-bard-stage",
      },
      {
        id: "dice-den",
        text: "Join the dice game near the hearth",
        description: "Gamblers gossip louder than any town crier.",
        effects: [
          {
            type: "log",
            entry:
              "A ring of adventurers makes space, their dice carved from dragon teeth and meteoric glass.",
          },
        ],
        toNode: "tavern-dice-den",
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
    id: "tavern-bard-stage",
    title: "Liora's Ember Stage",
    summary: "Ballads, illusions, and secrets entwine upon a miniature theater.",
    body: [
      "Liora stands atop an enchanted crate that sprouts swirling ribbons of light with every chord she strikes. Holo-phantoms reenact her lyrics, dancing between tables.",
      "A clockwork stagehand oils the gears of a mechanical drum, and a trio of starstruck patrons harmonizes in shy whispers.",
    ],
    background:
      "linear-gradient(180deg, rgba(68,28,56,0.92), rgba(24,10,26,0.96))",
    ambient: "audio/tavern-strings.mp3",
    tags: ["Verdyn", "Performance"],
    choices: [
      {
        id: "request-ballad",
        text: "Request a ballad about the Ember Rift",
        effects: [
          {
            type: "log",
            entry:
              "Liora serenades the room with verses foretelling Pyrel's downfall at a hero's punchline.",
          },
        ],
        toNode: "tavern-common-room",
      },
      {
        id: "improvise-verse",
        text: "Improvise a verse alongside Liora",
        skillCheck: {
          ability: "charisma",
          skill: "persuasion",
          difficultyClass: 13,
          flavor: "You match Liora's rhythm, weaving your legend into the melody.",
          success: {
            resultText:
              "Your duet earns a standing ovation and a chorus of allies pledging future aid.",
            effects: [
              {
                type: "updateFaction",
                factionId: "circle",
                delta: 1,
              },
              {
                type: "grantItem",
                item: {
                  id: "melody-charm",
                  name: "Melody Charm",
                  description:
                    "A charm braided from harp strings that bolsters morale during tense negotiations.",
                  type: "trinket",
                },
              },
            ],
            nextNode: "tavern-bard-stage",
          },
          failure: {
            resultText:
              "Your voice cracks, but Liora covers with a flourish and promises to coach you later.",
            effects: [
              {
                type: "log",
                entry:
                  "The audience laughs good-naturedly, and Liora slips you a schedule of future performances.",
              },
            ],
            nextNode: "tavern-bard-stage",
          },
        },
      },
      {
        id: "speak-stagehand",
        text: "Confer with the clockwork stagehand",
        toNode: "tavern-stagehand",
      },
      {
        id: "follow-bard",
        text: "Follow Liora to her backstage alcove",
        toNode: "bard-backstage",
      },
      {
        id: "return-common-room",
        text: "Return to the common room bustle",
        toNode: "tavern-common-room",
      },
    ],
  },
  {
    id: "tavern-stagehand",
    title: "Clockwork Stagehand's Workshop",
    summary: "Gears, glitter, and gossip clatter behind the curtains.",
    body: [
      "The brass automaton, nicknamed Whirr, polishes cymbals while humming through a whistle vent. Shelves overflow with props: phoenix-feather boas, mirror masks, and rune-lit confetti bombs.",
      "Whirr's ocular lenses rotate toward you as it offers assistance in a voice like chimes tumbling down stairs.",
    ],
    background:
      "linear-gradient(180deg, rgba(52,28,44,0.9), rgba(18,10,22,0.95))",
    ambient: "audio/clockwork-soft.mp3",
    tags: ["Verdyn", "Crafting"],
    choices: [
      {
        id: "borrow-prop",
        text: "Borrow an illusion prop for later theatrics",
        effects: [
          {
            type: "grantItem",
            item: {
              id: "confetti-bomb",
              name: "Runic Confetti Bomb",
              description:
                "A palm-sized device that bursts into dazzling light, imposing disadvantage on dour audiences.",
              type: "trinket",
            },
          },
        ],
        toNode: "tavern-bard-stage",
      },
      {
        id: "tune-whirr",
        text: "Assist Whirr with a tune-up",
        skillCheck: {
          ability: "intelligence",
          skill: "arcana",
          difficultyClass: 12,
          flavor: "You adjust miniature gears with jeweler precision.",
          success: {
            resultText:
              "Whirr's eyes blaze sapphire as its gratitude subroutine prints a gilded invitation to the Circle of Embers archive.",
            effects: [
              {
                type: "log",
                entry:
                  "You receive an invitation granting after-hours access to the Circle's music vault.",
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
              "A spring sproings free and nicks your finger before Whirr gently shoos you away.",
            effects: [{ type: "modifyHP", delta: -1 }],
            nextNode: "tavern-bard-stage",
          },
        },
      },
      {
        id: "ask-gossip",
        text: "Ask Whirr for backstage gossip",
        effects: [
          {
            type: "log",
            entry:
              "Whirr divulges that a playwright from the Black Guild is recruiting heroes for immersive productions.",
          },
        ],
        toNode: "guild-offer",
      },
      {
        id: "back-to-stage",
        text: "Slip back onto the stage",
        toNode: "tavern-bard-stage",
      },
    ],
  },
  {
    id: "bard-backstage",
    title: "Liora's Backstage Alcove",
    summary: "Maps, lyric sheets, and secret correspondences crowd a private nook.",
    body: [
      "Velvet curtains part to reveal a cozy alcove. Strings of paper lanterns illuminate stacks of letters from admirers and informants alike.",
      "Liora props her boot on a trunk filled with costumes, grinning as she flips through coded notes about faction rivalries.",
    ],
    background:
      "linear-gradient(180deg, rgba(70,30,52,0.92), rgba(26,12,32,0.96))",
    ambient: "audio/whispers.mp3",
    tags: ["Verdyn", "Secrets"],
    choices: [
      {
        id: "trade-rumors",
        text: "Trade rumors about Verdyn's factions",
        effects: [
          {
            type: "updateFaction",
            factionId: "black-guild",
            delta: 1,
          },
          {
            type: "log",
            entry:
              "Liora passes you a coded verse revealing a hidden entrance to the Guild's vault.",
          },
        ],
        toNode: "guild-offer",
      },
      {
        id: "study-lyrics",
        text: "Study her lyric-encoded battle plans",
        skillCheck: {
          ability: "intelligence",
          skill: "arcana",
          difficultyClass: 14,
          success: {
            resultText:
              "You decode a stanza mapping supply routes for the Verdyn Watch.",
            effects: [
              {
                type: "updateFaction",
                factionId: "town-guard",
                delta: 1,
              },
            ],
            nextNode: "captain-briefing",
          },
          failure: {
            resultText:
              "The riddles loop back on themselves, leaving you dizzy with poetic paradoxes.",
            effects: [
              {
                type: "log",
                entry:
                  "Liora laughs and suggests visiting Professor Brindlefuss for a crash course in lyrical logic.",
              },
            ],
            nextNode: "professor-brindlefuss",
          },
        },
      },
      {
        id: "return-stage",
        text: "Return to enjoy the performance",
        toNode: "tavern-bard-stage",
      },
    ],
  },
  {
    id: "tavern-dice-den",
    title: "Hearthside Dice Den",
    summary: "Risk, rumor, and raucous laughter crash like waves.",
    body: [
      "A circle of adventurers cups rune-etched dice in calloused hands. The table is scarred from past knife games and gleams with spilled cider.",
      "Croupier Sera watches from behind mirrored goggles, flanked by a hulking giantkin mercenary and a sly halfling accountant tallying debts.",
    ],
    background:
      "linear-gradient(180deg, rgba(58,30,24,0.92), rgba(18,10,12,0.95))",
    ambient: "audio/tavern-chatter.mp3",
    tags: ["Verdyn", "Games"],
    choices: [
      {
        id: "roll-high",
        text: "Roll the Ember Dice",
        skillCheck: {
          ability: "dexterity",
          skill: "acrobatics",
          difficultyClass: 12,
          flavor: "You flick the dice with practiced flair, letting fate tumble.",
          success: {
            resultText:
              "The dice blaze with emberlight, rewarding you with a clinking purse and admiring glances.",
            effects: [
              { type: "grantGold", amount: 12 },
              {
                type: "log",
                entry:
                  "Sera invites you to an exclusive game hosted beneath the Black Guild's amphitheater.",
              },
            ],
            nextNode: "tavern-dice-den",
          },
          failure: {
            resultText:
              "Your roll scatters dice into a brazier, earning a chorus of sympathetic groans.",
            effects: [
              { type: "grantGold", amount: -5 },
              {
                type: "log",
                entry:
                  "The mercenary thumps your shoulder, promising a rematch if you bring better luck.",
              },
            ],
            nextNode: "tavern-dice-den",
          },
        },
      },
      {
        id: "listen-gossip",
        text: "Listen to the gamblers' gossip",
        effects: [
          {
            type: "log",
            entry:
              "You learn that Professor Brindlefuss secretly bankrolls expeditions into the Ember Rift.",
          },
        ],
        toNode: "professor-brindlefuss",
      },
      {
        id: "challenge-sera",
        text: "Challenge Croupier Sera to a strategy duel",
        toNode: "dice-guild-agent",
      },
      {
        id: "step-away",
        text: "Step away before fortune changes",
        toNode: "tavern-common-room",
      },
    ],
  },
  {
    id: "dice-guild-agent",
    title: "Croupier Sera's Secret Booth",
    summary: "Beneath the dice table, bargains glitter sharper than blades.",
    body: [
      "Sera leads you to a velvet-draped booth lit by shimmering cards that float in midair. A hidden door behind her opens briefly, revealing ledgers embossed with the Black Guild's sigil.",
      "She steeples her fingers, assessing whether you are bold enough to accept clandestine assignments.",
    ],
    background:
      "linear-gradient(180deg, rgba(48,24,32,0.9), rgba(16,8,18,0.95))",
    ambient: "audio/whispers.mp3",
    tags: ["Verdyn", "Black Guild"],
    choices: [
      {
        id: "accept-side-job",
        text: "Accept a Black Guild side job",
        effects: [
          {
            type: "addQuest",
            quest: {
              id: "sera-ledger",
              title: "Ledger of Laughing Flames",
              summary:
                "Infiltrate a rival gambling den to copy Pyrel-aligned ledgers.",
              status: "active",
              faction: "Black Guild",
              reward: "Ciphered secrets and a share of winnings",
              location: "Verdyn Undercity",
              recommendedLevel: 2,
              progress: 0.2,
              objectives: [
                {
                  id: "survey-den",
                  description: "Scout the rival den hidden within Verdyn's aqueducts.",
                },
                {
                  id: "copy-ledger",
                  description: "Copy the ledger without alerting the emberbound pit boss.",
                },
                {
                  id: "deliver-notes",
                  description: "Return the copied ledger to Sera in the tavern booth.",
                  optional: true,
                },
              ],
            },
          },
        ],
        toNode: "guild-offer",
      },
      {
        id: "negotiate-stakes",
        text: "Negotiate better stakes",
        skillCheck: {
          ability: "charisma",
          skill: "persuasion",
          difficultyClass: 14,
          success: {
            resultText:
              "Sera agrees to double the payout if you succeed, sliding a ring of weighted dice into your palm.",
            effects: [
              {
                type: "grantItem",
                item: {
                  id: "weighted-dice",
                  name: "Weighted Ember Dice",
                  description:
                    "Slightly enchanted dice that tilt fortune when thrown with confidence.",
                  type: "trinket",
                },
              },
            ],
            nextNode: "tavern-dice-den",
          },
          failure: {
            resultText:
              "Sera chuckles, reminding you that overplaying one's hand invites Pyrel's attention.",
            nextNode: "tavern-dice-den",
          },
        },
      },
      {
        id: "decline-job",
        text: "Decline and return to the dice circle",
        toNode: "tavern-dice-den",
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
          skill: "arcana",
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
          skill: "perception",
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
          skill: "persuasion",
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
      {
        id: "answer-whistle",
        text: "Answer a ranger's whistle from the glade",
        toNode: "verdyn-druid",
      },
      {
        id: "inspect-crater",
        text: "Inspect a fresh ember crater",
        toNode: "road-crater",
      },
      {
        id: "seek-shelter",
        text: "Search for a warded campsite",
        toNode: "ember-road-camp",
      },
    ],
  },
  {
    id: "ember-road-camp",
    title: "Wardens' Campsite",
    summary: "Rune-scribed stones promise a brief respite from the Ember winds.",
    body: [
      "A shallow hollow holds a ring of Verdyn wardstones, their sigils flickering like coals beneath a dusting of ash.",
      "Discarded ration tins and patched bedrolls whisper of scouts who once held this ground against the wilds.",
    ],
    background: "linear-gradient(180deg, rgba(30,24,44,0.92), rgba(12,10,24,0.94))",
    ambient: "audio/forest-soft.mp3",
    tags: ["Ember Wilds", "Camp", "Safe Rest", "Shelter"],
    choices: [
      {
        id: "camp-long-rest",
        text: "Bed down within the ward circle",
        skillCheck: {
          ability: "wisdom",
          skill: "survival",
          difficultyClass: 13,
          flavor: "You adjust the sigils and scatter salt to seal the circle.",
          success: {
            resultText: "The wards settle into a steady pulse that lulls you into dreamless sleep.",
            effects: [
              {
                type: "longRest",
                downtimeCost: 8,
                narrative: "Two days of rations and lamp oil keep the wardstones steady through the night.",
              },
              {
                type: "log",
                entry: "Long rest secured beneath Verdyn wardstones, supplies carefully rationed.",
              },
            ],
            nextNode: "verdyn-road",
          },
          failure: {
            resultText: "A flare of Ember motes slips through a gap you missed.",
            nextNode: "ember-road-ambush",
          },
        },
      },
      {
        id: "camp-short-rest",
        text: "Doze briefly beside the embers",
        effects: [
          {
            type: "shortRest",
            hpRecovery: { kind: "percentage", percentage: 35, minimum: 4 },
            downtimeCost: 1,
            narrative: "You sip watered wine and tighten straps before breaking camp.",
          },
          {
            type: "log",
            entry: "Short rest taken at the wardens' campsite.",
          },
        ],
        toNode: "verdyn-road",
      },
      {
        id: "camp-risky",
        text: "Sleep outside the wards to save supplies",
        effects: [
          {
            type: "log",
            entry: "You spurn the wardstones and sleep under open stars, trusting luck over sigils.",
          },
        ],
        toNode: "ember-road-ambush",
      },
      {
        id: "camp-leave",
        text: "Return to the road without resting",
        toNode: "verdyn-road",
      },
    ],
  },
  {
    id: "ember-road-ambush",
    title: "Ember-Woken Ambush",
    summary: "Rest shatters beneath shrieking motes and prowling scavengers.",
    body: [
      "Ember motes ignite your bedroll as goblin silhouettes dance along the ridgeline.",
      "An ember-wolf's howl scatters your supplies, forcing you to grab what you can and run.",
    ],
    background: "linear-gradient(180deg, rgba(56,18,26,0.92), rgba(16,6,14,0.94))",
    ambient: "audio/wind-forest.mp3",
    tags: ["Ember Wilds"],
    onEnter: [
      {
        type: "shortRest",
        hpRecovery: { kind: "flat", amount: 0 },
        downtimeCost: 1,
        interrupted: true,
        narrative: "Ember motes drive you from your bedroll before any healing can take hold.",
      },
      { type: "modifyHP", delta: -3 },
      {
        type: "log",
        entry: "Ambushed while resting outside the wardstones—scattered supplies and singed gear.",
      },
    ],
    choices: [
      {
        id: "ambush-fight",
        text: "Rally and drive them away",
        toNode: "forest-ambush",
      },
      {
        id: "ambush-retreat",
        text: "Retreat to the road and regroup",
        toNode: "verdyn-road",
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
    id: "verdyn-druid",
    title: "Glade of Emberbloom",
    summary: "A druid tends the wilds that buffer Verdyn from the Rift.",
    body: [
      "Moonlight filters through crimson leaves onto a mossy clearing where Druid Lys kneels beside a ring of emberbloom flowers.",
      "Wisps of luminescent pollen drift between you, forming temporary sigils that echo the heartbeat of the forest.",
    ],
    background:
      "linear-gradient(180deg, rgba(24,48,34,0.92), rgba(10,20,16,0.95))",
    ambient: "audio/forest-soft.mp3",
    tags: ["Ember Wilds", "Allies"],
    choices: [
      {
        id: "share-herbs",
        text: "Share herb-lore with Druid Lys",
        effects: [
          {
            type: "log",
            entry:
              "Together you blend a salve that protects skin from Pyrel's radiant burns.",
          },
          {
            type: "grantItem",
            item: {
              id: "ember-salve",
              name: "Ember Ward Salve",
              description:
                "A fragrant ointment that reduces fire damage from environmental hazards.",
              type: "trinket",
            },
          },
        ],
        toNode: "verdyn-road",
      },
      {
        id: "ask-goblins",
        text: "Ask about goblin movements",
        effects: [
          {
            type: "log",
            entry:
              "Lys reveals a neutral goblin camp seeking safe passage away from Pyrel's influence.",
          },
        ],
        toNode: "goblin-parley",
      },
      {
        id: "bless-weapon",
        text: "Request a blessing upon your weapon",
        skillCheck: {
          ability: "wisdom",
          skill: "survival",
          difficultyClass: 12,
          flavor: "You hold your weapon steady as Lys chants over emberbloom petals.",
          success: {
            resultText:
              "The weapon shimmers with verdant light, ready to cut through Pyrel's illusions.",
            effects: [
              {
                type: "log",
                entry:
                  "Lys' blessing grants you favor among the Circle's nature wardens.",
              },
              {
                type: "updateFaction",
                factionId: "circle",
                delta: 1,
              },
            ],
            nextNode: "verdyn-road",
          },
          failure: {
            resultText:
              "The ritual fizzles, and Lys gently advises patience before trying again.",
            nextNode: "verdyn-druid",
          },
        },
      },
      {
        id: "return-road-druid",
        text: "Thank Lys and return to the road",
        toNode: "verdyn-road",
      },
    ],
  },
  {
    id: "road-crater",
    title: "Fresh Ember Crater",
    summary: "Residual magic crackles where a shard recently fell.",
    body: [
      "A smoking crater pulses with molten hues, ringed by charred wildflowers already sprouting new shoots of luminescent growth.",
      "Crackling motes orbit the impact site, humming with a frequency that resonates in your bones.",
    ],
    background:
      "linear-gradient(180deg, rgba(48,18,18,0.92), rgba(16,6,10,0.95))",
    ambient: "audio/arcane-hum.mp3",
    tags: ["Ember Wilds", "Mystery"],
    choices: [
      {
        id: "harvest-shard",
        text: "Harvest a cooling ember shard",
        effects: [
          {
            type: "grantItem",
            item: {
              id: "fresh-ember",
              name: "Fresh Ember Fragment",
              description:
                "A still-warm shard thrumming with unstable potential.",
              type: "trinket",
            },
          },
        ],
        toNode: "ember-gate",
      },
      {
        id: "stabilize-field",
        text: "Stabilize the magic with improvised wards",
        skillCheck: {
          ability: "intelligence",
          skill: "arcana",
          difficultyClass: 13,
          flavor: "You trace counter-runes to redirect the volatile current.",
          success: {
            resultText:
              "The motes settle into a gentle glow, revealing footprints leading toward Verdyn.",
            effects: [
              {
                type: "log",
                entry:
                  "You discover evidence of a courier who may have witnessed the fall, pointing back to the city.",
              },
            ],
            nextNode: "market-square",
          },
          failure: {
            resultText:
              "The wards misalign, jolting you with a harmless yet startling spark.",
            effects: [{ type: "modifyHP", delta: -2 }],
            nextNode: "road-crater",
          },
        },
      },
      {
        id: "meditate-resonance",
        text: "Meditate on the crater's resonance",
        effects: [
          {
            type: "log",
            entry:
              "Visions swirl of Archon Pyrel seeding laughter into falling stars, daring Verdyn to respond.",
          },
        ],
        toNode: "ember-rift-threshold",
      },
      {
        id: "leave-crater",
        text: "Leave the crater undisturbed",
        toNode: "verdyn-road",
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
          skill: "insight",
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
          skill: "persuasion",
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
      {
        id: "visit-artificer",
        text: "Visit the brass artificer's stall",
        effects: [
          {
            type: "log",
            entry:
              "Sparks dance as the artificer unveils clockwork curiosities designed for brave explorers.",
          },
        ],
        toNode: "market-artificer",
      },
      {
        id: "mime-duet",
        text: "Mimic the mime mage's silent storm",
        toNode: "market-mime",
      },
      {
        id: "menagerie-call",
        text: "Answer the beckoning of the traveling menagerie",
        toNode: "market-menagerie",
      },
    ],
  },
  {
    id: "market-artificer",
    title: "Brasswright Selka's Forge Stall",
    summary: "Gears whir while inventions spark with experimental charm.",
    body: [
      "Selka, a dwarven brasswright with soot-smudged freckles, adjusts magnifying goggles as she welds together miniature thunder cannons.",
      "Cables snake across the stall, powering devices that chirp, glow, and occasionally sprout wings before Selka tugs them back with a laugh.",
    ],
    background:
      "linear-gradient(180deg, rgba(68,44,24,0.92), rgba(22,14,10,0.95))",
    ambient: "audio/forge-soft.mp3",
    tags: ["Verdyn", "Crafting"],
    choices: [
      {
        id: "inspect-gadget",
        text: "Inspect the Ember Pulse gauntlet",
        effects: [
          {
            type: "grantItem",
            item: {
              id: "ember-pulse",
              name: "Ember Pulse Gauntlet",
              description:
                "A gauntlet that stores a charge of Riftlight, stunning foes when released.",
              type: "trinket",
            },
          },
        ],
        toNode: "market-square",
      },
      {
        id: "assist-selka",
        text: "Assist Selka with calibrating a steam sprite",
        skillCheck: {
          ability: "intelligence",
          skill: "arcana",
          difficultyClass: 14,
          flavor: "You adjust brass valves while the sprite giggles in puffed steam.",
          success: {
            resultText:
              "The sprite stabilizes and rewards you with a burst of invigorating warmth.",
            effects: [
              { type: "modifyHP", delta: 4 },
              {
                type: "log",
                entry:
                  "Selka entrusts you with a referral to the Verdyn Watch for specialized gear fitting.",
              },
            ],
            nextNode: "captain-briefing",
          },
          failure: {
            resultText:
              "The sprite sputters soot onto your sleeves before Selka deftly resets the gauges.",
            effects: [{ type: "modifyHP", delta: -1 }],
            nextNode: "market-artificer",
          },
        },
      },
      {
        id: "speak-apprentice",
        text: "Speak with Selka's apprentice Fenn",
        effects: [
          {
            type: "log",
            entry:
              "Fenn whispers that the Circle of Embers is ordering resonance amplifiers by the dozen.",
          },
        ],
        toNode: "ridge-archivist",
      },
      {
        id: "return-market",
        text: "Return to the market bustle",
        toNode: "market-square",
      },
    ],
  },
  {
    id: "market-mime",
    title: "Mime Mage's Storm",
    summary: "Silent sorcery conjures rainbows and ruckus alike.",
    body: [
      "The mime mage draws invisible sigils, summoning raindrops that sizzle into fragrant sparks before touching the cobbles.",
      "Spectators mimic his exaggerated movements, forming a chorus of silent dancers beneath an unseen thundercloud.",
    ],
    background:
      "linear-gradient(180deg, rgba(34,48,72,0.92), rgba(10,14,30,0.96))",
    ambient: "audio/magic-soft.mp3",
    tags: ["Verdyn", "Performance"],
    choices: [
      {
        id: "mirror-motions",
        text: "Mirror the mime's movements",
        skillCheck: {
          ability: "dexterity",
          skill: "acrobatics",
          difficultyClass: 12,
          flavor: "You glide through invisible currents, matching each silent clap.",
          success: {
            resultText:
              "The crowd bursts into applause, and the mime gifts you a phantom umbrella that deflects embers.",
            effects: [
              {
                type: "grantItem",
                item: {
                  id: "phantom-umbrella",
                  name: "Phantom Umbrella",
                  description:
                    "A translucent shield that shelters you from elemental drizzle and stray sparks.",
                  type: "trinket",
                },
              },
            ],
            nextNode: "market-square",
          },
          failure: {
            resultText:
              "You slip on an imaginary puddle, eliciting sympathetic laughter and a towel.",
            effects: [{ type: "modifyHP", delta: -1 }],
            nextNode: "market-square",
          },
        },
      },
      {
        id: "sign-language",
        text: "Communicate in silent sign",
        effects: [
          {
            type: "log",
            entry:
              "The mime draws a sigil pointing toward a hidden amphitheater where Pyrel's agents practice choral rituals.",
          },
        ],
        toNode: "ember-gate",
      },
      {
        id: "invite-performance",
        text: "Invite the mime to the Emberlight Tavern",
        effects: [
          {
            type: "log",
            entry:
              "He nods enthusiastically, promising to entertain Mira's patrons with silent fireworks.",
          },
        ],
        toNode: "tavern-common-room",
      },
      {
        id: "return-market-mime",
        text: "Bow and step back into the market",
        toNode: "market-square",
      },
    ],
  },
  {
    id: "market-menagerie",
    title: "Traveling Ember Menagerie",
    summary: "Caretakers soothe creatures shaped by magic and mirth.",
    body: [
      "Cages lined with rune-wrought vines house phoenix kits, ember ferrets, and a drowsy salamander sporting a tiny top hat.",
      "Caretaker Amari tends each beast with gentle hums while a trio of children offers candied crickets through the bars.",
    ],
    background:
      "linear-gradient(180deg, rgba(64,36,30,0.92), rgba(22,12,12,0.95))",
    ambient: "audio/forest-soft.mp3",
    tags: ["Verdyn", "Creatures"],
    choices: [
      {
        id: "befriend-ferret",
        text: "Befriend an ember ferret",
        effects: [
          {
            type: "grantItem",
            item: {
              id: "ember-ferret",
              name: "Ember Ferret Companion",
              description:
                "A mischievous critter that alerts you to hidden traps with cheerful chirps.",
              type: "trinket",
            },
          },
        ],
        toNode: "market-menagerie",
      },
      {
        id: "assist-amari",
        text: "Assist Caretaker Amari with feeding",
        skillCheck: {
          ability: "wisdom",
          skill: "survival",
          difficultyClass: 13,
          flavor: "You mimic Amari's calming cadence to soothe a restless phoenix kit.",
          success: {
            resultText:
              "The kit nuzzles your hand, leaving a trail of harmless sparks that invigorate your spirit.",
            effects: [
              { type: "modifyHP", delta: 3 },
              {
                type: "log",
                entry:
                  "Amari gifts you a bundle of phoenix down to aid in future healing rituals.",
              },
            ],
            nextNode: "tavern-common-room",
          },
          failure: {
            resultText:
              "The phoenix kit sneezes embers onto your cloak before Amari quickly pats them out.",
            effects: [{ type: "modifyHP", delta: -2 }],
            nextNode: "market-menagerie",
          },
        },
      },
      {
        id: "speak-amari",
        text: "Speak with Amari about the creatures' origins",
        effects: [
          {
            type: "log",
            entry:
              "Amari reveals that many beasts emerge from cracks in the Rift when Pyrel's choir hits certain notes.",
          },
        ],
        toNode: "ember-rift-threshold",
      },
      {
        id: "return-market-menagerie",
        text: "Return to the bustling stalls",
        toNode: "market-square",
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
          skill: "arcana",
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
      {
        id: "speak-cartographer",
        text: "Consult the Rift cartographer sketching floating paths",
        toNode: "rift-cartographer",
      },
      {
        id: "commune-sprites",
        text: "Commune with ember sprites circling the threshold",
        toNode: "rift-sprite-circle",
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
          skill: "persuasion",
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
    id: "rift-cartographer",
    title: "Cartographer Aelis' Floating Desk",
    summary: "Maps drift in midair, capturing the shifting geometry of the Rift.",
    body: [
      "Tiefling cartographer Aelis anchors parchment to hovering quills that sketch luminous pathways before fading into ash.",
      "Charts ripple as the Rift rearranges itself, forcing Aelis to mutter calculations while juggling compasses forged from meteor iron.",
    ],
    background:
      "linear-gradient(180deg, rgba(52,18,44,0.92), rgba(18,6,22,0.96))",
    ambient: "audio/arcane-hum.mp3",
    tags: ["Ember Rift", "Scholarship"],
    choices: [
      {
        id: "review-maps",
        text: "Review the current Rift maps",
        effects: [
          {
            type: "log",
            entry:
              "Aelis highlights a hidden platform where a forgotten guardian still stands watch.",
          },
        ],
        toNode: "ember-gate",
      },
      {
        id: "trade-coordinates",
        text: "Trade your observations for coordinates",
        skillCheck: {
          ability: "intelligence",
          skill: "history",
          difficultyClass: 14,
          flavor: "You compare your notes with Aelis' shifting diagrams.",
          success: {
            resultText:
              "Aelis inks a sigil onto your wrist, granting safe passage along a narrow bridge.",
            effects: [
              {
                type: "log",
                entry:
                  "The sigil hums softly, attuning you to hidden walkways toward Pyrel's sanctum.",
              },
              {
                type: "updateFaction",
                factionId: "circle",
                delta: 1,
              },
            ],
            nextNode: "ember-rift-sanctum",
          },
          failure: {
            resultText:
              "The maps warp faster than you can annotate them, and Aelis shoos you back to safer ground.",
            nextNode: "ember-rift-threshold",
          },
        },
      },
      {
        id: "offer-escort",
        text: "Offer to escort Aelis deeper",
        effects: [
          {
            type: "addQuest",
            quest: {
              id: "aelis-escort",
              title: "Guiding the Rift Cartographer",
              summary:
                "Escort Cartographer Aelis to a vantage point within the Rift and defend against hostile anomalies.",
              status: "active",
              faction: "Circle of Embers",
              reward: "Precision charts and an ally within the Rift",
              location: "Ember Rift",
              recommendedLevel: 3,
              progress: 0.25,
              objectives: [
                {
                  id: "secure-bridge",
                  description: "Clear the floating bridge of anomalies.",
                },
                {
                  id: "record-latitude",
                  description: "Assist Aelis while she records Rift latitude shifts.",
                },
                {
                  id: "return-aelis",
                  description: "Return Aelis safely to the threshold.",
                  optional: true,
                },
              ],
            },
          },
        ],
        toNode: "ember-rift-threshold",
      },
      {
        id: "back-threshold",
        text: "Return to the threshold's central platform",
        toNode: "ember-rift-threshold",
      },
    ],
  },
  {
    id: "rift-sprite-circle",
    title: "Circle of Ember Sprites",
    summary: "Tiny spirits swirl in laughter-laced choreography.",
    body: [
      "A halo of ember sprites twirls above the abyss, their laughter ringing like chimes in a storm.",
      "They weave ribbons of light that form glyphs before unraveling, inviting you to join their dance or decipher their messages.",
    ],
    background:
      "linear-gradient(180deg, rgba(64,26,38,0.92), rgba(22,8,16,0.95))",
    ambient: "audio/choir-embers.mp3",
    tags: ["Ember Rift", "Spirits"],
    choices: [
      {
        id: "join-dance",
        text: "Join the sprites' dance",
        skillCheck: {
          ability: "dexterity",
          skill: "acrobatics",
          difficultyClass: 13,
          flavor: "You match the sprites' swoops across the floating stones.",
          success: {
            resultText:
              "The sprites crown you with a halo of harmless flame that shields against psychic echoes.",
            effects: [
              {
                type: "log",
                entry:
                  "The halo steadies your mind, granting resilience within Pyrel's choir.",
              },
            ],
            nextNode: "ember-rift-sanctum",
          },
          failure: {
            resultText:
              "You misstep and the sprites scatter, leaving you alone on the floating stone.",
            effects: [{ type: "modifyHP", delta: -2 }],
            nextNode: "ember-rift-threshold",
          },
        },
      },
      {
        id: "interpret-glyphs",
        text: "Interpret the sprites' glyphs",
        skillCheck: {
          ability: "wisdom",
          skill: "insight",
          difficultyClass: 14,
          flavor: "You attune to their lilting laughter, translating emotion into meaning.",
          success: {
            resultText:
              "The glyphs reveal a weakness in Pyrel's choir: a dissonant note tied to Verdyn's bells.",
            effects: [
              {
                type: "updateQuest",
                questId: "archon-awakening",
                status: "active",
                summary:
                  "The sprites taught you how to weave Verdyn's bells into the fight against Pyrel.",
                progress: 0.75,
                completeObjectives: ["break-the-chorus"],
              },
            ],
            nextNode: "archon-confrontation",
          },
          failure: {
            resultText:
              "The glyphs giggle away, leaving you with little more than tingling fingertips.",
            nextNode: "ember-rift-threshold",
          },
        },
      },
      {
        id: "offer-gift",
        text: "Offer the sprites a trinket",
        effects: [
          {
            type: "grantGold",
            amount: -5,
          },
          {
            type: "log",
            entry:
              "The sprites accept your gift and bless your equipment with a faint ember glow.",
          },
        ],
        toNode: "ember-rift-threshold",
      },
      {
        id: "retreat-threshold",
        text: "Retreat from the sprite circle",
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
          ability: "charisma",
          skill: "persuasion",
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
const dynamicNodeIds = new Set<string>();

export function getNodeById(id: string): StoryNode | null {
  return nodesById.get(id) ?? null;
}

export function registerDynamicNode(node: StoryNode): void {
  nodesById.set(node.id, node);
  dynamicNodeIds.add(node.id);
}

export function unregisterDynamicNode(nodeId: string): void {
  if (!dynamicNodeIds.has(nodeId)) return;
  nodesById.delete(nodeId);
  dynamicNodeIds.delete(nodeId);
}

export function resetDynamicNodes(): void {
  dynamicNodeIds.forEach((id) => nodesById.delete(id));
  dynamicNodeIds.clear();
}

export function listDynamicNodeIds(): string[] {
  return Array.from(dynamicNodeIds);
}
