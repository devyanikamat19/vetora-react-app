import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useApp } from '../context/AppContext';

const INITIAL_COURSES = [
  {
    id: 'c1',
    title: 'Advanced Canine Cardiology: Diagnostic Approaches',
    instructor: 'Dr. Sarah Jenkins, DVM, DACVIM',
    duration: '12h Total',
    level: 'Advanced',
    rating: 4.9,
    progress: 45,
    tag: 'Cardiology',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&auto=format&fit=crop',
    isEnrolled: true,
  },
  {
    id: 'c2',
    title: 'Equine Orthopedic Surgery Techniques',
    instructor: 'Dr. Marcus Thorne, DACVS',
    duration: '8h 30m',
    level: 'Intermediate',
    rating: 4.8,
    progress: 0,
    tag: 'Equine Medicine',
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=500&auto=format&fit=crop',
    isEnrolled: false,
  },
  {
    id: 'c3',
    title: 'Fundamentals of Soft Tissue Surgery in Small Animals',
    instructor: 'Dr. Elena Rostova, BVSc',
    duration: '15h Total',
    level: 'Beginner',
    rating: 5.0,
    progress: 0,
    tag: 'Small Animal Surgery',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&auto=format&fit=crop',
    isEnrolled: false,
  },
];

const Explore = () => {
  const { user, showToast } = useApp();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const [filters, setFilters] = useState({
    smallAnimalSurgery: false,
    equineMedicine: false,
    cardiology: false,
    exoticsAvian: false,
    beginner: false,
    intermediate: true,
    advanced: true,
  });

  const toggleFilter = (key) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const clearAllFilters = () => {
    setFilters({
      smallAnimalSurgery: false,
      equineMedicine: false,
      cardiology: false,
      exoticsAvian: false,
      beginner: false,
      intermediate: false,
      advanced: false,
    });
    showToast('Filters cleared.', 'info');
  };

  return (
    <div className="bg-[#f4f7f6] text-gray-900 font-sans antialiased min-h-screen flex flex-col">
      {/* Top Header Navigation (Image 3) */}
      <header className="bg-white border-b border-gray-200/80 px-6 py-2.5 flex items-center justify-between sticky top-0 z-40 shadow-2xs">
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="font-display text-2xl font-bold text-[#0d5c63] tracking-tight">
            Vetora
          </Link>
          {/* Top Search Bar */}
          <div className="relative w-80 hidden md:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search courses, topics..."
              className="w-full pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full font-sans text-xs focus:outline-none focus:border-[#0d5c63] transition-all"
            />
          </div>
        </div>

        {/* Header Links & Profile */}
        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-6 font-sans text-xs font-semibold text-gray-600">
            <Link to="/explore" className="text-[#0d5c63] font-bold">Courses</Link>
            <button onClick={() => showToast('Institutions directory opening...', 'info')} className="hover:text-[#0d5c63]">
              Institutions
            </button>
            <button onClick={() => showToast('About Vetora Academy', 'info')} className="hover:text-[#0d5c63]">
              About
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 relative">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80"
              alt="User Profile"
              className="w-8 h-8 rounded-full object-cover border border-gray-200 cursor-pointer"
            />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Main Navigation Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-white">
          {/* Header Title Section (Image 3) */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">Explore Veterinary Courses</h1>
            <p className="font-sans text-sm text-gray-500 max-w-2xl leading-relaxed">
              Discover premium clinical education to advance your veterinary career. Precision learning tailored for modern practitioners.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar Card (Image 3 style) */}
            <aside className="w-full lg:w-64 shrink-0 space-y-6 bg-gray-50/70 p-5 rounded-2xl border border-gray-200/80 h-fit">
              <div className="flex items-center justify-between">
                <h3 className="font-sans text-xs font-bold text-gray-900 tracking-wider uppercase">FILTERS</h3>
                <button
                  onClick={clearAllFilters}
                  className="font-sans text-xs text-[#0d5c63] hover:underline font-semibold"
                >
                  Clear All
                </button>
              </div>

              {/* Subject Area */}
              <div>
                <h4 className="font-sans text-xs font-bold text-gray-700 mb-3">Subject Area</h4>
                <div className="space-y-2.5">
                  {[
                    { id: 'smallAnimalSurgery', label: 'Small Animal Surgery' },
                    { id: 'equineMedicine', label: 'Equine Medicine' },
                    { id: 'cardiology', label: 'Cardiology' },
                    { id: 'exoticsAvian', label: 'Exotics & Avian' },
                  ].map(item => (
                    <label key={item.id} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters[item.id]}
                        onChange={() => toggleFilter(item.id)}
                        className="w-4 h-4 rounded border-gray-300 text-[#0d5c63] focus:ring-[#0d5c63] cursor-pointer"
                      />
                      <span className="font-sans text-xs text-gray-600 group-hover:text-gray-900 font-medium">
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Difficulty Level */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-sans text-xs font-bold text-gray-700 mb-3">Difficulty Level</h4>
                <div className="space-y-2.5">
                  {[
                    { id: 'beginner', label: 'Beginner' },
                    { id: 'intermediate', label: 'Intermediate' },
                    { id: 'advanced', label: 'Advanced' },
                  ].map(item => (
                    <label key={item.id} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters[item.id]}
                        onChange={() => toggleFilter(item.id)}
                        className="w-4 h-4 rounded border-gray-300 text-[#0d5c63] focus:ring-[#0d5c63] cursor-pointer"
                      />
                      <span className="font-sans text-xs text-gray-600 group-hover:text-gray-900 font-medium">
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            {/* Courses Grid Main Area (Image 3) */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                {/* Results Header Line */}
                <div className="flex justify-between items-center mb-6">
                  <span className="font-sans text-xs font-semibold text-gray-500">Showing 24 courses</span>
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-xs text-gray-400">Sort by:</span>
                    <select className="bg-white border border-gray-200 text-xs font-sans font-bold text-gray-800 rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#0d5c63]">
                      <option>Recommended</option>
                      <option>Highest Rated</option>
                      <option>Newest Release</option>
                    </select>
                  </div>
                </div>

                {/* Course Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  {INITIAL_COURSES.map(course => (
                    <div
                      key={course.id}
                      className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md hover:border-[#0d5c63]/40 transition-all flex flex-col group"
                    >
                      {/* Course Image Banner */}
                      <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Rating Star Badge (Image 3 style) */}
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] font-bold text-gray-800 flex items-center gap-1 shadow-2xs">
                          <span className="material-symbols-outlined text-[13px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                            star
                          </span>
                          {course.rating.toFixed(1)}
                        </div>

                        {/* Level Tag Badge */}
                        <div className={`absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md font-sans text-[10px] font-bold text-white shadow-2xs ${
                          course.level === 'Advanced' ? 'bg-[#0d5c63]' : course.level === 'Intermediate' ? 'bg-cyan-700' : 'bg-emerald-700'
                        }`}>
                          {course.level}
                        </div>
                      </div>

                      {/* Course Content Details */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <h3 className="font-display text-base font-bold text-gray-900 group-hover:text-[#0d5c63] transition-colors line-clamp-2 mb-2">
                            {course.title}
                          </h3>
                          <p className="font-sans text-xs text-gray-500 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">person</span>
                            {course.instructor}
                          </p>
                        </div>

                        {/* In Progress Bar / Action Line (Image 3 style) */}
                        <div className="pt-3 border-t border-gray-100">
                          {course.isEnrolled ? (
                            <div>
                              <div className="flex justify-between items-center text-[11px] font-sans mb-1.5">
                                <span className="text-gray-500 font-semibold">In Progress</span>
                                <span className="font-bold text-[#0d5c63]">{course.progress}%</span>
                              </div>
                              <div className="w-full h-1 bg-gray-100 rounded-full mb-3 overflow-hidden">
                                <div className="h-full bg-[#0d5c63] rounded-full" style={{ width: `${course.progress}%` }}></div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="font-sans text-xs text-gray-500 font-medium flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                                  {course.duration}
                                </span>
                                <Link to="/learning" className="font-sans text-xs font-bold text-[#0d5c63] hover:underline">
                                  Continue
                                </Link>
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-between items-center">
                              <span className="font-sans text-xs text-gray-500 font-medium flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">schedule</span>
                                {course.duration}
                              </span>
                              <Link to="/learning" className="font-sans text-xs font-bold text-[#0d5c63] hover:underline">
                                Enroll
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination Controls (Image 3 style) */}
              <div className="flex justify-center items-center gap-2 pt-6">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="w-9 h-9 rounded-xl border border-gray-200 bg-white text-gray-600 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                {[1, 2, 3].map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-xl font-sans text-xs font-bold transition-all ${
                      currentPage === page
                        ? 'bg-[#0d5c63] text-white shadow-2xs'
                        : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <span className="text-gray-400 text-xs px-1">...</span>
                <button
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="w-9 h-9 rounded-xl border border-gray-200 bg-white text-gray-600 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Explore;

