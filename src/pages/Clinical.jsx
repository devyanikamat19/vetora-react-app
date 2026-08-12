import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Sidebar from '../components/Sidebar';

const labData = {
  cbc: [
    { analyte: 'HCT', result: '55.2 %', ref: '37.3 - 61.7', status: 'Normal', color: 'bg-secondary' },
    { analyte: 'WBC', result: '19.5 K/μL', ref: '5.0 - 16.9', status: 'High', color: 'bg-error', highlight: true },
    { analyte: 'NEU', result: '15.2 K/μL', ref: '2.9 - 11.6', status: 'High', color: 'bg-error', highlight: true },
    { analyte: 'PLT', result: '250 K/μL', ref: '148 - 484', status: 'Normal', color: 'bg-secondary' },
  ],
  renal: [
    { name: 'BUN', value: '52 mg/dL', ref: '7-27', pct: 85 },
    { name: 'CREA', value: '2.8 mg/dL', ref: '0.5-1.8', pct: 75 },
    { name: 'PHOS', value: '7.1 mg/dL', ref: '2.5-6.8', pct: 65 },
  ],
  hepatic: [
    { name: 'ALT', value: '45 U/L', status: 'Normal', statusColor: 'text-secondary', abnormal: false },
    { name: 'ALKP', value: '112 U/L', status: 'Normal', statusColor: 'text-secondary', abnormal: false },
    { name: 'Na+', value: '148 mmol/L', status: 'Normal', statusColor: 'text-secondary', abnormal: false },
    { name: 'K+', value: '3.1 mmol/L', status: 'Low', statusColor: 'text-error', abnormal: true },
  ],
};

const tabs = ['Physical Exam', 'Bloodwork Results', 'X-Ray', 'Ultrasound', 'Urinalysis'];

