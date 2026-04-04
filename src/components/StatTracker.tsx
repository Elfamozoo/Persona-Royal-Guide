import React from 'react';
import { useStats } from '../context/StatsContext';
import { Brain, Flame, Hammer, Heart, Star } from 'lucide-react';

const StatTracker: React.FC = () => {
  const { stats, getLevelInfo } = useStats();

  const statConfig = [
    { id: 'connaissance', label: 'Connaissance', icon: Brain },
    { id: 'courage', label: 'Courage', icon: Flame },
    { id: 'diligence', label: 'Diligence', icon: Hammer },
    { id: 'gentillesse', label: 'Gentillesse', icon: Heart },
    { id: 'charme', label: 'Charme', icon: Star }
  ];

  return (
    <div className="space-y-8">
      <div className="p5-skew-box py-4 px-8 inline-block">
        <h2 className="text-3xl font-black italic tracking-tighter transform skew-y-2 uppercase">Statistiques Sociales</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statConfig.map(stat => {
          const info = getLevelInfo(stat.id as any);
          const points = stats[stat.id as keyof typeof stats];
          const nextMin = info.nextMin || info.min;
          const progress = nextMin === info.min ? 100 : ((points - info.min) / (nextMin - info.min)) * 100;
          const Icon = stat.icon;

          return (
            <div key={stat.id} className="relative p5-card group">
              <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-30 transition-opacity">
                <Icon size={64} />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="text-p5-red" size={24} />
                  <h3 className="font-black text-xl uppercase tracking-tight">{stat.label}</h3>
                </div>
                
                <div className="text-2xl font-bold mb-4 text-p5-red italic">
                  Lv. {info.level} <span className="text-p5-white not-italic">— {info.name}</span>
                </div>

                <div className="h-3 bg-p5-black border border-p5-gray overflow-hidden">
                  <div 
                    className="h-full bg-p5-red transition-all duration-700 ease-out shadow-[0_0_15px_rgba(208,0,0,0.5)]"
                    style={{ width: `${Math.min(100, progress)}%` }}
                  />
                </div>
                
                <div className="flex justify-between mt-2 font-mono text-xs uppercase tracking-widest text-p5-white/40">
                  <span>Points: {points}</span>
                  <span>{info.nextMin ? `Suivant: ${info.nextMin}` : 'MAX'}</span>
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
