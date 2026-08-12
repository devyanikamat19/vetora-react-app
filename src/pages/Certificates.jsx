import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useApp } from '../context/AppContext';

const PREFILLED_CERTIFICATES = [
  {
    id: 'cert-1',
    title: 'Advanced Canine Cardiology & Electrocardiography',
    category: 'Cardiology',
    issueDate: 'August 10, 2026',
    credentialId: 'VET-2026-88492-CARD',
    instructor: 'Dr. Sarah Jenkins, DVM, DACVIM',
    ceHours: '8.5 RACE CE Hours',
    status: 'Verified',
    issuer: 'Vetora Academy of Veterinary Medicine',
    accentColor: 'from-[#0d5c63] to-teal-800',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&auto=format&fit=crop',
  },
  {
    id: 'cert-2',
    title: 'Small Animal Emergency & Critical Care Simulation',
    category: 'Emergency & Critical Care',
    issueDate: 'July 22, 2026',
    credentialId: 'VET-2026-74910-EMRG',
    instructor: 'Dr. Robert Vance, BVSc, DACVECC',
    ceHours: '10.0 RACE CE Hours',
    status: 'Verified',
    issuer: 'Vetora Academy of Veterinary Medicine',
    accentColor: 'from-cyan-800 to-[#0d5c63]',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=500&auto=format&fit=crop',
  },
  {
    id: 'cert-3',
    title: 'Equine Diagnostic Imaging & Radiographic Interpretation',
    category: 'Radiology',
    issueDate: 'June 15, 2026',
    credentialId: 'VET-2026-61029-RAD',
    instructor: 'Dr. Marcus Thorne, DACVS',
    ceHours: '6.0 RACE CE Hours',
    status: 'Verified',
    issuer: 'Vetora Academy of Veterinary Medicine',
    accentColor: 'from-[#0d5c63] to-slate-800',
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=500&auto=format&fit=crop',
  },
];

const IN_PROGRESS_CERT = {
  id: 'cert-in-progress',
  title: 'Soft Tissue Surgical Techniques in Feline Medicine',
  category: 'Surgery',
  progress: 75,
  completedModules: 3,
  totalModules: 4,
  targetCEHours: '7.5 RACE CE Hours',
  instructor: 'Dr. Elena Rostova, BVSc',
};

