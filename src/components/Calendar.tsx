import React from 'react';
import { useCalendar } from '../context/CalendarContext';

const Calendar: React.FC = () => {
  const { history } = useCalendar();

  return (
    <div className="calendar-history" style={{ marginTop: '20px' }}>
      <h2 className="p5-diagonal">Historique des Activités</h2>
      
      {history.length === 0 ? (
        <p style={{ fontStyle: 'italic', color: 'var(--p5-gray)' }}>Aucune activité enregistrée.</p>
      ) : (
        <div className="history-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {history.map((log, index) => (
            <div 
              key={index} 
              style={{
                background: 'var(--p5-gray)',
                padding: '10px 20px',
                borderLeft: '4px solid var(--p5-white)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transform: `translateX(${index % 2 === 0 ? '5px' : '-5px'})`
              }}
            >
              <div>
                <span style={{ fontWeight: 'bold', color: 'var(--p5-red)', textTransform: 'uppercase', marginRight: '10px' }}>
                  {log.date} - {log.timeSlot}
                </span>
                <span>{log.activityName}</span>
              </div>
              <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                +{log.statPoints} {log.statName}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calendar;
