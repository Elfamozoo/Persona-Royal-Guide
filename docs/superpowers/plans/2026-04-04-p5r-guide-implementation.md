# Persona 5 Royal Guide & Tracker Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive French P5R companion app with a calendar, stat tracker, and fusion calculator.

**Architecture:** React (TypeScript) SPA with LocalStorage for persistence. Static JSON files for game data.

**Tech Stack:** React 18, Vite, TypeScript, Vanilla CSS.

---

### Task 1: Project Scaffolding & Theme Setup

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles/theme.css`

- [ ] **Step 1: Initialize package.json**
```json
{
  "name": "persona-5-royal-guide",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.10.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.28",
    "@types/react-dom": "^18.0.11",
    "typescript": "^5.0.2",
    "@vitejs/plugin-react": "^3.1.0",
    "vite": "^4.2.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

- [ ] **Step 2: Create vite.config.ts and index.html**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```
```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Le Navigateur du Voleur</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Create the Persona 5 Aesthetic Theme (CSS)**
```css
:root {
  --p5-red: #D00000;
  --p5-black: #000000;
  --p5-white: #FFFFFF;
  --p5-gray: #333333;
  --font-main: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background-color: var(--p5-black);
  color: var(--p5-white);
  font-family: var(--font-main);
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.p5-header {
  background: var(--p5-red);
  padding: 20px;
  transform: skewY(-2deg);
  margin-top: -10px;
  box-shadow: 0 5px 0 var(--p5-white);
  position: relative;
  z-index: 10;
}

.p5-header h1 {
  transform: skewY(2deg);
  margin: 0;
  text-transform: uppercase;
  font-style: italic;
  font-weight: 900;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: var(--p5-red);
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  border-top: 4px solid var(--p5-white);
  z-index: 100;
}
```

- [ ] **Step 4: Create main.tsx and App.tsx**
```tsx
// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/theme.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// src/App.tsx
import React from 'react'

function App() {
  return (
    <div className="app">
      <header className="p5-header">
        <h1>Le Navigateur du Voleur</h1>
      </header>
      <main style={{ padding: '20px', paddingBottom: '80px' }}>
        <p>Bienvenue, Joker.</p>
      </main>
      <nav className="bottom-nav">
        <button>Calendrier</button>
        <button>Stats</button>
        <button>Fusions</button>
        <button>Confidents</button>
      </nav>
    </div>
  )
}

export default App
```

- [ ] **Step 5: Install dependencies and verify build**
Run: `npm install --silent`
Run: `npm run build`

- [ ] **Step 6: Commit**
```bash
git add .
git commit -m "feat: initial project scaffolding and P5 theme setup"
```

### Task 2: Data Layer & Social Stat Logic

**Files:**
- Create: `src/data/stats_levels.json`
- Create: `src/context/StatsContext.tsx`
- Create: `src/components/StatTracker.tsx`

- [ ] **Step 1: Define Social Stat Levels in French**
```json
{
  "connaissance": [
    { "level": 1, "name": "Apprenti", "min": 0 },
    { "level": 2, "name": "Savant", "min": 20 },
    { "level": 3, "name": "Érudit", "min": 45 },
    { "level": 4, "name": "Encyclopédique", "min": 80 },
    { "level": 5, "name": "Omniscient", "min": 140 }
  ],
  "courage": [
    { "level": 1, "name": "Poule mouillée", "min": 0 },
    { "level": 2, "name": "Hardi", "min": 11 },
    { "level": 3, "name": "Brave", "min": 25 },
    { "level": 4, "name": "Téméraire", "min": 47 },
    { "level": 5, "name": "Lion", "min": 82 }
  ],
  "diligence": [
    { "level": 1, "name": "Brouillon", "min": 0 },
    { "level": 2, "name": "Appliqué", "min": 12 },
    { "level": 3, "name": "Méticuleux", "min": 33 },
    { "level": 4, "name": "Perfectionniste", "min": 60 },
    { "level": 5, "name": "Maître", "min": 105 }
  ],
  "gentillesse": [
    { "level": 1, "name": "Indifférent", "min": 0 },
    { "level": 2, "name": "Avenant", "min": 14 },
    { "level": 3, "name": "Empathique", "min": 38 },
    { "level": 4, "name": "Altruiste", "min": 70 },
    { "level": 5, "name": "Ange", "min": 123 }
  ],
  "charme": [
    { "level": 1, "name": "Inaperçu", "min": 0 },
    { "level": 2, "name": "Séduisant", "min": 12 },
    { "level": 3, "name": "Irrésistible", "min": 33 },
    { "level": 4, "name": "Charismatique", "min": 56 },
    { "level": 5, "name": "Idole", "min": 92 }
  ]
}
```

- [ ] **Step 2: Create StatsContext with LocalStorage persistence**
(Include logic to calculate current level name from points).

- [ ] **Step 3: Create StatTracker Component**
Visual representation of the 5 stats with their level names.

- [ ] **Step 4: Commit**
```bash
git add src/data/stats_levels.json src/context/StatsContext.tsx src/components/StatTracker.tsx
git commit -m "feat: add social stats logic and tracker component"
```

### Task 3: Calendar System & Activity Logging

**Files:**
- Create: `src/data/activities.json`
- Create: `src/context/CalendarContext.tsx`
- Create: `src/components/Calendar.tsx`
- Create: `src/components/ActivityLogger.tsx`

- [ ] **Step 1: Create CalendarContext**
Track current in-game date (starting April 9th) and activity history.

- [ ] **Step 2: Implement ActivityLogger**
Dropdown to select French activities and automatically add points to StatsContext.

- [ ] **Step 3: Commit**
```bash
git add src/data/activities.json src/context/CalendarContext.tsx src/components/Calendar.tsx src/components/ActivityLogger.tsx
git commit -m "feat: implement calendar and activity logging system"
```

### Task 4: Fusion Engine (French Terminology)

**Files:**
- Create: `src/data/personas.json`
- Create: `src/data/arcana_fusions.json`
- Create: `src/utils/fusionLogic.ts`
- Create: `src/components/FusionLab.tsx`

- [ ] **Step 1: Port Fusion Logic from Chinhodado**
Implement the mathematical formula and Arcana fusion table.

- [ ] **Step 2: Implement Search UI**
Search personas by name (French) and show their recipes.

- [ ] **Step 3: Commit**
```bash
git add src/data/personas.json src/data/arcana_fusions.json src/utils/fusionLogic.ts src/components/FusionLab.tsx
git commit -m "feat: add fusion engine and search lab"
```

### Task 5: Backup & Export System

**Files:**
- Create: `src/components/BackupManager.tsx`

- [ ] **Step 1: Implement Export to JSON file**
Download the entire LocalStorage state as a file.

- [ ] **Step 2: Implement Import from JSON file**
Load a saved file into LocalStorage and refresh the app.

- [ ] **Step 3: Commit**
```bash
git add src/components/BackupManager.tsx
git commit -m "feat: add backup/restore system"
```
