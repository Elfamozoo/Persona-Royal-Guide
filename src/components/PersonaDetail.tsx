import React from 'react';
import { Persona, getSkillByName } from '../utils/fusionEngine';
import { translateArcana, translatePersona, translateResistance } from '../utils/translate';
import { Shield, Sword, Zap, X, Sparkles } from 'lucide-react';

interface Props {
  persona: Persona;
  onClose: () => void;
}

const elementNames = ["Phys", "Tir", "Feu", "Glace", "Elec", "Vent", "Psy", "Nuke", "Béni", "Maudit"];
const statNames = ["Force", "Magie", "Endu", "Agil", "Chance"];

const PersonaDetail: React.FC<Props> = ({ persona, onClose }) => {
  return (
    <div className="fixed inset-0 z-[200] bg-p5-black/95 backdrop-blur-xl p-4 md:p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-8 pb-32 animate-in fade-in slide-in-from-bottom-8 duration-500">
        
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="p5-skew-box p-6 md:p-10 flex-1">
            <h2 className="text-4xl md:text-7xl font-black italic transform skew-y-2 uppercase leading-none">
              {translatePersona(persona.name)}
            </h2>
            <div className="flex gap-4 mt-4 transform skew-y-2">
              <span className="bg-white text-p5-black px-4 py-1 font-black italic text-xl">
                {translateArcana(persona.arcana)}
              </span>
              <span className="bg-p5-black text-white px-4 py-1 font-black italic text-xl border-2 border-white">
                NIVEAU {persona.level}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p5-button !bg-p5-gray hover:!bg-p5-red p-4 rounded-full ml-4">
            <X size={32} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Stats & Resistances */}
          <div className="space-y-8">
            
            {/* Stats */}
            <div className="p5-card border-white/20">
              <h3 className="text-2xl font-black uppercase italic mb-6 text-p5-red flex items-center gap-3">
                <Sword size={24} /> Paramètres de Combat
              </h3>
              <div className="space-y-4">
                {statNames.map((name, i) => (
                  <div key={name} className="flex items-center gap-4">
                    <span className="w-20 font-black uppercase italic text-sm">{name}</span>
                    <div className="flex-1 h-4 bg-p5-black border border-white/10 relative">
                      <div 
                        className="h-full bg-p5-red shadow-[0_0_15px_rgba(208,0,0,0.5)] transition-all duration-1000 delay-300"
                        style={{ width: `${(persona.stats[i] / 99) * 100}%` }}
                      />
                      <span className="absolute right-2 -top-1 font-black italic text-xs">{persona.stats[i]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resistances */}
            <div className="p5-card border-white/20">
              <h3 className="text-2xl font-black uppercase italic mb-6 text-p5-red flex items-center gap-3">
                <Shield size={24} /> Affinités Élémentaires
              </h3>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                {elementNames.map((name, i) => {
                  const res = persona.elems[i];
                  const isSpecial = res !== '-';
                  return (
                    <div key={name} className="text-center space-y-1">
                      <div className="text-[10px] font-black uppercase opacity-40">{name}</div>
                      <div className={`h-10 flex items-center justify-center font-black italic text-xs border-2 ${
                        res === 'wk' ? 'bg-p5-red text-white border-white' :
                        res === 'rs' ? 'bg-p5-white text-p5-black border-p5-black' :
                        res === 'nu' || res === 'rp' || res === 'ab' ? 'bg-p5-black text-p5-red border-p5-red' :
                        'border-white/5 opacity-20'
                      }`}>
                        {res.toUpperCase()}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex flex-wrap gap-4 text-[10px] font-bold uppercase italic opacity-60">
                {Object.entries({ wk: "Faible", rs: "Résist.", nu: "Nul", rp: "Renvoie", ab: "Absorbe" }).map(([k, v]) => (
                  <span key={k}>{k.toUpperCase()}: {v}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Skills & Extras */}
          <div className="space-y-8">
            <div className="p5-card border-white/20 h-full">
              <h3 className="text-2xl font-black uppercase italic mb-6 text-p5-red flex items-center gap-3">
                <Zap size={24} /> Aptitudes & Capacités
              </h3>
              
              {persona.trait && (
                <div className="mb-6 p-4 bg-p5-white text-p5-black font-black italic uppercase relative overflow-hidden">
                  <div className="text-[10px] opacity-50 mb-1">TRAIT</div>
                  <div className="text-xl">{persona.trait}</div>
                  <div className="absolute top-0 right-0 p-2 opacity-10">
                    <Sparkles size={40} />
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {Object.entries(persona.skills).sort((a, b) => a[1] - b[1]).map(([skillName, level]) => {
                  const skill = getSkillByName(skillName);
                  return (
                    <div key={skillName} className="group bg-p5-black/40 p-3 border-l-2 border-p5-red hover:bg-p5-red/10 transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-black italic uppercase group-hover:text-p5-red transition-colors">{skillName}</span>
                        <span className="text-[10px] font-black bg-p5-red text-white px-2 italic">
                          {level === 0 ? 'INITIAL' : `LV ${level}`}
                        </span>
                      </div>
                      {skill && <p className="text-xs text-p5-white/60 font-bold leading-tight">{skill.effect}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PersonaDetail;
