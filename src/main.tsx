import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { StatsProvider } from './context/StatsContext'
import './styles/theme.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StatsProvider>
      <App />
    </StatsProvider>
  </React.StrictMode>,
)
