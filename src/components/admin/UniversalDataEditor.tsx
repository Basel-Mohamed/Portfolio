import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { FaPlus, FaTrash, FaSave, FaCloudUploadAlt, FaImage, FaCode, FaExclamationTriangle } from 'react-icons/fa';

const STORAGE_BUCKET = 'portfolio-assets';

// Client-side Image Compressor using HTML5 Canvas -> WebP
async function compressImageToWebP(file: File, maxDimension = 1600, quality = 0.85): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas rendering context not available'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Image compression failed'));
          },
          'image/webp',
          quality
        );
      };
      img.onerror = () => reject(new Error('Failed to load image file'));
    };
    reader.onerror = () => reject(new Error('Failed to read image file'));
  });
}

// Section-specific schema validation
export function validatePayloadStructure(section: string, parsed: any): { valid: boolean; error?: string } {
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    return { valid: false, error: 'Payload must be a valid JSON object.' };
  }

  if (section === 'projects') {
    if (!parsed.title || typeof parsed.title !== 'string') {
      return { valid: false, error: "Projects require a non-empty 'title' string." };
    }
    if (!parsed.category || typeof parsed.category !== 'string') {
      return { valid: false, error: "Projects require a 'category' string." };
    }
    if (!Array.isArray(parsed.tech)) {
      return { valid: false, error: "Projects require a 'tech' array of strings (e.g. [\"Python\", \"FastAPI\"])." };
    }
  } else if (section === 'experience') {
    if (!parsed.title || !parsed.company || !parsed.period) {
      return { valid: false, error: "Experience entries require 'title', 'company', and 'period'." };
    }
  } else if (section === 'services') {
    if (!parsed.title || !parsed.description) {
      return { valid: false, error: "Services require a 'title' and 'description'." };
    }
  } else if (section === 'certifications') {
    if (!parsed.title || !parsed.date) {
      return { valid: false, error: "Certifications require 'title' and 'date'." };
    }
  }

  return { valid: true };
}

