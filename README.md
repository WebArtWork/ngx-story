# 📖 Story Module

The `Story` module is a feature-rich narrative engine for Angular applications. It helps structure and manage stories across various domains—**books**, **games**, and **movies**—using editable components like characters, events, changes, and locations. Ideal for visual storytelling, timeline branching, and content-heavy projects.

---

## 🧱 Module Descriptions

- **Story** – Core module that holds the basic information about the story: its title, summary, and main attributes.
- **Change** – Represents a specific modification in the world compared to our reality; used to structure story evolution.
- **Change Type** – Defines categories for changes (e.g., Fire, Water, Wind for Magic), helping classify story alterations.
- **Character** – Represents a person or important being in the story with detailed attributes; often a hero or key figure.
- **Character Type** – Defines character-specific traits such as gender, age group (young, middle-aged, old), associated change type, and other role-defining attributes to enrich character profiles.
- **Event** – Marks significant narrative points such as battles, discoveries, or mystical phenomena that shape the plot.
- **Location** – Describes places such as cities, castles, or regions that are tied to story events and characters.

---

## 🔧 Purpose

This module empowers users to:

- Compose full storylines with interactive CRUD UIs
- Track characters, locations, events, and change types over time
- Support multi-phase story logic (chapters, timelines, scenes)
- Generate narrative experiences for static or interactive media

---

## 📂 Folder Overview

```
story/
├── formcomponents/     # Reusable field schemas for form generation
├── interfaces/         # Entity contracts (Story, Character, Change, etc.)
├── pages/              # UI components per entity (CRUD + tables)
├── selectors/          # Prebuilt dropdowns per model with emitters
├── services/           # Entity-based CRUD data services (via Wacom)
├── LICENSE             # MIT License
├── module.json         # Repo metadata
└── README.md           # You are here
```

---

## 🧩 Entity Interfaces

Each interface extends `CrudDocument` from Wacom and includes key fields:

- **Story** – Root container: title, description, thumb
- **Storychange** – A change step in the story timeline
- **Storychangetype** – Type of story transition (e.g. death, move)
- **Storycharacter** – Person/being in the story world
- **Storycharactertype** – Type of story person/being
- **Storyevent** – Narrative milestone or trigger point
- **Storylocation** – Physical or abstract place in the story

---

## ✏️ Forms

All entities are powered by `formcomponents` – JSON-like schemas that describe editable fields, labels, and placeholders.

This allows quick reusability and modal generation.

```ts
formId: 'storycharacter',
title: 'Storycharacter',
components: [
  { name: 'Text', key: 'name', fields: [...] },
  { name: 'Text', key: 'description', fields: [...] }
]
```

---

## 🖥 UI Pages

Each major entity comes with a ready-to-use UI module:

- `stories/` – Main list of stories with links to children
- `characters/`, `events/`, `locations/`, `changes/`, `types/` – CRUD tables scoped by `:story` or `:change`

They support sorting, modals, reordering (`arrow_upward`), and bulk operations.

---

## 🔌 Integration

To use in an Angular app:

```ts
import { StoriesModule } from 'src/app/modules/story/pages/stories/stories.module';

@NgModule({
	imports: [StoriesModule]
})
export class MyFeatureModule {}
```

Each page or selector can be lazy-loaded via `RouterModule.forChild`.

---

## 🎛 Selectors

Use `<story-selector>` and friends (`<storyevent-selector>`, etc.) for entity dropdowns with change emitters.

```html
<storycharacter-selector
	[(value)]="selectedCharacterId"
></storycharacter-selector>
```

---

## 🚀 Features Summary

- 🔁 Full reactive CRUD on all story components
- 🧱 Modular services and selectors
- 🛠 Schema-driven forms
- 🗃 UI modules and reusable dropdowns
- 📚 Scoped routing via URL parameters
- 🧠 Great for writing tools, RPG systems, branching timelines

---

## 📦 Installation

```bash
npm install ngx-story
```

---

## 📄 License

MIT © 2025 [Web Art Work](https://github.com/WebArtWork)
