import React, { createContext, useContext, useState, useEffect } from 'react';
import statsLevels from '../data/stats_levels.json';

type StatName = 'connaissance' | 'courage' | 'maîtrise' | 'gentillesse' | 'charme';

interface Stats {
  connaissance: number;
  courage: number;
  maîtrise: number;
  gentillesse: number;
  charme: number;
}

interface StatsContextType {
  stats: Stats;
  addPoints: (stat: StatName, points: number) => void;
  getLevelInfo: (stat: StatName) => { level: number; name: string; min: number; nextMin?: number };
  resetStats: () => void;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export const StatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<Stats>(() => {
    const saved = localStorage.getItem('p5r_stats');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migrate old data if necessary
      if (parsed.diligence !== undefined && parsed.maîtrise === undefined) {
        parsed.maîtrise = parsed.diligence;
        delete parsed.diligence;
      }
      return parsed;
    }
    return {
      connaissance: 0,
      courage: 0,
      maîtrise: 0,
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

  const resetStats = () => {
    setStats({
      connaissance: 0,
      courage: 0,
      maîtrise: 0,
      gentillesse: 0,
      charme: 0
    });
  };

  const getLevelInfo = (stat: StatName) => {
    const levels = (statsLevels as any)[stat];
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
    <StatsContext.Provider value={{ stats, addPoints, getLevelInfo, resetStats }}>
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
