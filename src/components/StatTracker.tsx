import React from 'react';
import { useStats } from '../context/StatsContext';

const StatTracker: React.FC = () => {
  const { stats, getLevelInfo } = useStats();

  const statNames: { id: 'connaissance' | 'courage' | 'diligence' | 'gentillesse' | 'charme'; label: string }[] = [
    { id: 'connaissance', label: 'Connaissance' },
    { id: 'courage', label: 'Courage' },
    { id: 'diligence', label: 'Diligence' },
    { id: 'gentillesse', label: 'Gentillesse' },
    { id: 'charme', label: 'Charme' }
  ];

  return (
    <div className="stat-tracker">
      <h2 className="p5-diagonal" style={{ marginBottom: '2rem', display: 'inline-block' }}>Statistiques Sociales</h2>
      <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {statNames.map(stat => {
          const info = getLevelInfo(stat.id);
          const points = stats[stat.id];
          const nextMin = info.nextMin || info.min;
          const progress = nextMin === info.min ? 100 : ((points - info.min) / (nextMin - info.min)) * 100;

          return (
            <div key={stat.id} className="stat-card" style={{
              background: 'var(--p5-gray)',
              padding: '15px',
              borderLeft: '5px solid var(--p5-red)',
              transform: 'skewX(-5deg)',
              boxShadow: '4px 4px 0 var(--p5-white)'
            }}>
              <div style={{ transform: 'skewX(5deg)' }}>
                <h3 style={{ margin: '0 0 5px 0', color: 'var(--p5-red)', textTransform: 'uppercase' }}>{stat.label}</h3>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Niveau {info.level}: {info.name}</div>
                <div style={{ marginTop: '10px', height: '10px', background: '#000', position: 'relative' }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.min(100, progress)}%`,
                    background: 'var(--p5-red)',
                    transition: 'width 0.5s ease-out'
                  }}></div>
                </div>
                <div style={{ fontSize: '0.8rem', marginTop: '5px', textAlign: 'right' }}>
                  {info.nextMin ? `${points} / ${info.nextMin} pts` : 'MAX'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatTracker;
