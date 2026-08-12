import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Sidebar from '../components/Sidebar';

const labData = {
  cbc: [
    { analyte: 'HCT', result: '55.2 %', ref: '37.3 - 61.7', status: 'Normal', color: 'bg-emerald-500', isHigh: false },
    { analyte: 'WBC', result: '19.5 K/µL', ref: '5.0 - 16.9', status: 'High', color: 'bg-red-500', isHigh: true },
    { analyte: 'NEU', result: '15.2 K/µL', ref: '2.9 - 11.6', status: 'High', color: 'bg-red-500', isHigh: true },
    { analyte: 'PLT', result: '250 K/µL', ref: '148 - 484', status: 'Normal', color: 'bg-emerald-500', isHigh: false },
  ],
  renal: [
    { name: 'BUN', value: '52 mg/dL', ref: '7-27' },
    { name: 'CREA', value: '2.8 mg/dL', ref: '0.5-1.8' },
    { name: 'PHOS', value: '7.1 mg/dL', ref: '2.5-6.8' },
  ],
  hepatic: [
    { name: 'ALT', value: '45 U/L', status: 'Normal', isAbnormal: false },
    { name: 'ALKP', value: '112 U/L', status: 'Normal', isAbnormal: false },
    { name: 'Na+', value: '148 mmol/L', status: 'Normal', isAbnormal: false },
    { name: 'K+', value: '3.1 mmol/L', status: 'Low', isAbnormal: true },
  ],
};

const tabs = ['Physical Exam', 'Bloodwork Results', 'X-Ray', 'Ultrasound', 'Urinalysis'];

