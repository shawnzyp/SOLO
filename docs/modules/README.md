# Content Modules

The application automatically loads any JSON modules referenced in `index.json`. Each module can extend the available races, classes, and backgrounds without modifying the core codebase.

## Module manifest

Update `public/modules/index.json` to include module descriptors:

```json
{
  "modules": [
    { "id": "my-compendium", "name": "My Compendium", "url": "/modules/my-compendium.json" }
  ]
}
```

Each `url` must point to a JSON file within the `public/modules` directory (or another publicly served location).

## Module schema

A module JSON file should match the following structure:

```json
{
  "id": "my-compendium",
  "name": "My Compendium",
  "version": "1.0.0",
  "races": [
    {
      "id": "mythic-elf",
      "name": "Mythic Elf",
      "description": "An ancient lineage touched by starlight.",
      "bonuses": { "dexterity": 2, "intelligence": 1 }
    }
  ],
  "classes": [
    {
      "id": "mythic-sage",
      "name": "Mythic Sage",
      "description": "Chronicle keepers wielding arcane insight.",
      "bonuses": { "wisdom": 2 },
      "startingItems": [
        {
          "id": "sage-focus",
          "name": "Sage's Focus",
          "description": "A relic attuned to celestial archives.",
          "type": "trinket"
        }
      ],
      "skillFocus": ["history", "arcana", "insight"]
    }
  ],
  "backgrounds": [
    {
      "id": "celestial-cartographer",
      "name": "Celestial Cartographer",
      "description": "You map the ever-shifting skies.",
      "feature": "You can always determine the position of significant astral landmarks."
    }
  ]
}
```

> **Important:** Only include content that you have the legal right to distribute. Official Dungeons & Dragons® expansions are protected by copyright. Use this system to integrate licensed material for personal use or to import original content.

Once the manifest references a module, rebuild or reload the app and the content will be available inside the hero creator.
