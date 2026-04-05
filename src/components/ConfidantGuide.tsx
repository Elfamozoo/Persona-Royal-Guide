import React, { useState } from 'react';
import confidants from '../data/confidants.json';
import { Search, MapPin, Star } from 'lucide-react';

const ConfidantGuide: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConfidant, setSelectedConfidant] = useState<any>(null);

  const filtered = confidants.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.arcana.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="p5-skew-box py-4 px-8 inline-block">
        <h2 className="text-3xl font-black italic transform skew-y-2 uppercase">Guide des Confidents</h2>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-p5-red" />
        <input 
          type="text" 
          placeholder="Chercher un nom ou une arcane..."
          className="w-full bg-p5-gray/20 border-2 border-p5-red p-4 pl-12 text-xl font-bold rounded italic outline-none focus:bg-p5-red/10 transition-all"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(c => (
          <button 
            key={c.name} 
            onClick={() => setSelectedConfidant(c)}
            className="p5-card text-left group"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-black uppercase italic group-hover:text-p5-red transition-colors">{c.name}</h3>
                <p className="text-p5-red font-bold text-sm tracking-tighter">{c.arcana}</p>
              </div>
              <Star className="text-p5-white/20 group-hover:text-p5-red transition-colors" />
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-p5-white/40">
              <MapPin size={12} />
              {c.location}
            </div>
          </button>
        ))}
      </div>

      {selectedConfidant && (
        <div className="fixed inset-0 z-[200] bg-p5-black/95 backdrop-blur-md p-4 md:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-8 pb-32 animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedConfidant(null)}
              className="p5-button"
            >
              Retour à la liste
            </button>

            <div className="p5-skew-box p-8">
              <h2 className="text-5xl font-black italic transform skew-y-2 uppercase">{selectedConfidant.name}</h2>
              <p className="text-2xl font-bold transform skew-y-2 text-p5-black bg-white inline-block px-4 mt-2">
                {selectedConfidant.arcana}
              </p>
            </div>

            <div className="space-y-4">
              {selectedConfidant.ranks.map((r: any) => (
                <div key={r.rank} className="p5-card border-white/20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-p5-red text-white w-12 h-12 flex items-center justify-center font-black text-2xl italic">
                      {r.rank}
                    </div>
                    <h4 className="text-xl font-black uppercase italic">Rang {r.rank}</h4>
                  </div>
                  
                  <div className="space-y-2">
                    {r.choices.map((choice: string, i: number) => (
                      <div key={i} className="bg-p5-black/40 p-3 border-l-2 border-p5-red font-bold">
                        {choice}
                      </div>
                    ))}
                    {r.phone && (
                      <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3">
                        <span className="bg-blue-600 text-[10px] px-2 py-1 font-black uppercase">Appel</span>
                        <span className="font-bold text-p5-white/80">{r.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfidantGuide;
