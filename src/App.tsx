import React from 'react'

function App() {
  return (
    <div className="app">
      <header className="p5-header">
        <h1>Le Navigateur du Voleur</h1>
      </header>
      <main style={{ padding: '20px', paddingBottom: '80px' }}>
        <p>Bienvenue, Joker.</p>
      </main>
      <nav className="bottom-nav">
        <button>Calendrier</button>
        <button>Stats</button>
        <button>Fusions</button>
        <button>Confidents</button>
      </nav>
    </div>
  )
}

export default App
