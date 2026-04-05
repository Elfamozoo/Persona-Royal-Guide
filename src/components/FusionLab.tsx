import React, { useState, useMemo } from 'react';
import { calculateFusion, getAllPersonas, getRecipes, Persona } from '../utils/fusionEngine';
import { translateArcana, translatePersona } from '../utils/translate';
import { Search, Plus, Equal, Sparkles, ArrowLeftRight, ListFilter, Info, Zap } from 'lucide-react';
import PersonaDetail from './PersonaDetail';
import recommendedFusions from '../data/recommended_fusions.json';

const FusionLab: React.FC = () => {
  const [mode, setMode] = useState<'forward' | 'reverse' | 'recommended'>('forward');
  const [p1Name, setP1Name] = useState('');
  const [p2Name, setP2Name] = useState('');
  const [targetName, setTargetName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);

  const personas = useMemo(() => getAllPersonas(), []);
  
  const filteredPersonas = useMemo(() => {
    return personas.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      translatePersona(p.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
      translateArcana(p.arcana).toLowerCase().includes(searchTerm.toLowerCase())
    );
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
      {selectedPersona && (
        <PersonaDetail persona={selectedPersona} onClose={() => setSelectedPersona(null)} />
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="p5-skew-box py-4 px-8 inline-flex items-center gap-3">
          <Sparkles size={28} className="transform skew-y-2" />
          <h2 className="text-3xl font-black italic transform skew-y-2 uppercase text-white">Laboratoire de Fusion</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => { setMode('forward'); setP1Name(''); setP2Name(''); }}
            className={`flex items-center gap-2 px-4 py-2 font-bold uppercase italic transition-all ${mode === 'forward' ? 'bg-p5-red text-white scale-105 shadow-lg' : 'bg-p5-gray text-white/40'}`}
          >
            <Plus size={18} /> Calcul Normal
          </button>
          <button 
            onClick={() => { setMode('reverse'); setTargetName(''); }}
            className={`flex items-center gap-2 px-4 py-2 font-bold uppercase italic transition-all ${mode === 'reverse' ? 'bg-p5-red text-white scale-105 shadow-lg' : 'bg-p5-gray text-white/40'}`}
          >
            <ArrowLeftRight size={18} /> Inversion
          </button>
          <button 
            onClick={() => setMode('recommended')}
            className={`flex items-center gap-2 px-4 py-2 font-bold uppercase italic transition-all ${mode === 'recommended' ? 'bg-p5-red text-white scale-105 shadow-lg' : 'bg-p5-gray text-white/40'}`}
          >
            <Zap size={18} /> Chemin 100%
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          
          {/* DISPLAY AREA */}
          <div className="bg-p5-gray/20 p-6 border-2 border-p5-red rounded-lg min-h-[200px] flex items-center">
            {mode === 'forward' ? (
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full">
                <div className="flex-1 w-full text-center space-y-2">
                  <div className={`h-24 flex items-center justify-center border-4 border-dashed ${p1 ? 'border-p5-red bg-p5-red/10' : 'border-white/10'}`}>
                    {p1 ? <div><div className="font-black italic uppercase">{translatePersona(p1.name)}</div><div className="text-[10px] font-bold text-p5-red uppercase">{translateArcana(p1.arcana)}</div></div> : <div className="text-white/10 font-black italic uppercase">P1</div>}
                  </div>
                  {p1 && <button onClick={() => setP1Name('')} className="text-[10px] uppercase font-bold text-p5-red underline">Retirer</button>}
                </div>
                <Plus size={32} className="text-p5-red" />
                <div className="flex-1 w-full text-center space-y-2">
                  <div className={`h-24 flex items-center justify-center border-4 border-dashed ${p2 ? 'border-p5-red bg-p5-red/10' : 'border-white/10'}`}>
                    {p2 ? <div><div className="font-black italic uppercase">{translatePersona(p2.name)}</div><div className="text-[10px] font-bold text-p5-red uppercase">{translateArcana(p2.arcana)}</div></div> : <div className="text-white/10 font-black italic uppercase">P2</div>}
                  </div>
                  {p2 && <button onClick={() => setP2Name('')} className="text-[10px] uppercase font-bold text-p5-red underline">Retirer</button>}
                </div>
                <Equal size={32} />
                <div className="flex-1 w-full text-center">
                  <div onClick={() => forwardResult && setSelectedPersona(forwardResult)} className={`h-24 flex flex-col items-center justify-center border-4 transition-all ${forwardResult ? 'bg-white text-p5-black border-p5-red scale-110 shadow-lg cursor-pointer hover:bg-p5-red hover:text-white' : 'border-white/10'}`}>
                    {forwardResult ? (
                      <>
                        <div className="font-black italic uppercase leading-none text-center px-2">{translatePersona(forwardResult.name)}</div>
                        <div className="text-[10px] font-bold uppercase">{translateArcana(forwardResult.arcana)}</div>
                        <Info size={12} className="mt-1" />
                      </>
                    ) : <div className="text-white/5 font-black italic uppercase">???</div>}
                  </div>
                </div>
              </div>
            ) : mode === 'reverse' ? (
              <div className="w-full space-y-6 text-center">
                <div className="max-w-xs mx-auto">
                  <div className={`h-24 flex flex-col items-center justify-center border-4 transition-all ${target ? 'bg-white text-p5-black border-p5-red' : 'border-white/10 border-dashed'}`}>
                    {target ? (
                      <>
                        <div className="text-2xl font-black italic uppercase">{translatePersona(target.name)}</div>
                        <div className="text-xs font-bold">{translateArcana(target.arcana)} (Lv {target.level})</div>
                      </>
                    ) : <div className="text-white/10 font-black italic uppercase">Cible</div>}
                  </div>
                </div>
                {reverseRecipes.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {reverseRecipes.map((r, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-p5-black/40 border-l-2 border-p5-red text-xs font-bold uppercase italic">
                        <span className="truncate flex-1">{translatePersona(r.sources[0])}</span>
                        <Plus size={12} className="text-p5-red" />
                        <span className="truncate flex-1">{translatePersona(r.sources[1] || r.sources[2])}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full">
                <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {recommendedFusions.map((rec, i) => (
                    <div key={i} className="bg-p5-black/40 border-l-4 border-p5-red p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-p5-red font-black italic text-xl w-12">Lv {rec.level}</div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{translatePersona(rec.p1)} + {translatePersona(rec.p2)}</span>
                          <span className="text-xl font-black uppercase italic text-p5-white underline decoration-p5-red decoration-2 underline-offset-4">{translatePersona(rec.result)}</span>
                        </div>
                      </div>
                      <div className="text-[10px] md:text-xs font-bold bg-p5-gray/30 p-2 border border-white/5 rounded flex-1">
                        <span className="text-p5-red block mb-1 font-black italic uppercase">Aptitudes & Notes</span>
                        {rec.notes}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* TABLE LIST (Only for Forward/Reverse) */}
          {(mode === 'forward' || mode === 'reverse') && (
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-p5-red" />
                <input 
                  type="text" 
                  placeholder="Filtrer la liste des Personas..."
                  className="w-full bg-p5-black border-2 border-p5-red p-4 pl-12 text-xl font-bold rounded italic outline-none focus:bg-p5-red/10"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-[10px] md:text-xs">
                  <thead>
                    <tr className="bg-p5-red text-white font-black italic uppercase">
                      <th className="p-2 border-r border-white/20">Lv</th>
                      <th className="p-2 border-r border-white/20">Arcane</th>
                      <th className="p-2 border-r border-white/20 min-w-[120px]">Persona</th>
                      <th className="p-2 border-r border-white/20 text-center">Phy</th>
                      <th className="p-2 border-r border-white/20 text-center">Tir</th>
                      <th className="p-2 border-r border-white/20 text-center">Feu</th>
                      <th className="p-2 border-r border-white/20 text-center">Gla</th>
                      <th className="p-2 border-r border-white/20 text-center">Ele</th>
                      <th className="p-2 border-r border-white/20 text-center">Ven</th>
                      <th className="p-2 border-r border-white/20 text-center">Psy</th>
                      <th className="p-2 border-r border-white/20 text-center">Nuk</th>
                      <th className="p-2 border-r border-white/20 text-center">Bén</th>
                      <th className="p-2 text-center">Mau</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPersonas.map(p => (
                      <tr 
                        key={p.name}
                        onClick={() => {
                          if (mode === 'forward') {
                            if (!p1Name) setP1Name(p.name);
                            else if (!p2Name && p.name !== p1Name) setP2Name(p.name);
                          } else {
                            setTargetName(p.name);
                          }
                        }}
                        className={`group border-b border-white/5 hover:bg-p5-red/10 cursor-pointer transition-colors ${
                          (p.name === p1Name || p.name === p2Name || p.name === targetName) ? 'bg-p5-red/20 border-p5-red' : ''
                        }`}
                      >
                        <td className="p-2 font-black italic">{p.level}</td>
                        <td className="p-2 font-bold opacity-60 truncate max-w-[80px]">{translateArcana(p.arcana)}</td>
                        <td className="p-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-black uppercase italic text-sm truncate">{translatePersona(p.name)}</span>
                            <button onClick={(e) => { e.stopPropagation(); setSelectedPersona(p); }} className="p-1 hover:bg-white hover:text-p5-black rounded transition-colors shrink-0">
                              <Info size={14} />
                            </button>
                          </div>
                        </td>
                        {p.elems.map((res, i) => (
                          <td key={i} className={`p-2 text-center font-black ${
                            res === 'wk' ? 'text-p5-red' : res === 'rs' ? 'text-white' : res === '-' ? 'opacity-10' : 'text-yellow-500'
                          }`}>
                            {res === '-' ? '-' : res.toUpperCase()}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR INFO */}
        <div className="space-y-6">
          <div className="p5-card border-white/10">
            <h3 className="font-black italic uppercase text-lg mb-4 text-p5-red flex items-center gap-2">
              <ListFilter size={20} /> Statistiques du Compendium
            </h3>
            <div className="space-y-4 text-[10px] font-bold uppercase italic tracking-tighter">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/40">Entités répertoriées</span>
                <span>{personas.length}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/40">Fusions Spéciales</span>
                <span>{personas.filter(p => p.special).length}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/40">Chemin 100%</span>
                <span>{recommendedFusions.length} ÉTAPES</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-p5-red/10 border-2 border-p5-red italic text-[10px] leading-relaxed">
            <span className="font-black text-p5-red block mb-1 underline">CONSEIL DU GUIDE</span>
            Le mode "Chemin 100%" liste les fusions optimales recommandées par le guide parfait pour maintenir vos Personas à niveau et exploiter toutes les faiblesses.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FusionLab;
