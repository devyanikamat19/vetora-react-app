import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const SPECIALTY_FIELDS = [
  { id: 'anatomy', label: 'Anatomy', icon: 'directions_walk' },
  { id: 'physiology', label: 'Physiology', icon: 'ecg' },
  { id: 'pharmacology', label: 'Pharmacology', icon: 'medication' },
  { id: 'pathology', label: 'Pathology', icon: 'microscope' },
  { id: 'surgery', label: 'Surgery', icon: 'content_cut' },
  { id: 'internal_medicine', label: 'Internal Medicine', icon: 'stethoscope' },
  { id: 'diagnostics', label: 'Diagnostics', icon: 'science' },
  { id: 'emergency_medicine', label: 'Emergency Medicine', icon: 'emergency' },
  { id: 'small_animal', label: 'Small Animal', icon: 'pets' },
  { id: 'large_animal', label: 'Large Animal', icon: 'agriculture' },
  { id: 'imaging', label: 'Imaging', icon: 'grid_on' },
  { id: 'clinical_practice', label: 'Clinical Practice', icon: 'add_box' },
];

const ROLES = [
  { id: 'student', title: 'Veterinary Student', desc: 'Enrolled in DVM, BVSc, or equivalent degree' },
  { id: 'resident', title: 'Resident / Intern', desc: 'Specialty training or general clinical internship' },
  { id: 'clinician', title: 'Practicing Veterinarian', desc: 'Licensed practitioner continuing clinical education' },
  { id: 'faculty', title: 'Faculty / Educator', desc: 'Teaching or supervising veterinary trainees' },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { login } = useApp();

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    fullName: 'Dr. Jane Doe',
    email: 'jane.doe@university.edu',
    password: '••••••••',
    photoUrl: null,
    role: 'student',
    selectedFields: ['anatomy', 'surgery', 'small_animal', 'diagnostics'],
    goal: 'daily',
  });

  const toggleField = (id) => {
    setForm(prev => {
      const exists = prev.selectedFields.includes(id);
      return {
        ...prev,
        selectedFields: exists
          ? prev.selectedFields.filter(item => item !== id)
          : [...prev.selectedFields, id]
      };
    });
  };

  const handleNext = (e) => {
    if (e) e.preventDefault();
    if (step < 5) {
      setStep(s => s + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(s => s - 1);
  };

  const handleComplete = () => {
    login({
      name: form.fullName || 'Dr. Jane Doe',
      email: form.email || 'jane.doe@university.edu',
      initials: (form.fullName || 'J D').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
      role: form.role,
      selectedFields: form.selectedFields,
      avatar: form.photoUrl || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80'
    });
    navigate('/dashboard');
  };

  const progressPct = Math.round((step / 5) * 100);

  return (
    <div className="bg-[#f4f7f6] text-[#1b2a2a] font-sans antialiased min-h-screen flex flex-col justify-start items-center p-4 md:p-6 relative pt-20">
      {/* Ambient background blur */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-25">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#0d5c63]/15 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#4e9f93]/15 rounded-full blur-[100px]" />
      </div>

      {/* Top Header Navigation */}
      <header className="fixed top-0 left-0 right-0 w-full flex justify-center py-4 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/80 shadow-2xs">
        <Link to="/" className="font-display text-2xl font-bold text-[#0d5c63] tracking-tight">
          Vetora
        </Link>
      </header>

      {/* Main Form Box Wrapper */}
      <main className={`w-full shrink-0 relative z-10 transition-all duration-300 mx-auto ${step === 3 ? 'max-w-3xl' : 'max-w-md'}`}>
        
        {/* Step Progress Bar Header */}
        <div className="mb-6 w-full">
          <div className="flex justify-between items-center mb-1.5 text-xs font-bold text-[#0d5c63]">
            <span>Step {step} of 5</span>
            <span className="text-gray-500 font-semibold">{progressPct}%</span>
          </div>
          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0d5c63] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* STEP 1: Basic Information */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 md:p-8 hover:shadow-md transition-all">
            <div className="text-center mb-6">
              <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Welcome to Vetora</h1>
              <p className="font-sans text-xs text-gray-500">Set up your academic profile to get started.</p>
            </div>

            <form onSubmit={handleNext} className="space-y-4">
              <div className="flex flex-col items-center justify-center mb-4">
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center mb-1 cursor-pointer hover:bg-gray-100 hover:border-[#0d5c63] transition-colors">
                  <span className="material-symbols-outlined text-gray-400 text-[28px]">add_a_photo</span>
                </div>
                <span className="font-sans text-[11px] text-gray-400 font-medium">Upload Photo</span>
              </div>

              <div className="space-y-1">
                <label className="block font-sans text-xs font-semibold text-gray-700" htmlFor="fullName">Full Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">person</span>
                  <input
                    id="fullName"
                    className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-800 font-sans text-xs focus:outline-none focus:border-[#0d5c63]"
                    placeholder="Dr. Jane Doe"
                    required
                    type="text"
                    value={form.fullName}
                    onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-sans text-xs font-semibold text-gray-700" htmlFor="email">Institution Email</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">mail</span>
                  <input
                    id="email"
                    className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-800 font-sans text-xs focus:outline-none focus:border-[#0d5c63]"
                    placeholder="jane.doe@university.edu"
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-sans text-xs font-semibold text-gray-700" htmlFor="password">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">lock</span>
                  <input
                    id="password"
                    className="w-full pl-9 pr-10 py-2 bg-white border border-gray-200 rounded-xl text-gray-800 font-sans text-xs focus:outline-none focus:border-[#0d5c63]"
                    placeholder="••••••••"
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  />
                  <button
                    aria-label="Toggle password visibility"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0d5c63]"
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                  >
                    <span className="material-symbols-outlined text-[18px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  className="w-full bg-[#0d5c63] text-white font-sans text-xs font-bold py-2.5 px-4 rounded-xl hover:bg-[#09474d] transition-all flex justify-center items-center gap-2"
                  type="submit"
                >
                  Continue <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: Academic Role */}
        {step === 2 && (
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 md:p-8 hover:shadow-md transition-all">
            <div className="text-center mb-6">
              <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Select Your Academic Role</h1>
              <p className="font-sans text-xs text-gray-500">Helps us curate clinical cases tailored for your level.</p>
            </div>

            <div className="space-y-3 mb-6">
              {ROLES.map(role => (
                <div
                  key={role.id}
                  onClick={() => setForm(f => ({ ...f, role: role.id }))}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    form.role === role.id
                      ? 'border-[#0d5c63] bg-[#0d5c63]/5 ring-1 ring-[#0d5c63]'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 shrink-0 ${
                    form.role === role.id ? 'border-[#0d5c63] bg-[#0d5c63]' : 'border-gray-300'
                  }`}>
                    {form.role === role.id && <span className="material-symbols-outlined text-white text-[10px]">check</span>}
                  </div>
                  <div>
                    <h3 className="font-sans text-xs font-bold text-gray-900">{role.title}</h3>
                    <p className="font-sans text-[11px] text-gray-500 mt-0.5">{role.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-sans text-xs font-bold hover:bg-gray-50 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span> Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 rounded-xl bg-[#0d5c63] text-white font-sans text-xs font-bold hover:bg-[#09474d] flex items-center gap-1.5"
              >
                Continue <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Tailor Your Experience (12 Card Grid) */}
        {step === 3 && (
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 md:p-8 hover:shadow-md transition-all">
            <div className="text-center mb-6">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-[#0d5c63] mb-2">Tailor Your Experience</h1>
              <p className="font-sans text-xs md:text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
                Select the fields of veterinary medicine you are most interested in. This helps us customize your clinical cases and learning path.
              </p>
            </div>

            {/* 12-Specialty Cards Grid (Responsive Grid) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 mb-8">
              {SPECIALTY_FIELDS.map(field => {
                const isSelected = form.selectedFields.includes(field.id);
                return (
                  <button
                    key={field.id}
                    type="button"
                    onClick={() => toggleField(field.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 text-center cursor-pointer group ${
                      isSelected
                        ? 'border-[#0d5c63] bg-[#0d5c63]/5 ring-1 ring-[#0d5c63] shadow-2xs'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2.5 transition-colors ${
                      isSelected ? 'bg-[#0d5c63] text-white' : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                    }`}>
                      <span className="material-symbols-outlined text-[20px]">{field.icon}</span>
                    </div>
                    <span className={`font-sans text-xs font-semibold ${isSelected ? 'text-[#0d5c63]' : 'text-gray-800'}`}>
                      {field.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2 rounded-xl border border-[#0d5c63] text-[#0d5c63] font-sans text-xs font-bold hover:bg-[#0d5c63]/5 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span> Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-7 py-2 rounded-xl bg-[#0d5c63] text-white font-sans text-xs font-bold hover:bg-[#09474d] flex items-center gap-1.5 shadow-xs"
              >
                Continue <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Preferences */}
        {step === 4 && (
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 md:p-8 hover:shadow-md transition-all">
            <div className="text-center mb-6">
              <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Set Your Learning Pace</h1>
              <p className="font-sans text-xs text-gray-500">Choose your preferred study commitment.</p>
            </div>

            <div className="space-y-3 mb-6">
              {[
                { id: 'daily', title: 'Daily Practice (15-20 min/day)', desc: 'Ideal for maintaining high streaks and rapid learning.' },
                { id: 'weekly', title: 'Weekly Deep Dives (2-3 hrs/week)', desc: 'Structured weekend or scheduled study sessions.' },
                { id: 'flexible', title: 'Self-Paced / Flexible', desc: 'Learn whenever clinical rotation schedule permits.' },
              ].map(item => (
                <div
                  key={item.id}
                  onClick={() => setForm(f => ({ ...f, goal: item.id }))}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    form.goal === item.id ? 'border-[#0d5c63] bg-[#0d5c63]/5 ring-1 ring-[#0d5c63]' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-sans text-xs font-bold text-gray-900">{item.title}</h3>
                  <p className="font-sans text-[11px] text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-sans text-xs font-bold hover:bg-gray-50 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span> Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 rounded-xl bg-[#0d5c63] text-white font-sans text-xs font-bold hover:bg-[#09474d] flex items-center gap-1.5"
              >
                Continue <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Final Review & Confirmation */}
        {step === 5 && (
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 md:p-8 text-center hover:shadow-md transition-all">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Setup Complete!</h1>
            <p className="font-sans text-xs text-gray-500 mb-6 max-w-xs mx-auto">
              Your profile is ready. We've customized your dashboard with modules in {form.selectedFields.length} selected specialties.
            </p>

            <div className="bg-gray-50 rounded-xl p-4 text-left mb-6 space-y-2 border border-gray-200">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Name:</span>
                <span className="font-bold text-gray-900">{form.fullName}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Email:</span>
                <span className="font-bold text-gray-900">{form.email}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Specialties Selected:</span>
                <span className="font-bold text-[#0d5c63]">{form.selectedFields.length} Topics</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="w-1/3 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-sans text-xs font-bold hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleComplete}
                className="w-2/3 bg-[#0d5c63] text-white font-sans text-xs font-bold py-2.5 px-4 rounded-xl hover:bg-[#09474d] flex items-center justify-center gap-1.5"
              >
                Go to Dashboard <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer Link */}
        <div className="mt-6 text-center">
          <p className="font-sans text-xs text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-[#0d5c63] hover:underline font-bold">Sign In</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;