const Clinical = () => {
  const [activeTab, setActiveTab] = useState('Bloodwork Results');
  const { showToast } = useApp();

  return (
    <div className="bg-background text-on-background font-sans antialiased min-h-screen flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-surface-bright text-primary sticky top-0 z-40 border-b border-outline-variant shadow-sm flex justify-between items-center w-full px-6 py-2">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="font-display text-2xl font-bold text-primary">Vetora</Link>
        </div>
        <div className="flex-1 flex justify-start ml-4 hidden md:flex">
          <div className="relative w-64 group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full font-sans text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Search resources..." type="text" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-on-surface-variant hover:bg-surface-container-high rounded-full p-2 transition-colors relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-surface"></span>
          </button>
          <img alt="User Profile" className="w-8 h-8 rounded-full ml-2 object-cover border border-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYzJYyMuaSprfRDP3UJmFX5wlcusj7nL3WJF0rdhiMof460CXO96tPCj7RGIYiCkNq5dICiWF7nAoq4iS9dLi1NhBxccoeSOWWbvNrbBSYEzlo3LPP4tODx70s0sdAwZXYYYCrWhY3A8oUtTW4ZO_iszthBmb2Kly8dIA0G6j8apWRydxfCYVXlJLohyDp1b9KCxRXc8KtcUJgaVVsoQcnEbzuhY3f5aHa2CV3vCmxUgZ-tXxPETeH" />
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Shared Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden bg-surface-container-lowest">
          {/* Context Sidebar (Patient Info) */}
          <div className="w-full md:w-80 border-r border-outline-variant bg-surface-container-lowest flex flex-col overflow-y-auto shrink-0">
            {/* Patient Header */}
            <div className="p-6 bg-surface border-b border-outline-variant sticky top-0 z-10">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-lg bg-surface-container-high overflow-hidden shrink-0 border border-outline-variant">
                  <img alt="Patient Photo" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBojb-v-egbkHSMKxJxp9giwJocBMkoiHZtbumsjavYvodVQJjSnaODZ-12ZXNjWpOTD4ZU2Wo1rBLLI7sLv3wXV6TM7YvNHO8PSbkiLpChgmRP-SxyfypGJLd2-1vjOvf15eYOrfknqgw80BiYvxrin89-lOjXneT8Wuoodl-cZHAx_ZOFWQKRZs29N92cCxrM6o9af20GZoFWhyM_pwx7zAhETWYx9zIoeTNqRFESn74f_KIsePll" />
                </div>
                <div>
                  <h1 className="font-display text-2xl font-bold text-primary leading-tight">Case #402-B</h1>
                  <span className="inline-flex items-center px-2 py-0.5 rounded font-sans text-xs font-medium bg-error-container text-on-error-container mt-1">Urgent</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-y-2 font-sans text-sm">
                <div className="flex flex-col"><span className="text-on-surface-variant text-xs">Species</span><span className="font-medium text-on-surface">Canine</span></div>
                <div className="flex flex-col"><span className="text-on-surface-variant text-xs">Breed</span><span className="font-medium text-on-surface">Labrador Retriever</span></div>
                <div className="flex flex-col"><span className="text-on-surface-variant text-xs">Age</span><span className="font-medium text-on-surface">6 years</span></div>
                <div className="flex flex-col"><span className="text-on-surface-variant text-xs">Sex</span><span className="font-medium text-on-surface">Male (Intact)</span></div>
              </div>
            </div>
            {/* Patient History */}
            <div className="p-6 flex-1 space-y-4">
              <div className="bg-surface/90 border border-outline-variant shadow-sm rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary-container/30 p-4">
                <h3 className="font-sans text-sm text-primary font-bold mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">history</span>
                  Chief Complaint
                </h3>
                <p className="font-sans text-sm text-on-surface p-3 bg-surface-container rounded-lg border-l-4 border-error">
                  Persistent vomiting for 3 days. Lethargy and anorexia observed since yesterday evening. No known toxin exposure.
                </p>
              </div>
              <div className="bg-surface/90 border border-outline-variant shadow-sm rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary-container/30 p-4">
                <h3 className="font-sans text-sm text-primary font-bold mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">medical_information</span> Clinical Notes</span>
                  <button onClick={() => showToast('Note editing coming soon.', 'info')} className="text-primary hover:text-primary-container"><span className="material-symbols-outlined text-[18px]">edit_note</span></button>
                </h3>
                <div className="space-y-2">
                  <div className="p-2 font-sans text-sm text-on-surface-variant bg-surface-container-low rounded border border-outline-variant/50">
                    <span className="text-xs font-bold text-primary block mb-1">Vitals (Admission)</span>
                    Temp: 102.5°F | HR: 120 bpm | RR: 30 bpm
                  </div>
                  <div className="p-2 font-sans text-sm text-on-surface-variant bg-surface-container-low rounded border border-outline-variant/50">
                    <span className="text-xs font-bold text-primary block mb-1">Physical Exam Summary</span>
                    Abdominal palpation reveals slight cranial pain. 5% dehydrated based on skin tent.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Canvas: Clinical Reasoning */}
          <div className="flex-1 flex flex-col bg-surface relative h-full overflow-hidden">
            {/* Progress Header */}
            <div className="bg-surface-bright border-b border-outline-variant px-6 py-4 flex items-center justify-between z-10 shadow-sm">
              <div>
                <p className="font-sans text-xs text-on-surface-variant tracking-wider uppercase mb-1">Clinical Reasoning Journey</p>
                <h2 className="font-display text-2xl font-bold text-primary flex items-center gap-2">Step 2: Select Investigation</h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="w-2/5 h-full bg-secondary transition-all duration-500"></div>
                </div>
                <span className="font-sans text-xs text-secondary font-bold">40% Complete</span>
              </div>
            </div>

            {/* Investigation Tabs */}
            <div className="px-6 pt-4 bg-surface-bright border-b border-outline-variant flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-sans text-sm whitespace-nowrap rounded-t-lg border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'text-primary font-bold bg-surface border-primary shadow-[0_-2px_4px_rgba(13,92,99,0.05)]'
                      : 'text-on-surface-variant hover:bg-surface-container-low border-transparent'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Bloodwork Canvas */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 relative">
              {/* Background ambient pattern */}
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0d5c63 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

              <div className="max-w-4xl mx-auto space-y-6 relative z-10">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-primary">Comprehensive Metabolic Panel & CBC</h3>
                    <p className="text-on-surface-variant font-sans text-sm mt-1">Sample collected: 2 hours ago | Lab: In-house</p>
                  </div>
                  <button className="flex items-center gap-2 bg-tertiary-fixed text-on-tertiary-fixed px-4 py-2 rounded-lg hover:bg-tertiary-fixed-dim transition-colors font-sans text-sm font-medium shadow-sm border border-outline-variant/30">
                    <span className="material-symbols-outlined text-[18px]">download</span> Export PDF
                  </button>
                </div>

                {/* Key Abnormalities Alert */}
                <div className="bg-error-container/30 border border-error-container rounded-xl p-4 flex items-start gap-4">
                  <span className="material-symbols-outlined text-error mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                  <div>
                    <h4 className="font-sans text-sm text-on-surface font-bold">Significant Abnormalities Detected</h4>
                    <p className="font-sans text-sm text-on-surface-variant mt-1">Elevated BUN, Creatinine, and Phosphorus indicate potential renal impairment or severe dehydration. Leukocytosis noted.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* CBC Table */}
                  <div className="lg:col-span-2 bg-surface/90 border border-outline-variant shadow-sm rounded-xl overflow-hidden p-4 flex flex-col transition-all duration-300 hover:shadow-md">
                    <h4 className="font-sans text-sm font-bold text-primary mb-4 pb-2 border-b border-outline-variant/50">Complete Blood Count (CBC)</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full font-sans text-sm text-left">
                        <thead className="text-xs text-on-surface-variant uppercase bg-surface-container-low">
                          <tr>
                            <th className="px-4 py-2 rounded-l">Analyte</th>
                            <th className="px-4 py-2">Result</th>
                            <th className="px-4 py-2 hidden sm:table-cell">Reference Interval</th>
                            <th className="px-4 py-2 rounded-r">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {labData.cbc.map((row, i) => (
                            <tr key={row.analyte} className={`border-b border-outline-variant/20 hover:bg-tertiary-fixed/30 transition-colors ${i % 2 === 1 ? 'bg-surface-container-lowest/50' : ''}`}>
                              <td className="px-4 py-3 font-medium">{row.analyte}</td>
                              <td className={`px-4 py-3 ${row.highlight ? 'font-bold text-error' : ''}`}>{row.result}</td>
                              <td className="px-4 py-3 text-on-surface-variant hidden sm:table-cell">{row.ref}</td>
                              <td className="px-4 py-3">
                                <span className={`inline-block w-2 h-2 rounded-full ${row.color} mr-2`}></span>
                                {row.status}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Renal Focus Widget */}
                  <div className="bg-surface/90 border border-primary-container/20 shadow-sm rounded-xl overflow-hidden p-4 flex flex-col transition-all duration-300 hover:shadow-md bg-primary-container/5">
                    <h4 className="font-sans text-sm font-bold text-primary mb-4">Renal Focus</h4>
                    <div className="space-y-4 flex-1">
                      {labData.renal.map(item => (
                        <div key={item.name}>
                          <div className="flex justify-between font-sans text-sm mb-1">
                            <span className="font-medium text-on-surface">{item.name}</span>
                            <span className="font-bold text-error">{item.value} <span className="text-xs font-normal text-on-surface-variant">({item.ref})</span></span>
                          </div>
                          <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                            <div className="bg-error h-1.5 rounded-full" style={{ width: `${item.pct}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hepatic & Electrolytes */}
                  <div className="lg:col-span-3 bg-surface/90 border border-outline-variant shadow-sm rounded-xl overflow-hidden p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-sans text-sm font-bold text-primary mb-4 pb-2 border-b border-outline-variant/50">Hepatic & Electrolytes</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {labData.hepatic.map(item => (
                        <div key={item.name} className={`p-3 bg-surface rounded-lg border ${item.abnormal ? 'border-error/20 bg-error-container/10' : 'border-outline-variant/50'}`}>
                          <div className="font-sans text-xs text-on-surface-variant mb-1">{item.name}</div>
                          <div className={`font-sans font-bold ${item.abnormal ? 'text-error' : 'text-on-surface'}`}>
                            {item.value}
                            <span className={`font-sans text-xs font-normal ml-1 ${item.statusColor}`}>{item.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Action Area */}
            <div className="absolute bottom-6 right-6 flex gap-4">
              <button
                onClick={() => showToast('Vetora AI is a premium feature. Upgrade to Pro to unlock!', 'info')}
                className="bg-surface/95 border border-outline-variant px-6 py-3 rounded-xl font-sans font-bold text-primary flex items-center gap-2 hover:bg-surface transition-colors shadow-md backdrop-blur-md"
              >
                <span className="material-symbols-outlined text-[20px] text-tertiary">smart_toy</span>
                Ask Vetora AI
              </button>
              <button
                onClick={() => showToast('Diagnosis submitted for review! 🎉', 'success')}
                className="bg-primary text-on-primary px-8 py-3 rounded-lg font-sans font-bold shadow-md hover:bg-primary-container hover:text-on-primary-container transition-all hover:shadow-lg active:scale-95"
              >
                Proceed to Diagnosis
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Clinical;
