import React, { useState } from 'react';
import personas from '../data/personas.json';
import { calculateFusion, Persona } from '../utils/fusionLogic';

const FusionLab: React.FC = () => {
  const [p1, setP1] = useState<Persona | null>(null);
  const [p2, setP2] = useState<Persona | null>(null);

  const result = p1 && p2 ? calculateFusion(p1, p2) : null;

  return (
    <div className="fusion-lab" style={{ marginTop: '20px' }}>
      <h2 className="p5-diagonal">Laboratoire de Fusion</h2>
      
      <div className="fusion-interface" style={{ 
        display: 'flex', 
        gap: '40px', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '30px',
        background: 'var(--p5-gray)',
        border: '3px solid var(--p5-red)',
        transform: 'skewX(-2deg)'
      }}>
        <div className="persona-selector">
          <h3 style={{ transform: 'skewX(2deg)' }}>Persona 1</h3>
          <select 
            onChange={(e: any) => setP1(personas[e.target.selectedIndex - 1])}
            style={{ padding: '10px', width: '200px', transform: 'skewX(2deg)' }}
          >
            <option value="">Sélectionner</option>
            {personas.map(p => <option key={p.name} value={p.name}>{p.name} (Lv {p.level})</option>)}
          </select>
        </div>

        <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--p5-red)', transform: 'skewX(2deg)' }}>+</div>

        <div className="persona-selector">
          <h3 style={{ transform: 'skewX(2deg)' }}>Persona 2</h3>
          <select 
            onChange={(e: any) => setP2(personas[e.target.selectedIndex - 1])}
            style={{ padding: '10px', width: '200px', transform: 'skewX(2deg)' }}
          >
            <option value="">Sélectionner</option>
            {personas.map(p => <option key={p.name} value={p.name}>{p.name} (Lv {p.level})</option>)}
          </select>
        </div>

        <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--p5-white)', transform: 'skewX(2deg)' }}>=</div>

        <div className="fusion-result" style={{ 
          background: 'var(--p5-black)', 
          padding: '20px', 
          minWidth: '200px', 
          border: '2px solid var(--p5-white)',
          textAlign: 'center',
          transform: 'skewX(2deg)'
        }}>
          {result ? (
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--p5-red)' }}>{result.name}</div>
              <div style={{ fontSize: '0.8rem' }}>{result.arcana}</div>
              <div style={{ fontSize: '0.9rem', color: '#ffd700' }}>Niveau {result.level}</div>
            </div>
          ) : (
            <div style={{ color: 'var(--p5-gray)' }}>???</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FusionLab;
