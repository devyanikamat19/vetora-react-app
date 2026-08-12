import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Learning = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId, lessonId } = useParams();
  const { courses, showToast } = useApp();

  // Get lesson/course from navigation state (passed from MyLearning) or from params
  const stateLesson = location.state?.lesson;
  const stateCourse = location.state?.course;
  const stateModule = location.state?.module;

  // Resolve course and lesson from context if state isn't available
  const course = stateCourse || courses.find(c => c.id === courseId) || courses[0];
  const allLessons = course?.modules?.flatMap(m => m.lessons.map(l => ({ ...l, moduleTitle: m.title }))) || [];
  const currentLesson = stateLesson || allLessons.find(l => l.id === lessonId) || allLessons[0];
  const currentModule = stateModule || course?.modules?.find(m => m.lessons.some(l => l.id === currentLesson?.id));

  const currentIndex = allLessons.findIndex(l => l.id === currentLesson?.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const navigateToLesson = (lesson) => {
    const lessonModule = course?.modules?.find(m => m.lessons.some(l => l.id === lesson.id));
    navigate(`/learning/${course.id}/${lesson.id}`, {
      state: { lesson, course, module: lessonModule }
    });
  };

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="font-sans text-on-surface-variant mb-4">No lesson found. Please go back and select a lesson.</p>
          <button onClick={() => navigate('/my-learning')} className="px-6 py-3 bg-primary text-on-primary rounded-lg font-sans font-bold">
            Go to My Learning
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background font-sans antialiased min-h-screen flex flex-col">

      {/* Top Navigation */}
      <header className="bg-surface border-b border-outline-variant shadow-sm sticky top-0 z-40">
        <div className="flex items-center w-full px-4 py-3 gap-4">
          <button onClick={() => navigate('/my-learning')} className="flex items-center gap-1 hover:bg-surface-container-high p-2 rounded-full transition-colors shrink-0">
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-base md:text-lg font-bold text-on-surface truncate">{currentLesson.title}</h1>
            <p className="font-sans text-xs text-on-surface-variant truncate">{course.title} · {currentModule?.title}</p>
          </div>
          <button
            onClick={() => { setIsBookmarked(!isBookmarked); showToast(isBookmarked ? 'Bookmark removed.' : 'Lecture bookmarked!', 'success'); }}
            className={`rounded-full p-2 transition-colors shrink-0 ${isBookmarked ? 'text-primary bg-primary-container' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
          >
            <span className="material-symbols-outlined" style={isBookmarked ? { fontVariationSettings: "'FILL' 1" } : {}}>bookmark</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row min-h-0">

        {/* ── Left: Video + Tabs ─────────────────────────────────────────── */}
        <section className="flex-1 flex flex-col overflow-y-auto">

          {/* Real YouTube Embed */}
          <div className="w-full bg-black">
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              <iframe
                key={currentLesson.videoId}
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${currentLesson.videoId}?autoplay=1&rel=0&modestbranding=1`}
                title={currentLesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          {/* Prev / Next navigation */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-outline-variant bg-surface-container-lowest">
            <button
              disabled={!prevLesson}
              onClick={() => prevLesson && navigateToLesson(prevLesson)}
              className="flex items-center gap-2 font-sans text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">navigate_before</span>
              {prevLesson ? prevLesson.title : 'No previous'}
            </button>
            <button
              disabled={!nextLesson}
              onClick={() => nextLesson && navigateToLesson(nextLesson)}
              className="flex items-center gap-2 font-sans text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed text-on-surface-variant hover:text-primary transition-colors"
            >
              {nextLesson ? nextLesson.title : 'Course complete!'}
              <span className="material-symbols-outlined text-[18px]">navigate_next</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-outline-variant bg-surface sticky top-[57px] z-10">
            <nav className="flex px-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {['overview', 'notes', 'resources'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 font-sans text-sm font-medium capitalize whitespace-nowrap border-b-2 transition-colors
                    ${activeTab === tab ? 'text-primary border-primary' : 'text-on-surface-variant border-transparent hover:text-on-surface'}`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6 max-w-3xl">
            {activeTab === 'overview' && (
              <>
                <h2 className="font-display text-2xl font-bold text-on-surface mb-3">{currentLesson.title}</h2>
                <p className="font-sans text-base text-on-surface-variant mb-6">
                  This session is part of the <strong className="text-on-surface">{currentModule?.title}</strong> module in <strong className="text-on-surface">{course.title}</strong>. Work through the video above, then proceed to the next lesson at your own pace.
                </p>
                <h3 className="font-sans text-sm font-bold text-primary uppercase tracking-wider mb-3 border-b border-outline-variant pb-2">Learning Objectives</h3>
                <ul className="space-y-3">
                  {['Understand core concepts presented in this lesson', 'Apply the principles to real clinical scenarios', 'Identify key differentials and diagnostic approaches'].map((obj, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      <span className="font-sans text-base text-on-surface">{obj}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 bg-surface-container-low rounded-xl border border-outline-variant flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary text-3xl">person</span>
                  <div>
                    <p className="font-sans text-sm font-bold text-on-surface">{course.instructor}</p>
                    <p className="font-sans text-xs text-on-surface-variant">{course.tag} · {course.level}</p>
                  </div>
                </div>
              </>
            )}
            {activeTab === 'notes' && (
              <div>
                <h2 className="font-display text-xl font-bold text-on-surface mb-4">My Notes</h2>
                <textarea
                  className="w-full h-48 p-4 rounded-xl border border-outline-variant bg-surface-container-lowest font-sans text-sm text-on-surface focus:outline-none focus:border-primary resize-none"
                  placeholder="Type your notes for this lesson here..."
                />
                <button
                  onClick={() => showToast('Notes saved!', 'success')}
                  className="mt-3 px-5 py-2 bg-primary text-on-primary rounded-lg font-sans text-sm font-bold"
                >
                  Save Notes
                </button>
              </div>
            )}
            {activeTab === 'resources' && (
              <div>
                <h2 className="font-display text-xl font-bold text-on-surface mb-4">Resources</h2>
                <div className="space-y-3">
                  {['Lecture Slides (PDF)', 'Recommended Reading List', 'Practice Quiz'].map((r, i) => (
                    <button
                      key={i}
                      onClick={() => showToast('Resource download coming soon.', 'info')}
                      className="w-full flex items-center gap-3 p-4 rounded-xl border border-outline-variant hover:border-primary hover:bg-surface-container-lowest transition-colors text-left"
                    >
                      <span className="material-symbols-outlined text-primary">description</span>
                      <span className="font-sans text-sm font-medium text-on-surface">{r}</span>
                      <span className="material-symbols-outlined text-on-surface-variant ml-auto text-[18px]">download</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── Right: Course Playlist ─────────────────────────────────────── */}
        <aside className="w-full lg:w-80 xl:w-96 border-l border-outline-variant bg-surface-container-lowest flex flex-col shrink-0 max-h-screen lg:sticky lg:top-[57px] lg:h-[calc(100vh-57px)] overflow-y-auto">
          <div className="p-4 border-b border-outline-variant bg-surface sticky top-0 z-10">
            <h3 className="font-display text-base font-bold text-on-surface">Course Content</h3>
            <p className="font-sans text-xs text-on-surface-variant mt-0.5">{allLessons.length} lessons · {course.duration}</p>
          </div>
          {course.modules.map((mod, modIndex) => (
            <div key={mod.id}>
              <div className="px-4 py-2.5 bg-surface-container-low border-b border-outline-variant/50">
                <p className="font-sans text-xs font-bold text-on-surface-variant uppercase tracking-wider">Module {modIndex + 1}: {mod.title}</p>
              </div>
              {mod.lessons.map(lesson => {
                const isActive = lesson.id === currentLesson.id;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => navigateToLesson(lesson)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-outline-variant/30 transition-colors
                      ${isActive ? 'bg-primary-container/40 border-l-2 border-l-primary' : 'hover:bg-surface-container-low'}`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0
                      ${isActive ? 'bg-primary text-on-primary' : lesson.completed ? 'bg-secondary text-on-secondary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                      <span className="material-symbols-outlined text-[16px]" style={(isActive || lesson.completed) ? { fontVariationSettings: "'FILL' 1" } : {}}>
                        {isActive ? 'play_arrow' : lesson.completed ? 'check' : 'play_arrow'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-sans text-sm truncate ${isActive ? 'text-primary font-bold' : 'text-on-surface'}`}>{lesson.title}</p>
                      <p className="font-sans text-xs text-on-surface-variant">{lesson.duration}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </aside>

      </div>
    </div>
  );
};

export default Learning;
