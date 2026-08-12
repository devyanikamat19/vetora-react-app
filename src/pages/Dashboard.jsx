import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Dashboard = () => {
  const { user, enrolledCourses, courses, showToast } = useApp();

  const currentCourse = enrolledCourses.length > 0 ? enrolledCourses[0] : null;

  return (
    <>
      {/* Header */}
      <header className="mb-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-2 tracking-tight">
          Good morning, {user ? user.name.split(' ')[0] : 'Omkar'} 👋
        </h1>
        <p className="font-sans text-base text-gray-500 font-medium">Continue your veterinary learning journey</p>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Primary Action: Continue Learning (Image 2 style) */}
        <section className="md:col-span-8 bg-white border border-gray-200/80 shadow-xs rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 hover:border-[#0d5c63]/40 hover:shadow-md">
          {currentCourse ? (
            <>
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="inline-block px-3.5 py-1 bg-gray-100 text-gray-700 font-sans text-xs font-semibold rounded-full border border-gray-200">
                    Current Module
                  </span>
                  <span className="font-sans text-sm font-bold text-[#0d5c63]">68% Complete</span>
                </div>

                <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {currentCourse.title}
                </h2>
                
                <p className="font-sans text-sm text-gray-500 mb-6 flex items-center gap-2 font-medium">
                  <span className="material-symbols-outlined text-[20px] text-gray-400">play_circle</span>
                  Next: Thoracic Radiography
                </p>
              </div>

              <div>
                {/* Progress Bar (Image 2 light green styling) */}
                <div className="w-full h-1.5 bg-gray-100 rounded-full mb-6 overflow-hidden">
                  <div className="h-full bg-[#4e9f93] rounded-full transition-all duration-500" style={{ width: '68%' }}></div>
                </div>

                <Link
                  to="/my-learning"
                  className="w-full md:w-auto px-7 py-3 bg-[#0d5c63] text-white font-sans text-sm font-bold rounded-xl hover:bg-[#09474d] transition-all inline-flex items-center justify-center gap-2 shadow-xs"
                >
                  Resume Learning
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-8 text-center">
              <span className="material-symbols-outlined text-5xl text-gray-300 mb-4">school</span>
              <h2 className="font-display text-2xl font-semibold text-gray-800 mb-2">No active courses</h2>
              <p className="font-sans text-sm text-gray-500 mb-6">Explore the catalog to start your learning journey.</p>
              <Link to="/explore" className="px-6 py-3 bg-[#0d5c63] text-white font-sans text-sm font-bold rounded-xl hover:bg-[#09474d] transition-colors">
                Explore Courses
              </Link>
            </div>
          )}
        </section>

        {/* Learning Streak Card (Image 2 style) */}
        <section className="md:col-span-4 bg-white border border-gray-200/80 shadow-xs rounded-2xl p-7 flex flex-col justify-center items-center text-center relative overflow-hidden transition-all duration-300 hover:border-[#0d5c63]/40 hover:shadow-md">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#4e9f93]/10 rounded-full blur-xl pointer-events-none"></div>
          
          <span className="material-symbols-outlined text-4xl text-[#0d5c63] mb-3" style={{ fontVariationSettings: "'FILL' 1" }}>
            local_fire_department
          </span>
          <h3 className="font-display text-4xl font-extrabold text-gray-900 mb-1">7 Days</h3>
          <p className="font-sans text-xs font-semibold text-gray-500">Learning Streak</p>
          
          <div className="mt-5 flex gap-2">
            {[...Array(7)].map((_, i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-full ${i < 7 ? 'bg-[#0d5c63]' : 'bg-gray-200'}`}></div>
            ))}
          </div>
        </section>

        {/* Upcoming Assessments Section (Image 2 style) */}
        <section className="md:col-span-6 bg-white border border-gray-200/80 shadow-xs rounded-2xl p-6 transition-all duration-300 hover:border-[#0d5c63]/40 hover:shadow-md">
          <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
            <h3 className="font-display text-xl font-bold text-gray-900">Upcoming Assessments</h3>
            <button onClick={() => showToast('Full calendar of assessments opening...', 'info')} className="font-sans text-xs font-bold text-[#0d5c63] hover:underline">
              View All
            </button>
          </div>

          <ul className="divide-y divide-gray-100">
            <li className="flex items-center justify-between py-3.5 hover:bg-gray-50/80 transition-colors rounded-xl px-2 -mx-2">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">assignment</span>
                </div>
                <div>
                  <h4 className="font-sans text-sm font-bold text-gray-900">Pharmacology Quiz 3</h4>
                  <p className="font-sans text-xs text-gray-500">Due Tomorrow, 11:59 PM</p>
                </div>
              </div>
              <span className="font-sans text-xs text-red-600 font-bold bg-red-50 px-2.5 py-1 rounded-full">High Priority</span>
            </li>

            <li className="flex items-center justify-between py-3.5 hover:bg-gray-50/80 transition-colors rounded-xl px-2 -mx-2">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">clinical_notes</span>
                </div>
                <div>
                  <h4 className="font-sans text-sm font-bold text-gray-900">Surgical Anatomy Midterm</h4>
                  <p className="font-sans text-xs text-gray-500">Oct 15, 9:00 AM</p>
                </div>
              </div>
            </li>
          </ul>
        </section>

        {/* Recommended For You Section (Image 2 style with cards & badges) */}
        <section className="md:col-span-6 bg-white border border-gray-200/80 shadow-xs rounded-2xl p-6 transition-all duration-300 hover:border-[#0d5c63]/40 hover:shadow-md">
          <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
            <h3 className="font-display text-xl font-bold text-gray-900">Recommended For You</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            {/* Card 1 */}
            <Link to="/explore" className="group block">
              <div className="rounded-xl overflow-hidden border border-gray-200/80 mb-2.5 relative bg-gray-100 aspect-video">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&auto=format&fit=crop"
                  alt="Advanced Feline Cardiology"
                />
                <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-md text-white px-2 py-0.5 rounded-md font-sans text-[10px] font-bold tracking-wide">
                  New Module
                </div>
              </div>
              <h4 className="font-display text-xs font-bold text-gray-900 line-clamp-1 group-hover:text-[#0d5c63] transition-colors">
                Advanced Feline Cardiology: Diagnostic...
              </h4>
              <p className="font-sans text-[11px] text-gray-500 mt-0.5">2h 15m • Dr. Sarah Jenkins</p>
            </Link>

            {/* Card 2 */}
            <Link to="/explore" className="group block">
              <div className="rounded-xl overflow-hidden border border-gray-200/80 mb-2.5 relative bg-gray-100 aspect-video">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&auto=format&fit=crop"
                  alt="Veterinary Pathology"
                />
              </div>
              <h4 className="font-display text-xs font-bold text-gray-900 line-clamp-1 group-hover:text-[#0d5c63] transition-colors">
                Veterinary Pathology: Cellular Responses
              </h4>
              <p className="font-sans text-[11px] text-gray-500 mt-0.5">1h 45m • Case Study</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;

