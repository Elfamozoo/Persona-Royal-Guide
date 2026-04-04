const arcanaMap: { [key: string]: string } = {
  "Fool": "Le Mat",
  "Magician": "Le Bateleur",
  "Priestess": "La Papesse",
  "Empress": "L'Impératrice",
  "Emperor": "L'Empereur",
  "Hierophant": "Le Pape",
  "Lovers": "L'Amoureux",
  "Chariot": "Le Chariot",
  "Justice": "La Justice",
  "Hermit": "L'Ermite",
  "Fortune": "La Roue",
  "Strength": "La Force",
  "Hanged": "Le Pendu",
  "Hanged Man": "Le Pendu",
  "Death": "La Mort",
  "Temperance": "La Tempérance",
  "Devil": "Le Diable",
  "Tower": "La Maison Dieu",
  "Star": "L'Étoile",
  "Moon": "La Lune",
  "Sun": "Le Soleil",
  "Judgement": "Le Juge",
  "Faith": "La Foi",
  "Councillor": "L'Édile",
  "World": "Le Monde"
};

const personaNameMap: { [key: string]: string } = {
  "Regent": "Régent",
  "Queen's Necklace": "Collier de la Reine",
  "Stone of Scone": "Pierre de Scone",
  "Koh-i-Noor": "Koh-i-Noor",
  "Orlov": "Orlov",
  "Emperor's Amulet": "Amulette de l'Empereur",
  "Hope Diamond": "Diamant de l'Espoir",
  "Crystal Skull": "Crâne de Cristal",
  "Orichalcum": "Orichalque"
};

const elementMap: { [key: string]: string } = {
  "phys": "Physique",
  "gun": "Arme à feu",
  "fire": "Feu",
  "ice": "Glace",
  "elec": "Élec",
  "wind": "Vent",
  "psy": "Psy",
  "nuke": "Nucléaire",
  "bless": "Béni",
  "curse": "Maudit",
  "ailment": "Altération",
  "healing": "Soin",
  "support": "Soutien",
  "passive": "Passif",
  "almighty": "Tout-puissant"
};

const resistanceMap: { [key: string]: string } = {
  "wk": "Faible",
  "rs": "Résistant",
  "nu": "Nul",
  "rp": "Renvoie",
  "ab": "Absorbe",
  "-": "-"
};

export const translateArcana = (arcana: string): string => {
  return arcanaMap[arcana] || arcana;
};

export const translatePersona = (name: string): string => {
  return personaNameMap[name] || name;
};

export const translateElement = (element: string): string => {
  return elementMap[element.toLowerCase()] || element;
};

export const translateResistance = (code: string): string => {
  return resistanceMap[code.toLowerCase()] || code;
};
