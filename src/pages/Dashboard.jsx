import React from 'react';

const Dashboard = () => {
  return (
    <>
      {/* Header */}
      <header className="mb-8">
        <h1 className="font-display text-5xl md:text-5xl font-bold text-on-surface mb-2 tracking-tight">Good morning, Omkar 👋</h1>
        <p className="font-sans text-lg text-on-surface-variant">Continue your veterinary learning journey</p>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Primary Action: Continue Learning */}
        <section className="md:col-span-8 bg-white border border-outline-variant shadow-sm rounded-xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-primary hover:shadow-md">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="inline-block px-3 py-1 bg-surface-container-low text-on-surface-variant font-sans text-xs rounded-full border border-outline-variant">Current Module</span>
              <span className="font-sans text-sm font-bold text-primary">68% Complete</span>
            </div>
            <h2 className="font-display text-3xl font-semibold text-on-surface mb-1">Small Animal Clinical Medicine</h2>
            <p className="font-sans text-base text-on-surface-variant mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-outline">play_circle</span>
              Next: Thoracic Radiography
            </p>
          </div>
          <div>
            {/* Progress Bar */}
            <div className="w-full h-1 bg-surface-variant rounded-full mb-6 overflow-hidden">
              <div className="h-full bg-secondary-container rounded-full" style={{ width: '68%' }}></div>
            </div>
            <a href="/learning" className="w-full md:w-auto px-8 py-3 bg-primary text-on-primary font-sans text-sm font-bold rounded-lg hover:bg-on-primary-fixed-variant transition-colors flex items-center justify-center gap-2">
              Resume Learning
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </section>

        {/* Learning Streak */}
        <section className="md:col-span-4 bg-white border border-outline-variant shadow-sm rounded-xl p-6 flex flex-col justify-center items-center text-center relative overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-md">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary-container opacity-20 rounded-full blur-xl"></div>
          <div className="absolute -left-4 -bottom-4 w-32 h-32 bg-primary-container opacity-10 rounded-full blur-xl"></div>
          
          <span className="material-symbols-outlined text-5xl text-secondary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
          <h3 className="font-display text-5xl font-bold text-on-surface mb-1">7 Days</h3>
          <p className="font-sans text-sm text-on-surface-variant">Learning Streak</p>
          
          <div className="mt-4 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
          </div>
        </section>

        {/* Upcoming Assessments */}
        <section className="md:col-span-6 bg-white border border-outline-variant shadow-sm rounded-xl p-6 transition-all duration-300 hover:border-primary hover:shadow-md">
          <div className="flex justify-between items-center mb-4 border-b border-surface-variant pb-2">
            <h3 className="font-display text-2xl font-semibold text-on-surface">Upcoming Assessments</h3>
            <a className="font-sans text-xs text-primary hover:underline" href="#">View All</a>
          </div>
          <ul className="space-y-0">
            <li className="flex items-center justify-between py-4 border-b border-surface-variant hover:bg-surface-container-low transition-colors -mx-6 px-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-error-container text-on-error-container flex items-center justify-center">
                  <span className="material-symbols-outlined">assignment</span>
                </div>
                <div>
                  <h4 className="font-sans text-sm font-semibold text-on-surface">Pharmacology Quiz 3</h4>
                  <p className="font-sans text-xs text-on-surface-variant">Due Tomorrow, 11:59 PM</p>
                </div>
              </div>
              <span className="font-sans text-xs text-error font-semibold">High Priority</span>
            </li>
            <li className="flex items-center justify-between py-4 hover:bg-surface-container-low transition-colors -mx-6 px-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                  <span className="material-symbols-outlined">clinical_notes</span>
                </div>
                <div>
                  <h4 className="font-sans text-sm font-semibold text-on-surface">Surgical Anatomy Midterm</h4>
                  <p className="font-sans text-xs text-on-surface-variant">Oct 15, 9:00 AM</p>
                </div>
              </div>
            </li>
          </ul>
        </section>

        {/* Recommended For You */}
        <section className="md:col-span-6 bg-white border border-outline-variant shadow-sm rounded-xl p-6 transition-all duration-300 hover:border-primary hover:shadow-md">
          <div className="flex justify-between items-center mb-4 border-b border-surface-variant pb-2">
            <h3 className="font-display text-2xl font-semibold text-on-surface">Recommended For You</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <a className="group block" href="#">
              <div className="rounded-lg overflow-hidden border border-outline-variant mb-2 relative">
                <img alt="Course Thumbnail" className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdGx4tyuYm8_jclouYO7DPGV2Bm12YNkk1i9XWm6eF7FgEpOsMLtNTJcWv5gURfvHHSt_N2R-UotbISSrkg945aGdMJypWzrM-b91Q23YkcTWVTqCugcVfrjssb3d2mMz-nKtbFThstXqcxjJ1c_FqdfifMVetzHIe4WLDBqcDT00PkJvG4AUdkUcZbxLRtqjTugBCvI53CY2f2muwHBB2C2o8q-lvN5LIlPB1KQPMrmBd_MRgaaih"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                  <span className="text-white font-sans text-xs px-2 py-1 bg-black/40 backdrop-blur-sm rounded-md">New Module</span>
                </div>
              </div>
              <h4 className="font-sans text-sm font-semibold text-on-surface group-hover:text-primary transition-colors line-clamp-2">Advanced Feline Cardiology: Diagnostic Imaging</h4>
              <p className="font-sans text-xs text-on-surface-variant mt-1">2h 15m • Dr. Sarah Jenkins</p>
            </a>
            <a className="group block" href="#">
              <div className="rounded-lg overflow-hidden border border-outline-variant mb-2 relative">
                <img alt="Course Thumbnail" className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYp8noihg4KUdvDx4T0_xaTKyt04xkPom8JAF7wA6ox8LFrmttL6rZSnNl6ICIUxe8o58snsDSIl_pqkEMgksPIhYWtnSeXmNCsfxNOxg14zm8tx5INEGJQquMA5bsTt7uEbX0-StYJ-BRXbiJqoJhVZ56G-rJL8X_nL_NkMvCbfISB_ury-PGftNRN4H4N0w4QtIGWyFyYh5LrYlJjO_iiZisO5oYoQK1i0xqOhU3G84BAIWBrW-e"/>
              </div>
              <h4 className="font-sans text-sm font-semibold text-on-surface group-hover:text-primary transition-colors line-clamp-2">Veterinary Pathology: Cellular Responses</h4>
              <p className="font-sans text-xs text-on-surface-variant mt-1">1h 45m • Case Study</p>
            </a>
          </div>
        </section>

      </div>
    </>
  );
};

export default Dashboard;
