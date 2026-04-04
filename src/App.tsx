import React, { useState } from 'react'
import StatTracker from './components/StatTracker'
import ActivityLogger from './components/ActivityLogger'
import Calendar from './components/Calendar'
import FusionLab from './components/FusionLab'
import BackupManager from './components/BackupManager'
import { useCalendar } from './context/CalendarContext'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const { currentDate } = useCalendar()

  const navButtonStyle = (active: boolean): React.CSSProperties => ({
    background: active ? 'var(--p5-white)' : 'transparent',
    color: active ? 'var(--p5-red)' : 'var(--p5-white)',
    border: 'none',
    padding: '10px 15px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    cursor: 'pointer',
    fontSize: '0.8rem',
    clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)',
    transition: 'all 0.2s ease'
  })

  return (
    <div className="app">
      <header className="p5-header">
        <h1>Le Navigateur du Voleur</h1>
      </header>
      
      <main style={{ padding: '20px', paddingBottom: '120px', maxWidth: '1200px', margin: '0 auto' }}>
        {activeTab === 'dashboard' && (
          <div>
            <div className="p5-diagonal" style={{ marginBottom: '2rem' }}>
              BIENVENUE, JOKER. NOUS SOMMES LE {currentDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' }).toUpperCase()}
            </div>
            <ActivityLogger />
            <BackupManager />
          </div>
        )}
        {activeTab === 'stats' && <StatTracker />}
        {activeTab === 'calendar' && <Calendar />}
        {activeTab === 'fusions' && <FusionLab />}
        {activeTab === 'confidants' && <div className="p5-diagonal">Confidents (Bientôt disponible)</div>}
      </main>

      <nav className="bottom-nav">
        <button onClick={() => setActiveTab('dashboard')} style={navButtonStyle(activeTab === 'dashboard')}>Accueil</button>
        <button onClick={() => setActiveTab('calendar')} style={navButtonStyle(activeTab === 'calendar')}>Journal</button>
        <button onClick={() => setActiveTab('stats')} style={navButtonStyle(activeTab === 'stats')}>Stats</button>
        <button onClick={() => setActiveTab('fusions')} style={navButtonStyle(activeTab === 'fusions')}>Fusions</button>
        <button onClick={() => setActiveTab('confidants')} style={navButtonStyle(activeTab === 'confidants')}>Confidents</button>
      </nav>
    </div>
  )
}

export default App
