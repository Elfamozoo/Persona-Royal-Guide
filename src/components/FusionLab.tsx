import React, { useState, useMemo } from 'react';
import { calculateFusion, getAllPersonas, Persona } from '../utils/fusionEngine';
import { Search, Plus, Equal, Sparkles } from 'lucide-react';

const FusionLab: React.FC = () => {
  const [p1Name, setP1Name] = useState('');
  const [p2Name, setP2Name] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const personas = useMemo(() => getAllPersonas(), []);
  
  const filteredPersonas = useMemo(() => {
    return personas.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [personas, searchTerm]);

  const result = useMemo(() => {
    if (!p1Name || !p2Name) return null;
    return calculateFusion(p1Name, p2Name);
  }, [p1Name, p2Name]);

  const p1 = useMemo(() => personas.find(p => p.name === p1Name), [p1Name, personas]);
  const p2 = useMemo(() => personas.find(p => p.name === p2Name), [p2Name, personas]);

  return (
    <div className="space-y-8">
      <div className="p5-skew-box py-4 px-8 inline-flex items-center gap-3">
        <Sparkles size={28} className="transform skew-y-2" />
        <h2 className="text-3xl font-black italic transform skew-y-2 uppercase text-white">Laboratoire de Fusion</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Selection Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-p5-gray/20 p-6 border-2 border-p5-red rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              
              {/* Persona 1 */}
              <div className="flex-1 w-full text-center space-y-4">
                <div className={`h-32 flex items-center justify-center border-4 border-dashed transition-all ${p1 ? 'border-p5-red bg-p5-red/10' : 'border-p5-white/20'}`}>
                  {p1 ? (
                    <div>
                      <div className="text-xl font-black uppercase italic">{p1.name}</div>
                      <div className="text-sm font-bold text-p5-red">{p1.arcana} (Lv {p1.level})</div>
                    </div>
                  ) : (
                    <div className="text-p5-white/20 font-black italic">PERSONA 1</div>
                  )}
                </div>
                {p1 && <button onClick={() => setP1Name('')} className="text-xs text-p5-red font-bold uppercase underline">Retirer</button>}
              </div>

              <Plus size={48} className="text-p5-red shrink-0" />

              {/* Persona 2 */}
              <div className="flex-1 w-full text-center space-y-4">
                <div className={`h-32 flex items-center justify-center border-4 border-dashed transition-all ${p2 ? 'border-p5-red bg-p5-red/10' : 'border-p5-white/20'}`}>
                  {p2 ? (
                    <div>
                      <div className="text-xl font-black uppercase italic">{p2.name}</div>
                      <div className="text-sm font-bold text-p5-red">{p2.arcana} (Lv {p2.level})</div>
                    </div>
                  ) : (
                    <div className="text-p5-white/20 font-black italic">PERSONA 2</div>
                  )}
                </div>
                {p2 && <button onClick={() => setP2Name('')} className="text-xs text-p5-red font-bold uppercase underline">Retirer</button>}
              </div>

              <Equal size={48} className="text-p5-white shrink-0" />

              {/* Result */}
              <div className="flex-1 w-full text-center">
                <div className={`h-32 flex items-center justify-center border-4 border-solid transition-all ${result ? 'border-p5-white bg-p5-white text-p5-black scale-110 shadow-[0_0_30px_rgba(255,255,255,0.3)]' : 'border-p5-white/10'}`}>
                  {result ? (
                    <div className="animate-in fade-in zoom-in duration-500">
                      <div className="text-2xl font-black uppercase italic leading-none">{result.name}</div>
                      <div className="text-xs font-bold mt-1">{result.arcana}</div>
                      <div className="text-lg font-black italic">Lv {result.level}</div>
                    </div>
                  ) : (
                    <div className="text-p5-white/10 font-black italic">RÉSULTAT</div>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Search/List */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-p5-red" />
              <input 
                type="text" 
                placeholder="Chercher un Persona pour la fusion..."
                className="w-full bg-p5-black border-2 border-p5-red p-4 pl-12 text-xl font-bold rounded italic outline-none focus:bg-p5-red/10"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {filteredPersonas.map(p => (
                <button 
                  key={p.name}
                  onClick={() => {
                    if (!p1Name) setP1Name(p.name);
                    else if (!p2Name && p.name !== p1Name) setP2Name(p.name);
                  }}
                  disabled={p.name === p1Name || p.name === p2Name}
                  className={`p-3 text-left border-l-4 transition-all ${
                    p.name === p1Name || p.name === p2Name 
                      ? 'bg-p5-red border-p5-white cursor-not-allowed opacity-50' 
                      : 'bg-p5-gray/40 border-p5-red hover:bg-p5-red/20'
                  }`}
                >
                  <div className="font-bold text-sm uppercase truncate">{p.name}</div>
                  <div className="text-[10px] text-p5-white/40 uppercase">Lv {p.level} • {p.arcana}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          <div className="p5-card border-p5-white/20">
            <h3 className="font-black italic uppercase text-lg mb-4 text-p5-red">Règles de la Guillotine</h3>
            <ul className="space-y-3 text-sm text-p5-white/70">
              <li className="flex gap-2"><span className="text-p5-red font-black italic">01.</span> Les Personas de même Arcane produisent un Persona de niveau inférieur.</li>
              <li className="flex gap-2"><span className="text-p5-red font-black italic">02.</span> Le niveau final est calculé sur la moyenne + 1.</li>
              <li className="flex gap-2"><span className="text-p5-red font-black italic">03.</span> Les Personas spéciaux (Alice, etc.) ne peuvent pas être créés par fusion normale.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FusionLab;
