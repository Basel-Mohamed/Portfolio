import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { DATA } from '../../lib/data';

export function PromptEditor() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchSettings() {
      const { data, error } = await supabase.from('site_settings').select('ai_prompt').single();
      if (data && data.ai_prompt) {
        setPrompt(data.ai_prompt);
      } else {
        // Fallback to data.ts if DB is completely empty
        setPrompt(DATA.en.chatbot.prompt);
      }
      if (error && error.code !== 'PGRST116') {
        console.error('Fetch error:', error);
      }
      setLoading(false);
    }
    fetchSettings();
  }, []);

  const handleLoadDefault = () => {
    setPrompt(DATA.en.chatbot.prompt);
    setMessage('Loaded default template. Remember to save!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    
    // Check if row 1 exists
    const { data: existing } = await supabase.from('site_settings').select('id').eq('id', 1).single();
    
    let error;
    if (existing) {
      const res = await supabase.from('site_settings').update({ ai_prompt: prompt }).eq('id', 1);
      error = res.error;
    } else {
      const res = await supabase.from('site_settings').insert([{ id: 1, ai_prompt: prompt, theme_color: 'blue' }]);
      error = res.error;
    }

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Prompt saved securely to Supabase!');
      setTimeout(() => setMessage(''), 3000);
    }
    setSaving(false);
  };

  if (loading) return <div className="text-gray-400 flex h-full items-center justify-center">Loading connection...</div>;

  return (
    <div className="bg-[#161b22] p-8 rounded-2xl border border-gray-800 flex flex-col h-full shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <span>⚙️</span> AI Chatbot Master Prompt
        </h2>
        <button 
          onClick={handleLoadDefault}
          className="text-xs px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors border border-gray-700"
        >
          Load Default Template
        </button>
      </div>
      <p className="text-gray-400 mb-6 text-sm leading-relaxed">
        This is the core architectural instruction given to the LLM exactly before it processes a user's question. Modifying this changes the AI's entire personality and knowledge base.
      </p>
      
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full flex-grow bg-[#0d1117] border border-gray-800 rounded-lg p-5 text-gray-300 focus:outline-none focus:border-blue-500 font-mono text-sm min-h-[350px] mb-6 transition-colors shadow-inner whitespace-pre-wrap"
        placeholder="Enter the AI instructions here..."
      />
      
      <div className="flex items-center justify-between mt-auto">
        <span className={`text-sm font-medium ${message.includes('Error') ? 'text-red-400' : 'text-emerald-400'}`}>
          {message}
        </span>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-lg transition-transform hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
        >
          {saving ? 'Updating Database...' : 'Save AI Strategy'}
        </button>
      </div>
    </div>
  );
}
