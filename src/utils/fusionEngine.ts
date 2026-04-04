import personaMap from '../data/full_personas.json';
import fusionData from '../data/full_fusion_data.json';

export interface Persona {
  name: string;
  level: number;
  arcana: string;
  special?: boolean;
  dlc?: boolean;
  rare?: boolean;
}

const personaList: Persona[] = Object.entries(personaMap).map(([name, data]: [string, any]) => ({
  name,
  level: data.level,
  arcana: data.arcana,
  special: !!data.special,
  dlc: !!data.dlc,
  rare: (fusionData as any).rarePersonaeRoyal.includes(name)
})).sort((a, b) => a.level - b.level);

export const getPersonaByName = (name: string) => {
  return personaList.find(p => p.name === name) || null;
};

export const calculateFusion = (p1Name: string, p2Name: string): Persona | null => {
  const p1 = getPersonaByName(p1Name);
  const p2 = getPersonaByName(p2Name);

  if (!p1 || !p2 || p1Name === p2Name) return null;

  // Rule: Rare Persona Fusion
  if (p1.rare || p2.rare) {
    const rare = p1.rare ? p1 : p2;
    const normal = p1.rare ? p2 : p1;
    if (normal.rare) return null; // Cannot fuse two rare personas

    const rareIndex = (fusionData as any).rarePersonaeRoyal.indexOf(rare.name);
    const modifier = (fusionData as any).rareCombosRoyal[normal.arcana][rareIndex];
    
    const arcanaPersonas = personaList.filter(p => p.arcana === normal.arcana && !p.rare && !p.special);
    const currentIndex = arcanaPersonas.findIndex(p => p.name === normal.name);
    const targetIndex = currentIndex + modifier;

    return arcanaPersonas[targetIndex] || null;
  }

  // Different Arcana Fusion
  const arcanaCombo = (fusionData as any).arcana2CombosRoyal;
  const targetArcana = arcanaCombo.find((c: any) => 
    (c.source[0] === p1.arcana && c.source[1] === p2.arcana) || 
    (c.source[0] === p2.arcana && c.source[1] === p1.arcana)
  )?.result;

  if (!targetArcana) return null;

  const targetLevel = (p1.level + p2.level) / 2 + 1;
  const candidates = personaList.filter(p => p.arcana === targetArcana && !p.special && !p.rare);

  if (p1.arcana === p2.arcana) {
    // Same Arcana: Find the highest level <= targetLevel
    return [...candidates].reverse().find(p => p.level <= targetLevel && p.name !== p1.name && p.name !== p2.name) || candidates[0] || null;
  }

  // Find the first persona with level >= targetLevel
  return candidates.find(p => p.level >= targetLevel) || candidates[candidates.length - 1] || null;
};

export const getRecipes = (targetName: string): { sources: string[] }[] => {
  const target = getPersonaByName(targetName);
  if (!target) return [];

  // Check Special Fusions
  const special = (fusionData as any).specialCombosRoyal.find((s: any) => s.result === targetName);
  if (special) return [{ sources: special.sources }];

  // Regular Fusions (Reverse Search)
  const recipes: { sources: string[] }[] = [];
  const arcanaCombo = (fusionData as any).arcana2CombosRoyal;
  const relevantArcanaPairs = arcanaCombo.filter((c: any) => c.result === target.arcana);

  for (const pair of relevantArcanaPairs) {
    const list1 = personaList.filter(p => p.arcana === pair.source[0] && !p.special && !p.rare);
    const list2 = personaList.filter(p => p.arcana === pair.source[1] && !p.special && !p.rare);

    for (const p1 of list1) {
      for (const p2 of list2) {
        if (p1.name === p2.name) continue;
        const result = calculateFusion(p1.name, p2.name);
        if (result && result.name === targetName) {
          // Avoid duplicate pairs like [A, B] and [B, A]
          const sortedNames = [p1.name, p2.name].sort();
          if (!recipes.find(r => r.sources[0] === sortedNames[0] && r.sources[1] === sortedNames[1])) {
            recipes.push({ sources: sortedNames });
          }
        }
      }
    }
  }

  return recipes;
};

export const getAllPersonas = () => personaList;
export const getSpecialPersonas = () => personaList.filter(p => p.special);
