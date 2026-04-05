import React, { useRef, useEffect } from 'react';
import { useCalendar } from '../context/CalendarContext';
import masterSchedule from '../data/master_schedule.json';
import { Sparkles, Sun, Moon, Calendar as CalendarIcon } from 'lucide-react';

const CalendarSystem: React.FC = () => {
  const { currentDate, jumpToDate } = useCalendar();
  const currentDayRef = useRef<HTMLDivElement>(null);
  
  const todayKey = currentDate.toISOString().split('T')[0];
  const scheduleEntries = Object.entries(masterSchedule).sort();

  useEffect(() => {
    if (currentDayRef.current) {
      currentDayRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentDate]);

  return (
    <div className="space-y-8 h-[calc(100vh-200px)] flex flex-col">
      <div className="p5-skew-box py-4 px-8 inline-flex items-center gap-3 shrink-0">
        <CalendarIcon size={28} className="transform skew-y-2" />
        <h2 className="text-3xl font-black italic transform skew-y-2 uppercase text-white tracking-tighter">Registre du Destin 100%</h2>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
        {scheduleEntries.map(([date, data]: [string, any]) => {
          const isToday = date === todayKey;
          const displayDate = new Date(date);
          
          return (
            <div 
              key={date}
              ref={isToday ? currentDayRef : null}
              onClick={() => jumpToDate(displayDate)}
              className={`p-4 transition-all cursor-pointer border-l-8 transform ${
                isToday 
                  ? 'bg-white text-p5-black border-p5-red scale-[1.02] shadow-[0_0_20px_rgba(208,0,0,0.3)] z-10' 
                  : 'bg-p5-gray/20 text-p5-white border-transparent hover:bg-p5-red/10 hover:border-white/20'
              }`}
              style={{ skewX: isToday ? '-2deg' : '0deg' }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="md:w-32 shrink-0">
                  <div className={`font-black italic text-xl ${isToday ? 'text-p5-red' : 'text-white/40'}`}>
                    {displayDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }).toUpperCase()}
                  </div>
                  <div className="text-[10px] font-bold uppercase opacity-50">
                    {displayDate.toLocaleDateString('fr-FR', { weekday: 'long' })}
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <Sun size={14} className={isToday ? 'text-p5-red' : 'text-white/20'} />
                    <span className="text-xs font-bold leading-tight">{data.daytime}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Moon size={14} className={isToday ? 'text-p5-black' : 'text-white/20'} />
                    <span className="text-xs font-bold leading-tight">{data.evening}</span>
                  </div>
                </div>

                {isToday && (
                  <div className="shrink-0 flex items-center gap-2 bg-p5-red text-white px-3 py-1 font-black italic text-[10px] animate-pulse">
                    <Sparkles size={12} /> EN COURS
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarSystem;