const Clinical = () => {
  const [activeTab, setActiveTab] = useState('Bloodwork Results');
  const { user, showToast } = useApp();

  return (
    <div className="bg-[#f4f7f6] text-gray-900 font-sans antialiased min-h-screen flex flex-col">
      {/* Top Header Navigation */}
      <nav className="bg-white border-b border-gray-200/80 px-6 py-2.5 flex items-center justify-between sticky top-0 z-40 shadow-2xs">
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="font-display text-2xl font-bold text-[#0d5c63] tracking-tight">
            Vetora
          </Link>
          <div className="relative hidden lg:block w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full font-sans text-xs focus:outline-none focus:border-[#0d5c63]"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 relative">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>
          <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
            <span className="material-symbols-outlined text-[20px]">account_circle</span>
          </button>
          <img
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80"
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover border border-gray-200"
          />
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Canvas Area */}
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden bg-white">
          {/* Patient Context Panel */}
          <div className="w-full md:w-80 border-r border-gray-200/80 bg-[#f8faf9] flex flex-col overflow-y-auto shrink-0 p-5 space-y-6">
            {/* Patient Header Card */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200/70 shadow-2xs">
              <div className="flex items-start gap-3.5 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=150&auto=format&fit=crop"
                  alt="Labrador"
                  className="w-14 h-14 rounded-xl object-cover shrink-0 border border-gray-200"
                />
                <div>
                  <h1 className="font-display text-xl font-bold text-gray-900">Case #402-B</h1>
                  <span className="inline-block px-2.5 py-0.5 rounded-md font-sans text-[10px] font-bold bg-red-100 text-red-700 mt-1">
                    Urgent
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-2 text-xs font-sans border-t border-gray-100 pt-3">
                <div>
                  <span className="text-gray-400 block text-[10px]">Species</span>
                  <span className="font-bold text-gray-900">Canine</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">Breed</span>
                  <span className="font-bold text-gray-900">Labrador Retriever</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">Age</span>
                  <span className="font-bold text-gray-900">6 years</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">Sex</span>
                  <span className="font-bold text-gray-900">Male (Intact)</span>
                </div>
              </div>
            </div>

            {/* Chief Complaint Box */}
            <div className="bg-red-50/50 border border-red-200/70 rounded-2xl p-4 shadow-2xs">
              <h3 className="font-sans text-xs font-bold text-[#0d5c63] mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">history</span>
                Chief Complaint
              </h3>
              <p className="font-sans text-xs text-gray-700 leading-relaxed pl-2 border-l-2 border-red-500">
                Persistent vomiting for 3 days. Lethargy and anorexia observed since yesterday evening. No known toxin exposure.
              </p>
            </div>

            {/* Clinical Notes Box */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200/70 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-sans text-xs font-bold text-[#0d5c63] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">medical_information</span>
                  Clinical Notes
                </h3>
                <button onClick={() => showToast('Editing clinical notes...', 'info')} className="text-gray-400 hover:text-[#0d5c63]">
                  <span className="material-symbols-outlined text-[16px]">edit_note</span>
                </button>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl text-xs space-y-1">
                <span className="font-bold text-[#0d5c63] block text-[10px]">Vitals (Admission)</span>
                <p className="text-gray-600">Temp: 102.5°F | HR: 120 bpm | RR: 30 bpm</p>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl text-xs space-y-1">
                <span className="font-bold text-[#0d5c63] block text-[10px]">Physical Exam Summary</span>
                <p className="text-gray-600">Abdominal palpation reveals slight cranial pain. 5% dehydrated based on skin tent.</p>
              </div>
            </div>
          </div>

          {/* Clinical Reasoning Main View */}
          <div className="flex-1 flex flex-col relative overflow-hidden bg-white">
            {/* Reasoning Header Bar */}
            <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shrink-0">
              <div>
                <span className="font-sans text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                  CLINICAL REASONING JOURNEY
                </span>
                <h2 className="font-display text-xl font-bold text-[#0d5c63] mt-0.5">Step 2: Select Investigation</h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <span className="font-sans text-xs font-bold text-emerald-600">40% Complete</span>
              </div>
            </div>

            {/* Investigation Tabs Header */}
            <div className="px-8 bg-gray-50/50 border-b border-gray-200 flex gap-6 overflow-x-auto shrink-0">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 font-sans text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-[#0d5c63] text-[#0d5c63]'
                      : 'border-transparent text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Main Investigation Content Area with generous bottom padding (pb-36) */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6 pb-36">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-gray-900">Comprehensive Metabolic Panel & CBC</h3>
                  <p className="font-sans text-xs text-gray-500 mt-0.5">Sample collected: 2 hours ago | Lab: In-house</p>
                </div>
                <button
                  onClick={() => showToast('Exporting lab results PDF...', 'success')}
                  className="px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-700 font-sans text-xs font-semibold hover:bg-gray-50 transition-colors shadow-2xs flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span> Export PDF
                </button>
              </div>

              {/* Significant Abnormalities Callout Banner */}
              <div className="bg-red-50 border border-red-200/80 rounded-2xl p-4 flex items-start gap-3">
                <span className="material-symbols-outlined text-red-500 text-[20px] mt-0.5">warning</span>
                <div>
                  <h4 className="font-sans text-xs font-bold text-red-900">Significant Abnormalities Detected</h4>
                  <p className="font-sans text-xs text-red-700 mt-1 leading-relaxed">
                    Elevated BUN, Creatinine, and Phosphorus indicate potential renal impairment or severe dehydration. Leukocytosis noted.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Complete Blood Count Table */}
                <div className="lg:col-span-2 bg-white border border-gray-200/80 rounded-2xl p-5 shadow-2xs">
                  <h4 className="font-sans text-xs font-bold text-[#0d5c63] mb-4">Complete Blood Count (CBC)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full font-sans text-xs text-left">
                      <thead>
                        <tr className="bg-gray-50 text-gray-500 text-[10px] uppercase border-b border-gray-200">
                          <th className="p-3 font-bold">ANALYTE</th>
                          <th className="p-3 font-bold">RESULT</th>
                          <th className="p-3 font-bold">REFERENCE INTERVAL</th>
                          <th className="p-3 font-bold">STATUS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {labData.cbc.map(row => (
                          <tr key={row.analyte} className="hover:bg-gray-50/60 transition-colors">
                            <td className="p-3 font-bold text-gray-900">{row.analyte}</td>
                            <td className={`p-3 font-bold ${row.isHigh ? 'text-red-600' : 'text-gray-900'}`}>{row.result}</td>
                            <td className="p-3 text-gray-500">{row.ref}</td>
                            <td className="p-3 flex items-center gap-1.5">
                              <span className={`w-2 h-2 rounded-full ${row.color}`}></span>
                              <span className={`font-semibold ${row.isHigh ? 'text-red-600' : 'text-gray-700'}`}>{row.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Renal Focus Panel */}
                <div className="bg-[#f0f9f8] border border-[#0d5c63]/20 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
                  <div>
                    <h4 className="font-sans text-xs font-bold text-[#0d5c63] mb-4">Renal Focus</h4>
                    <div className="space-y-4">
                      {labData.renal.map(r => (
                        <div key={r.name} className="flex justify-between items-center pb-2 border-b border-[#0d5c63]/10">
                          <span className="font-sans text-xs font-bold text-gray-800">{r.name}</span>
                          <div className="text-right">
                            <span className="font-sans text-xs font-extrabold text-red-600 underline decoration-red-500 decoration-2">
                              {r.value}
                            </span>
                            <span className="font-sans text-[10px] text-gray-400 block">({r.ref})</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hepatic & Electrolytes Grid Cards */}
                <div className="lg:col-span-3 bg-white border border-gray-200/80 rounded-2xl p-5 shadow-2xs">
                  <h4 className="font-sans text-xs font-bold text-[#0d5c63] mb-4">Hepatic & Electrolytes</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {labData.hepatic.map(h => (
                      <div key={h.name} className="bg-gray-50 p-3.5 rounded-xl border border-gray-200/70">
                        <span className="font-sans text-[10px] text-gray-400 block mb-1">{h.name}</span>
                        <div className="flex items-center justify-between">
                          <span className={`font-sans text-sm font-bold ${h.isAbnormal ? 'text-red-600' : 'text-gray-900'}`}>
                            {h.value}
                          </span>
                          <span className={`font-sans text-[10px] font-bold ${h.isAbnormal ? 'text-red-600' : 'text-emerald-600'}`}>
                            {h.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Floating Action Bar with Gradient Backdrop (No Overlaps) */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none flex justify-end items-center gap-3">
              <div className="pointer-events-auto flex items-center gap-3 bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-gray-200/90">
                <button
                  onClick={() => showToast('Vetora AI assistant initialized for Case #402-B.', 'info')}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-[#0d5c63] font-sans text-xs font-bold hover:bg-gray-50 transition-colors shadow-2xs flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px] text-cyan-600">smart_toy</span> Ask Vetora AI
                </button>
                <button
                  onClick={() => showToast('Diagnosis confirmed! Proceeding to treatment planning...', 'success')}
                  className="px-6 py-2.5 rounded-xl bg-[#0d5c63] hover:bg-[#09474d] text-white font-sans text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
                >
                  Proceed to Diagnosis <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Clinical;

