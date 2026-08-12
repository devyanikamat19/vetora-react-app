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
        <h1 className="font-display text-5xl md:text-5xl font-bold text-on-surface mb-2 tracking-tight">Good morning, {user ? user.name.split(' ')[0] : 'Student'} 👋</h1>
        <p className="font-sans text-lg text-on-surface-variant">Continue your veterinary learning journey</p>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Primary Action: Continue Learning */}
        <section className="md:col-span-8 bg-white border border-outline-variant shadow-sm rounded-xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-primary hover:shadow-md">
          {currentCourse ? (
            <>
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-block px-3 py-1 bg-surface-container-low text-on-surface-variant font-sans text-xs rounded-full border border-outline-variant">Current Module</span>
                  <span className="font-sans text-sm font-bold text-primary">{currentCourse.progress}% Complete</span>
                </div>
                <h2 className="font-display text-3xl font-semibold text-on-surface mb-1">{currentCourse.title}</h2>
                <p className="font-sans text-base text-on-surface-variant mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-outline">play_circle</span>
                  Next: {currentCourse.nextModule}
                </p>
              </div>
              <div>
                {/* Progress Bar */}
                <div className="w-full h-1 bg-surface-variant rounded-full mb-6 overflow-hidden">
                  <div className="h-full bg-secondary-container rounded-full" style={{ width: `${currentCourse.progress}%` }}></div>
                </div>
                <Link to="/my-learning" className="w-full md:w-auto px-8 py-3 bg-primary text-on-primary font-sans text-sm font-bold rounded-lg hover:bg-on-primary-fixed-variant transition-colors inline-flex items-center justify-center gap-2">
                  Resume Learning
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-8 text-center">
              <span className="material-symbols-outlined text-5xl text-outline mb-4">school</span>
              <h2 className="font-display text-2xl font-semibold text-on-surface mb-2">No active courses</h2>
              <p className="font-sans text-base text-on-surface-variant mb-6">Explore the catalog to start your learning journey.</p>
              <Link to="/explore" className="px-6 py-3 bg-primary text-on-primary font-sans text-sm font-bold rounded-lg hover:bg-on-primary-fixed-variant transition-colors">
                Explore Courses
              </Link>
            </div>
          )}
        </section>

        {/* Learning Streak */}
        <section className="md:col-span-4 bg-white border border-outline-variant shadow-sm rounded-xl p-6 flex flex-col justify-center items-center text-center relative overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-md">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary-container opacity-20 rounded-full blur-xl"></div>
          <div className="absolute -left-4 -bottom-4 w-32 h-32 bg-primary-container opacity-10 rounded-full blur-xl"></div>
          
          <span className="material-symbols-outlined text-5xl text-secondary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
          <h3 className="font-display text-5xl font-bold text-on-surface mb-1">{currentCourse ? '7' : '0'} Days</h3>
          <p className="font-sans text-sm text-on-surface-variant">Learning Streak</p>
          
          <div className="mt-4 flex gap-2">
            {[...Array(7)].map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${currentCourse && i < 7 ? 'bg-secondary' : 'bg-surface-variant'}`}></div>
            ))}
          </div>
        </section>

        {/* Upcoming Assessments */}
        <section className="md:col-span-6 bg-white border border-outline-variant shadow-sm rounded-xl p-6 transition-all duration-300 hover:border-primary hover:shadow-md">
          <div className="flex justify-between items-center mb-4 border-b border-surface-variant pb-2">
            <h3 className="font-display text-2xl font-semibold text-on-surface">Upcoming Assessments</h3>
            <button onClick={() => showToast('View All Assessments feature coming soon.', 'info')} className="font-sans text-xs text-primary hover:underline">View All</button>
          </div>
          <ul className="space-y-0">
            {currentCourse ? (
              <>
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
              </>
            ) : (
              <li className="py-8 text-center text-on-surface-variant font-sans text-sm">
                No upcoming assessments.
              </li>
            )}
          </ul>
        </section>

        {/* Recommended For You */}
        <section className="md:col-span-6 bg-white border border-outline-variant shadow-sm rounded-xl p-6 transition-all duration-300 hover:border-primary hover:shadow-md">
          <div className="flex justify-between items-center mb-4 border-b border-surface-variant pb-2">
            <h3 className="font-display text-2xl font-semibold text-on-surface">Recommended For You</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {courses.slice(2, 4).map(course => (
              <Link key={course.id} to="/explore" className="group block">
                <div className="rounded-lg overflow-hidden border border-outline-variant mb-2 relative">
                  <img className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-105" src={course.image} alt={course.title} />
                  <div className="absolute top-2 right-2 bg-surface/90 backdrop-blur-sm px-1.5 py-0.5 rounded font-sans text-[10px] font-bold text-primary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    {course.rating}
                  </div>
                </div>
                <h4 className="font-display text-sm font-semibold text-on-surface line-clamp-1 group-hover:text-primary transition-colors">{course.title}</h4>
                <p className="font-sans text-xs text-on-surface-variant">{course.duration}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
