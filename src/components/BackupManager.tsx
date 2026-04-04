import React from 'react';
import { useStats } from '../context/StatsContext';
import { useCalendar } from '../context/CalendarContext';
import { Trash2, Download, Upload } from 'lucide-react';

const BackupManager: React.FC = () => {
  const { resetStats } = useStats();
  const { resetCalendar } = useCalendar();

  const exportData = () => {
    const data = {
      p5r_stats: localStorage.getItem('p5r_stats'),
      p5r_date: localStorage.getItem('p5r_date'),
      p5r_history: localStorage.getItem('p5r_history')
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `p5r_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.p5r_stats) localStorage.setItem('p5r_stats', data.p5r_stats);
        if (data.p5r_date) localStorage.setItem('p5r_date', data.p5r_date);
        if (data.p5r_history) localStorage.setItem('p5r_history', data.p5r_history);
        
        alert('Sauvegarde restaurée avec succès ! L\'application va redémarrer.');
        window.location.reload();
      } catch (err) {
        alert('Erreur lors de l\'importation du fichier.');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('Êtes-vous sûr de vouloir tout effacer ? Cette action est irréversible.')) {
      resetStats();
      resetCalendar();
      localStorage.clear();
      alert('Toutes les données ont été effacées.');
      window.location.reload();
    }
  };

  return (
    <div className="p5-card border-white/10 space-y-6">
      <h3 className="font-black italic uppercase text-lg text-p5-red flex items-center gap-2">
        <Download size={20} /> Gestion des Données
      </h3>
      
      <div className="grid grid-cols-1 gap-3">
        <button 
          onClick={exportData}
          className="w-full flex items-center justify-between p-3 bg-p5-gray/40 hover:bg-p5-white hover:text-p5-black transition-all font-black italic uppercase text-xs"
        >
          <span>Exporter la progression</span>
          <Download size={16} />
        </button>

        <label className="w-full flex items-center justify-between p-3 bg-p5-gray/40 hover:bg-p5-white hover:text-p5-black cursor-pointer transition-all font-black italic uppercase text-xs">
          <span>Importer une sauvegarde</span>
          <Upload size={16} />
          <input type="file" accept=".json" onChange={importData} className="hidden" />
        </label>

        <button 
          onClick={handleReset}
          className="w-full flex items-center justify-between p-3 bg-p5-red/20 hover:bg-p5-red text-p5-red hover:text-white transition-all font-black italic uppercase text-xs border border-p5-red/30"
        >
          <span>Tout réinitialiser</span>
          <Trash2 size={16} />
        </button>
      </div>

      <p className="text-[10px] text-p5-white/30 italic leading-tight">
        Note: Les données sont stockées localement dans votre navigateur. L'importation ou la réinitialisation écrasera votre session actuelle.
      </p>
    </div>
  );
};

export default BackupManager;
