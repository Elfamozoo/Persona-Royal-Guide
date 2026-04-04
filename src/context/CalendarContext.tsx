import React, { createContext, useContext, useState, useEffect } from 'react';

interface ActivityLog {
  date: string;
  timeSlot: 'Matin' | 'Après-midi' | 'Soir';
  activityId: string;
  activityName: string;
  statPoints: number;
  statName: string;
}

interface CalendarContextType {
  currentDate: Date;
  history: ActivityLog[];
  logActivity: (log: Omit<ActivityLog, 'date'>) => void;
  nextDay: () => void;
  prevDay: () => void;
  jumpToDate: (date: Date) => void;
  resetCalendar: () => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

// Game starts on April 9th
const INITIAL_DATE = new Date(2026, 3, 9); // Using 2026 as current year

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    const saved = localStorage.getItem('p5r_date');
    return saved ? new Date(saved) : INITIAL_DATE;
  });

  const [history, setHistory] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem('p5r_history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('p5r_date', currentDate.toISOString());
  }, [currentDate]);

  useEffect(() => {
    localStorage.setItem('p5r_history', JSON.stringify(history));
  }, [history]);

  const logActivity = (log: Omit<ActivityLog, 'date'>) => {
    const newLog = { ...log, date: currentDate.toLocaleDateString('fr-FR') };
    setHistory(prev => [newLog, ...prev]);
  };

  const nextDay = () => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 1);
    setCurrentDate(next);
  };

  const prevDay = () => {
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 1);
    setCurrentDate(prev);
  };

  const jumpToDate = (date: Date) => {
    setCurrentDate(new Date(date));
  };

  const resetCalendar = () => {
    setCurrentDate(INITIAL_DATE);
    setHistory([]);
  };

  return (
    <CalendarContext.Provider value={{ currentDate, history, logActivity, nextDay, prevDay, jumpToDate, resetCalendar }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};
