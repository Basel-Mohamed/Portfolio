import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router';
import { PromptEditor } from '../../components/admin/PromptEditor';
import { ThemeManager } from '../../components/admin/ThemeManager';
import { UniversalDataEditor } from '../../components/admin/UniversalDataEditor';

const SESSION_TIMEOUT = 3 * 60 * 1000; // 3 minutes
const WARNING_THRESHOLD = 30; // Show warning in last 30 seconds

export function Dashboard() {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(SESSION_TIMEOUT / 1000);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const lastActivityRef = useRef(Date.now());

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  }, [navigate]);

  const resetTimer = useCallback(() => {
    lastActivityRef.current = Date.now();
    setSecondsLeft(SESSION_TIMEOUT / 1000);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      handleLogout();
    }, SESSION_TIMEOUT);
  }, [handleLogout]);

  useEffect(() => {
    // Start the countdown interval
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - lastActivityRef.current;
      const remaining = Math.max(0, Math.ceil((SESSION_TIMEOUT - elapsed) / 1000));
      setSecondsLeft(remaining);
    }, 1000);

    // Set initial timeout
    resetTimer();

    // Track user activity
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach(e => window.addEventListener(e, resetTimer));

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      events.forEach(e => window.removeEventListener(e, resetTimer));
    };
  }, [resetTimer]);

  const showWarning = secondsLeft <= WARNING_THRESHOLD;
  const progressPercent = (secondsLeft / (SESSION_TIMEOUT / 1000)) * 100;

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              CMS Dashboard
            </h1>
            <p className="text-gray-400 font-medium tracking-wide">Secure Data & Assets Administration Node</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Session Timer */}
            <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-all ${
              showWarning 
                ? 'bg-red-600/10 border-red-500/50 animate-pulse' 
                : 'bg-gray-800/50 border-gray-700'
            }`}>
              <div className="w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${showWarning ? 'bg-red-500' : 'bg-blue-500'}`} 
                  style={{ width: `${progressPercent}%` }} 
                />
              </div>
              <span className={`text-xs font-mono font-bold ${showWarning ? 'text-red-400' : 'text-gray-400'}`}>
                {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}
              </span>
            </div>

            <button 
              onClick={handleLogout} 
              className="px-6 py-2.5 bg-red-600/10 hover:bg-red-600 border border-red-600/30 text-red-500 hover:text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-red-500/20"
            >
              Terminate Session
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start mb-8">
           <PromptEditor />
           <ThemeManager />
        </div>

        <div className="mb-8">
           <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
              <span>💼</span> Universal Array Modifier
           </h2>
           <UniversalDataEditor />
        </div>
      </div>
    </div>
  );
}