const Certificates = () => {
  const { user, showToast } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCert, setSelectedCert] = useState(null);

  const studentName = user?.name || 'Dr. Jane Doe';

  return (
    <div className="bg-[#f4f7f6] text-gray-900 font-sans antialiased min-h-screen flex">
      {/* Shared Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-white">
        {/* Page Title & Subtitle Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-[#0d5c63] text-[24px]">verified</span>
              <h1 className="font-display text-3xl font-bold text-gray-900">Clinical Credentials & Certificates</h1>
            </div>
            <p className="font-sans text-xs md:text-sm text-gray-500 max-w-2xl">
              Accredited continuing education (CE) certificates recognized by veterinary licensing boards. Download, verify, or share your official credentials.
            </p>
          </div>

          <button
            onClick={() => showToast('CE Credit Transcript exported as PDF.', 'success')}
            className="px-4 py-2.5 rounded-xl bg-[#0d5c63] hover:bg-[#09474d] text-white font-sans text-xs font-bold shadow-xs transition-all flex items-center gap-2 self-start md:self-auto"
          >
            <span className="material-symbols-outlined text-[18px]">download</span> Export CE Transcript
          </button>
        </div>

        {/* Top Metric Overview Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#f8faf9] p-4 rounded-2xl border border-gray-200/80 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#0d5c63]/10 text-[#0d5c63] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">workspace_premium</span>
            </div>
            <div>
              <span className="font-sans text-2xl font-bold text-gray-900 block leading-none">3</span>
              <span className="font-sans text-[11px] text-gray-500 font-medium mt-1 block">Certificates Earned</span>
            </div>
          </div>

          <div className="bg-[#f8faf9] p-4 rounded-2xl border border-gray-200/80 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">schedule</span>
            </div>
            <div>
              <span className="font-sans text-2xl font-bold text-gray-900 block leading-none">24.5</span>
              <span className="font-sans text-[11px] text-gray-500 font-medium mt-1 block">CE Hours Earned</span>
            </div>
          </div>

          <div className="bg-[#f8faf9] p-4 rounded-2xl border border-gray-200/80 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">verified_user</span>
            </div>
            <div>
              <span className="font-sans text-2xl font-bold text-gray-900 block leading-none">100%</span>
              <span className="font-sans text-[11px] text-gray-500 font-medium mt-1 block">Board Verified</span>
            </div>
          </div>

          <div className="bg-[#f8faf9] p-4 rounded-2xl border border-gray-200/80 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">hourglass_top</span>
            </div>
            <div>
              <span className="font-sans text-2xl font-bold text-gray-900 block leading-none">1</span>
              <span className="font-sans text-[11px] text-gray-500 font-medium mt-1 block">In Progress</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs Bar */}
        <div className="border-b border-gray-200 mb-8 flex gap-6">
          {[
            { id: 'all', label: 'All Certificates (3)' },
            { id: 'verified', label: 'Verified Credentials (3)' },
            { id: 'in-progress', label: 'In Progress (1)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 font-sans text-xs font-bold border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-[#0d5c63] text-[#0d5c63]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Certificate Cards Grid */}
        <div className="space-y-8 max-w-6xl">
          {(activeTab === 'all' || activeTab === 'verified') && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PREFILLED_CERTIFICATES.map(cert => (
                <div
                  key={cert.id}
                  className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md hover:border-[#0d5c63]/40 transition-all flex flex-col justify-between group"
                >
                  {/* Decorative Header Banner */}
                  <div className={`relative h-40 bg-gradient-to-r ${cert.accentColor} p-5 text-white overflow-hidden flex flex-col justify-between`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

                    <div className="flex justify-between items-start z-10">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 backdrop-blur-md border border-white/30 text-white">
                        <span className="material-symbols-outlined text-[12px]">verified</span> {cert.status}
                      </span>
                      <span className="font-sans text-[10px] font-bold tracking-wider opacity-80 uppercase">RACE Accredited</span>
                    </div>

                    <div className="z-10">
                      <span className="font-sans text-[11px] font-semibold text-teal-100 block mb-0.5">{cert.category}</span>
                      <h3 className="font-display text-base font-bold leading-snug line-clamp-2">{cert.title}</h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2 text-xs font-sans">
                      <div className="flex justify-between text-gray-600">
                        <span className="text-gray-400">Awarded To:</span>
                        <span className="font-bold text-gray-900">{studentName}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span className="text-gray-400">Issued On:</span>
                        <span className="font-medium text-gray-800">{cert.issueDate}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span className="text-gray-400">CE Credit:</span>
                        <span className="font-bold text-[#0d5c63]">{cert.ceHours}</span>
                      </div>
                      <div className="flex justify-between text-gray-600 pt-1 border-t border-gray-100">
                        <span className="text-gray-400">Credential ID:</span>
                        <span className="font-mono text-[10px] text-gray-500">{cert.credentialId}</span>
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="flex-1 py-2 rounded-xl bg-[#0d5c63]/10 hover:bg-[#0d5c63] text-[#0d5c63] hover:text-white font-sans text-xs font-bold transition-all text-center flex items-center justify-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">visibility</span> View Certificate
                      </button>
                      <button
                        onClick={() => showToast(`Downloading PDF for ${cert.credentialId}...`, 'success')}
                        className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:text-[#0d5c63] hover:bg-gray-50 transition-colors"
                        title="Download PDF"
                      >
                        <span className="material-symbols-outlined text-[18px]">download</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* In Progress Certificate Card */}
          {(activeTab === 'all' || activeTab === 'in-progress') && (
            <div className="bg-[#f0f9f8] border border-[#0d5c63]/20 rounded-2xl p-6 shadow-2xs max-w-2xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-md font-sans text-[10px] font-bold bg-cyan-100 text-cyan-800 mb-2">
                    In Progress · 75% Complete
                  </span>
                  <h3 className="font-display text-lg font-bold text-gray-900">{IN_PROGRESS_CERT.title}</h3>
                  <p className="font-sans text-xs text-gray-500 mt-0.5">Instructor: {IN_PROGRESS_CERT.instructor}</p>
                </div>
                <span className="font-sans text-xs font-bold text-[#0d5c63] shrink-0">{IN_PROGRESS_CERT.targetCEHours}</span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 mb-5">
                <div className="flex justify-between font-sans text-xs">
                  <span className="text-gray-500 font-semibold">{IN_PROGRESS_CERT.completedModules} of {IN_PROGRESS_CERT.totalModules} modules completed</span>
                  <span className="font-bold text-[#0d5c63]">75%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0d5c63] rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => navigate('/learning')}
                  className="px-5 py-2.5 rounded-xl bg-[#0d5c63] hover:bg-[#09474d] text-white font-sans text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
                >
                  Continue Module <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Official Certificate Preview Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-8 shadow-2xl relative border-4 border-[#0d5c63]/20 overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            {/* Certificate Header Emblem */}
            <div className="text-center mb-6 border-b border-gray-200 pb-6">
              <div className="w-16 h-16 rounded-full bg-[#0d5c63] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                <span className="material-symbols-outlined text-[32px]">workspace_premium</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-[#0d5c63] uppercase tracking-widest">
                Certificate of Completion
              </h2>
              <p className="font-sans text-xs text-gray-400 tracking-wider uppercase mt-1">
                Vetora Academy of Veterinary Medicine
              </p>
            </div>

            {/* Certificate Body Text */}
            <div className="text-center space-y-4 my-8">
              <p className="font-sans text-xs text-gray-500 uppercase tracking-widest">This certifies that</p>
              <h1 className="font-display text-3xl font-extrabold text-gray-900 border-b border-gray-300 inline-block px-8 pb-1">
                {studentName}
              </h1>
              <p className="font-sans text-xs text-gray-500 max-w-md mx-auto leading-relaxed pt-2">
                has successfully completed the accredited continuing education curriculum in
              </p>
              <h3 className="font-display text-xl font-bold text-[#0d5c63]">
                {selectedCert.title}
              </h3>
              <p className="font-sans text-xs font-bold text-emerald-700 bg-emerald-50 inline-block px-3 py-1 rounded-full border border-emerald-200">
                Earned {selectedCert.ceHours}
              </p>
            </div>

            {/* Signatures & Seal Block */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-200 text-center font-sans text-xs">
              <div>
                <p className="font-serif italic text-base text-gray-800 font-bold border-b border-gray-300 pb-1 mx-4">
                  {selectedCert.instructor}
                </p>
                <p className="text-gray-400 text-[10px] mt-1 uppercase tracking-wider">Lead Clinical Instructor</p>
              </div>
              <div>
                <p className="font-serif italic text-base text-gray-800 font-bold border-b border-gray-300 pb-1 mx-4">
                  Dr. Alexander Hayes, DVM
                </p>
                <p className="text-gray-400 text-[10px] mt-1 uppercase tracking-wider">Dean of Clinical Studies</p>
              </div>
            </div>

            {/* Footer Metadata */}
            <div className="mt-8 pt-4 bg-gray-50 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center text-[10px] text-gray-500 gap-2">
              <div>
                <span className="block">Issue Date: <strong>{selectedCert.issueDate}</strong></span>
                <span className="block">Credential ID: <strong>{selectedCert.credentialId}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => showToast('Certificate verification link copied!', 'success')}
                  className="px-4 py-2 rounded-xl bg-[#0d5c63] text-white font-bold hover:bg-[#09474d] transition-colors"
                >
                  Verify Online
                </button>
                <button
                  onClick={() => showToast('Printing Official Certificate...', 'info')}
                  className="px-4 py-2 rounded-xl border border-gray-300 font-bold hover:bg-gray-100 transition-colors text-gray-700"
                >
                  Print / Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;
