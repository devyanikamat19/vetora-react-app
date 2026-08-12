import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useApp } from '../context/AppContext';

const CourseCard = ({ course, onEnroll, isEnrolled }) => (
  <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden flex flex-col cursor-pointer group transition-all duration-300 hover:border-primary hover:shadow-[0px_8px_16px_rgba(13,92,99,0.12)] hover:-translate-y-0.5 shadow-[0px_2px_4px_rgba(13,92,99,0.08)]">
    <div className="relative h-48 w-full overflow-hidden bg-surface-variant">
      <img
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        src={course.image}
        alt={course.title}
      />
      <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-sm px-2 py-1 rounded font-sans text-xs font-bold text-primary flex items-center gap-1 shadow-sm">
        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
        {course.rating}
      </div>
      <div className={`absolute bottom-3 left-3 ${course.tagBg} backdrop-blur-sm px-2 py-1 rounded font-sans text-xs shadow-sm`}>
        {course.level}
      </div>
    </div>
    <div className="p-6 flex flex-col flex-1">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-display text-xl text-on-surface line-clamp-2">{course.title}</h3>
      </div>
      <p className="font-sans text-xs text-on-surface-variant mb-4 flex items-center gap-1">
        <span className="material-symbols-outlined text-[16px]">person</span>
        {course.instructor || 'Dr. Expert'}
      </p>
      <div className="mt-auto">
        {isEnrolled ? (
          <>
            <div className="flex justify-between font-sans text-xs text-on-surface-variant mb-1">
              <span>In Progress</span>
              <span className="text-primary font-bold">{course.progress || 0}%</span>
            </div>
            <div className="w-full bg-surface-container-high rounded-full h-1.5 mb-3 overflow-hidden">
              <div className="bg-secondary-container h-1.5 rounded-full" style={{ width: `${course.progress || 0}%` }}></div>
            </div>
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="font-sans text-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                {course.duration}
              </span>
              <Link to="/learning" className="text-primary font-sans text-sm hover:underline font-medium">Continue</Link>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between text-on-surface-variant pt-4 border-t border-outline-variant/50">
            <span className="font-sans text-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              {course.duration}
            </span>
            <button 
              onClick={() => onEnroll(course.id)}
              className="font-sans text-sm text-primary font-medium hover:bg-primary/10 px-4 py-2 rounded-lg transition-colors border border-primary/20"
            >
              Enroll Now
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
);

const Explore = () => {
  const { courses, enrolledCourses, enrollInCourse } = useApp();
  
  const [filters, setFilters] = useState({
    Clinical: false,
    Surgery: false,
    LargeAnimal: false,
    Exotics: false,
    Beginner: false,
    Intermediate: false,
    Specialist: false,
  });

  const handleFilter = (key) => setFilters(f => ({ ...f, [key]: !f[key] }));

  // Filtering logic
  const activeTags = Object.keys(filters).filter(k => filters[k] && ['Clinical', 'Surgery', 'LargeAnimal', 'Exotics'].includes(k));
  const activeLevels = Object.keys(filters).filter(k => filters[k] && ['Beginner', 'Intermediate', 'Specialist'].includes(k));

  const filteredCourses = courses.filter(course => {
    // Map internal tag keys to actual tags in the data
    const matchesTag = activeTags.length === 0 || activeTags.some(tag => course.tag.replace(/\s+/g, '') === tag || course.tag.includes(tag));
    const matchesLevel = activeLevels.length === 0 || activeLevels.some(level => course.level === level);
    return matchesTag && matchesLevel;
  });

  return (
    <div className="flex max-w-[1440px] mx-auto bg-background min-h-screen relative">
      <Sidebar />
      <main className="flex-1 flex flex-col p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-on-surface mb-2">Explore Catalog</h1>
            <p className="font-sans text-base text-on-surface-variant">Discover expert-led veterinary courses and specializations.</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <aside className="w-full lg:w-64 shrink-0 space-y-6 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm h-fit sticky top-6">
            <div className="flex items-center justify-between">
              <h3 className="font-sans text-base font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">filter_list</span> Filters
              </h3>
              <button 
                onClick={() => setFilters({ Clinical: false, Surgery: false, LargeAnimal: false, Exotics: false, Beginner: false, Intermediate: false, Specialist: false })}
                className="text-primary font-sans text-sm hover:underline"
              >
                Clear all
              </button>
            </div>
            
            <div>
              <h4 className="font-sans text-sm font-bold text-on-surface-variant mb-3 uppercase tracking-wider">Subject Area</h4>
              <div className="space-y-3">
                {[
                  { id: 'Clinical', label: 'Clinical Practice' },
                  { id: 'Surgery', label: 'Surgery' },
                  { id: 'LargeAnimal', label: 'Large Animal' },
                  { id: 'Exotics', label: 'Exotics' }
                ].map(({ id, label }) => (
                  <label key={id} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-5 h-5">
                      <input type="checkbox" checked={filters[id]} onChange={() => handleFilter(id)} className="peer appearance-none w-5 h-5 border-2 border-outline-variant rounded bg-surface-container-lowest checked:bg-primary checked:border-primary transition-colors cursor-pointer" />
                      <span className="material-symbols-outlined absolute text-on-primary text-[16px] opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                    </div>
                    <span className="font-sans text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant">
              <h4 className="font-sans text-sm font-bold text-on-surface-variant mb-3 uppercase tracking-wider">Difficulty Level</h4>
              <div className="space-y-3">
                {[
                  { id: 'Beginner', label: 'Beginner' },
                  { id: 'Intermediate', label: 'Intermediate' },
                  { id: 'Specialist', label: 'Specialist' }
                ].map(({ id, label }) => (
                  <label key={id} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-5 h-5">
                      <input type="checkbox" checked={filters[id]} onChange={() => handleFilter(id)} className="peer appearance-none w-5 h-5 border-2 border-outline-variant rounded bg-surface-container-lowest checked:bg-primary checked:border-primary transition-colors cursor-pointer" />
                      <span className="material-symbols-outlined absolute text-on-primary text-[16px] opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                    </div>
                    <span className="font-sans text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  isEnrolled={enrolledCourses.some(c => c.id === course.id)}
                  onEnroll={enrollInCourse}
                />
              ))}
            </div>
            {filteredCourses.length === 0 && (
              <div className="text-center py-24 bg-surface-container-lowest border border-outline-variant rounded-xl border-dashed">
                <span className="material-symbols-outlined text-4xl text-outline mb-2">search_off</span>
                <p className="font-sans text-lg font-medium text-on-surface">No courses found.</p>
                <p className="font-sans text-sm text-on-surface-variant mt-1">Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Explore;
