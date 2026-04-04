import personaMap from '../data/full_personas.json';
import fusionData from '../data/full_fusion_data.json';

export interface Persona {
  name: string;
  level: number;
  arcana: string;
  special?: boolean;
  dlc?: boolean;
}

const personaList = Object.entries(personaMap).map(([name, data]: [string, any]) => ({
  name,
  level: data.level,
  arcana: data.arcana,
  special: data.special,
  dlc: data.dlc
})).sort((a, b) => a.level - b.level);

export const getPersonaByName = (name: string) => {
  return personaList.find(p => p.name === name) || null;
};

export const calculateFusion = (p1Name: string, p2Name: string): Persona | null => {
  const p1 = getPersonaByName(p1Name);
  const p2 = getPersonaByName(p2Name);

  if (!p1 || !p2 || p1Name === p2Name) return null;

  // Rule: Special personas cannot be result of normal fusion
  const arcana1 = p1.arcana;
  const arcana2 = p2.arcana;

  // Same Arcana Fusion
  if (arcana1 === arcana2) {
    const targetLevel = (p1.level + p2.level) / 2 + 1;
    const candidates = personaList.filter(p => 
      p.arcana === arcana1 && 
      !p.special && 
      p.name !== p1Name && 
      p.name !== p2Name
    );
    
    // Find the persona with the highest level <= targetLevel
    return [...candidates].reverse().find(p => p.level <= targetLevel) || candidates[0] || null;
  }

  // Different Arcana Fusion
  const arcanaCombo = (fusionData as any).arcanaCombo;
  const targetArcana = arcanaCombo.find((c: any) => 
    (c.source[0] === arcana1 && c.source[1] === arcana2) || 
    (c.source[0] === arcana2 && c.source[1] === arcana1)
  )?.result;

  if (!targetArcana) return null;

  const targetLevel = (p1.level + p2.level) / 2 + 1;
  const candidates = personaList.filter(p => p.arcana === targetArcana && !p.special);

  // Find the first persona with level >= targetLevel
  return candidates.find(p => p.level >= targetLevel) || candidates[candidates.length - 1] || null;
};

export const getAllPersonas = () => personaList;
