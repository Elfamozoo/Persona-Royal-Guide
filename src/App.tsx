import React, { useState } from 'react'
import StatTracker from './components/StatTracker'

function App() {
  const [activeTab, setActiveTab] = useState('stats')

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
        {activeTab === 'stats' && <StatTracker />}
        {activeTab === 'calendar' && <div className="p5-diagonal">Calendrier (Bientôt disponible)</div>}
        {activeTab === 'fusions' && <div className="p5-diagonal">Fusions (Bientôt disponible)</div>}
        {activeTab === 'confidants' && <div className="p5-diagonal">Confidents (Bientôt disponible)</div>}
      </main>

      <nav className="bottom-nav">
        <button onClick={() => setActiveTab('calendar')} style={navButtonStyle(activeTab === 'calendar')}>Calendrier</button>
        <button onClick={() => setActiveTab('stats')} style={navButtonStyle(activeTab === 'stats')}>Stats</button>
        <button onClick={() => setActiveTab('fusions')} style={navButtonStyle(activeTab === 'fusions')}>Fusions</button>
        <button onClick={() => setActiveTab('confidants')} style={navButtonStyle(activeTab === 'confidants')}>Confidents</button>
      </nav>
    </div>
  )
}

export default App
