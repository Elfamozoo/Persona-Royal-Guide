import personas from '../data/personas.json';
import arcanaFusions from '../data/arcana_fusions.json';

export interface Persona {
  name: string;
  level: number;
  arcana: string;
}

export const calculateFusion = (p1: Persona, p2: Persona): Persona | null => {
  if (p1.name === p2.name) return null;

  const arcana1 = p1.arcana;
  const arcana2 = p2.arcana;

  // Same Arcana fusion (simplified)
  if (arcana1 === arcana2) {
    const targetLevel = (p1.level + p2.level) / 2 + 1;
    const sameArcanaPersonas = personas
      .filter(p => p.arcana === arcana1 && p.name !== p1.name && p.name !== p2.name)
      .sort((a, b) => a.level - b.level);
    
    // Find the first persona with level lower than targetLevel (simplified rule for same arcana)
    return sameArcanaPersonas.reverse().find(p => p.level <= targetLevel) || null;
  }

  // Different Arcana fusion
  const targetArcana = (arcanaFusions as any)[arcana1]?.[arcana2] || (arcanaFusions as any)[arcana2]?.[arcana1];
  if (!targetArcana) return null;

  const targetLevel = (p1.level + p2.level) / 2 + 1;
  const potentialResults = personas
    .filter(p => p.arcana === targetArcana)
    .sort((a, b) => a.level - b.level);

  // Find the first persona with level >= targetLevel
  return potentialResults.find(p => p.level >= targetLevel) || potentialResults[potentialResults.length - 1] || null;
};
