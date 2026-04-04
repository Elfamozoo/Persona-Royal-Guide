import React, { createContext, useContext, useState, useEffect } from 'react';
import statsLevels from '../data/stats_levels.json';

type StatName = 'connaissance' | 'courage' | 'diligence' | 'gentillesse' | 'charme';

interface Stats {
  connaissance: number;
  courage: number;
  diligence: number;
  gentillesse: number;
  charme: number;
}

interface StatsContextType {
  stats: Stats;
  addPoints: (stat: StatName, points: number) => void;
  getLevelInfo: (stat: StatName) => { level: number; name: string; min: number; nextMin?: number };
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export const StatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<Stats>(() => {
    const saved = localStorage.getItem('p5r_stats');
    return saved ? JSON.parse(saved) : {
      connaissance: 0,
      courage: 0,
      diligence: 0,
      gentillesse: 0,
      charme: 0
    };
  });

  useEffect(() => {
    localStorage.setItem('p5r_stats', JSON.stringify(stats));
  }, [stats]);

  const addPoints = (stat: StatName, points: number) => {
    setStats(prev => ({ ...prev, [stat]: prev[stat] + points }));
  };

  const getLevelInfo = (stat: StatName) => {
    const levels = statsLevels[stat];
    const currentPoints = stats[stat];
    
    let currentLevel = levels[0];
    let nextLevel = levels[1];

    for (let i = 0; i < levels.length; i++) {
      if (currentPoints >= levels[i].min) {
        currentLevel = levels[i];
        nextLevel = levels[i + 1];
      } else {
        break;
      }
    }

    return {
      level: currentLevel.level,
      name: currentLevel.name,
      min: currentLevel.min,
      nextMin: nextLevel?.min
    };
  };

  return (
    <StatsContext.Provider value={{ stats, addPoints, getLevelInfo }}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => {
  const context = useContext(StatsContext);
  if (context === undefined) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return context;
};
