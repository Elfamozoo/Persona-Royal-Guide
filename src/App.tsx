import React, { useState } from 'react'
import StatTracker from './components/StatTracker'
import ActivityLogger from './components/ActivityLogger'
import Calendar from './components/Calendar'
import FusionLab from './components/FusionLab'
import SkillsList from './components/SkillsList'
import ConfidantGuide from './components/ConfidantGuide'
import BackupManager from './components/BackupManager'
import { useCalendar } from './context/CalendarContext'
import { LayoutDashboard, Book, TrendingUp, Sparkles, UserCircle, Zap } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const { currentDate } = useCalendar()

  const tabs = [
    { id: 'dashboard', label: 'Accueil', icon: LayoutDashboard },
    { id: 'calendar', label: 'Journal', icon: Book },
    { id: 'stats', label: 'Stats', icon: TrendingUp },
    { id: 'fusions', label: 'Fusions', icon: Sparkles },
    { id: 'skills', label: 'Aptitudes', icon: Zap },
    { id: 'confidants', label: 'Confidents', icon: UserCircle },
  ]

  return (
    <div className="min-h-screen pb-24">
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
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <ActivityLogger />
              </div>
              <div className="md:w-80">
                <BackupManager />
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'stats' && <StatTracker />}
        {activeTab === 'calendar' && <Calendar />}
        {activeTab === 'fusions' && <FusionLab />}
        {activeTab === 'skills' && <SkillsList />}
        {activeTab === 'confidants' && <ConfidantGuide />}
      </main>

      <nav className="fixed bottom-0 left-0 w-full bg-p5-black border-t-4 border-p5-red z-[150] px-2 py-3">
        <div className="container mx-auto max-w-lg flex justify-between gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 flex-1 py-2 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? 'bg-p5-red text-white scale-110 shadow-lg' 
                    : 'text-p5-white/40 hover:text-p5-white hover:bg-p5-gray/20'
                }`}
              >
                <Icon size={isActive ? 24 : 20} />
                <span className={`text-[8px] font-black uppercase tracking-tighter ${isActive ? 'block' : 'hidden'}`}>
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
