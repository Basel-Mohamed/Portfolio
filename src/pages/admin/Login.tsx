import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router';
import { FaLock, FaEnvelope, FaSpinner } from 'react-icons/fa6';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // If already logged in, redirect immediately to admin dashboard
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/admin');
    });
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setError('Please provide both email and password.');
      setLoading(false);
      return;
    }

    // Strict sign in attempt only (auto-signup backdoor removed for security)
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: cleanPassword,
    });

    if (signInError) {
      // Return a safe, generic message to prevent account enumeration
      if (signInError.message.toLowerCase().includes('invalid login credentials')) {
        setError('Invalid admin credentials. Please verify your email and password.');
      } else {
        setError(signInError.message);
      }
      setLoading(false);
      return;
    }

    if (data.session) {
      navigate('/admin');
    } else {
      setError('Authentication succeeded but no active session was returned.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117] p-4">
      <div className="max-w-md w-full p-8 bg-[#161b22] rounded-3xl border border-gray-800 shadow-2xl relative overflow-hidden">
        {/* Decorative Top Gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

        <div className="w-12 h-12 bg-blue-900/30 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
          <FaLock size={20} />
        </div>

        <h2 className="text-2xl font-bold text-white mb-2 text-center">Admin Console</h2>
        <p className="text-gray-400 text-center mb-8 text-xs">
          Sign in with authorized administrator credentials
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/40 text-red-400 p-3.5 rounded-xl mb-6 text-xs leading-relaxed font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">
              Admin Email
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-gray-500 pointer-events-none">
                <FaEnvelope size={14} />
              </span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0d1117] border border-gray-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-sans"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">
              Master Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-gray-500 pointer-events-none">
                <FaLock size={14} />
              </span>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0d1117] border border-gray-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-sans"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 flex items-center justify-center gap-2 mt-6 text-sm"
          >
            {loading ? (
              <>
                <FaSpinner size={16} className="animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              'Sign In to Dashboard'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
