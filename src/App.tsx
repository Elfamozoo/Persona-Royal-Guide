import React, { useState } from 'react'
import StatTracker from './components/StatTracker'
import ActivityLogger from './components/ActivityLogger'
import CalendarSystem from './components/CalendarSystem'
import FusionLab from './components/FusionLab'
import SkillsList from './components/SkillsList'
import ConfidantGuide from './components/ConfidantGuide'
import BackupManager from './components/BackupManager'
import SchoolAnswers from './components/SchoolAnswers'
import { useCalendar } from './context/CalendarContext'
import masterSchedule from './data/master_schedule.json'
import { LayoutDashboard, Book, TrendingUp, Sparkles, UserCircle, Zap, GraduationCap, Sun, Moon, CloudRain, Snowflake, ThermometerSun, Wind } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const { currentDate } = useCalendar()

  const tabs = [
    { id: 'dashboard', label: 'Accueil', icon: LayoutDashboard },
    { id: 'calendar', label: 'Journal', icon: Book },
    { id: 'stats', label: 'Stats', icon: TrendingUp },
    { id: 'school', label: 'École', icon: GraduationCap },
    { id: 'fusions', label: 'Fusions', icon: Sparkles },
    { id: 'skills', label: 'Aptitudes', icon: Zap },
    { id: 'confidants', label: 'Confidents', icon: UserCircle },
  ]

  const dateKey = currentDate.toISOString().split('T')[0];
  const dayData = (masterSchedule as any)[dateKey];

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case 'Pluie':
      case 'Pluie torrentielle':
        return <CloudRain className="text-blue-400" size={20} />;
      case 'Neige':
        return <Snowflake className="text-white" size={20} />;
      case 'Canicule':
        return <ThermometerSun className="text-orange-500" size={20} />;
      case 'Alerte Pollen':
      case 'Grippe':
        return <Wind className="text-green-400" size={20} />;
      default:
        return <Sun className="text-yellow-400" size={20} />;
    }
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Dynamic Header */}
      <header className="relative mb-8 pt-4">
        <div className="p5-skew-box absolute top-0 left-0 w-full h-24 -z-10" />
        <div className="container mx-auto px-4 flex justify-between items-center h-20">
          <h1 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase text-white drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
            Le Navigateur <span className="text-p5-black bg-white px-2 ml-1">du Voleur</span>
          </h1>
          <div className="hidden md:block bg-p5-black border-2 border-white px-4 py-1 transform -rotate-2 font-mono text-sm">
            SYSTEM_ACCESS: GRANTED
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 max-w-6xl">
        {activeTab === 'dashboard' && (
          <div className="space-y-12">
            {/* 100% Guide Snapshot */}
            {dayData && (
              <div className="bg-p5-red p-1 transform -rotate-1 shadow-2xl relative overflow-hidden">
                <div className="bg-p5-black p-6 border-2 border-p5-white flex flex-col lg:flex-row gap-8 items-center relative z-10">
                  <div className="text-center lg:text-left flex items-center gap-6">
                    <div className="hidden md:block">
                      {getWeatherIcon(dayData.weather)}
                    </div>
                    <div>
                      <h2 className="text-p5-red font-black italic uppercase text-sm mb-1 tracking-widest flex items-center gap-2 justify-center lg:justify-start">
                        Guide 100% - {dayData.weather}
                      </h2>
                      <p className="text-3xl font-black italic uppercase leading-none">
                        {currentDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col gap-1 bg-p5-gray/20 p-3 border-l-4 border-p5-red group hover:bg-p5-red/10 transition-colors">
                      <div className="flex items-center gap-2 text-p5-red mb-1">
                        <Sun size={16} />
                        <span className="text-[10px] font-black uppercase italic">Journée</span>
                      </div>
                      <span className="font-bold text-xs uppercase leading-tight">{dayData.daytime}</span>
                    </div>
                    <div className="flex flex-col gap-1 bg-p5-gray/20 p-3 border-l-4 border-p5-white group hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-2 text-p5-white mb-1">
                        <Moon size={16} />
                        <span className="text-[10px] font-black uppercase italic">Soirée</span>
                      </div>
                      <span className="font-bold text-xs uppercase leading-tight">{dayData.evening}</span>
                    </div>
                  </div>
                </div>
                {/* Decorative Background Icon */}
                <div className="absolute -right-10 -bottom-10 opacity-5 transform rotate-12">
                  <Sparkles size={200} />
                </div>
              </div>
            )}

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <ActivityLogger />
              </div>
              <div className="lg:w-80 space-y-8">
                <BackupManager />
                <div className="p5-card border-p5-red/30 bg-p5-red/5">
                  <h3 className="font-black italic uppercase text-sm text-p5-red mb-4 underline">Conseil du jour</h3>
                  <p className="text-xs font-bold italic leading-relaxed opacity-70">
                    {currentDate.getDay() === 0 ? "C'est dimanche ! Pensez à l'Aojiru dans le passage souterrain de Shibuya pour un boost de stats gratuit." : "Consultez toujours votre inventaire de Personas avant un rendez-vous Confident."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'stats' && <StatTracker />}
        {activeTab === 'calendar' && <CalendarSystem />}
        {activeTab === 'school' && <SchoolAnswers />}
        {activeTab === 'fusions' && <FusionLab />}
        {activeTab === 'skills' && <SkillsList />}
        {activeTab === 'confidants' && <ConfidantGuide />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-p5-black border-t-4 border-p5-red z-[150] px-2 h-16 flex items-center overflow-x-auto custom-scrollbar">
        <div className="container mx-auto flex justify-between items-stretch h-full gap-2 md:gap-4 px-2 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center gap-1 px-4 transition-all duration-300 ${
                  isActive 
                    ? 'bg-p5-red text-white shadow-lg' 
                    : 'text-p5-white/40 hover:text-p5-white hover:bg-p5-gray/20'
                }`}
              >
                <Icon size={isActive ? 22 : 20} />
                <span className={`text-[10px] font-black uppercase tracking-tighter ${isActive ? 'block' : 'hidden'}`}>
                  {tab.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

export default App
