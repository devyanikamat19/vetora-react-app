import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MobileNav from '../components/MobileNav';

const courses = [
  {
    id: 1,
    title: 'Advanced Canine Cardiology',
    instructor: 'Dr. Sarah Jenkins, DVM, DACVIM',
    rating: '4.9',
    level: 'Advanced',
    levelBg: 'bg-secondary/90 text-on-secondary',
    duration: '12h Total',
    progress: 45,
    enrolled: true,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNcwryWxgEjha32uxx7-DCXbsnQKaSigpbc6vXiW-E2fTyQNrJBFVd9IvhcCFniU3dA5-8HtmbFgOjp37usoU701JG0FLKV_J27jyULLRD7IxBDrBoCjX2ho_UgHJbBnYtQL1rtOJHNmu1XBRDMmgYcdgV7EkwxukhcNHJoLfRvICM-OZMbH8i54xZ7UxdkZBPJixPjWLYGI6UU-lAskEEZpdxPC1-gMC2zEz68GSGvYq-o9XWN4At',
  },
  {
    id: 2,
    title: 'Equine Orthopedics & Lameness',
    instructor: 'Dr. Marcus Thorne, DACVS',
    rating: '4.8',
    level: 'Intermediate',
    levelBg: 'bg-primary-container/90 text-on-primary-container',
    duration: '8h 30m',
    progress: null,
    enrolled: false,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmp54OhNIyPEQ1d0LFVfWhmjt-_qqtsZP4M7s1ClMRKX-J40z2Onw-xY-lS2JE8cohNVgDsb2wNTechdIw8-pldLcoX-sXW8USNG3QdtSvKdW__0a-0Iv1jcLHiQ8ZxRW0Qujexoq_esq7IFiQhtg5PIjbVIoKloEfY1NdqRyAvhNro8618em3KhnOvGWuDFG5sGcmzDb4teGHpzdeiZvxxdF0f7VGdAmyiucmrq-43V0fmIcSYMi2',
  },
  {
    id: 3,
    title: 'Fundamentals of Soft Tissue Surgery',
    instructor: 'Dr. Elena Rostova',
    rating: '5.0',
    level: 'Beginner',
    levelBg: 'bg-primary/90 text-on-primary',
    duration: '15h Total',
    progress: null,
    enrolled: false,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARZ26r46UT0Scb_2EybqmmSAUtMzLlDjsvNt-yN2AnH_W0yjWTX2TpgfeQijJkpAzpsM0A7CHGSuKMnf0pI9iE1N1zXszvmtEQylGJF9CDOzkw5H-vtkeg-SETe7ecOoU__HAMllLhXDoYu-bHR9w52JSPnHBxvBW7aSzOxEk14ka3ofPwES0VL6byShm1RgVMqU67C7tfBZ6iKyW7m-v-1rNzktG9sjbgg7KZi_kkYyklkt05gxCi',
  },
];

