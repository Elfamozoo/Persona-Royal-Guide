import React, { useMemo } from 'react';
import { useCalendar } from '../context/CalendarContext';
import { useStats } from '../context/StatsContext';
import masterSchedule from '../data/master_schedule.json';
import { Sparkles, Sun, Moon, AlertTriangle, CloudRain, Snowflake, ThermometerSun, Wind, CheckCircle2 } from 'lucide-react';

const CalendarSystem: React.FC = () => {
  const { currentDate, nextDay } = useCalendar();
  const { addPoints } = useStats();
  
  const dateKey = currentDate.toISOString().split('T')[0];
  const dayData = (masterSchedule as any)[dateKey];

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case 'Pluie':
      case 'Pluie torrentielle':
        return <CloudRain className="text-blue-400" size={24} />;
      case 'Neige':
        return <Snowflake className="text-white" size={24} />;
      case 'Canicule':
        return <ThermometerSun className="text-orange-500" size={24} />;
      case 'Alerte Pollen':
      case 'Grippe':
        return <Wind className="text-green-400" size={24} />;
      default:
        return <Sun className="text-yellow-400" size={24} />;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="p5-skew-box py-4 px-8 inline-flex items-center gap-3">
          <Sparkles size={28} className="transform skew-y-2" />
          <h2 className="text-3xl font-black italic transform skew-y-2 uppercase text-white">Guide du Destin 100%</h2>
        </div>
        
        {dayData?.weather && (
          <div className="flex items-center gap-3 bg-p5-gray/40 px-6 py-2 border-2 border-white transform skew-x-[-10deg]">
            <span className="font-black italic uppercase text-sm tracking-tighter">Météo:</span>
            {getWeatherIcon(dayData.weather)}
            <span className="font-bold text-sm uppercase">{dayData.weather}</span>
          </div>
        )}
      </div>

      {!dayData ? (
        <div className="p-12 text-center border-4 border-dashed border-p5-gray rounded-xl bg-p5-gray/10">
          <AlertTriangle size={48} className="mx-auto text-p5-red mb-4" />
          <p className="text-2xl font-black uppercase italic text-p5-white/40">Données manquantes pour cette date</p>
          <p className="text-sm mt-2 text-p5-white/20 italic">Le guide est en cours de mise à jour.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Daytime */}
          <div className="relative group">
            <div className="absolute -top-4 -left-4 bg-p5-white text-p5-black px-4 py-1 font-black italic uppercase text-sm z-10 transform -rotate-2">
              Après l'école / Journée
            </div>
            <div className="p5-card border-p5-red bg-p5-red/5 min-h-[250px] flex flex-col justify-center items-center text-center p-8">
              <Sun size={48} className="text-p5-red mb-6 opacity-20 group-hover:opacity-100 transition-opacity" />
              <p className="text-2xl font-black uppercase italic leading-tight mb-6">
                {dayData.daytime}
              </p>
            </div>
          </div>

          {/* Evening */}
          <div className="relative group">
            <div className="absolute -top-4 -left-4 bg-p5-red text-p5-white px-4 py-1 font-black italic uppercase text-sm z-10 transform rotate-2">
              Soirée
            </div>
            <div className="p5-card border-white bg-p5-gray/20 min-h-[250px] flex flex-col justify-center items-center text-center p-8">
              <Moon size={48} className="text-p5-white mb-6 opacity-20 group-hover:opacity-100 transition-opacity" />
              <p className="text-2xl font-black uppercase italic leading-tight mb-6">
                {dayData.evening}
              </p>
            </div>
          </div>

          <div className="md:col-span-2 p-6 bg-p5-black border-2 border-p5-red transform -skew-x-2">
            <h3 className="font-black italic text-p5-red uppercase mb-2 underline">Note du stratège</h3>
            <p className="text-sm font-bold leading-relaxed italic opacity-80">
              Ce planning est conçu pour le 100% "Perfect Run". Si vous avez déjà du retard, donnez la priorité aux confidents 
              <strong> Maruki (Édile)</strong>, <strong>Kasumi (Foi)</strong> et <strong>Akechi (Justice)</strong> avant novembre.
            </p>
          </div>

        </div>
      )}
    </div>
  );
};

export default CalendarSystem;
