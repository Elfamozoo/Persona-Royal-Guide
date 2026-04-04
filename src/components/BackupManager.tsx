import React from 'react';

const BackupManager: React.FC = () => {
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

  return (
    <div className="backup-manager" style={{ marginTop: '30px', padding: '20px', border: '2px dashed var(--p5-gray)' }}>
      <h3 style={{ margin: '0 0 15px 0', textTransform: 'uppercase' }}>Gestion des Sauvegardes</h3>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <button 
          onClick={exportData}
          style={{
            padding: '10px 20px',
            background: 'var(--p5-red)',
            color: 'var(--p5-white)',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Exporter ma progression
        </button>

        <div style={{ position: 'relative' }}>
          <label 
            htmlFor="import-file"
            style={{
              padding: '10px 20px',
              background: 'var(--p5-white)',
              color: 'var(--p5-black)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Importer une sauvegarde
          </label>
          <input 
            id="import-file" 
            type="file" 
            accept=".json" 
            onChange={importData} 
            style={{ display: 'none' }}
          />
        </div>
      </div>
      <p style={{ fontSize: '0.8rem', color: 'var(--p5-gray)', marginTop: '10px' }}>
        Note: L'importation écrasera votre progression actuelle.
      </p>
    </div>
  );
};

export default BackupManager;
