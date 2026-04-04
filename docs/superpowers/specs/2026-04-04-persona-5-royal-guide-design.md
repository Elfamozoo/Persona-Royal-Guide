# Persona 5 Royal Guide & Tracker - Design Document

**Date:** 2026-04-04
**Topic:** Persona 5 Royal Guide & Tracker (French)

## 1. Goal
A responsive React-based "companion app" for *Persona 5 Royal* in French. It serves as a 100% verified database and a personal progress tracker for social stats, calendar activities, and persona fusions.

## 2. Requirements
- **Language:** 100% French (official game terminology).
- **Verified Info:** All data must be sourced from French guides (Jeuxvideo.com, Persona France).
- **Calendar & Journal:** Track daily activities in Morning, Afternoon, and Evening slots.
- **Stat Tracker:** Automatically calculate and track the 5 Social Stats (Connaissance, Courage, Diligence, Charme, Gentillesse).
- **Fusion Calculator:** Fully functional calculator based on the `chinhodado` logic, adapted for French.
- **Confidant Guide:** Step-by-step response guide for all ranks (1-10) with max affinity choices.
- **Local Storage:** Save user progress locally in the browser.

## 3. Architecture
### Frontend
- **Framework:** React (TypeScript)
- **Styling:** Vanilla CSS (Persona 5 Aesthetic: Red #D00000, Black #000000, White #FFFFFF, diagonal layouts, clip-paths).
- **State Management:** React Context (StatsContext, CalendarContext).

### Data Structure
- **Static JSON Files:**
  - `personas.json`: Name, Arcana, Level, Stats, Skills.
  - `fusions.json`: Arcana fusion table and special recipes.
  - `confidants.json`: Dialogue choices and point values.
  - `activities.json`: Books, DVDs, Jobs, and their stat rewards.
- **Local Storage:**
  - `user_save`: Current date, stats, and activity history.

## 4. Components
- **Dashboard:** Overview of today's date, weather, and current stats.
- **CalendarView:** Monthly/Weekly view for logging activities.
- **FusionLab:** Searchable interface for persona fusions.
- **ConfidantList:** Directory of all confidants with rank guides.
- **CollectionTracker:** Checklists for items (Books, DVDs).

## 5. Aesthetics
- High-contrast colors (Red/Black/White).
- Diagonal UI elements (`transform: rotate(-3deg)`).
- Fast pop-in animations for menus.