const CourseCard = ({ course }) => (
  <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden flex flex-col cursor-pointer group transition-all duration-300 hover:border-primary hover:shadow-[0px_8px_16px_rgba(13,92,99,0.12)] hover:-translate-y-0.5 shadow-[0px_2px_4px_rgba(13,92,99,0.08)]">
    <div className="relative h-48 w-full overflow-hidden bg-surface-variant">
      <img
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        src={course.thumbnail}
        alt={course.title}
      />
      <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-sm px-2 py-1 rounded font-sans text-xs font-bold text-primary flex items-center gap-1 shadow-sm">
        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
        {course.rating}
      </div>
      <div className={`absolute bottom-3 left-3 ${course.levelBg} backdrop-blur-sm px-2 py-1 rounded font-sans text-xs shadow-sm`}>
        {course.level}
      </div>
    </div>
    <div className="p-6 flex flex-col flex-1">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-display text-xl text-on-surface line-clamp-2">{course.title}</h3>
      </div>
      <p className="font-sans text-xs text-on-surface-variant mb-4 flex items-center gap-1">
        <span className="material-symbols-outlined text-[16px]">person</span>
        {course.instructor}
      </p>
      <div className="mt-auto">
        {course.enrolled ? (
          <>
            <div className="flex justify-between font-sans text-xs text-on-surface-variant mb-1">
              <span>In Progress</span>
              <span className="text-primary font-bold">{course.progress}%</span>
            </div>
            <div className="w-full bg-surface-container-high rounded-full h-1.5 mb-3 overflow-hidden">
              <div className="bg-secondary-container h-1.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
            </div>
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="font-sans text-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                {course.duration}
              </span>
              <Link to="/learning" className="text-primary font-sans text-sm hover:underline">Continue</Link>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between text-on-surface-variant pt-4 border-t border-outline-variant/50">
            <span className="font-sans text-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              {course.duration}
            </span>
            <button className="font-sans text-sm text-primary hover:bg-primary/5 px-3 py-1 rounded transition-colors">
              Enroll
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
);

const Explore = () => {
  const [filters, setFilters] = useState({
    smallAnimal: false,
    equine: false,
    cardiology: false,
    exotics: false,
    beginner: false,
    intermediate: true,
    advanced: true,
  });

  const handleFilter = (key) => setFilters(f => ({ ...f, [key]: !f[key] }));

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col antialiased">
      {/* Top NavBar */}
      <header className="bg-surface-bright sticky top-0 z-40 border-b border-outline-variant shadow-sm transition-all duration-300">
        <div className="flex justify-between items-center w-full px-6 py-2 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="font-display text-2xl font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
              Vetora
            </Link>
            <div className="hidden md:flex relative w-64 lg:w-96 ml-8">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input
                className="w-full pl-10 pr-4 py-2 rounded-full border border-[#CBD5E0] bg-surface font-sans text-sm text-on-surface-variant focus:border-primary focus:border-2 focus:shadow-[0_0_0_4px_rgba(13,92,99,0.1)] focus:outline-none transition-all"
                placeholder="Search courses, topics..."
                type="text"
              />
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a className="font-sans text-sm text-on-surface-variant hover:bg-surface-container-high rounded-full px-3 py-2 transition-colors" href="#">Courses</a>
            <a className="font-sans text-sm text-on-surface-variant hover:bg-surface-container-high rounded-full px-3 py-2 transition-colors" href="#">Institutions</a>
            <a className="font-sans text-sm text-on-surface-variant hover:bg-surface-container-high rounded-full px-3 py-2 transition-colors" href="#">About</a>
          </nav>
          <div className="flex items-center gap-2">
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
              <img className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-EcDvOhtxnQR0vpNZH8xaYRypfaL9FEuRhs97sfmIBtKFdDDmB28mlDZAv9I15uchZyuAtjkBwYYfvpQC9e27qwW1Y46iBv4iXNXifoeOZ0UrvKZlJJxrnMWEUs5YCLxOOO1s645gdR9Nqdp2nAI-rR8Zvit8qXn-N2pQs2rkzJuiu25sEzaRYD5EraiMsEHsE4ff-buxxCtKuvbdrxx8_uLd-x3Dxu5Wf4vey6FHeIq4_5Ehejp4" alt="User" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full flex-col md:flex-row relative">
        {/* Side NavBar */}
        <aside className="hidden md:flex flex-col h-[calc(100vh-64px)] w-64 bg-surface-container-low shadow-sm p-4 space-y-2 sticky top-[64px] overflow-y-auto shrink-0">
          <div className="mb-6 pb-4 border-b border-outline-variant flex items-center gap-2">
            <img className="w-10 h-10 rounded-full object-cover shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLBvS-RckQSdXMZMzd2oOdUuHNHkcOIQdlQravMvubl_G6zWw5Jt961A4vb0VOSCblrez3h_z_mMRM7fHYLnLveevLXWJegqyaDnj29S04pmSofkShIFRsrH5FdjWHEes-LTjaZUKzLBwYDsdN8Mi62PVTKzkzkg6eWO_w8KnKf3afGXr0ND1Yq_BeDy21JeheiDXxNiFKmlqX3wlQ7LP3hs6O_VNyxakRwmCd_6JGOD4XroZtCNlQ" alt="Student" />
            <div>
              <div className="font-sans text-sm font-bold text-on-surface">Vetora Student</div>
              <div className="font-sans text-xs text-on-surface-variant">Clinical Excellence</div>
            </div>
          </div>
          <nav className="flex-1 space-y-1">
            {[
              { icon: 'home', label: 'Home', to: '/dashboard', active: false },
              { icon: 'explore', label: 'Explore', to: '/explore', active: true },
              { icon: 'school', label: 'My Learning', to: '/dashboard', active: false },
              { icon: 'medical_services', label: 'Clinical Cases', to: '/clinical', active: false },
              { icon: 'smart_toy', label: 'Vetora AI', to: '/dashboard', active: false },
              { icon: 'verified', label: 'Certificates', to: '/dashboard', active: false },
            ].map(({ icon, label, to, active }) => (
              <Link
                key={label}
                to={to}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all font-sans text-sm ${
                  active
                    ? 'bg-secondary-container text-on-secondary-container font-bold shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined" style={active ? { fontVariationSettings: "'FILL' 1" } : {}}>{icon}</span>
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto pt-4 border-t border-outline-variant">
            <button className="w-full py-2 px-4 bg-primary text-on-primary rounded-lg font-sans text-sm shadow-sm hover:bg-[#094449] transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">upgrade</span> Upgrade to Pro
            </button>
          </div>
          <div className="mt-2 space-y-1">
            <a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all font-sans text-sm" href="#">
              <span className="material-symbols-outlined">help</span> Support
            </a>
            <Link to="/login" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all font-sans text-sm">
              <span className="material-symbols-outlined">logout</span> Logout
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-16 bg-background min-h-screen">
          <header className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl text-on-background mb-2">Explore Veterinary Courses</h1>
            <p className="font-sans text-lg text-on-surface-variant max-w-2xl">
              Discover premium clinical education to advance your veterinary career. Precision learning tailored for modern practitioners.
            </p>
          </header>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className="w-full lg:w-64 shrink-0 space-y-4">
              <div className="bg-surface rounded-xl p-4 border border-outline-variant shadow-[0px_2px_4px_rgba(13,92,99,0.08)]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-sans text-xs font-bold text-on-surface uppercase tracking-wider">Filters</h3>
                  <button
                    onClick={() => setFilters({ smallAnimal: false, equine: false, cardiology: false, exotics: false, beginner: false, intermediate: false, advanced: false })}
                    className="text-primary hover:text-primary-container font-sans text-xs underline transition-colors"
                  >
                    Clear All
                  </button>
                </div>
                <div className="space-y-2 mt-4">
                  <h4 className="font-sans text-sm font-semibold text-on-surface">Subject Area</h4>
                  {[
                    ['smallAnimal', 'Small Animal Surgery'],
                    ['equine', 'Equine Medicine'],
                    ['cardiology', 'Cardiology'],
                    ['exotics', 'Exotics & Avian'],
                  ].map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        className="rounded border-outline-variant text-primary h-4 w-4 transition-colors"
                        type="checkbox"
                        checked={filters[key]}
                        onChange={() => handleFilter(key)}
                      />
                      <span className="font-sans text-base text-on-surface-variant group-hover:text-on-surface transition-colors">{label}</span>
                    </label>
                  ))}
                </div>
                <div className="space-y-2 mt-4 pt-4 border-t border-outline-variant">
                  <h4 className="font-sans text-sm font-semibold text-on-surface">Difficulty Level</h4>
                  {[
                    ['beginner', 'Beginner'],
                    ['intermediate', 'Intermediate'],
                    ['advanced', 'Advanced'],
                  ].map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        className="rounded border-outline-variant text-primary h-4 w-4 transition-colors"
                        type="checkbox"
                        checked={filters[key]}
                        onChange={() => handleFilter(key)}
                      />
                      <span className="font-sans text-base text-on-surface-variant group-hover:text-on-surface transition-colors">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Course Grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-4">
                <span className="font-sans text-base text-on-surface-variant">Showing {courses.length} courses</span>
                <div className="flex items-center gap-2">
                  <span className="font-sans text-xs text-on-surface-variant">Sort by:</span>
                  <select className="border border-[#CBD5E0] bg-surface text-on-surface font-sans text-sm rounded-md py-1 pl-2 pr-8 focus:outline-none focus:border-primary transition-all">
                    <option>Recommended</option>
                    <option>Newest</option>
                    <option>Highest Rated</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {courses.map(course => <CourseCard key={course.id} course={course} />)}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex justify-center items-center gap-2">
                <button className="p-2 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-high transition-colors disabled:opacity-50 flex items-center justify-center" disabled>
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="w-10 h-10 rounded-lg bg-primary text-on-primary font-sans text-sm flex items-center justify-center">1</button>
                <button className="w-10 h-10 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-high font-sans text-sm flex items-center justify-center transition-colors">2</button>
                <button className="w-10 h-10 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-high font-sans text-sm flex items-center justify-center transition-colors">3</button>
                <span className="text-on-surface-variant">...</span>
                <button className="p-2 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-high transition-colors flex items-center justify-center">
                  <span className="material-symbols-outlined">chevron_right</span>
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
