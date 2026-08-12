import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Onboarding = () => {
  const navigate = useNavigate();
  const { login } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      name: form.fullName || 'Vetora Student',
      email: form.email || 'student@vetora.edu',
      initials: (form.fullName || 'V S').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPQmBGn01KnqkuSPySbhOH37sR7r2GkTNO8u81tUNaxyl2Y3riAnRfRe8RsP5MY12ZIgd2iwjaaU3m7zYwJ01s5DYSNKuUjUD-uOsLaHpX1VlyyJAa_nphvtqJiwdHIMOE-s68o4dKSD6yNL47zwR7Nafn34Yoi0EOzztMtnt8p1xFsv5qp3ev46qIIDh-FPk3CcOkGIpYsIh2vtu0qWCpJGfL9xb0ac4ym89pyKJ7caQwTDMKxkF4'
    });
    navigate('/dashboard');
  };

  return (
    <div className="bg-surface text-on-surface font-sans antialiased min-h-screen flex flex-col items-center justify-center p-4 md:p-6 relative">
      {/* Subtle Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-container rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-container rounded-full blur-[100px]"></div>
      </div>

      {/* Top App Bar */}
      <header className="fixed top-0 left-0 right-0 w-full flex justify-center py-4 z-50">
        <Link to="/" className="font-display text-2xl font-bold text-primary tracking-tight">Vetora</Link>
      </header>

      {/* Main Content Canvas */}
      <main className="w-full max-w-[450px] relative z-10 mt-16">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-sans text-sm text-primary">Step 1 of 5</span>
            <span className="font-sans text-xs text-on-surface-variant">Basic Information</span>
          </div>
          <div className="h-1 w-full bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full bg-secondary-fixed-dim rounded-full transition-all duration-500 ease-in-out" style={{ width: '20%' }}></div>
          </div>
        </div>

        {/* Onboarding Card */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0_2px_4px_rgba(13,92,99,0.08)] p-8 relative overflow-hidden hover:border-primary hover:shadow-[0_8px_16px_rgba(13,92,99,0.12)] transition-all duration-300">
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl text-on-surface mb-2">Welcome to Vetora</h1>
            <p className="font-sans text-base text-on-surface-variant">Let's set up your academic profile. Precision starts here.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Profile Photo Upload */}
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-outline-variant bg-surface-container flex items-center justify-center mb-2 cursor-pointer hover:bg-surface-container-high hover:border-primary transition-colors duration-200">
                <span className="material-symbols-outlined text-outline" style={{ fontSize: '32px' }}>add_a_photo</span>
              </div>
              <span className="font-sans text-xs text-on-surface-variant">Upload Photo</span>
            </div>

            {/* Full Name */}
            <div className="space-y-1">
              <label className="block font-sans text-sm text-on-surface" htmlFor="fullName">Full Name</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none">person</span>
                <input
                  className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface font-sans text-base focus:outline-none focus:border-primary focus:border-2 focus:shadow-[0_0_0_4px_rgba(13,92,99,0.1)] transition-all duration-200"
                  id="fullName"
                  placeholder="Dr. Jane Doe"
                  required
                  type="text"
                  value={form.fullName}
                  onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="block font-sans text-sm text-on-surface" htmlFor="email">Institution Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none">mail</span>
                <input
                  className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface font-sans text-base focus:outline-none focus:border-primary focus:border-2 focus:shadow-[0_0_0_4px_rgba(13,92,99,0.1)] transition-all duration-200"
                  id="email"
                  placeholder="jane.doe@university.edu"
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="block font-sans text-sm text-on-surface" htmlFor="password">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none">lock</span>
                <input
                  className="w-full pl-10 pr-10 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface font-sans text-base focus:outline-none focus:border-primary focus:border-2 focus:shadow-[0_0_0_4px_rgba(13,92,99,0.1)] transition-all duration-200"
                  id="password"
                  placeholder="••••••••"
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                />
                <button
                  aria-label="Toggle password visibility"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary transition-colors focus:outline-none"
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                >
                  <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
              <p className="font-sans text-xs text-outline mt-1">Must be at least 8 characters.</p>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                className="w-full bg-primary text-on-primary font-sans text-sm py-3 px-4 rounded-lg hover:bg-on-primary-fixed-variant transition-colors duration-200 flex justify-center items-center group"
                type="submit"
              >
                Continue
                <span className="material-symbols-outlined ml-2 text-[20px] group-hover:translate-x-1 transition-transform duration-200">arrow_forward</span>
              </button>
            </div>
          </form>
        </div>

        {/* Transactional Footer */}
        <div className="mt-8 text-center">
          <p className="font-sans text-xs text-on-surface-variant">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline font-bold transition-colors">Sign In</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
