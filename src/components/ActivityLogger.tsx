import React, { useState } from 'react';
import { useCalendar } from '../context/CalendarContext';
import { useStats } from '../context/StatsContext';
import data from '../data/full_activities.json';
import { Calendar as CalendarIcon, BookOpen, Utensils, Briefcase, CloudRain, Tv, Music } from 'lucide-react';

const ActivityLogger: React.FC = () => {
  const { currentDate, logActivity, nextDay, jumpToDate } = useCalendar();
  const { addPoints } = useStats();
  const [isRainy, setIsRainy] = useState(false);
  const [timeSlot, setTimeSlot] = useState<'Matin' | 'Après-midi' | 'Soir'>('Après-midi');
  const [filter, setFilter] = useState<'all' | 'books' | 'activities' | 'dvds'>('all');

  const handleLog = (activity: any) => {
    let points = activity.points;
    const currentDayName = currentDate.toLocaleDateString('fr-FR', { weekday: 'long' });
    
    if (isRainy && activity.bonus?.type === 'rain') {
      points += activity.bonus.points;
    }
    if (activity.bonus?.type === 'day' && activity.bonus.days.includes(currentDayName.charAt(0).toUpperCase() + currentDayName.slice(1))) {
      points += activity.bonus.points;
    }

    if (activity.stat !== 'special' && activity.stat !== 'variable') {
      // Map display name to internal key if necessary
      const statKey = activity.stat.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // "Maîtrise" -> "maitrise"
      addPoints(statKey as any, points * 2); // Roughly mapping notes to internal points
    }

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

      <div className="flex flex-wrap gap-2 md:gap-4">
        <button onClick={() => setFilter('all')} className={`p5-button text-xs md:text-sm ${filter === 'all' ? 'opacity-100' : 'opacity-50'}`}>Tout</button>
        <button onClick={() => setFilter('activities')} className={`p5-button text-xs md:text-sm ${filter === 'activities' ? 'opacity-100' : 'opacity-50'}`}>Activités</button>
        <button onClick={() => setFilter('books')} className={`p5-button text-xs md:text-sm ${filter === 'books' ? 'opacity-100' : 'opacity-50'}`}>Livres</button>
        <button onClick={() => setFilter('dvds')} className={`p5-button text-xs md:text-sm ${filter === 'dvds' ? 'opacity-100' : 'opacity-50'}`}>DVDs</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(filter === 'all' || filter === 'activities') && data.activites.map(act => (
          <button key={act.id} onClick={() => handleLog(act)} className="p5-card text-left group">
            <div className="flex justify-between items-start">
              <h4 className="font-bold text-lg group-hover:text-p5-red transition-colors">{act.name}</h4>
              <Briefcase size={20} className="text-p5-red" />
            </div>
            <div className="mt-4 flex items-center gap-2 bg-p5-black/40 p-2 border-l-2 border-p5-red">
              <span className="font-black italic uppercase text-xs tracking-tighter">{act.stat}</span>
              <div className="flex text-p5-red">
                {[...Array(act.points)].map((_, i) => <Music key={i} size={14} fill="currentColor" />)}
              </div>
              <span className="text-xs font-bold text-white/60 ml-auto">+{act.points}</span>
            </div>
          </button>
        ))}

        {(filter === 'all' || filter === 'books') && data.livres.map(book => (
          <button key={book.id} onClick={() => handleLog(book)} className="p5-card text-left group">
            <div className="flex justify-between items-start">
              <h4 className="font-bold text-lg group-hover:text-p5-red transition-colors">{book.name}</h4>
              <BookOpen size={20} className="text-p5-red" />
            </div>
            <div className="mt-4 flex items-center gap-2 bg-p5-black/40 p-2 border-l-2 border-p5-red">
              <span className="font-black italic uppercase text-xs tracking-tighter">{book.stat}</span>
              <div className="flex text-p5-red">
                {[...Array(book.points)].map((_, i) => <Music key={i} size={14} fill="currentColor" />)}
              </div>
              <span className="text-xs font-bold text-white/60 ml-auto">+{book.points}</span>
            </div>
            <div className="mt-2 text-[10px] text-white/30 uppercase font-black tracking-widest">{book.location} • {book.chapters} chapitres</div>
          </button>
        ))}

        {(filter === 'all' || filter === 'dvds') && data.dvds.map(dvd => (
          <button key={dvd.id} onClick={() => handleLog(dvd)} className="p5-card text-left group">
            <div className="flex justify-between items-start">
              <h4 className="font-bold text-lg group-hover:text-p5-red transition-colors">{dvd.name}</h4>
              <Tv size={20} className="text-p5-red" />
            </div>
            <div className="mt-4 flex items-center gap-2 bg-p5-black/40 p-2 border-l-2 border-p5-red">
              <span className="font-black italic uppercase text-xs tracking-tighter">{dvd.stat}</span>
              <div className="flex text-p5-red">
                {[...Array(dvd.points)].map((_, i) => <Music key={i} size={14} fill="currentColor" />)}
              </div>
              <span className="text-xs font-bold text-white/60 ml-auto">+{dvd.points}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActivityLogger;
