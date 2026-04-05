import React, { useState } from 'react';
import examsData from '../data/exams.json';
import { Search, GraduationCap, AlertCircle } from 'lucide-react';

const SchoolAnswers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredExams = examsData.filter(e => 
    e.date.includes(searchTerm) || 
    e.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="p5-skew-box py-4 px-8 inline-flex items-center gap-3">
        <GraduationCap size={28} className="transform skew-y-2" />
        <h2 className="text-3xl font-black italic transform skew-y-2 uppercase text-white">Vie Scolaire & Examens</h2>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-p5-red" />
        <input 
          type="text" 
          placeholder="Chercher une date (ex: 12/04) ou une question..."
          className="w-full bg-p5-gray/20 border-2 border-p5-red p-4 pl-12 text-xl font-bold rounded italic outline-none focus:bg-p5-red/10 transition-all"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExams.map((exam, i) => (
          <div key={i} className={`p5-card text-left group ${exam.type === 'Examen' ? 'border-l-8 border-p5-red bg-p5-red/10' : ''}`}>
            <div className="flex justify-between items-start mb-2">
              <span className={`px-2 py-1 font-black italic text-xs uppercase ${exam.type === 'Examen' ? 'bg-p5-red text-white' : 'bg-p5-white text-p5-black'}`}>
                {exam.date}
              </span>
              <span className="text-[10px] font-bold text-p5-white/50 uppercase tracking-widest">{exam.type}</span>
            </div>
            <p className="text-sm font-bold text-p5-white/80 mb-4">{exam.question}</p>
            <div className="bg-p5-black/50 p-3 border-l-2 border-p5-red">
              <span className="text-xs font-black text-p5-red uppercase block mb-1">Réponse</span>
              <span className="font-bold">{exam.answer}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-p5-red/10 border-2 border-p5-red italic text-xs leading-relaxed mt-8">
        <span className="font-black text-p5-red flex items-center gap-2 mb-2 uppercase">
          <AlertCircle size={16} /> Note pour les Examens
        </span>
        Pour finir premier de votre promotion lors des grands examens, donner toutes les bonnes réponses ne suffit pas. Votre statistique sociale de <strong>Connaissance</strong> doit également être suffisamment élevée (souvent au niveau maximum pour les derniers examens de l'année).
      </div>
    </div>
  );
};

export default SchoolAnswers;
