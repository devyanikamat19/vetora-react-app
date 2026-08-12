import React from 'react';
import { useNavigate } from 'react-router-dom';

const Learning = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-background font-sans antialiased overflow-x-hidden min-h-screen">
      {/* Top Navigation (Contextual Header) */}
      <header className="bg-surface-bright border-b border-outline-variant shadow-sm sticky top-0 z-40">
        <div className="flex justify-between items-center w-full px-6 py-2">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 hover:bg-surface-container-high p-2 rounded-full transition-colors">
              <span className="material-symbols-outlined text-primary font-bold">arrow_back</span>
            </button>
            <div>
              <h1 className="font-display text-2xl font-bold text-primary">Diagnostic Approach to Thoracic Radiography</h1>
              <p className="font-sans text-xs text-on-surface-variant">Module 3: Advanced Imaging Techniques</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-on-surface-variant hover:bg-surface-container-high rounded-full p-2 transition-colors">
              <span className="material-symbols-outlined">bookmark</span>
            </button>
            <button className="text-on-surface-variant hover:bg-surface-container-high rounded-full p-2 transition-colors">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </div>
      </header>
      
      <main className="w-full flex flex-col lg:flex-row h-[calc(100vh-64px)]">
        {/* Main Content Area (Video & Tabs) */}
        <section className="flex-1 flex flex-col h-full overflow-y-auto bg-surface">
          {/* Video Player Area */}
          <div className="w-full bg-inverse-surface relative">
            {/* Aspect Ratio Container */}
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}> {/* 16:9 */}
              {/* Placeholder for actual video element */}
              <img className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLW8MObUDuWCr7PleD3OoIlhPKaI9AYMO0tu9fw0KL8urqW8I-gH5x6F4P5k2RCa7UhAJhDfZN5aucjPdUX8Jf21W6fmYtwNnlEyoz8UGB3szXKfRqwDgBLVaqjoKfLCmakNJKsxEcqvYErJEoXljqhVXc5_kkFSarFr3_X3W-Rh4qK5VtT6AWXEelJki1iWhNx3Zps8FFucjnhTcStEDsTQ1RVNYeYbJYqQi1gq6hSWUDyBiSjdDF" alt="Video Player" />
              {/* Video Controls Overlay (Simulated) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                {/* Progress Bar & Chapters */}
                <div className="w-full h-1 bg-surface-variant/30 rounded-full mb-4 relative cursor-pointer group">
                  <div className="absolute left-0 top-0 h-full bg-surface-variant/60 rounded-full w-3/4"></div>
                  <div className="absolute left-0 top-0 h-full bg-secondary rounded-full w-1/3 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-secondary rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform"></div>
                  </div>
                  <div className="absolute left-[15%] top-0 h-full w-0.5 bg-background"></div>
                  <div className="absolute left-[33%] top-0 h-full w-0.5 bg-background"></div>
                  <div className="absolute left-[60%] top-0 h-full w-0.5 bg-background"></div>
                  <div className="absolute left-[85%] top-0 h-full w-0.5 bg-background"></div>
                </div>
                {/* Controls */}
                <div className="flex items-center justify-between text-on-secondary">
                  <div className="flex items-center gap-6">
                    <button className="hover:text-secondary transition-colors"><span className="material-symbols-outlined">play_arrow</span></button>
                    <button className="hover:text-secondary transition-colors"><span className="material-symbols-outlined">volume_up</span></button>
                    <span className="font-sans text-xs">12:45 / 45:30</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <button className="hover:text-secondary transition-colors" title="Settings"><span className="material-symbols-outlined">settings</span></button>
                    <button className="hover:text-secondary transition-colors" title="Picture in Picture"><span className="material-symbols-outlined">picture_in_picture_alt</span></button>
                    <button className="hover:text-secondary transition-colors" title="Fullscreen"><span class="material-symbols-outlined">fullscreen</span></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs Navigation */}
          <div className="w-full border-b border-outline-variant bg-surface-container-lowest sticky top-0 z-30">
            <nav aria-label="Tabs" className="flex px-6 overflow-x-auto hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <button className="text-primary font-bold border-b-2 border-primary pb-2 pt-4 px-4 whitespace-nowrap font-sans text-sm">Overview</button>
              <button className="text-on-surface-variant hover:text-primary transition-colors pb-2 pt-4 px-4 whitespace-nowrap font-sans text-sm">Resources</button>
              <button className="text-on-surface-variant hover:text-primary transition-colors pb-2 pt-4 px-4 whitespace-nowrap font-sans text-sm">Notes</button>
              <button className="text-on-surface-variant hover:text-primary transition-colors pb-2 pt-4 px-4 whitespace-nowrap font-sans text-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                Vetora AI
              </button>
            </nav>
          </div>
          
          {/* Tab Content (Overview) */}
          <div className="p-6 lg:p-8 max-w-4xl">
            <h2 className="font-display text-2xl font-bold text-primary mb-2">Module Overview</h2>
            <p className="font-sans text-base text-on-surface-variant mb-8">
              In this comprehensive session, we explore the systematic approach to interpreting canine and feline thoracic radiographs. We will cover technical evaluation, normal anatomy, and standard diagnostic paradigms for evaluating the cardiovascular system, pulmonary parenchyma, pleural space, and mediastinum.
            </p>
            <h3 className="font-sans text-sm text-primary uppercase tracking-wider mb-4 border-b border-outline-variant pb-1">Learning Objectives</h3>
            <ul className="space-y-2 mb-8">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">check_circle</span>
                <span className="font-sans text-base text-on-surface">Identify and differentiate primary lung patterns (alveolar, bronchial, interstitial, vascular).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">check_circle</span>
                <span className="font-sans text-base text-on-surface">Systematically evaluate cardiac silhouette size and shape using standardized metrics.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">check_circle</span>
                <span className="font-sans text-base text-on-surface">Recognize subtle signs of pleural effusion versus pneumothorax.</span>
              </li>
            </ul>
            {/* Instructor Card (Glassmorphism inspired) */}
            <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-surface-variant overflow-hidden shrink-0 border-2 border-surface">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSXiwLSYauau5BmdWg6jkRbrvJMVMQTynsDF3unvQ5bduquXdnQj7JkEnWBxpJ0SBDJzx2jWHvmdWKwKn5kp0xgCjusov6Eq-6tFexHsHKOOHK19IBhYg3TNATlMk3bdSKgE4sKtqNirhym_fxj2zewDIC-QNlI5EaIRA2-3CPhAAaSnv-Fped3MMD3rRalkbeGtEezc04wt8MyijVdIsarvWfBYCul3i2hyZQUWAXigkN_wy9yQBZ" alt="Instructor" />
              </div>
              <div>
                <h4 className="font-sans text-sm font-bold text-primary">Dr. Sarah Jenkins, DVM, DACVR</h4>
                <p className="font-sans text-xs text-on-surface-variant">Diplomate, American College of Veterinary Radiology</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Right Panel (Synchronized Transcript) */}
        <aside className="w-full lg:w-96 border-l border-outline-variant bg-surface-container-lowest flex flex-col h-full shrink-0">
          <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-bright">
            <h3 className="font-sans text-sm font-bold text-primary">Transcript</h3>
            <div className="flex gap-2">
              <button className="text-on-surface-variant hover:text-primary transition-colors p-1" title="Search Transcript">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </button>
              <button className="text-on-surface-variant hover:text-primary transition-colors p-1" title="Auto-scroll settings">
                <span className="material-symbols-outlined text-[20px]">sync</span>
              </button>
            </div>
          </div>
          {/* Transcript Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--color-outline-variant) transparent' }}>
            <div className="flex gap-4 group cursor-pointer">
              <span className="font-sans text-xs text-on-surface-variant shrink-0 mt-1">11:42</span>
              <p className="font-sans text-base text-on-surface-variant group-hover:text-on-surface transition-colors">
                When we approach a thoracic radiograph, the first step is always evaluating technical quality. Is it a true orthogonal projection?
              </p>
            </div>
            <div className="flex gap-4 group cursor-pointer">
              <span className="font-sans text-xs text-on-surface-variant shrink-0 mt-1">12:05</span>
              <p className="font-sans text-base text-on-surface-variant group-hover:text-on-surface transition-colors">
                Look at the alignment of the sternum and the spine on the ventrodorsal view. They should be superimposed.
              </p>
            </div>
            <div className="flex gap-4 group cursor-pointer bg-primary-fixed/20 p-2 -mx-2 rounded-lg border-l-2 border-primary">
              <span className="font-sans text-xs text-primary font-bold shrink-0 mt-1">12:45</span>
              <p className="font-sans text-base text-on-background font-medium">
                Moving past technical evaluation, we begin our systematic review. I prefer an outside-in approach, starting with the extrathoracic structures before moving to the pleural space.
              </p>
            </div>
            <div className="flex gap-4 group cursor-pointer">
              <span className="font-sans text-xs text-on-surface-variant shrink-0 mt-1">13:10</span>
              <p className="font-sans text-base text-on-surface-variant group-hover:text-on-surface transition-colors">
                Notice here on the lateral view, the soft tissue opacity in the cranial mediastinum. In a young dog, this is typically the thymus.
              </p>
            </div>
            <div className="flex gap-4 group cursor-pointer">
              <span className="font-sans text-xs text-on-surface-variant shrink-0 mt-1">13:45</span>
              <p className="font-sans text-base text-on-surface-variant group-hover:text-on-surface transition-colors">
                However, in an older patient, we must consider differentials like lymphoma, thymoma, or other mediastinal masses.
              </p>
            </div>
            <div className="flex gap-4 group cursor-pointer">
              <span className="font-sans text-xs text-on-surface-variant shrink-0 mt-1">14:20</span>
              <p className="font-sans text-base text-on-surface-variant group-hover:text-on-surface transition-colors">
                Now, let's focus on the cardiac silhouette. We'll use the vertebral heart score method to quantify cardiomegaly.
              </p>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Learning;
