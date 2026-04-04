import React, { useState } from 'react';
import { useCalendar } from '../context/CalendarContext';
import { useStats } from '../context/StatsContext';
import activities from '../data/activities.json';

const ActivityLogger: React.FC = () => {
  const { currentDate, logActivity, nextDay } = useCalendar();
  const { addPoints } = useStats();
  const [isRainy, setIsRainy] = useState(false);
  const [timeSlot, setTimeSlot] = useState<'Matin' | 'Après-midi' | 'Soir'>('Après-midi');

  const handleLog = (activity: any) => {
    let points = activity.points;
    
    // Simple bonus logic
    if (isRainy && activity.bonus?.condition === 'rain') {
      points += activity.bonus.points;
    }

    if (activity.base_stat !== 'variable') {
      addPoints(activity.base_stat, points);
    }

    logActivity({
      timeSlot,
      activityId: activity.id,
      activityName: activity.name,
      statPoints: points,
      statName: activity.base_stat
    });

    // Suggest next time slot or next day
    if (timeSlot === 'Après-midi') {
      setTimeSlot('Soir');
    } else {
      setTimeSlot('Après-midi');
      nextDay();
    }
  };

  return (
    <div className="activity-logger" style={{ marginTop: '20px' }}>
      <h2 className="p5-diagonal">Journal de Bord</h2>
      
      <div className="logger-controls" style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div className="date-display" style={{ background: 'var(--p5-white)', color: 'var(--p5-red)', padding: '10px 20px', transform: 'skewX(-10deg)', fontWeight: 'bold' }}>
          {currentDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
        
        <select value={timeSlot} onChange={(e: any) => setTimeSlot(e.target.value)} style={{ padding: '10px', background: 'var(--p5-gray)', color: '#fff', border: 'none', borderBottom: '2px solid var(--p5-red)' }}>
          <option value="Matin">Matin</option>
          <option value="Après-midi">Après-midi</option>
          <option value="Soir">Soir</option>
        </select>

        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <input type="checkbox" checked={isRainy} onChange={() => setIsRainy(!isRainy)} />
          Jour de pluie ☔
        </label>
      </div>

      <div className="activities-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
        {activities.map(activity => (
          <button 
            key={activity.id} 
            onClick={() => handleLog(activity)}
            style={{
              padding: '15px',
              background: 'var(--p5-black)',
              color: 'var(--p5-white)',
              border: '2px solid var(--p5-gray)',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.2s',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--p5-red)'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--p5-gray)'}
          >
            <div style={{ fontWeight: 'bold' }}>{activity.name}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--p5-red)' }}>
              {activity.base_stat !== 'variable' ? `+${activity.points} ${activity.base_stat}` : 'Stats variables'}
            </div>
            {isRainy && activity.bonus?.condition === 'rain' && (
              <div style={{ fontSize: '0.7rem', color: '#ffd700' }}>+1 Bonus pluie</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActivityLogger;
