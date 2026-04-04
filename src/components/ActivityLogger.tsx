import React, { useState } from 'react';
import { useCalendar } from '../context/CalendarContext';
import { useStats } from '../context/StatsContext';
import data from '../data/full_activities.json';
import { Calendar as CalendarIcon, BookOpen, Utensils, Briefcase, CloudRain } from 'lucide-react';

const ActivityLogger: React.FC = () => {
  const { currentDate, logActivity, nextDay, jumpToDate } = useCalendar();
  const { addPoints } = useStats();
  const [isRainy, setIsRainy] = useState(false);
  const [timeSlot, setTimeSlot] = useState<'Matin' | 'Après-midi' | 'Soir'>('Après-midi');
  const [filter, setFilter] = useState<'all' | 'books' | 'activities'>('all');

  const handleLog = (activity: any) => {
    let points = activity.points;
    if (isRainy && activity.bonus?.type === 'rain') {
      points += activity.bonus.points;
    }

    addPoints(activity.stat as any, points);
    logActivity({
      timeSlot,
      activityId: activity.id,
      activityName: activity.name,
      statPoints: points,
      statName: activity.stat
    });

    if (timeSlot === 'Après-midi') setTimeSlot('Soir');
    else {
      setTimeSlot('Après-midi');
      nextDay();
    }
  };

  const handleJump = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) jumpToDate(new Date(e.target.value));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4 bg-p5-gray/20 p-4 rounded-lg border-b-2 border-p5-red">
        <div className="flex items-center gap-2 bg-p5-white text-p5-red px-4 py-2 font-black italic rounded">
          <CalendarIcon size={20} />
          {currentDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase()}
        </div>

        <input 
          type="date" 
          onChange={handleJump}
          className="bg-p5-black text-p5-white border border-p5-red p-2 rounded text-sm outline-none"
          title="Aller à une date spécifique"
        />

        <div className="flex gap-2 ml-auto">
          <button onClick={() => setIsRainy(!isRainy)} className={`flex items-center gap-2 px-3 py-1 rounded transition-colors ${isRainy ? 'bg-blue-600 text-white' : 'bg-p5-gray text-p5-white/50'}`}>
            <CloudRain size={16} /> Pluie
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={() => setFilter('all')} className={`p5-button ${filter === 'all' ? 'opacity-100' : 'opacity-50'}`}>Tout</button>
        <button onClick={() => setFilter('books')} className={`p5-button ${filter === 'books' ? 'opacity-100' : 'opacity-50'}`}>Livres</button>
        <button onClick={() => setFilter('activities')} className={`p5-button ${filter === 'activities' ? 'opacity-100' : 'opacity-50'}`}>Activités</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(filter === 'all' || filter === 'activities') && data.activites.map(act => (
          <button key={act.id} onClick={() => handleLog(act)} className="p5-card text-left group">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-lg group-hover:text-p5-red transition-colors">{act.name}</h4>
                <p className="text-xs text-p5-white/60 uppercase">{act.stat}</p>
              </div>
              <Briefcase size={20} className="text-p5-red" />
            </div>
            <div className="mt-2 text-p5-red font-bold">+{act.points} pts</div>
          </button>
        ))}

        {(filter === 'all' || filter === 'books') && data.livres.map(book => (
          <button key={book.id} onClick={() => handleLog(book)} className="p5-card text-left group">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-lg group-hover:text-p5-red transition-colors">{book.name}</h4>
                <p className="text-xs text-p5-white/60 uppercase">{book.location} • {book.stat}</p>
              </div>
              <BookOpen size={20} className="text-p5-red" />
            </div>
            <div className="mt-2 flex justify-between items-end">
              <span className="text-p5-red font-bold">+{book.points} pts</span>
              <span className="text-[10px] bg-p5-white text-p5-black px-1 font-black">{book.chapters} CHAP</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActivityLogger;
