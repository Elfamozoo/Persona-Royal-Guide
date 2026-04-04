import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { StatsProvider } from './context/StatsContext'
import { CalendarProvider } from './context/CalendarContext'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StatsProvider>
      <CalendarProvider>
        <App />
      </CalendarProvider>
    </StatsProvider>
  </React.StrictMode>,
)
