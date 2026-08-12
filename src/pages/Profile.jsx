import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Sidebar from '../components/Sidebar';

const Profile = () => {
  const { user, login, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('Overview');

  const [formData, setFormData] = useState({
    name: user?.name || 'Dr. Jane Doe',
    email: user?.email || 'jane.doe@university.edu',
    title: 'Veterinary Resident · Small Animal Medicine',
    institution: 'University of Veterinary Medicine & Teaching Hospital',
    bio: 'Resident practitioner specializing in small animal internal medicine, diagnostic imaging, and emergency critical care.',
    goal: 'daily',
  });

  const handleSave = (e) => {
    e.preventDefault();
    login({
      ...user,
      name: formData.name,
      email: formData.email,
      role: 'student',
    });
    showToast('Profile updated successfully!', 'success');
  };

  const activityLog = [
    { title: 'Completed Course: Advanced Canine Cardiology', date: 'August 10, 2026', badge: '8.5 CE Hours' },
    { title: 'Completed Clinical Case Simulation: Case #402-B', date: 'August 12, 2026', badge: 'Urgent Case' },
    { title: 'Awarded RACE CE Credential: Emergency Care', date: 'July 22, 2026', badge: '10.0 CE Hours' },
  ];

  return (
    <div className="bg-[#f4f7f6] text-gray-900 font-sans antialiased min-h-screen flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-white">
        {/* Cover Header Banner */}
        <div className="relative mb-8">
          <div className="h-44 rounded-3xl bg-gradient-to-r from-[#0d5c63] via-teal-800 to-slate-900 p-6 text-white shadow-2xs overflow-hidden flex justify-between items-start relative">
            <div className="opacity-15 absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div></div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center gap-1.5 relative z-10">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Verified Practitioner
            </span>
          </div>

          {/* Profile Identity Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-12 px-6 relative z-20">
            <div className="flex items-end gap-4">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80'}
                alt="Avatar"
                className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md bg-white shrink-0"
              />
              <div className="mb-1">
                <h1 className="font-display text-2xl font-bold text-gray-900 leading-tight">{formData.name}</h1>
                <p className="font-sans text-xs text-gray-500 font-medium">{formData.title}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Stat Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#f8faf9] p-4 rounded-2xl border border-gray-200/80 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">local_fire_department</span>
            </div>
            <div>
              <span className="font-sans text-2xl font-bold text-gray-900 block leading-none">7 Days</span>
              <span className="font-sans text-[11px] text-gray-500 font-medium mt-1 block">Active Streak</span>
            </div>
          </div>

          <div className="bg-[#f8faf9] p-4 rounded-2xl border border-gray-200/80 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">schedule</span>
            </div>
            <div>
              <span className="font-sans text-2xl font-bold text-gray-900 block leading-none">24.5 hrs</span>
              <span className="font-sans text-[11px] text-gray-500 font-medium mt-1 block">CE Earned</span>
            </div>
          </div>

          <div className="bg-[#f8faf9] p-4 rounded-2xl border border-gray-200/80 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#0d5c63]/10 text-[#0d5c63] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">verified</span>
            </div>
            <div>
              <span className="font-sans text-2xl font-bold text-gray-900 block leading-none">3</span>
              <span className="font-sans text-[11px] text-gray-500 font-medium mt-1 block">Certificates</span>
            </div>
          </div>

          <div className="bg-[#f8faf9] p-4 rounded-2xl border border-gray-200/80 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">quiz</span>
            </div>
            <div>
              <span className="font-sans text-2xl font-bold text-gray-900 block leading-none">84%</span>
              <span className="font-sans text-[11px] text-gray-500 font-medium mt-1 block">Quiz Accuracy</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Header */}
        <div className="border-b border-gray-200 mb-8 flex gap-6">
          {['Overview', 'Account Settings'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 font-sans text-xs font-bold border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-[#0d5c63] text-[#0d5c63]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl">
            {/* Left: Bio & Specialties */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bio Card */}
              <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-2xs space-y-3">
                <h3 className="font-display text-base font-bold text-gray-900">Clinical Bio & Objective</h3>
                <p className="font-sans text-xs text-gray-600 leading-relaxed">{formData.bio}</p>
                <div className="pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
                  <span className="material-symbols-outlined text-[16px] text-[#0d5c63]">school</span>
                  <span>{formData.institution}</span>
                </div>
              </div>

              {/* Specialty Chips */}
              <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-2xs space-y-3">
                <h3 className="font-display text-base font-bold text-gray-900">Enrolled Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {['Small Animal Surgery', 'Cardiology', 'Emergency & Critical Care', 'Diagnostic Imaging', 'Pharmacology'].map(s => (
                    <span key={s} className="px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-800 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#0d5c63]">check_circle</span> {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Activity Stream */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-2xs space-y-4">
              <h3 className="font-display text-base font-bold text-gray-900">Recent Activity</h3>
              <div className="space-y-3">
                {activityLog.map(act => (
                  <div key={act.title} className="p-3 bg-gray-50 rounded-xl border border-gray-200/70 space-y-1">
                    <span className="font-sans text-[10px] font-bold text-[#0d5c63] uppercase">{act.badge}</span>
                    <h4 className="font-sans text-xs font-bold text-gray-900">{act.title}</h4>
                    <p className="font-sans text-[10px] text-gray-400">{act.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Account Settings' && (
          <div className="bg-white border border-gray-200/80 rounded-2xl p-6 md:p-8 shadow-2xs max-w-2xl">
            <h3 className="font-display text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Edit Profile Details</h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block font-sans text-xs font-bold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-sans text-xs text-gray-900 focus:outline-none focus:border-[#0d5c63]"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-bold text-gray-700 mb-1">Academic / Clinical Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData(f => ({ ...f, title: e.target.value }))}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-sans text-xs text-gray-900 focus:outline-none focus:border-[#0d5c63]"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-bold text-gray-700 mb-1">Institution</label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={e => setFormData(f => ({ ...f, institution: e.target.value }))}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-sans text-xs text-gray-900 focus:outline-none focus:border-[#0d5c63]"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-bold text-gray-700 mb-1">Clinical Bio</label>
                <textarea
                  rows="3"
                  value={formData.bio}
                  onChange={e => setFormData(f => ({ ...f, bio: e.target.value }))}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-sans text-xs text-gray-900 focus:outline-none focus:border-[#0d5c63]"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0d5c63] hover:bg-[#09474d] text-white font-sans text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">save</span> Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
