import React, { useState, useMemo } from 'react';
import { getAllSkills } from '../utils/fusionEngine';
import { translateElement } from '../utils/translate';
import { Search, Zap } from 'lucide-react';

const SkillsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const skills = useMemo(() => getAllSkills().sort((a, b) => a.name.localeCompare(b.name)), []);

  const filtered = useMemo(() => {
    return skills.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.effect.toLowerCase().includes(searchTerm.toLowerCase()) ||
      translateElement(s.element).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [skills, searchTerm]);

  return (
    <div className="space-y-8">
      <div className="p5-skew-box py-4 px-8 inline-flex items-center gap-3">
        <Zap size={28} className="transform skew-y-2" />
        <h2 className="text-3xl font-black italic transform skew-y-2 uppercase text-white">Archives des Aptitudes</h2>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-p5-red" />
        <input 
          type="text" 
          placeholder="Chercher une aptitude ou un effet..."
          className="w-full bg-p5-gray/20 border-2 border-p5-red p-4 pl-12 text-xl font-bold rounded italic outline-none focus:bg-p5-red/10"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(skill => (
          <div key={skill.name} className="p5-card border-white/10 group">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-black italic uppercase group-hover:text-p5-red transition-colors">{skill.name}</h3>
              <span className="text-[10px] font-black bg-p5-white text-p5-black px-2 py-0.5 uppercase">
                {translateElement(skill.element)}
              </span>
            </div>
            <p className="text-sm text-p5-white/70 font-bold leading-snug">{skill.effect}</p>
            {skill.cost && (
              <div className="mt-3 text-[10px] font-black text-p5-red uppercase italic">
                Coût: {skill.cost > 100 ? `${skill.cost / 100} SP` : `${skill.cost}% HP`}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsList;
