import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

// Mock credentials — in a real app these come from a backend
const CREDENTIALS = {
  student: { email: 'student@vetora.edu',  password: 'student123' },
  admin:   { email: 'admin@vetora.edu',    password: 'admin123'   },
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useApp();

  const [role, setRole]           = useState('student'); // 'student' | 'admin'
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPass, setShowPass]   = useState(false);
  const [error, setError]         = useState('');
  const [loading, setLoading]     = useState(false);

  // Auto-fill demo credentials when switching roles
  const handleRoleSwitch = (newRole) => {
    setRole(newRole);
    setEmail(CREDENTIALS[newRole].email);
    setPassword(CREDENTIALS[newRole].password);
    setError('');
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const creds = CREDENTIALS[role];
      if (email === creds.email && password === creds.password) {
        if (role === 'admin') {
          login({ name: 'Dr. Aris (Admin)', email, initials: 'AD', role: 'admin', avatar: null });
          navigate('/admin');
        } else {
          login({ name: 'Vetora Student', email, initials: 'VS', role: 'student', avatar: null });
          navigate('/dashboard');
        }
      } else {
        setError('Invalid email or password. Use the demo credentials shown below.');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="bg-surface min-h-screen flex items-center justify-center font-sans text-on-surface">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row h-screen md:h-[800px] bg-surface-container-lowest shadow-md overflow-hidden md:rounded-xl">

        {/* Branding Side */}
        <div className="hidden md:flex md:w-1/2 relative bg-surface-variant items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1583309219338-a582f1db9a26?w=1200&auto=format&fit=crop')" }}
          />
          <div className="absolute inset-0 bg-primary/50 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-12 text-on-primary">
            <h1 className="font-display text-5xl font-bold mb-3">Vetora</h1>
            <p className="font-display text-xl font-light text-primary-fixed">Learn. Practice. Master.</p>
            <div className="mt-8 w-16 h-1 bg-secondary-fixed rounded-full opacity-80" />
          </div>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 py-12 h-full overflow-y-auto">
          <div className="w-full max-w-[420px] mx-auto">

            {/* Mobile logo */}
            <div className="md:hidden text-center mb-8">
              <h1 className="font-display text-3xl font-bold text-primary">Vetora</h1>
              <p className="font-sans text-base text-on-surface-variant mt-1">Learn. Practice. Master.</p>
            </div>

            {/* Role Switcher */}
            <div className="flex bg-surface-container rounded-xl p-1 mb-6">
              {['student', 'admin'].map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleRoleSwitch(r)}
                  className={`flex-1 py-2.5 rounded-lg font-sans text-sm font-semibold capitalize transition-all duration-200
                    ${role === r
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  {r === 'student' ? '🎓 Student' : '🏛️ Admin'}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold text-on-surface">
                {role === 'admin' ? 'Admin Portal' : 'Welcome Back'}
              </h2>
              <p className="font-sans text-sm text-on-surface-variant mt-1">
                {role === 'admin' ? 'Sign in to access the institutional dashboard.' : 'Sign in to continue your learning journey.'}
              </p>
            </div>

            {/* Demo hint box */}
            <div className="mb-5 p-3 rounded-xl bg-primary-container/40 border border-primary/20">
              <p className="font-sans text-xs font-bold text-primary mb-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">key</span>
                Demo Credentials ({role})
              </p>
              <p className="font-sans text-xs text-on-surface font-mono">Email: <span className="text-primary">{CREDENTIALS[role].email}</span></p>
              <p className="font-sans text-xs text-on-surface font-mono">Password: <span className="text-primary">{CREDENTIALS[role].password}</span></p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block font-sans text-sm font-medium text-on-surface mb-1.5" htmlFor="email">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">mail</span>
                  <input
                    id="email" type="email" required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={CREDENTIALS[role].email}
                    className="block w-full pl-10 pr-3 py-3 border-2 border-outline-variant rounded-xl bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary transition-all font-sans text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="font-sans text-sm font-medium text-on-surface" htmlFor="password">Password</label>
                  <button type="button" className="font-sans text-xs font-semibold text-primary hover:underline">Forgot password?</button>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
                  <input
                    id="password" type={showPass ? 'text' : 'password'} required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-10 py-3 border-2 border-outline-variant rounded-xl bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary transition-all font-sans text-sm"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">{showPass ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-error-container text-on-error-container text-sm font-sans">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl font-sans text-sm font-bold text-on-primary bg-primary hover:opacity-90 focus:outline-none transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-on-primary" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>Sign In as {role === 'admin' ? 'Admin' : 'Student'}</>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="font-sans text-sm text-on-surface-variant">
                Don't have an account?{' '}
                <Link to="/onboarding" className="font-semibold text-primary hover:underline">Join Now</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