export function UniversalDataEditor() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('');
  const [activeLang, setActiveLang] = useState<string>('en');
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [jsonText, setJsonText] = useState('');
  const [initialJsonText, setInitialJsonText] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isDirty = jsonText !== initialJsonText;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: rows } = await supabase
      .from('portfolio_content')
      .select('*')
      .order('created_at', { ascending: true });

    if (rows && rows.length > 0) {
      const initialSections = Array.from(new Set(rows.map((r) => r.section))).sort();
      setActiveSection(initialSections[0] as string);
    }

    setData(rows || []);
    setLoading(false);
  }

  const sections = Array.from(new Set(data.map((r) => r.section))).sort();
  const languages = ['en', 'ar'];
  const filteredRows = data.filter((r) => r.section === activeSection && r.language === activeLang);

  const confirmDiscardChanges = (): boolean => {
    if (isDirty) {
      return window.confirm('You have unsaved changes in this JSON node. Discard them?');
    }
    return true;
  };

  const handleSelectRow = (row: any) => {
    if (!confirmDiscardChanges()) return;
    setSelectedRow(row);
    const formatted = JSON.stringify(row.content, null, 2);
    setJsonText(formatted);
    setInitialJsonText(formatted);
    setSaveStatus('');
  };

  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonText(formatted);
      setSaveStatus('✨ JSON formatted cleanly');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (err: any) {
      setSaveStatus(`❌ Syntax error: ${err.message}`);
    }
  };

  const handleSave = async () => {
    setSaveStatus('Validating and saving...');
    try {
      let parsed: any;
      try {
        parsed = JSON.parse(jsonText);
      } catch (parseErr: any) {
        throw new Error(`Invalid JSON syntax: ${parseErr.message}`);
      }

      // Schema structure check
      const validation = validatePayloadStructure(activeSection, parsed);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      const { error } = await supabase
        .from('portfolio_content')
        .update({ content: parsed })
        .eq('id', selectedRow.id);

      if (error) throw error;

      setInitialJsonText(JSON.stringify(parsed, null, 2));
      setSaveStatus('✅ System Updated Successfully!');
      setData((prev) =>
        prev.map((r) => (r.id === selectedRow.id ? { ...r, content: parsed } : r))
      );
      setTimeout(() => setSaveStatus(''), 3500);
    } catch (err: any) {
      setSaveStatus(`❌ Error: ${err.message}`);
    }
  };

  const handleAdd = async () => {
    if (!confirmDiscardChanges()) return;

    let defaultContent: any = { title: 'New Item', description: 'Enter details' };
    if (activeSection === 'projects') {
      defaultContent = {
        title: 'New Project',
        category: 'Generative AI & ML',
        description: 'Project summary and architecture details',
        tech: ['Python', 'FastAPI'],
        type: 'ai',
        image: ''
      };
    }

    const { data: newRow, error } = await supabase
      .from('portfolio_content')
      .insert([{ section: activeSection, language: activeLang, content: defaultContent }])
      .select()
      .single();

    if (!error && newRow) {
      setData((prev) => [...prev, newRow]);
      setSelectedRow(newRow);
      const formatted = JSON.stringify(newRow.content, null, 2);
      setJsonText(formatted);
      setInitialJsonText(formatted);
      setSaveStatus('✨ New data node created');
    } else {
      alert('Failed to create new row in database.');
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to permanently delete this data node?')) return;

    await supabase.from('portfolio_content').delete().eq('id', id);
    setData((prev) => prev.filter((r) => r.id !== id));
    if (selectedRow?.id === id) {
      setSelectedRow(null);
      setJsonText('');
      setInitialJsonText('');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedRow) return;

    setUploading(true);
    setSaveStatus('Compressing to WebP...');

    try {
      // 1. Client-Side WebP compression (max 1600px, 85% quality)
      const compressedBlob = await compressImageToWebP(file);
      const cleanFileName = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '-');
      const filePath = `${activeSection}/${Date.now()}-${cleanFileName}.webp`;

      setSaveStatus('Uploading compressed WebP to Supabase Storage...');

      // 2. Upload compressed blob
      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, compressedBlob, {
          contentType: 'image/webp',
          cacheControl: '31536000',
          upsert: true
        });

      if (uploadError) throw uploadError;

      // 3. Obtain public URL
      const { data: urlData } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);
      const publicUrl = urlData.publicUrl;

      // 4. Inject URL into current JSON payload
      const parsed = JSON.parse(jsonText);
      parsed.image = publicUrl;
      const updatedJson = JSON.stringify(parsed, null, 2);
      setJsonText(updatedJson);
      setInitialJsonText(updatedJson);

      // 5. Auto-save updated content row
      await supabase.from('portfolio_content').update({ content: parsed }).eq('id', selectedRow.id);
      setData((prev) =>
        prev.map((r) => (r.id === selectedRow.id ? { ...r, content: parsed } : r))
      );

      setSaveStatus('✅ Image compressed, uploaded & linked!');
      setTimeout(() => setSaveStatus(''), 3500);
    } catch (err: any) {
      setSaveStatus(`❌ Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const getRowTitle = (content: any) => {
    return content.title || content.name || content.role || content.company || content.email || 'Data Node';
  };

  const hasImageField = (() => {
    try {
      const parsed = JSON.parse(jsonText);
      return 'image' in parsed;
    } catch {
      return false;
    }
  })();

  if (loading) {
    return (
      <div className="text-gray-400 p-8 flex items-center justify-center border border-gray-800 rounded-3xl h-64 shadow-lg bg-[#161b22]">
        Establishing remote connection...
      </div>
    );
  }

  return (
    <div className="bg-[#161b22] rounded-3xl border border-gray-800 shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[620px]">
      {/* Sidebar: Navigation & Language */}
      <div className="w-full md:w-72 bg-[#0d1117] border-r border-gray-800 flex flex-col shrink-0">
        <div className="p-4 border-b border-gray-800">
          <h3 className="font-bold text-gray-200 mb-3 text-sm flex items-center gap-2">
            <span>📂</span> Content Explorer
          </h3>
          <div className="flex gap-2 mb-3">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  if (!confirmDiscardChanges()) return;
                  setActiveLang(lang);
                  setSelectedRow(null);
                }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeLang === lang
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <select
            value={activeSection}
            onChange={(e) => {
              if (!confirmDiscardChanges()) return;
              setActiveSection(e.target.value);
              setSelectedRow(null);
            }}
            className="w-full bg-[#161b22] border border-gray-700 rounded-xl p-2.5 text-xs font-semibold text-gray-300 focus:outline-none focus:border-blue-500"
          >
            {sections.map((sec) => (
              <option key={sec} value={sec}>
                {sec.toUpperCase().replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 overflow-y-auto p-2 scrollbar-hide space-y-1">
          {filteredRows.map((row) => (
            <div
              key={row.id}
              onClick={() => handleSelectRow(row)}
              className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                selectedRow?.id === row.id
                  ? 'bg-blue-600/20 border border-blue-500/50 shadow-sm'
                  : 'hover:bg-gray-800/60 border border-transparent'
              }`}
            >
              <span
                className={`text-xs truncate pr-2 font-medium ${
                  selectedRow?.id === row.id ? 'text-blue-400 font-bold' : 'text-gray-400'
                }`}
              >
                {getRowTitle(row.content)}
              </span>
              <button
                onClick={(e) => handleDelete(row.id, e)}
                className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-500/10"
                aria-label="Delete item"
              >
                <FaTrash size={12} />
              </button>
            </div>
          ))}
          {filteredRows.length === 0 && (
            <div className="text-center py-8 text-xs text-gray-500">
              No entries in this section.
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleAdd}
            className="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all border border-gray-700 shadow-sm"
          >
            <FaPlus size={12} /> Add New Node
          </button>
        </div>
      </div>

      {/* Main Area: JSON & Media Editor */}
      <div className="flex-1 flex flex-col bg-[#161b22]">
        {selectedRow ? (
          <>
            <div className="p-4 border-b border-gray-800 flex flex-wrap justify-between items-center gap-3 bg-[#0d1117]/60">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-mono text-xs">Node:</span>
                <span className="text-blue-400 font-mono text-xs truncate max-w-xs">{selectedRow.id}</span>
                {isDirty && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <FaExclamationTriangle size={10} /> Unsaved
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-xs font-bold ${
                    saveStatus.includes('Error') || saveStatus.includes('failed') || saveStatus.includes('Syntax')
                      ? 'text-red-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {saveStatus}
                </span>

                {/* Format JSON Button */}
                <button
                  onClick={handleFormatJson}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-bold rounded-lg transition-all border border-gray-700"
                  title="Clean and indent JSON"
                >
                  <FaCode size={12} /> Format
                </button>

                {/* WebP Image Upload Button */}
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
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs font-bold rounded-lg shadow-md transition-all shadow-purple-600/20"
                    >
                      {uploading ? (
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <FaCloudUploadAlt size={14} />
                      )}
                      <span>{uploading ? 'Compressing...' : 'Upload WebP'}</span>
                    </button>
                  </>
                )}

                <button
                  onClick={handleSave}
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-md shadow-blue-600/20 transition-all hover:scale-105 active:scale-95"
                >
                  <FaSave size={13} /> Save Payload
                </button>
              </div>
            </div>

            {/* Image Preview */}
            {hasImageField && (() => {
              try {
                const parsed = JSON.parse(jsonText);
                if (parsed.image && (parsed.image.startsWith('http') || parsed.image.startsWith('/'))) {
                  return (
                    <div className="p-3.5 border-b border-gray-800 bg-[#0d1117]/30 flex items-center gap-4">
                      <img
                        src={parsed.image}
                        alt="Preview"
                        className="h-16 w-28 rounded-lg border border-gray-800 object-cover shrink-0 shadow-sm"
                      />
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-1.5 mb-1 text-xs text-gray-400 font-semibold">
                          <FaImage size={12} /> Active Image Link
                        </div>
                        <p className="text-[11px] text-gray-500 font-mono truncate max-w-lg">{parsed.image}</p>
                      </div>
                    </div>
                  );
                }
              } catch {}
              return null;
            })()}

            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              className="flex-1 w-full bg-[#161b22] text-gray-300 font-mono p-6 text-xs sm:text-sm focus:outline-none resize-none leading-relaxed"
              spellCheck="false"
            />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-8 text-center">
            <span className="text-5xl mb-4">🗄️</span>
            <h4 className="text-gray-300 font-bold text-base mb-1">No Node Selected</h4>
            <p className="text-xs text-gray-500 max-w-sm">
              Select a data item from the left explorer or create a new node to edit its JSON schema and assets.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
