import React from 'react';
import { useCalendar } from '../context/CalendarContext';
import { History, ArrowUpRight } from 'lucide-react';

const Calendar: React.FC = () => {
  const { history } = useCalendar();

  return (
    <div className="space-y-6">
      <div className="p5-skew-box py-3 px-6 inline-flex items-center gap-3">
        <History size={24} className="transform skew-y-2" />
        <h2 className="text-2xl font-black italic transform skew-y-2 uppercase">Archives du Destin</h2>
      </div>
      
      {history.length === 0 ? (
        <div className="p-12 text-center border-2 border-dashed border-p5-gray rounded-xl">
          <p className="text-p5-white/30 italic text-xl font-black uppercase italic tracking-widest">Le journal est vide, Joker.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {history.map((log, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-4 bg-p5-gray/10 border-l-4 border-p5-white hover:bg-p5-red/20 transition-all group"
              style={{ transform: `skewX(${index % 2 === 0 ? '-2deg' : '2deg'})` }}
            >
              <div className="flex items-center gap-4 transform skew-x-[-inherit]">
                <div className="bg-p5-red text-white px-3 py-1 font-black text-xs italic">
                  {log.date}
                </div>
                <div className="bg-p5-white text-p5-black px-2 py-1 font-black text-[10px] uppercase">
                  {log.timeSlot}
                </div>
                <span className="font-bold text-lg group-hover:translate-x-2 transition-transform">
                  {log.activityName}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-p5-red font-black italic">
                <ArrowUpRight size={16} />
                +{log.statPoints} <span className="uppercase text-xs">{log.statName}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calendar;
