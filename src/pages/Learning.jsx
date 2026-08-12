import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const TRANSCRIPT_LINES = [
  { time: '11:42', text: 'When we approach a thoracic radiograph, the first step is always evaluating technical quality. Is it a true orthogonal projection?' },
  { time: '12:05', text: 'Look at the alignment of the sternum and the spine on the ventrodorsal view. They should be superimposed.' },
  { time: '12:45', text: 'Moving past technical evaluation, we begin our systematic review. I prefer an outside-in approach, starting with the extrathoracic structures before moving to the pleural space.', active: true },
  { time: '13:10', text: 'Notice here on the lateral view, the soft tissue opacity in the cranial mediastinum. In a young dog, this is typically the thymus.' },
  { time: '13:45', text: 'However, in an older patient, we must consider differentials like lymphoma, thymoma, or other mediastinal masses.' },
  { time: '14:20', text: "Now, let's focus on the cardiac silhouette. We'll use the vertebral heart score method to quantify cardiomegaly." },
];

const Learning = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedTimestamp, setSelectedTimestamp] = useState('12:45');

  return (
    <div className="bg-[#f4f7f6] text-gray-900 font-sans antialiased min-h-screen flex flex-col">

      {/* Top Header Navigation (Image 4) */}
      <header className="bg-white border-b border-gray-200/80 px-6 py-3 flex items-center justify-between sticky top-0 z-40 shadow-2xs">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/my-learning')}
            className="p-1.5 text-[#0d5c63] hover:bg-[#0d5c63]/10 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="font-display text-base font-bold text-gray-900 leading-tight">
              Diagnostic Approach to Thoracic Radiography
            </h1>
            <p className="font-sans text-xs text-gray-500 font-medium">Module 3: Advanced Imaging Techniques</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsBookmarked(!isBookmarked);
              showToast(isBookmarked ? 'Bookmark removed.' : 'Lecture bookmarked!', 'success');
            }}
            className={`p-2 rounded-full transition-colors ${
              isBookmarked ? 'text-[#0d5c63] bg-[#0d5c63]/10' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]" style={isBookmarked ? { fontVariationSettings: "'FILL' 1" } : {}}>
              bookmark
            </span>
          </button>
          <button onClick={() => showToast('Lecture settings opened.', 'info')} className="p-2 text-gray-400 hover:text-gray-600 rounded-full">
            <span className="material-symbols-outlined text-[20px]">more_vert</span>
          </button>
        </div>
      </header>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 bg-white">
        
        {/* Left: Video Player & Overview Content (Image 4) */}
        <section className="flex-1 flex flex-col overflow-y-auto">
          {/* Main Video Canvas */}
          <div className="w-full bg-slate-900 aspect-video relative flex items-center justify-center overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/fNxaJsNG3-s?autoplay=1&rel=0&modestbranding=1"
              title="Thoracic Radiography Lecture"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Sub-tabs Header Bar */}
          <div className="border-b border-gray-200 px-6 bg-white sticky top-0 z-10">
            <nav className="flex gap-8">
              {['Overview', 'Resources', 'Notes', 'Vetora AI'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3.5 font-sans text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
                    activeTab === tab
                      ? 'border-[#0d5c63] text-[#0d5c63]'
                      : 'border-transparent text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {tab === 'Vetora AI' && (
                    <span className="material-symbols-outlined text-[16px] text-cyan-600">smart_toy</span>
                  )}
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content Canvas (Image 4 style) */}
          <div className="p-6 md:p-8 max-w-4xl space-y-6">
            {activeTab === 'Overview' && (
              <>
                <div>
                  <h2 className="font-display text-xl font-bold text-gray-900 mb-2">Module Overview</h2>
                  <p className="font-sans text-xs text-gray-600 leading-relaxed">
                    In this comprehensive session, we explore the systematic approach to interpreting canine and feline thoracic radiographs. We will cover technical evaluation, normal anatomy, and standard diagnostic paradigms for evaluating the cardiovascular system, pulmonary parenchyma, pleural space, and mediastinum.
                  </p>
                </div>

                {/* Learning Objectives Checklist (Image 4) */}
                <div className="pt-4 border-t border-gray-100">
                  <span className="font-sans text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">
                    LEARNING OBJECTIVES
                  </span>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-emerald-600 text-[18px] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      <span className="font-sans text-xs font-semibold text-gray-800">
                        Identify and differentiate primary lung patterns (alveolar, bronchial, interstitial, vascular).
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-emerald-600 text-[18px] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      <span className="font-sans text-xs font-semibold text-gray-800">
                        Systematically evaluate cardiac silhouette size and shape using standardized metrics.
                      </span>
                    </li>
                  </ul>
                </div>
              </>
            )}

            {activeTab === 'Resources' && (
              <div className="space-y-3">
                <h3 className="font-display text-base font-bold text-gray-900">Lecture Downloads</h3>
                {['Thoracic_Radiography_Interpretation_Guide.pdf', 'Vertebral_Heart_Score_Reference_Sheet.pdf'].map(res => (
                  <div key={res} className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                    <span className="font-sans text-xs font-semibold text-gray-800">{res}</span>
                    <button onClick={() => showToast(`Downloading ${res}...`, 'success')} className="text-[#0d5c63] font-sans text-xs font-bold hover:underline">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Notes' && (
              <div className="space-y-3">
                <h3 className="font-display text-base font-bold text-gray-900">Interactive Notes</h3>
                <textarea
                  placeholder="Take notes synced with video timestamps..."
                  className="w-full h-32 p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-sans focus:outline-none focus:border-[#0d5c63]"
                />
                <button onClick={() => showToast('Notes saved successfully!', 'success')} className="px-4 py-2 bg-[#0d5c63] text-white font-sans text-xs font-bold rounded-xl">
                  Save Note
                </button>
              </div>
            )}

            {activeTab === 'Vetora AI' && (
              <div className="p-4 bg-cyan-50/60 border border-cyan-200 rounded-2xl space-y-2">
                <h3 className="font-sans text-xs font-bold text-[#0d5c63] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">smart_toy</span> Vetora AI Lecture Assistant
                </h3>
                <p className="font-sans text-xs text-gray-600">
                  Ask questions about thoracic radiograph interpretation or request case examples based on this video module.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Right: Interactive Transcript Sidebar (Image 4 exact) */}
        <aside className="w-full lg:w-96 border-l border-gray-200/80 bg-white flex flex-col shrink-0">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/50">
            <h3 className="font-display text-sm font-bold text-gray-900">Transcript</h3>
            <div className="flex items-center gap-1">
              <button onClick={() => showToast('Searching transcript...', 'info')} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg">
                <span className="material-symbols-outlined text-[18px]">search</span>
              </button>
              <button onClick={() => showToast('Transcript sync toggled.', 'info')} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg">
                <span className="material-symbols-outlined text-[18px]">sync</span>
              </button>
            </div>
          </div>

          {/* Transcript Lines List */}
          <div className="p-4 space-y-3 overflow-y-auto flex-1 max-h-[calc(100vh-120px)]">
            {TRANSCRIPT_LINES.map((line) => {
              const isSelected = selectedTimestamp === line.time;

              return (
                <div
                  key={line.time}
                  onClick={() => {
                    setSelectedTimestamp(line.time);
                    showToast(`Jumped to timestamp ${line.time}`, 'info');
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex gap-3 ${
                    isSelected
                      ? 'bg-cyan-50/70 border-cyan-200 shadow-2xs'
                      : 'border-transparent hover:bg-gray-50'
                  }`}
                >
                  <span className={`font-sans text-xs font-bold shrink-0 ${isSelected ? 'text-[#0d5c63]' : 'text-gray-400'}`}>
                    {line.time}
                  </span>
                  <p className={`font-sans text-xs leading-relaxed ${isSelected ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>
                    {line.text}
                  </p>
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Learning;

