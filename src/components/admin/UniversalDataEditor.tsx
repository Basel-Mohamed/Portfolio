import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { FaPlus, FaTrash, FaSave, FaCloudUploadAlt, FaImage } from 'react-icons/fa';

const STORAGE_BUCKET = 'portfolio-assets';

export function UniversalDataEditor() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('');
  const [activeLang, setActiveLang] = useState<string>('en');
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [jsonText, setJsonText] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: rows } = await supabase.from('portfolio_content').select('*').order('created_at', { ascending: true });
    
    if (rows && rows.length > 0) {
       const initialSections = Array.from(new Set(rows.map(r => r.section))).sort();
       setActiveSection(initialSections[0] as string);
    }
    
    setData(rows || []);
    setLoading(false);
  }

  const sections = Array.from(new Set(data.map(r => r.section))).sort();
  const languages = ['en', 'ar'];

  const filteredRows = data.filter(r => r.section === activeSection && r.language === activeLang);

  const handleSelectRow = (row: any) => {
    setSelectedRow(row);
    setJsonText(JSON.stringify(row.content, null, 2));
    setSaveStatus('');
  };

  const handleSave = async () => {
    setSaveStatus('Saving...');
    try {
      const parsed = JSON.parse(jsonText);
      const { error } = await supabase.from('portfolio_content').update({ content: parsed }).eq('id', selectedRow.id);
      if (error) throw error;
      
      setSaveStatus('✅ System Updated Successfully!');
      setData(prev => prev.map(r => r.id === selectedRow.id ? { ...r, content: parsed } : r));
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (err: any) {
      setSaveStatus(`❌ Error: ${err.message}`);
    }
  };

  const handleAdd = async () => {
    const newContent = { title: "New Item", description: "Edit me" };
    const { data: newRow, error } = await supabase.from('portfolio_content')
      .insert([{ section: activeSection, language: activeLang, content: newContent }])
      .select()
      .single();
      
    if (!error && newRow) {
      setData(prev => [...prev, newRow]);
      handleSelectRow(newRow);
    } else {
        alert("Failed to create row");
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to permanently delete this item?")) return;
    
    await supabase.from('portfolio_content').delete().eq('id', id);
    setData(prev => prev.filter(r => r.id !== id));
    if (selectedRow?.id === id) {
        setSelectedRow(null);
        setJsonText('');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedRow) return;

    setUploading(true);
    setSaveStatus('Uploading image...');

    try {
      // Create a unique path: section/timestamp-filename
      const ext = file.name.split('.').pop();
      const filePath = `${activeSection}/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;

      // Inject the URL into the JSON at the "image" key
      const parsed = JSON.parse(jsonText);
      parsed.image = publicUrl;
      const updatedJson = JSON.stringify(parsed, null, 2);
      setJsonText(updatedJson);

      // Auto-save to DB
      await supabase.from('portfolio_content').update({ content: parsed }).eq('id', selectedRow.id);
      setData(prev => prev.map(r => r.id === selectedRow.id ? { ...r, content: parsed } : r));

      setSaveStatus('✅ Image uploaded & saved!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (err: any) {
      setSaveStatus(`❌ Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const getRowTitle = (content: any) => {
      return content.title || content.name || content.role || content.email || 'Data Node';
  };

  // Check if the current JSON has an "image" field
  const hasImageField = (() => {
    try {
      const parsed = JSON.parse(jsonText);
      return 'image' in parsed;
    } catch { return false; }
  })();

  if (loading) return <div className="text-gray-400 p-8 flex items-center justify-center border border-gray-800 rounded-2xl h-64 shadow-lg bg-[#161b22]">Establishing remote connection...</div>;

  return (
    <div className="bg-[#161b22] rounded-2xl border border-gray-800 shadow-lg overflow-hidden flex flex-col md:flex-row min-h-[600px]">
      
      {/* Sidebar: Navigation */}
      <div className="w-full md:w-64 bg-[#0d1117] border-r border-gray-800 flex flex-col shrink-0">
        <div className="p-4 border-b border-gray-800">
          <h3 className="font-bold text-gray-200 mb-3">Database Explorer</h3>
          <div className="flex gap-2 mb-3">
             {languages.map(lang => (
                 <button 
                   key={lang}
                   onClick={() => { setActiveLang(lang); setSelectedRow(null); }}
                   className={`flex-1 py-1.5 rounded text-sm font-bold transition-colors ${activeLang === lang ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                 >
                     {lang.toUpperCase()}
                 </button>
             ))}
          </div>
          <select 
             value={activeSection}
             onChange={(e) => { setActiveSection(e.target.value); setSelectedRow(null); }}
             className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500"
          >
             {sections.map(sec => <option key={sec} value={sec}>{sec.toUpperCase().replace('_', ' ')}</option>)}
          </select>
        </div>

        <div className="flex-1 overflow-y-auto p-2 scrollbar-hide space-y-1">
             {filteredRows.map(row => (
                 <div 
                   key={row.id} 
                   onClick={() => handleSelectRow(row)}
                   className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${selectedRow?.id === row.id ? 'bg-blue-600/20 border border-blue-500/50' : 'hover:bg-gray-800 border border-transparent'}`}
                 >
                     <span className={`text-sm truncate pr-2 ${selectedRow?.id === row.id ? 'text-blue-400 font-bold' : 'text-gray-400'}`}>
                         {getRowTitle(row.content)}
                     </span>
                     <button onClick={(e) => handleDelete(row.id, e)} className="text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                         <FaTrash size={12} />
                     </button>
                 </div>
             ))}
        </div>
        
        <div className="p-4 border-t border-gray-800">
            <button onClick={handleAdd} className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                <FaPlus size={12} /> Add New Node
            </button>
        </div>
      </div>

      {/* Main Area: JSON Editor */}
      <div className="flex-1 flex flex-col bg-[#161b22]">
          {selectedRow ? (
              <>
                  <div className="p-4 border-b border-gray-800 flex flex-wrap justify-between items-center gap-3 bg-[#0d1117]/50">
                      <span className="text-green-400 font-mono text-xs truncate max-w-md">ID: {selectedRow.id}</span>
                      <div className="flex items-center gap-3 flex-wrap">
                          <span className={`text-xs font-bold ${saveStatus.includes('Error') || saveStatus.includes('failed') ? 'text-red-400' : 'text-emerald-400'}`}>
                              {saveStatus}
                          </span>
                          
                          {/* Image Upload Button - only shows when JSON has an "image" field */}
                          {hasImageField && (
                            <>
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                              />
                              <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="flex items-center gap-2 px-4 py-1.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-sm font-bold rounded-md shadow-lg transition-transform hover:scale-105 active:scale-95"
                              >
                                {uploading ? (
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <FaCloudUploadAlt />
                                )}
                                {uploading ? 'Uploading...' : 'Upload Image'}
                              </button>
                            </>
                          )}
                          
                          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-md shadow-lg transition-transform hover:scale-105 active:scale-95">
                              <FaSave /> Save Payload
                          </button>
                      </div>
                  </div>

                  {/* Image Preview */}
                  {hasImageField && (() => {
                    try {
                      const parsed = JSON.parse(jsonText);
                      if (parsed.image && (parsed.image.startsWith('http') || parsed.image.startsWith('/'))) {
                        return (
                          <div className="p-4 border-b border-gray-800 bg-[#0d1117]/30">
                            <div className="flex items-center gap-3 mb-2">
                              <FaImage className="text-gray-500" size={14} />
                              <span className="text-xs text-gray-500 font-mono truncate">{parsed.image}</span>
                            </div>
                            <img src={parsed.image} alt="Preview" className="max-h-40 rounded-lg border border-gray-800 object-cover" />
                          </div>
                        );
                      }
                    } catch {}
                    return null;
                  })()}

                  <textarea 
                     value={jsonText}
                     onChange={(e) => setJsonText(e.target.value)}
                     className="flex-1 w-full bg-[#161b22] text-gray-300 font-mono p-6 text-sm focus:outline-none resize-none"
                     spellCheck="false"
                  />
              </>
          ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                  <span className="text-4xl mb-4">🗄️</span>
                  <p>Select a data node from the explorer to modify its JSON payload.</p>
              </div>
          )}
      </div>
    </div>
  );
}
