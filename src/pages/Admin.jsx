import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { COURSE_CATALOGUE } from '../context/AppContext';

// ─── Mock student roster ───────────────────────────────────────────────────────
const STUDENTS = [
  { id: 's1', initials: 'JD', name: 'Jane Doe', email: 'jane.doe@uni.edu', course: 'Small Animal Clinical Medicine', progress: 78, score: 82, status: 'Active', badge: 'On Track' },
  { id: 's2', initials: 'AS', name: 'Alex Smith', email: 'alex.s@uni.edu', course: 'Advanced Soft Tissue Surgery', progress: 22, score: 58, status: 'At Risk', badge: 'At Risk' },
  { id: 's3', initials: 'MG', name: 'Maria Garcia', email: 'maria.g@uni.edu', course: 'Small Animal Clinical Medicine', progress: 5, score: 45, status: 'Inactive', badge: 'Inactive' },
  { id: 's4', initials: 'RK', name: 'Ravi Kumar', email: 'ravi.k@uni.edu', course: 'Equine Internal Medicine', progress: 91, score: 95, status: 'Active', badge: 'Top Performer' },
  { id: 's5', initials: 'LP', name: 'Laura Perez', email: 'laura.p@uni.edu', course: 'Avian and Exotic Pet Care', progress: 60, score: 74, status: 'Active', badge: 'On Track' },
  { id: 's6', initials: 'TW', name: 'Tom Walsh', email: 't.walsh@uni.edu', course: 'Advanced Soft Tissue Surgery', progress: 38, score: 61, status: 'At Risk', badge: 'At Risk' },
  { id: 's7', initials: 'AN', name: 'Aisha Nair', email: 'aisha.n@uni.edu', course: 'Equine Internal Medicine', progress: 55, score: 79, status: 'Active', badge: 'On Track' },
  { id: 's8', initials: 'CH', name: 'Carlos Herrera', email: 'c.herrera@uni.edu', course: 'Avian and Exotic Pet Care', progress: 100, score: 98, status: 'Completed', badge: 'Top Performer' },
];

const BADGE_STYLES = {
  'On Track': 'bg-emerald-100 text-emerald-800',
  'At Risk': 'bg-red-100 text-red-800',
  'Inactive': 'bg-gray-100 text-gray-700',
  'Top Performer': 'bg-teal-100 text-teal-800',
  'Completed': 'bg-[#0d5c63] text-white',
};

