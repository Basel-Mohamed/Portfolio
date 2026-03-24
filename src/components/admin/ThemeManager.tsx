import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const THEMES = [
  { id: 'default', name: 'System Default', color: 'bg-gray-700', shadow: '' },
  { id: 'blue', name: 'Ocean Blue', color: 'bg-blue-500', shadow: 'shadow-blue-500/50' },
  { id: 'emerald', name: 'Matrix Emerald', color: 'bg-emerald-500', shadow: 'shadow-emerald-500/50' },
  { id: 'purple', name: 'Cyber Purple', color: 'bg-purple-500', shadow: 'shadow-purple-500/50' },
  { id: 'rose', name: 'Neon Rose', color: 'bg-rose-500', shadow: 'shadow-rose-500/50' },
  { id: 'amber', name: 'Solar Flare', color: 'bg-amber-500', shadow: 'shadow-amber-500/50' },
];

export function ThemeManager() {
  const [activeTheme, setActiveTheme] = useState('blue');
  const [selectedTheme, setSelectedTheme] = useState('blue');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase.from('site_settings').select('theme_color').single();
      if (data && data.theme_color) {
         setActiveTheme(data.theme_color);
         setSelectedTheme(data.theme_color);
      }
      setLoading(false);
    }
    fetchSettings();
  }, []);

  const handleUpdate = async () => {
    setSaving(true);
    setMessage('');

    const { data: existing } = await supabase.from('site_settings').select('id').eq('id', 1).single();
    
    if (existing) {
      await supabase.from('site_settings').update({ theme_color: selectedTheme }).eq('id', 1);
    } else {
      await supabase.from('site_settings').insert([{ id: 1, theme_color: selectedTheme, ai_prompt: 'You are a helpful assistant.' }]);
    }
    
    setActiveTheme(selectedTheme);
    setSaving(false);
    setMessage('Brand Color Synced!');
    setTimeout(() => setMessage(''), 3000);
  };

  if (loading) return <div className="text-gray-400 flex h-full items-center justify-center">Negotiating themes...</div>;

  return (
    <div className="bg-[#161b22] p-8 rounded-2xl border border-gray-800 flex flex-col h-full shadow-lg">
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
        <span>🎨</span> Global Brand Theme
      </h2>
      <p className="text-gray-400 mb-8 text-sm leading-relaxed">
        Select a primary accent color. This heavily overrides the underlying Tailwind palette dynamically across all components instantly on next load.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow content-start">
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            onClick={() => { setSelectedTheme(theme.id); setMessage('Unsaved changes'); }}
            disabled={saving}
            className={`flex items-center gap-4 p-4 rounded-xl border transition-all hover:-translate-y-1 ${
              selectedTheme === theme.id 
                ? 'border-blue-500 bg-blue-500/10 scale-100' 
                : 'border-gray-800 hover:border-gray-600 bg-[#0d1117] hover:shadow-lg'
            }`}
          >
            <div className={`w-6 h-6 rounded-full ${theme.color} shadow-[0_0_15px_rgba(0,0,0,0.5)] ${selectedTheme === theme.id ? theme.shadow : ''}`} />
            <span className={`font-semibold ${selectedTheme === theme.id ? 'text-white' : 'text-gray-400'}`}>{theme.name}</span>
            {selectedTheme === theme.id && <span className="ml-auto text-blue-500 font-black">✓</span>}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-800">
        <span className={`text-sm font-bold ${message === 'Unsaved changes' ? 'text-yellow-500 animate-pulse' : 'text-emerald-400'}`}>
          {message}
        </span>
        <button
          onClick={handleUpdate}
          disabled={saving || activeTheme === selectedTheme}
          className="flex lg:w-auto w-full justify-center items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:scale-100 text-white font-bold rounded-lg shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          {saving ? 'Syncing...' : 'Save Brand Theme'}
        </button>
      </div>
    </div>
  );
}
