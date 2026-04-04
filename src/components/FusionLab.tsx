import React, { useState, useMemo } from 'react';
import { calculateFusion, getAllPersonas, getRecipes, Persona } from '../utils/fusionEngine';
import { Search, Plus, Equal, Sparkles, ArrowLeftRight, ListFilter } from 'lucide-react';

const FusionLab: React.FC = () => {
  const [mode, setMode] = useState<'forward' | 'reverse'>('forward');
  const [p1Name, setP1Name] = useState('');
  const [p2Name, setP2Name] = useState('');
  const [targetName, setTargetName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const personas = useMemo(() => getAllPersonas(), []);
  
  const filteredPersonas = useMemo(() => {
    return personas.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [personas, searchTerm]);

  const forwardResult = useMemo(() => {
    if (!p1Name || !p2Name) return null;
    return calculateFusion(p1Name, p2Name);
  }, [p1Name, p2Name]);

  const reverseRecipes = useMemo(() => {
    if (!targetName) return [];
    return getRecipes(targetName);
  }, [targetName]);

  const p1 = useMemo(() => personas.find(p => p.name === p1Name), [p1Name, personas]);
  const p2 = useMemo(() => personas.find(p => p.name === p2Name), [p2Name, personas]);
  const target = useMemo(() => personas.find(p => p.name === targetName), [targetName, personas]);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="p5-skew-box py-4 px-8 inline-flex items-center gap-3">
          <Sparkles size={28} className="transform skew-y-2" />
          <h2 className="text-3xl font-black italic transform skew-y-2 uppercase text-white">Laboratoire de Fusion</h2>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => setMode('forward')}
            className={`flex items-center gap-2 px-4 py-2 font-bold uppercase italic transition-all ${mode === 'forward' ? 'bg-p5-red text-white scale-105' : 'bg-p5-gray text-white/40'}`}
          >
            <Plus size={18} /> Calcul Normal
          </button>
          <button 
            onClick={() => setMode('reverse')}
            className={`flex items-center gap-2 px-4 py-2 font-bold uppercase italic transition-all ${mode === 'reverse' ? 'bg-p5-red text-white scale-105' : 'bg-p5-gray text-white/40'}`}
          >
            <ArrowLeftRight size={18} /> Inversion
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          {/* TOP DISPLAY AREA */}
          <div className="bg-p5-gray/20 p-6 border-2 border-p5-red rounded-lg min-h-[200px] flex items-center">
            {mode === 'forward' ? (
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full">
                <div className="flex-1 w-full text-center space-y-2">
                  <div className={`h-24 flex items-center justify-center border-4 border-dashed ${p1 ? 'border-p5-red bg-p5-red/10' : 'border-white/10'}`}>
                    {p1 ? <div className="font-black italic uppercase">{p1.name}</div> : <div className="text-white/10 font-black italic">P1</div>}
                  </div>
                  {p1 && <button onClick={() => setP1Name('')} className="text-[10px] uppercase font-bold text-p5-red underline">Retirer</button>}
                </div>
                <Plus size={32} className="text-p5-red" />
                <div className="flex-1 w-full text-center space-y-2">
                  <div className={`h-24 flex items-center justify-center border-4 border-dashed ${p2 ? 'border-p5-red bg-p5-red/10' : 'border-white/10'}`}>
                    {p2 ? <div className="font-black italic uppercase">{p2.name}</div> : <div className="text-white/10 font-black italic">P2</div>}
                  </div>
                  {p2 && <button onClick={() => setP2Name('')} className="text-[10px] uppercase font-bold text-p5-red underline">Retirer</button>}
                </div>
                <Equal size={32} />
                <div className="flex-1 w-full text-center">
                  <div className={`h-24 flex flex-col items-center justify-center border-4 ${forwardResult ? 'bg-white text-p5-black border-p5-red scale-110 shadow-lg' : 'border-white/10'}`}>
                    {forwardResult ? (
                      <>
                        <div className="font-black italic uppercase leading-none">{forwardResult.name}</div>
                        <div className="text-[10px] font-bold uppercase">{forwardResult.arcana}</div>
                      </>
                    ) : <div className="text-white/5 font-black italic">???</div>}
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full space-y-6 text-center">
                <div className="max-w-xs mx-auto">
                  <div className={`h-24 flex flex-col items-center justify-center border-4 ${target ? 'bg-white text-p5-black border-p5-red' : 'border-white/10 border-dashed'}`}>
                    {target ? (
                      <>
                        <div className="text-2xl font-black italic uppercase">{target.name}</div>
                        <div className="text-xs font-bold">{target.arcana} (Lv {target.level})</div>
                      </>
                    ) : <div className="text-white/10 font-black italic uppercase">Cible</div>}
                  </div>
                </div>
                
                {reverseRecipes.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {reverseRecipes.map((r, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-p5-black/40 border-l-2 border-p5-red text-sm font-bold uppercase italic">
                        <span className="truncate">{r.sources[0]}</span>
                        <Plus size={12} className="text-p5-red" />
                        <span className="truncate">{r.sources[1] || r.sources[2]}</span>
                        {r.sources.length > 2 && <span className="text-xs font-black">+{r.sources.length - 2}</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* SEARCH LIST */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-p5-red" />
              <input 
                type="text" 
                placeholder="Chercher un Persona..."
                className="w-full bg-p5-black border-2 border-p5-red p-4 pl-12 text-xl font-bold rounded italic outline-none focus:bg-p5-red/10"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {filteredPersonas.map(p => (
                <button 
                  key={p.name}
                  onClick={() => {
                    if (mode === 'forward') {
                      if (!p1Name) setP1Name(p.name);
                      else if (!p2Name && p.name !== p1Name) setP2Name(p.name);
                    } else {
                      setTargetName(p.name);
                    }
                  }}
                  className={`p-3 text-left border-l-4 transition-all ${
                    (p.name === p1Name || p.name === p2Name || p.name === targetName)
                      ? 'bg-p5-red border-p5-white scale-[0.98]' 
                      : 'bg-p5-gray/40 border-p5-red hover:bg-p5-red/20'
                  }`}
                >
                  <div className="font-black text-xs uppercase truncate leading-none mb-1">{p.name}</div>
                  <div className="text-[9px] text-p5-white/40 uppercase font-bold tracking-tighter">Lv {p.level} • {p.arcana}</div>
                  {p.special && <div className="mt-1 text-[8px] bg-p5-white text-p5-black px-1 font-black inline-block">SPECIAL</div>}
                  {p.rare && <div className="mt-1 ml-1 text-[8px] bg-yellow-500 text-p5-black px-1 font-black inline-block">RARE</div>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SIDEBAR INFO */}
        <div className="space-y-6">
          <div className="p5-card border-white/10">
            <h3 className="font-black italic uppercase text-lg mb-4 text-p5-red flex items-center gap-2">
              <ListFilter size={20} /> Détails Techniques
            </h3>
            <div className="space-y-4 text-xs font-bold uppercase italic tracking-tighter">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/40">Base de données</span>
                <span>{personas.length} PERSONAS</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/40">Logic de calcul</span>
                <span>OFFICIELLE P5R</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/40">Fusions Spéciales</span>
                <span>{personas.filter(p => p.special).length} INCLUSES</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-p5-red/10 border-2 border-p5-red italic text-[10px] leading-relaxed">
            <span className="font-black text-p5-red block mb-1 underline">NOTE DU SYSTÈME</span>
            Les fusions de type "Inversion" calculent tous les chemins possibles en temps réel. Si un Persona est marqué "SPECIAL", il nécessite des ingrédients spécifiques listés dans le dossier Guillotine.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FusionLab;
