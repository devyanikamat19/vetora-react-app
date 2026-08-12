import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

// ─── Course + Module Catalogue ────────────────────────────────────────────────
export const COURSE_CATALOGUE = [
  {
    id: 'c1',
    title: 'Small Animal Clinical Medicine',
    instructor: 'Dr. Sarah Jenkins, DVM, DACVIM',
    duration: '40 Hours',
    level: 'Expert Led',
    rating: 4.8,
    students: '1.2k',
    tag: 'Clinical Practice',
    tagBg: 'bg-primary-container text-on-primary-container',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&auto=format&fit=crop',
    modules: [
      {
        id: 'm1', title: 'Introduction to Clinical Medicine',
        lessons: [
          { id: 'l1', title: 'Welcome & Course Overview', duration: '5:12', videoId: 'tpiyEe_CqB4', completed: true },
          { id: 'l2', title: 'History Taking & Patient Signalment', duration: '14:30', videoId: 'vix7_pnSN34', completed: true },
        ]
      },
      {
        id: 'm2', title: 'Physical Examination',
        lessons: [
          { id: 'l3', title: 'Systematic Physical Exam Approach', duration: '18:05', videoId: 'fNxaJsNG3-s', completed: true },
          { id: 'l4', title: 'Cardiorespiratory Assessment', duration: '22:40', videoId: 'tpiyEe_CqB4', completed: false },
          { id: 'l5', title: 'Abdominal Palpation Techniques', duration: '16:15', videoId: 'vix7_pnSN34', completed: false },
        ]
      },
      {
        id: 'm3', title: 'Diagnostic Imaging',
        lessons: [
          { id: 'l6', title: 'Introduction to Radiography', duration: '20:00', videoId: 'fNxaJsNG3-s', completed: false },
          { id: 'l7', title: 'Thoracic Radiography Interpretation', duration: '28:45', videoId: 'tpiyEe_CqB4', completed: false },
        ]
      },
      {
        id: 'm4', title: 'Cardiology',
        lessons: [
          { id: 'l8', title: 'Cardiac Auscultation', duration: '19:20', videoId: 'vix7_pnSN34', completed: false },
          { id: 'l9', title: 'ECG Interpretation Basics', duration: '25:10', videoId: 'fNxaJsNG3-s', completed: false },
        ]
      },
    ]
  },
  {
    id: 'c2',
    title: 'Advanced Soft Tissue Surgery',
    instructor: 'Dr. Marcus Thorne, DACVS',
    duration: '60 Hours',
    level: 'Specialist',
    rating: 4.9,
    students: '850',
    tag: 'Surgery',
    tagBg: 'bg-secondary-container text-on-secondary-container',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&fit=crop',
    modules: [
      {
        id: 'm1', title: 'Surgical Principles',
        lessons: [
          { id: 'l1', title: 'Aseptic Technique & Sterilisation', duration: '12:00', videoId: 'tpiyEe_CqB4', completed: true },
          { id: 'l2', title: 'Wound Closure & Suture Materials', duration: '17:30', videoId: 'vix7_pnSN34', completed: false },
        ]
      },
      {
        id: 'm2', title: 'Wound Management',
        lessons: [
          { id: 'l3', title: 'Wound Assessment & Classification', duration: '15:45', videoId: 'fNxaJsNG3-s', completed: false },
          { id: 'l4', title: 'Debridement Techniques', duration: '21:00', videoId: 'tpiyEe_CqB4', completed: false },
        ]
      },
    ]
  },
  {
    id: 'c3',
    title: 'Equine Internal Medicine',
    instructor: 'Dr. Elena Rostova, BVSc',
    duration: '45 Hours',
    level: 'Intermediate',
    rating: 4.7,
    students: '2.1k',
    tag: 'Large Animal',
    tagBg: 'bg-tertiary-fixed text-on-tertiary-fixed',
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&auto=format&fit=crop',
    modules: [
      {
        id: 'm1', title: 'Equine Examination',
        lessons: [
          { id: 'l1', title: 'Equine Physical Exam', duration: '20:00', videoId: 'vix7_pnSN34', completed: false },
          { id: 'l2', title: 'Lameness Evaluation', duration: '24:15', videoId: 'tpiyEe_CqB4', completed: false },
        ]
      },
    ]
  },
  {
    id: 'c4',
    title: 'Avian and Exotic Pet Care',
    instructor: 'Dr. Priya Nair, DVM',
    duration: '30 Hours',
    level: 'Beginner',
    rating: 4.6,
    students: '3.4k',
    tag: 'Exotics',
    tagBg: 'bg-surface-variant text-on-surface-variant',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&auto=format&fit=crop',
    modules: [
      {
        id: 'm1', title: 'Avian Basics',
        lessons: [
          { id: 'l1', title: 'Avian Anatomy Overview', duration: '18:30', videoId: 'fNxaJsNG3-s', completed: false },
          { id: 'l2', title: 'Common Avian Diseases', duration: '22:00', videoId: 'vix7_pnSN34', completed: false },
        ]
      },
    ]
  },
];

// ─── Provider ─────────────────────────────────────────────────────────────────
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Vetora Student',
    email: 'student@vetora.edu',
    initials: 'VS',
    avatar: null,
  });

  const courses = COURSE_CATALOGUE;

  const [enrolledCourseIds, setEnrolledCourseIds] = useState(['c1', 'c2']);
  const enrolledCourses = courses.filter(c => enrolledCourseIds.includes(c.id));

  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const enrollInCourse = (courseId) => {
    if (enrolledCourseIds.includes(courseId)) {
      showToast('You are already enrolled in this course.', 'info');
      return;
    }
    setEnrolledCourseIds(prev => [...prev, courseId]);
    const course = courses.find(c => c.id === courseId);
    showToast(`Successfully enrolled in "${course?.title}"!`, 'success');
  };

  const login = (userData) => {
    setUser(userData || { name: 'Dr. Jane Doe', email: 'jane.doe@university.edu', initials: 'JD', avatar: null });
  };

  const logout = () => setUser(null);

  return (
    <AppContext.Provider value={{ user, login, logout, courses, enrolledCourses, enrollInCourse, showToast }}>
      {children}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[100] animate-fade-in-up">
          <div className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl font-sans text-sm font-medium border backdrop-blur-md
            ${toast.type === 'success' ? 'bg-secondary-container text-on-secondary-container border-secondary/20' :
              toast.type === 'error' ? 'bg-error-container text-on-error-container border-error/20' :
              'bg-surface-container-highest text-on-surface border-outline-variant'}`}>
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {toast.type === 'success' ? 'check_circle' : toast.type === 'error' ? 'error' : 'info'}
            </span>
            {toast.message}
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
};