// ─── Course Creator Component ──────────────────────────────────────────────────
const CourseCreator = ({ showToast, onBack }) => {
  const [activeStep, setActiveStep] = useState(2); // Step 2: Curriculum by default
  const [expandedModules, setExpandedModules] = useState({ m1: true, m2: false });
  const [videoModalModuleId, setVideoModalModuleId] = useState(null);
  const [resourceModalModuleId, setResourceModalModuleId] = useState(null);

  // Simulated upload state inside modals
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDuration, setVideoDuration] = useState('14:30');
  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceType, setResourceType] = useState('PDF Reference');

  const [modules, setModules] = useState([
    {
      id: 'm1',
      code: 'M1',
      title: 'Module 1: Foundations of Clinical Care',
      lessonCount: 3,
      assessmentCount: 1,
      lessons: [
        { id: 'l1', type: 'video', title: '1.1 Introduction to Small Animal Anatomy', meta: 'Video • 12:45 • HD 1080p' },
        { id: 'l2', type: 'resource', title: '1.2 Thoracic Radiography Reference Atlas', meta: 'Resource • PDF • 14.8 MB' },
        { id: 'l3', type: 'reading', title: '1.3 Basic Handling and Restraint Techniques', meta: 'Reading • 15 min' },
      ]
    },
    {
      id: 'm2',
      code: 'M2',
      title: 'Module 2: Diagnostics and Imaging',
      lessonCount: 1,
      assessmentCount: 0,
      lessons: [
        { id: 'l4', type: 'resource', title: '2.1 Electrocardiogram (ECG) Interpretation Guide', meta: 'Resource • PDF • 8.2 MB' }
      ]
    }
  ]);

  const toggleModule = (id) => {
    setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddModule = () => {
    const newId = `m${modules.length + 1}`;
    setModules(prev => [
      ...prev,
      {
        id: newId,
        code: `M${modules.length + 1}`,
        title: `Module ${modules.length + 1}: New Clinical Section`,
        lessonCount: 0,
        assessmentCount: 0,
        lessons: []
      }
    ]);
    setExpandedModules(prev => ({ ...prev, [newId]: true }));
    showToast('New module added to curriculum.', 'success');
  };

  // Handle Video Upload Simulation
  const handleSaveVideo = (moduleId) => {
    if (!videoTitle.trim()) {
      showToast('Please enter a title for the video lesson.', 'info');
      return;
    }

    setIsUploading(true);
    setUploadProgress(35);

    setTimeout(() => setUploadProgress(70), 400);
    setTimeout(() => {
      setUploadProgress(100);
      setModules(prev => prev.map(m => {
        if (m.id === moduleId) {
          const nextNum = m.lessons.length + 1;
          return {
            ...m,
            lessonCount: m.lessonCount + 1,
            lessons: [
              ...m.lessons,
              {
                id: `v_${Date.now()}`,
                type: 'video',
                title: `${m.code}.${nextNum} ${videoTitle}`,
                meta: `Video • ${videoDuration || '15:00'} • HD 1080p`
              }
            ]
          };
        }
        return m;
      }));
      setIsUploading(false);
      setVideoModalModuleId(null);
      setVideoTitle('');
      setUploadProgress(0);
      showToast(`Video "${videoTitle}" uploaded and attached to ${moduleId.toUpperCase()}!`, 'success');
    }, 900);
  };

  // Handle Resource Upload Simulation
  const handleSaveResource = (moduleId) => {
    if (!resourceTitle.trim()) {
      showToast('Please enter a title for the resource.', 'info');
      return;
    }

    setModules(prev => prev.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: [
            ...m.lessons,
            {
              id: `r_${Date.now()}`,
              type: 'resource',
              title: resourceTitle,
              meta: `Resource • ${resourceType} • 6.4 MB`
            }
          ]
        };
      }
      return m;
    }));

    setResourceModalModuleId(null);
    setResourceTitle('');
    showToast(`Resource "${resourceTitle}" attached successfully!`, 'success');
  };

  const handleAddQuiz = (moduleId) => {
    setModules(prev => prev.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          assessmentCount: m.assessmentCount + 1,
          lessons: [
            ...m.lessons,
            { id: `q_${Date.now()}`, type: 'quiz', title: `Module Quiz: Clinical Knowledge Check`, meta: 'Quiz • 10 Questions' }
          ]
        };
      }
      return m;
    }));
    showToast('Quiz assessment added.', 'success');
  };

  const steps = [
    { num: 1, label: 'Information' },
    { num: 2, label: 'Curriculum' },
    { num: 3, label: 'Upload Videos' },
    { num: 4, label: 'Upload Resources' },
    { num: 5, label: 'Review & Publish' },
  ];

  return (
    <div className="bg-[#f4f7f6] min-h-screen p-4 md:p-8">
      {/* Top Action Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
        <div>
          <span className="font-sans text-[11px] font-bold text-[#0d5c63] tracking-widest uppercase">COURSE CREATOR</span>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-[#0e2a2a] mt-0.5">Small Animal Clinical Medicine</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => showToast('Course preview opened.', 'info')}
            className="px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-700 font-sans text-sm font-semibold hover:bg-gray-50 transition-colors shadow-2xs"
          >
            Preview
          </button>
          <button
            onClick={() => {
              showToast('Course published with all uploaded videos & resources!', 'success');
              if (onBack) onBack();
            }}
            className="px-6 py-2 rounded-full bg-[#0d5c63] hover:bg-[#09474d] text-white font-sans text-sm font-semibold transition-all shadow-xs flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">publish</span>
            Publish Course
          </button>
        </div>
      </div>

      {/* 5-Step Stepper Bar */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-8 right-8 top-4 h-0.5 bg-gray-200 z-0"></div>
          
          {steps.map((step) => {
            const isCompleted = step.num < activeStep;
            const isActive = step.num === activeStep;

            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(step.num)}
                className="flex flex-col items-center relative z-10 cursor-pointer group"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-sans text-xs font-bold transition-all ${
                    isCompleted
                      ? 'bg-[#0d5c63] text-white'
                      : isActive
                      ? 'bg-[#0d5c63] text-white ring-4 ring-[#0d5c63]/15'
                      : 'bg-white border-2 border-gray-300 text-gray-500 group-hover:border-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  ) : (
                    step.num
                  )}
                </div>
                <span className={`font-sans text-xs mt-2 font-medium ${isActive ? 'text-[#0d5c63] font-bold' : 'text-gray-500'}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Curriculum Structure & Media Uploaders */}
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-lg font-bold text-gray-900">Curriculum & Media Assets</h2>
            <p className="font-sans text-xs text-gray-500 mt-0.5">Upload lecture videos (.mp4), PDF reading materials, and quizzes for each module.</p>
          </div>
          <button
            onClick={handleAddModule}
            className="px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-800 font-sans text-xs font-semibold hover:bg-gray-50 transition-colors shadow-2xs flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-[16px]">add</span> Add Module
          </button>
        </div>

        {/* Module Accordions */}
        <div className="space-y-4">
          {modules.map((m) => {
            const isExpanded = expandedModules[m.id];

            return (
              <div key={m.id} className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden transition-all">
                {/* Module Header Bar */}
                <div
                  onClick={() => toggleModule(m.id)}
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/80 transition-colors select-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-300 text-[20px]">drag_indicator</span>
                    <span className="px-2.5 py-1 bg-cyan-100 text-cyan-900 font-sans text-xs font-bold rounded-md">
                      {m.code}
                    </span>
                    <div>
                      <h3 className="font-sans text-sm font-bold text-gray-900">{m.title}</h3>
                      <p className="font-sans text-[11px] text-gray-400 font-medium">
                        {m.lessons.length} Content Items ({m.lessons.filter(l => l.type === 'video').length} Videos, {m.lessons.filter(l => l.type === 'resource').length} Resources)
                      </p>
                    </div>
                  </div>

                  <span className="material-symbols-outlined text-gray-400">
                    {isExpanded ? 'expand_less' : 'expand_more'}
                  </span>
                </div>

                {/* Module Items List */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-gray-100 bg-gray-50/40 space-y-2">
                    {m.lessons.length === 0 ? (
                      <div className="p-6 text-center text-gray-400 font-sans text-xs border border-dashed border-gray-200 rounded-xl my-2">
                        No videos or resources added yet. Use the buttons below to upload content.
                      </div>
                    ) : (
                      m.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="bg-white p-3 rounded-xl border border-gray-200/70 shadow-2xs flex items-center justify-between hover:border-gray-300 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-gray-300 text-[18px]">drag_indicator</span>
                            
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                              lesson.type === 'video' ? 'bg-teal-100 text-[#0d5c63]' : lesson.type === 'resource' ? 'bg-amber-100 text-amber-800' : 'bg-cyan-100 text-cyan-800'
                            }`}>
                              <span className="material-symbols-outlined text-[16px]">
                                {lesson.type === 'video' ? 'movie' : lesson.type === 'resource' ? 'attachment' : lesson.type === 'quiz' ? 'quiz' : 'menu_book'}
                              </span>
                            </div>

                            <div>
                              <h4 className="font-sans text-xs font-bold text-gray-900">{lesson.title}</h4>
                              <p className="font-sans text-[11px] text-gray-400">{lesson.meta}</p>
                            </div>
                          </div>

                          <button onClick={() => showToast(`Options for ${lesson.title} opened.`, 'info')} className="text-gray-400 hover:text-gray-600 p-1">
                            <span className="material-symbols-outlined text-[18px]">more_vert</span>
                          </button>
                        </div>
                      ))
                    )}

                    {/* Action Bar inside each module */}
                    <div className="flex flex-wrap items-center gap-3 pt-3 px-2 border-t border-gray-200/50 mt-2">
                      <button
                        onClick={() => {
                          setVideoModalModuleId(m.id);
                          setVideoTitle(`${m.code}.${m.lessons.length + 1} Lecture Video`);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#0d5c63] text-white font-sans text-xs font-bold hover:bg-[#09474d] transition-all flex items-center gap-1.5 shadow-2xs"
                      >
                        <span className="material-symbols-outlined text-[16px]">cloud_upload</span> Upload Video
                      </button>
                      <button
                        onClick={() => {
                          setResourceModalModuleId(m.id);
                          setResourceTitle(`${m.code} Clinical Protocol & Reference Guide`);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-amber-600 text-white font-sans text-xs font-bold hover:bg-amber-700 transition-all flex items-center gap-1.5 shadow-2xs"
                      >
                        <span className="material-symbols-outlined text-[16px]">note_add</span> Attach Resource (PDF)
                      </button>
                      <button
                        onClick={() => handleAddQuiz(m.id)}
                        className="px-3 py-1.5 rounded-xl border border-gray-300 text-gray-700 font-sans text-xs font-bold hover:bg-gray-100 transition-all flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[16px]">quiz</span> Add Quiz
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 🎬 MODAL: Upload Video Lecture */}
      {videoModalModuleId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative border border-gray-200 space-y-5">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0d5c63] text-[24px]">movie</span>
                <h3 className="font-display text-lg font-bold text-gray-900">Upload Video Lecture</h3>
              </div>
              <button onClick={() => setVideoModalModuleId(null)} className="text-gray-400 hover:text-gray-600">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Drag & Drop File Zone */}
            <div className="border-2 border-dashed border-[#0d5c63]/40 bg-[#0d5c63]/5 hover:bg-[#0d5c63]/10 rounded-2xl p-6 text-center cursor-pointer transition-all">
              <div className="w-12 h-12 rounded-full bg-[#0d5c63] text-white flex items-center justify-center mx-auto mb-2 shadow-xs">
                <span className="material-symbols-outlined text-[24px]">cloud_upload</span>
              </div>
              <p className="font-sans text-xs font-bold text-gray-900">Drag & Drop MP4 Video File here</p>
              <p className="font-sans text-[11px] text-gray-500 mt-0.5">Supports .mp4, .mov, .mkv up to 2 GB (HD 1080p / 4K)</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-3 font-sans text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Lesson Title</label>
                <input
                  type="text"
                  value={videoTitle}
                  onChange={e => setVideoTitle(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0d5c63] font-sans text-xs"
                  placeholder="e.g. 1.3 Ultrasound Diagnostic Techniques"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Lecture Duration (mm:ss)</label>
                <input
                  type="text"
                  value={videoDuration}
                  onChange={e => setVideoDuration(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0d5c63] font-sans text-xs"
                />
              </div>
            </div>

            {/* Progress Bar (Visible during simulated upload) */}
            {isUploading && (
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between font-sans text-xs font-bold">
                  <span className="text-[#0d5c63]">Uploading & Encoding Video...</span>
                  <span className="text-gray-900">{uploadProgress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0d5c63] rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                </div>
                <span className="font-sans text-[10px] text-gray-400 block text-right">Transcoding 1080p • 18.4 MB/s</span>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setVideoModalModuleId(null)}
                className="w-1/3 py-2.5 rounded-xl border border-gray-300 font-sans text-xs font-bold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isUploading}
                onClick={() => handleSaveVideo(videoModalModuleId)}
                className="w-2/3 py-2.5 rounded-xl bg-[#0d5c63] hover:bg-[#09474d] text-white font-sans text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">save</span> Save & Attach Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📁 MODAL: Upload Supplementary Resource (PDF) */}
      {resourceModalModuleId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative border border-gray-200 space-y-5">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-600 text-[24px]">attachment</span>
                <h3 className="font-display text-lg font-bold text-gray-900">Attach Resource / Document</h3>
              </div>
              <button onClick={() => setResourceModalModuleId(null)} className="text-gray-400 hover:text-gray-600">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Drag & Drop File Zone */}
            <div className="border-2 border-dashed border-amber-500/40 bg-amber-50/50 hover:bg-amber-100/50 rounded-2xl p-6 text-center cursor-pointer transition-all">
              <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center mx-auto mb-2 shadow-xs">
                <span className="material-symbols-outlined text-[24px]">upload_file</span>
              </div>
              <p className="font-sans text-xs font-bold text-gray-900">Drag & Drop PDF or Document here</p>
              <p className="font-sans text-[11px] text-gray-500 mt-0.5">Supports .pdf, .docx, .pptx, .zip up to 100 MB</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-3 font-sans text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Resource Title</label>
                <input
                  type="text"
                  value={resourceTitle}
                  onChange={e => setResourceTitle(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0d5c63] font-sans text-xs"
                  placeholder="e.g. Thoracic Radiography Reference Atlas 2026.pdf"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Resource Category</label>
                <select
                  value={resourceType}
                  onChange={e => setResourceType(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0d5c63] font-sans text-xs font-bold text-gray-800"
                >
                  <option>PDF Reference Guide</option>
                  <option>Clinical Lab Protocol</option>
                  <option>Lecture Slide Deck (PPTX)</option>
                  <option>Reading Notes</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setResourceModalModuleId(null)}
                className="w-1/3 py-2.5 rounded-xl border border-gray-300 font-sans text-xs font-bold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSaveResource(resourceModalModuleId)}
                className="w-2/3 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-sans text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">save</span> Attach Resource
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Sub-views ────────────────────────────────────────────────────────────────
const OverviewTab = ({ showToast }) => {
  const totalStudents = '4,250';
  const activeStudents = '1,840';
  const completionRate = '72%';
  const avgScore = '84%';
  const atRisk = [
    { id: 's1', initials: 'JD', name: 'Jane Doe', course: 'Surgery Basics', badge: 'At Risk' },
    { id: 's2', initials: 'AS', name: 'Alex Smith', course: 'Internal Medicine', badge: 'At Risk' },
    { id: 's3', initials: 'MW', name: 'Maria Garcia', course: 'Equine Anatomy', badge: 'Inactive' },
  ];

  const metrics = [
    { icon: 'group', bg: 'bg-[#0d5c63]/10', color: 'text-[#0d5c63]', label: 'Total Students', value: totalStudents, sub: '+5% this month', trend: true },
    { icon: 'person_apron', bg: 'bg-emerald-100', color: 'text-emerald-800', label: 'Active Students', value: activeStudents, sub: 'Currently engaged', trend: false },
    { icon: 'check_circle', bg: 'bg-[#0d5c63]/10', color: 'text-[#0d5c63]', label: 'Completion Rate', value: completionRate, bar: 72 },
    { icon: 'school', bg: 'bg-emerald-100', color: 'text-emerald-800', label: 'Avg Assessment', value: avgScore, sub: '+2% vs last term', trend: true },
  ];

  const coursePerformance = [
    { id: 'cp1', name: 'Surgery Basics', instructor: 'Dr. E. Miller', enrollments: 420, status: 'Published' },
    { id: 'cp2', name: 'Internal Medicine Advanced', instructor: 'Dr. S. Chen', enrollments: 315, status: 'Published' },
    { id: 'cp3', name: 'Exotic Animal Care', instructor: 'Dr. J. Davis', enrollments: 150, status: 'Draft' },
    { id: 'cp4', name: 'Veterinary Pharmacology', instructor: 'Dr. A. Patel', enrollments: 280, status: 'Published' },
  ];

  return (
    <div className="space-y-8">
      {/* Header section (Image 0 style) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-[#0d5c63]">Dashboard Overview</h1>
          <p className="font-sans text-sm text-gray-500 mt-1">
            Welcome back, Dr. Aris. Here is the latest performance data across the institution.
          </p>
        </div>
        <button
          onClick={() => showToast('Institutional performance report generated!', 'success')}
          className="px-5 py-2.5 rounded-xl border border-[#0d5c63] text-[#0d5c63] font-sans text-xs font-bold hover:bg-[#0d5c63]/5 transition-colors self-start sm:self-auto shadow-2xs"
        >
          Generate Report
        </button>
      </div>

      {/* 4 Stat Metric cards (Image 0 style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map(m => (
          <div key={m.label} className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs hover:border-[#0d5c63] hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-3">
              <div className={`p-2 rounded-xl ${m.bg} ${m.color}`}>
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>{m.icon}</span>
              </div>
              <p className="font-sans text-xs font-semibold text-gray-500">{m.label}</p>
            </div>
            <p className="font-display text-3xl font-extrabold text-gray-900">{m.value}</p>
            {m.bar !== undefined && (
              <div className="w-full h-1.5 bg-gray-100 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-[#0d5c63] rounded-full transition-all duration-500" style={{ width: `${m.bar}%` }} />
              </div>
            )}
            {m.sub && (
              <p className={`font-sans text-[11px] mt-1.5 flex items-center gap-1 font-semibold ${m.trend ? 'text-emerald-700' : 'text-gray-500'}`}>
                {m.trend && <span className="material-symbols-outlined text-[13px]">trending_up</span>}
                {m.sub}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Actionable Analytics & Attention Needed Grid (Image 0 style) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Actionable Analytics */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6">
          <h2 className="font-display text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0d5c63] text-[20px]">insights</span> Actionable Analytics
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 bg-red-50/70 rounded-2xl border border-red-100/80">
              <span className="material-symbols-outlined text-red-600 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
              <div>
                <p className="font-sans text-xs font-bold text-gray-900">23% of students drop off during Module 3 of Surgery Basics</p>
                <p className="font-sans text-[11px] text-gray-600 mt-1">Suggested Action: Review video lecture clarity and split assessment into smaller parts.</p>
                <button onClick={() => showToast('Module content review opened.', 'info')} className="mt-2 text-[#0d5c63] font-sans text-xs font-bold hover:underline">
                  Review Module Content
                </button>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200/70">
              <span className="material-symbols-outlined text-gray-600 mt-0.5">trending_down</span>
              <div>
                <p className="font-sans text-xs font-bold text-gray-900">Assessment performance dropped by 12% in Internal Medicine</p>
                <p className="font-sans text-[11px] text-gray-600 mt-1">Recent cohort scored lower on 'Canine Cardiology' section.</p>
                <button onClick={() => showToast('Detailed score report opened.', 'info')} className="mt-2 text-[#0d5c63] font-sans text-xs font-bold hover:underline">
                  View Detailed Scores
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Attention Needed */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 flex flex-col justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-red-500 text-[20px]">assignment_late</span> Attention Needed
            </h2>
            <ul className="space-y-3">
              {atRisk.map(s => (
                <li key={s.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0d5c63] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {s.initials}
                    </div>
                    <div>
                      <p className="font-sans text-xs font-bold text-gray-900">{s.name}</p>
                      <p className="font-sans text-[10px] text-gray-500">{s.course}</p>
                    </div>
                  </div>
                  <span className={`${BADGE_STYLES[s.badge]} px-2 py-0.5 rounded-md font-sans text-[10px] font-bold`}>
                    {s.badge}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => showToast('Roster filtered to all at-risk students.', 'info')}
            className="mt-4 w-full py-2 border border-gray-300 text-gray-700 rounded-xl font-sans text-xs font-bold hover:bg-gray-50 transition-colors shadow-2xs"
          >
            View All Students
          </button>
        </div>
      </div>

      {/* Course Performance Table (Image 1 style) */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-200/70 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-gray-900">Course Performance</h2>
          <button
            onClick={() => showToast('Course performance filters opened.', 'info')}
            className="px-3.5 py-1.5 rounded-xl border border-gray-200 text-gray-700 font-sans text-xs font-semibold hover:bg-gray-50 transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">filter_list</span> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full font-sans text-xs text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase tracking-wider border-b border-gray-200 text-[10px]">
                <th className="p-4 font-bold">COURSE NAME</th>
                <th className="p-4 font-bold">INSTRUCTOR</th>
                <th className="p-4 font-bold">ENROLLMENTS</th>
                <th className="p-4 font-bold">STATUS</th>
                <th className="p-4 font-bold text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {coursePerformance.map(c => (
                <tr key={c.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="p-4 font-bold text-gray-900">{c.name}</td>
                  <td className="p-4 text-gray-600">{c.instructor}</td>
                  <td className="p-4 text-gray-900 font-bold">{c.enrollments}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold ${
                      c.status === 'Published'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => showToast(`Options for "${c.name}" opened.`, 'info')}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded-md"
                    >
                      <span className="material-symbols-outlined text-[18px]">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const CoursesTab = ({ courses, showToast, onEditCourse }) => {
  const [search, setSearch] = useState('');
  const [showNewCourseModal, setShowNewCourseModal] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseCategory, setNewCourseCategory] = useState('Small Animal Surgery');
  const [newCourseInstructor, setNewCourseInstructor] = useState('Dr. Sarah Jenkins, DVM, DACVIM');
  const [videoFileName, setVideoFileName] = useState(null);
  const [resourceFileName, setResourceFileName] = useState(null);

  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) {
      showToast('Please enter a course title.', 'info');
      return;
    }

    showToast(`New Course "${newCourseTitle}" created with attached media! Launching Curriculum Editor...`, 'success');
    setShowNewCourseModal(false);
    onEditCourse();
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
      <div className="p-5 border-b border-gray-200/70 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <h2 className="font-display text-xl font-bold text-gray-900">Course Management</h2>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">search</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm font-sans focus:outline-none focus:border-[#0d5c63] bg-gray-50/50"
              placeholder="Search courses..."
            />
          </div>
          <button
            onClick={() => setShowNewCourseModal(true)}
            className="px-4 py-2 bg-[#0d5c63] text-white rounded-xl font-sans text-sm font-bold hover:bg-[#09474d] transition-colors flex items-center gap-1 shrink-0 shadow-2xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span> New Course
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full font-sans text-sm text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
              <th className="p-4 font-semibold">Course</th>
              <th className="p-4 font-semibold">Instructor</th>
              <th className="p-4 font-semibold">Students</th>
              <th className="p-4 font-semibold">Modules</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(c => (
              <tr key={c.id} className="hover:bg-gray-50/60 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={c.image} alt={c.title} className="w-10 h-10 rounded-lg object-cover shrink-0 border border-gray-200" />
                    <div>
                      <p className="font-bold text-gray-900">{c.title}</p>
                      <p className="text-xs text-gray-500">{c.tag}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-gray-600">{c.instructor}</td>
                <td className="p-4 text-gray-900 font-semibold">{c.students}</td>
                <td className="p-4 text-gray-900">{c.modules.length}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={onEditCourse}
                      className="p-2 text-gray-500 hover:text-[#0d5c63] hover:bg-[#0d5c63]/10 rounded-lg transition-colors"
                      title="Open Course Creator"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button
                      onClick={() => showToast(`Analytics for "${c.title}" opening...`, 'info')}
                      className="p-2 text-gray-500 hover:text-[#0d5c63] hover:bg-[#0d5c63]/10 rounded-lg transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">analytics</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🌟 NEW COURSE & MEDIA UPLOAD MODAL */}
      {showNewCourseModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl relative border border-gray-200 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-display text-xl font-bold text-gray-900">Create New Course</h3>
                <p className="font-sans text-xs text-gray-500 mt-0.5">Upload main lecture videos and supplementary course materials.</p>
              </div>
              <button onClick={() => setShowNewCourseModal(false)} className="text-gray-400 hover:text-gray-600">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-4 font-sans text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={newCourseTitle}
                  onChange={e => setNewCourseTitle(e.target.value)}
                  placeholder="e.g. Feline Abdominal Ultrasonography & Biopsy Techniques"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0d5c63] font-sans text-xs text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Specialty Category</label>
                  <select
                    value={newCourseCategory}
                    onChange={e => setNewCourseCategory(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0d5c63] font-sans text-xs font-bold text-gray-800"
                  >
                    <option>Small Animal Surgery</option>
                    <option>Cardiology</option>
                    <option>Radiology & Imaging</option>
                    <option>Equine Medicine</option>
                    <option>Exotics & Avian</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Lead Instructor</label>
                  <input
                    type="text"
                    value={newCourseInstructor}
                    onChange={e => setNewCourseInstructor(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0d5c63] font-sans text-xs text-gray-900"
                  />
                </div>
              </div>

              {/* 🎬 Section 1: Upload Lecture Video */}
              <div className="pt-2">
                <label className="block font-bold text-gray-800 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[#0d5c63] text-[18px]">movie</span> Upload Lecture Video (MP4)</span>
                  <span className="text-[10px] text-gray-400">Max 2 GB</span>
                </label>

                <div
                  onClick={() => {
                    setVideoFileName('Lecture_01_Diagnostic_Ultrasonography_HD.mp4 (450 MB)');
                    showToast('Video file selected for upload.', 'info');
                  }}
                  className="border-2 border-dashed border-[#0d5c63]/40 bg-[#0d5c63]/5 hover:bg-[#0d5c63]/10 rounded-2xl p-4 text-center cursor-pointer transition-all"
                >
                  <span className="material-symbols-outlined text-[24px] text-[#0d5c63]">cloud_upload</span>
                  <p className="font-bold text-gray-800 mt-1">
                    {videoFileName ? videoFileName : 'Click to Select or Drag & Drop MP4 Video File'}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Supports MP4, MOV, MKV • Auto-transcoded to 1080p</p>
                </div>
              </div>

              {/* 📁 Section 2: Upload Course Resources (PDF / Reading Material) */}
              <div className="pt-2">
                <label className="block font-bold text-gray-800 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-amber-600 text-[18px]">attachment</span> Attach Course Resources & Protocols</span>
                  <span className="text-[10px] text-gray-400">PDF, DOCX, PPTX</span>
                </label>

                <div
                  onClick={() => {
                    setResourceFileName('Clinical_Ultrasonography_Reference_Atlas_2026.pdf (14.2 MB)');
                    showToast('Resource PDF attached.', 'info');
                  }}
                  className="border-2 border-dashed border-amber-500/40 bg-amber-50/40 hover:bg-amber-100/40 rounded-2xl p-4 text-center cursor-pointer transition-all"
                >
                  <span className="material-symbols-outlined text-[24px] text-amber-600">upload_file</span>
                  <p className="font-bold text-gray-800 mt-1">
                    {resourceFileName ? resourceFileName : 'Click to Attach Course Syllabus / PDF Materials'}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Supports PDF Atlases, Lab Protocol Docs, Slide Decks</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowNewCourseModal(false)}
                  className="w-1/3 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl bg-[#0d5c63] hover:bg-[#09474d] text-white font-bold shadow-xs transition-all flex items-center justify-center gap-1.5"
                >
                  Save & Edit Curriculum <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StudentsTab = ({ showToast }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden p-6">
      <h2 className="font-display text-xl font-bold text-gray-900 mb-4">Student Roster</h2>
      <div className="overflow-x-auto">
        <table className="w-full font-sans text-sm text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-200">
              <th className="p-4 font-semibold">Student</th>
              <th className="p-4 font-semibold">Current Course</th>
              <th className="p-4 font-semibold">Progress</th>
              <th className="p-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {STUDENTS.map(s => (
              <tr key={s.id}>
                <td className="p-4 font-bold text-gray-900">{s.name}</td>
                <td className="p-4 text-gray-600">{s.course}</td>
                <td className="p-4 text-[#0d5c63] font-bold">{s.progress}%</td>
                <td className="p-4">
                  <span className={`${BADGE_STYLES[s.badge]} px-2 py-0.5 rounded-md text-xs font-bold`}>{s.badge}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── Analytics Tab Component ──────────────────────────────────────────────────
const AnalyticsTab = ({ showToast }) => {
  const [timeframe, setTimeframe] = useState('Last 30 Days');

  const analyticsMetrics = [
    { label: 'Total Watch Time', value: '1,420 hrs', change: '+18.4%', isPositive: true, icon: 'schedule', color: 'text-[#0d5c63]', bg: 'bg-[#0d5c63]/10' },
    { label: 'Avg Completion Rate', value: '78.2%', change: '+5.1%', isPositive: true, icon: 'pie_chart', color: 'text-emerald-800', bg: 'bg-emerald-100' },
    { label: 'Quiz Submissions', value: '8,940', change: '86.5% Pass Rate', isPositive: true, icon: 'quiz', color: 'text-cyan-800', bg: 'bg-cyan-100' },
    { label: 'Student Rating', value: '4.9 / 5.0', change: '1,240 Reviews', isPositive: true, icon: 'star', color: 'text-amber-700', bg: 'bg-amber-100' },
  ];

  const weeklyData = [
    { day: 'Mon', views: 420, height: '65%' },
    { day: 'Tue', views: 680, height: '85%' },
    { day: 'Wed', views: 890, height: '100%' },
    { day: 'Thu', views: 750, height: '90%' },
    { day: 'Fri', views: 530, height: '70%' },
    { day: 'Sat', views: 310, height: '45%' },
    { day: 'Sun', views: 240, height: '35%' },
  ];

  const moduleDropOff = [
    { module: 'Module 1: Foundations of Clinical Care', completion: 94, dropOff: '6%', status: 'Optimal' },
    { module: 'Module 2: Diagnostics & Imaging', completion: 88, dropOff: '12%', status: 'Optimal' },
    { module: 'Module 3: Cardiology Pattern Analysis', completion: 72, dropOff: '28%', status: 'Attention Needed' },
    { module: 'Module 4: Soft Tissue Surgical Protocols', completion: 89, dropOff: '11%', status: 'Optimal' },
  ];

  const topLessons = [
    { title: '1.2 Diagnostic Radiography & Thoracic Views', views: '1,820', rating: 4.9, category: 'Imaging' },
    { title: '3.1 EKG Pattern Analysis & Arrythmia', views: '1,450', rating: 4.8, category: 'Cardiology' },
    { title: '2.4 Renal Pathology & CBC Interpretation', views: '1,210', rating: 5.0, category: 'Diagnostics' },
  ];

  return (
    <div className="space-y-8">
      {/* Header Bar & Timeframe Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-gray-900">Creator Analytics</h2>
          <p className="font-sans text-xs text-gray-500 mt-0.5">Track student engagement, completion rates, and content performance.</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={timeframe}
            onChange={e => {
              setTimeframe(e.target.value);
              showToast(`Analytics filtered for ${e.target.value}`, 'info');
            }}
            className="bg-white border border-gray-200 text-xs font-sans font-bold text-gray-800 rounded-xl px-3 py-2 focus:outline-none focus:border-[#0d5c63]"
          >
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>All Time</option>
          </select>
          <button
            onClick={() => showToast('Exporting analytics CSV report...', 'success')}
            className="px-4 py-2 bg-[#0d5c63] text-white rounded-xl font-sans text-xs font-bold hover:bg-[#09474d] transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <span className="material-symbols-outlined text-[16px]">download</span> Export CSV
          </button>
        </div>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsMetrics.map(m => (
          <div key={m.label} className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-2xs hover:shadow-md transition-all">
            <div className="flex items-center gap-2.5 mb-3">
              <div className={`p-2 rounded-xl ${m.bg} ${m.color}`}>
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>{m.icon}</span>
              </div>
              <span className="font-sans text-xs font-bold text-gray-500">{m.label}</span>
            </div>
            <p className="font-display text-2xl font-extrabold text-gray-900">{m.value}</p>
            <span className="font-sans text-[11px] font-semibold text-emerald-700 mt-1 block flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">trending_up</span> {m.change}
            </span>
          </div>
        ))}
      </div>

      {/* Bar Chart & Top Lessons Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Weekly Active Engagement Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-display text-base font-bold text-gray-900">Student Activity & Video Views</h3>
              <p className="font-sans text-xs text-gray-400 mt-0.5">Daily active video views for the current week</p>
            </div>
            <span className="font-sans text-xs font-bold text-[#0d5c63] bg-[#0d5c63]/10 px-3 py-1 rounded-full">
              Peak: Wednesday (890 views)
            </span>
          </div>

          {/* Bar Chart Graphics */}
          <div className="h-48 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-gray-100 px-4">
            {weeklyData.map(d => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <span className="font-sans text-[10px] font-bold text-[#0d5c63] opacity-0 group-hover:opacity-100 transition-opacity">
                  {d.views}
                </span>
                <div
                  className="w-full max-w-[36px] bg-[#0d5c63] group-hover:bg-emerald-600 rounded-t-xl transition-all duration-300"
                  style={{ height: d.height }}
                ></div>
                <span className="font-sans text-xs font-semibold text-gray-500">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Top Performing Lessons */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-6">
          <h3 className="font-display text-base font-bold text-gray-900 mb-4">Top Performing Lessons</h3>
          <div className="space-y-4">
            {topLessons.map((l, i) => (
              <div key={l.title} className="p-3 bg-gray-50 rounded-xl border border-gray-200/70 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-sans text-[10px] font-bold text-[#0d5c63] uppercase">{l.category}</span>
                  <span className="font-sans text-xs font-bold text-amber-600 flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    {l.rating.toFixed(1)}
                  </span>
                </div>
                <h4 className="font-sans text-xs font-bold text-gray-900 truncate">{l.title}</h4>
                <p className="font-sans text-[11px] text-gray-500">{l.views} Total Views</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Module Completion & Drop-Off Analysis Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-gray-200/70">
          <h3 className="font-display text-base font-bold text-gray-900">Curriculum Retention & Drop-Off Analysis</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full font-sans text-xs text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase tracking-wider text-[10px] border-b border-gray-200">
                <th className="p-4 font-bold">MODULE TITLE</th>
                <th className="p-4 font-bold">COMPLETION RATE</th>
                <th className="p-4 font-bold">DROP-OFF RATE</th>
                <th className="p-4 font-bold">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {moduleDropOff.map(row => (
                <tr key={row.module} className="hover:bg-gray-50/60 transition-colors">
                  <td className="p-4 font-bold text-gray-900">{row.module}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#0d5c63] rounded-full" style={{ width: `${row.completion}%` }}></div>
                      </div>
                      <span className="font-bold text-gray-900">{row.completion}%</span>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-gray-700">{row.dropOff}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold ${
                      row.status === 'Optimal' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── Settings Tab Component ───────────────────────────────────────────────────
const SettingsTab = ({ showToast }) => {
  const [settings, setSettings] = useState({
    instructorName: 'Dr. Sarah Jenkins, DVM, DACVIM',
    institution: 'Vetora Academy of Veterinary Medicine',
    email: 's.jenkins@vetora.edu',
    passingGrade: 80,
    autoCertificates: true,
    aiAssistant: true,
    emailAlerts: true,
    weeklyReport: true,
  });

  const [activeSubTab, setActiveSubTab] = useState('Profile & Branding');

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h2 className="font-display text-2xl font-bold text-gray-900">Creator & Institution Settings</h2>
        <p className="font-sans text-xs text-gray-500 mt-0.5">Manage instructor profile, course publishing rules, and system notifications.</p>
      </div>

      {/* Sub Tab Navigation */}
      <div className="flex gap-4 border-b border-gray-200 pb-2">
        {['Profile & Branding', 'Curriculum Rules', 'Notifications'].map(sub => (
          <button
            key={sub}
            onClick={() => setActiveSubTab(sub)}
            className={`font-sans text-xs font-bold py-2 px-3 rounded-xl transition-all ${
              activeSubTab === sub ? 'bg-[#0d5c63] text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Tab Content Box */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 md:p-8 shadow-2xs space-y-6">
        {activeSubTab === 'Profile & Branding' && (
          <div className="space-y-5">
            <h3 className="font-display text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Instructor Profile</h3>
            
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80"
                alt="Avatar"
                className="w-16 h-16 rounded-full object-cover border-2 border-[#0d5c63]"
              />
              <button
                onClick={() => showToast('Avatar upload initialized.', 'info')}
                className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-sans font-bold text-gray-700 hover:bg-gray-50"
              >
                Change Avatar
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-xs font-bold text-gray-700 mb-1">Full Name & Title</label>
                <input
                  type="text"
                  value={settings.instructorName}
                  onChange={e => setSettings(s => ({ ...s, instructorName: e.target.value }))}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-sans text-xs text-gray-900 focus:outline-none focus:border-[#0d5c63]"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-bold text-gray-700 mb-1">Institution / Department</label>
                <input
                  type="text"
                  value={settings.institution}
                  onChange={e => setSettings(s => ({ ...s, institution: e.target.value }))}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-sans text-xs text-gray-900 focus:outline-none focus:border-[#0d5c63]"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-bold text-gray-700 mb-1">Contact Email</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={e => setSettings(s => ({ ...s, email: e.target.value }))}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-sans text-xs text-gray-900 focus:outline-none focus:border-[#0d5c63]"
                />
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'Curriculum Rules' && (
          <div className="space-y-6">
            <h3 className="font-display text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Academic & Grading Standards</h3>

            <div>
              <label className="block font-sans text-xs font-bold text-gray-700 mb-1">Minimum Passing Quiz Score (%): {settings.passingGrade}%</label>
              <input
                type="range"
                min="60"
                max="100"
                value={settings.passingGrade}
                onChange={e => setSettings(s => ({ ...s, passingGrade: Number(e.target.value) }))}
                className="w-full accent-[#0d5c63]"
              />
            </div>

            <div className="space-y-4 pt-2">
              <label className="flex items-center justify-between cursor-pointer p-3 bg-gray-50 rounded-xl border border-gray-200">
                <div>
                  <span className="font-sans text-xs font-bold text-gray-900 block">Auto-Issue RACE CE Certificates</span>
                  <span className="font-sans text-[11px] text-gray-500">Automatically generate verified PDF certificates upon 100% course completion.</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoCertificates}
                  onChange={e => setSettings(s => ({ ...s, autoCertificates: e.target.checked }))}
                  className="w-4 h-4 text-[#0d5c63] rounded border-gray-300 focus:ring-[#0d5c63]"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer p-3 bg-gray-50 rounded-xl border border-gray-200">
                <div>
                  <span className="font-sans text-xs font-bold text-gray-900 block">Vetora AI Student Assistant</span>
                  <span className="font-sans text-[11px] text-gray-500">Allow AI chatbot to answer student questions based on course transcript data.</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.aiAssistant}
                  onChange={e => setSettings(s => ({ ...s, aiAssistant: e.target.checked }))}
                  className="w-4 h-4 text-[#0d5c63] rounded border-gray-300 focus:ring-[#0d5c63]"
                />
              </label>
            </div>
          </div>
        )}

        {activeSubTab === 'Notifications' && (
          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Notification Preferences</h3>

            <label className="flex items-center justify-between cursor-pointer p-3 bg-gray-50 rounded-xl border border-gray-200">
              <div>
                <span className="font-sans text-xs font-bold text-gray-900 block">Student Case Submission Alerts</span>
                <span className="font-sans text-[11px] text-gray-500">Receive email notification when a student submits a clinical case for review.</span>
              </div>
              <input
                type="checkbox"
                checked={settings.emailAlerts}
                onChange={e => setSettings(s => ({ ...s, emailAlerts: e.target.checked }))}
                className="w-4 h-4 text-[#0d5c63] rounded border-gray-300 focus:ring-[#0d5c63]"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer p-3 bg-gray-50 rounded-xl border border-gray-200">
              <div>
                <span className="font-sans text-xs font-bold text-gray-900 block">Weekly Performance Digest</span>
                <span className="font-sans text-[11px] text-gray-500">Receive a weekly email summary of student engagement and completion rates.</span>
              </div>
              <input
                type="checkbox"
                checked={settings.weeklyReport}
                onChange={e => setSettings(s => ({ ...s, weeklyReport: e.target.checked }))}
                className="w-4 h-4 text-[#0d5c63] rounded border-gray-300 focus:ring-[#0d5c63]"
              />
            </label>
          </div>
        )}

        {/* Save Settings Action Button */}
        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={() => showToast('Creator settings updated successfully!', 'success')}
            className="px-6 py-2.5 bg-[#0d5c63] hover:bg-[#09474d] text-white font-sans text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">save</span> Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Admin Page ───────────────────────────────────────────────────────────
const Admin = () => {
  const { user, logout, showToast } = useApp();
  const navigate = useNavigate();
  const courses = COURSE_CATALOGUE;
  const [activeTab, setActiveTab] = useState('Overview'); // Default to Overview
  const [isEditingCourse, setIsEditingCourse] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navTabs = [
    { id: 'Overview', icon: 'dashboard', label: 'Overview' },
    { id: 'Courses', icon: 'collections_bookmark', label: 'Courses' },
    { id: 'Students', icon: 'group', label: 'Students' },
    { id: 'Analytics', icon: 'analytics', label: 'Analytics' },
    { id: 'Settings', icon: 'settings', label: 'Settings' },
  ];

  return (
    <div className="bg-[#f4f7f6] text-gray-900 font-sans antialiased min-h-screen flex">

      {/* Admin Sidebar */}
      <aside className="bg-white text-gray-800 font-sans text-sm hidden md:flex flex-col h-screen p-5 gap-3 w-64 border-r border-gray-200/80 sticky top-0 shrink-0 z-50">
        {/* Brand Header */}
        <div className="flex items-center gap-2.5 px-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-[#0d5c63] text-white flex items-center justify-center font-bold text-sm shrink-0">
            V
          </div>
          <span className="font-display text-base font-bold text-[#0d5c63] tracking-tight">Vetora Admin</span>
        </div>

        {/* User Profile Badge */}
        <div className="flex items-center gap-3 mb-6 p-3 rounded-2xl bg-gray-50 border border-gray-200/70">
          <img
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80"
            alt="Dr. Sarah Jenkins"
            className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-200"
          />
          <div className="min-w-0">
            <p className="font-sans text-xs font-bold text-gray-900 truncate">Dr. Sarah Jenkins</p>
            <p className="font-sans text-[11px] text-gray-500 truncate font-medium">Institutional Dashboard</p>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex flex-col gap-1.5 flex-1">
          {navTabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id !== 'Courses') setIsEditingCourse(false);
                }}
                className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition-all font-sans text-sm text-left
                  ${isActive
                    ? 'bg-[#0d5c63] text-white font-bold shadow-xs'
                    : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900 font-medium'}`}
              >
                <span className="material-symbols-outlined text-[20px]" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-gray-200/70 space-y-1">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-3 px-3 py-2 w-full text-gray-600 hover:bg-gray-100 rounded-xl transition-all text-xs font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span> Student View
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full text-red-600 hover:bg-red-50 rounded-xl transition-all text-xs font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {/* Render Course Creator View when active */}
        {activeTab === 'Courses' && isEditingCourse ? (
          <CourseCreator
            showToast={showToast}
            onBack={() => setIsEditingCourse(false)}
          />
        ) : (
          <div className="p-5 md:p-8 max-w-7xl mx-auto">
            {/* Page title */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900">{activeTab}</h1>
                <p className="font-sans text-xs text-gray-500 mt-1">
                  {activeTab === 'Overview' && 'Performance data across your institution.'}
                  {activeTab === 'Courses' && `${courses.length} courses in the catalogue.`}
                  {activeTab === 'Students' && `${STUDENTS.length} students enrolled.`}
                  {activeTab === 'Analytics' && 'Student engagement, watch time, and retention metrics.'}
                  {activeTab === 'Settings' && 'Manage instructor details and curriculum configuration.'}
                </p>
              </div>

              {activeTab === 'Courses' && (
                <button
                  onClick={() => setIsEditingCourse(true)}
                  className="px-4 py-2 bg-[#0d5c63] text-white rounded-xl font-sans text-xs font-bold hover:bg-[#09474d] transition-colors flex items-center gap-1 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span> Open Course Creator
                </button>
              )}
            </div>

            {activeTab === 'Overview' && <OverviewTab showToast={showToast} />}
            {activeTab === 'Courses' && (
              <CoursesTab
                courses={courses}
                showToast={showToast}
                onEditCourse={() => setIsEditingCourse(true)}
              />
            )}
            {activeTab === 'Students' && <StudentsTab showToast={showToast} />}
            {activeTab === 'Analytics' && <AnalyticsTab showToast={showToast} />}
            {activeTab === 'Settings' && <SettingsTab showToast={showToast} />}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;


