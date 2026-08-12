import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Sidebar from '../components/Sidebar';

const MyLearning = () => {
  const { enrolledCourses } = useApp();
  const navigate = useNavigate();
  const [expandedCourse, setExpandedCourse] = useState(enrolledCourses[0]?.id || null);

  const totalLessons = enrolledCourses.reduce((acc, c) => acc + c.modules.reduce((a, m) => a + m.lessons.length, 0), 0);
  const completedLessons = enrolledCourses.reduce((acc, c) => acc + c.modules.reduce((a, m) => a + m.lessons.filter(l => l.completed).length, 0), 0);

  return (
    <div className="flex max-w-[1440px] mx-auto bg-background min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-on-surface mb-1">My Learning</h1>
          <p className="font-sans text-base text-on-surface-variant">
            {enrolledCourses.length} courses enrolled · {completedLessons}/{totalLessons} lessons completed
          </p>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-outline-variant rounded-2xl">
            <span className="material-symbols-outlined text-5xl text-outline mb-4">school</span>
            <h2 className="font-display text-2xl font-bold text-on-surface mb-2">No courses yet</h2>
            <p className="font-sans text-base text-on-surface-variant mb-6">Head to the Explore page to enroll in your first course.</p>
            <button onClick={() => navigate('/explore')} className="px-6 py-3 bg-primary text-on-primary font-sans font-bold rounded-lg">
              Explore Courses
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {enrolledCourses.map(course => {
              const totalCourseLessons = course.modules.reduce((a, m) => a + m.lessons.length, 0);
              const completedCourseLessons = course.modules.reduce((a, m) => a + m.lessons.filter(l => l.completed).length, 0);
              const progressPct = totalCourseLessons > 0 ? Math.round((completedCourseLessons / totalCourseLessons) * 100) : 0;
              const isExpanded = expandedCourse === course.id;

              return (
                <div key={course.id} className="bg-white border border-outline-variant rounded-2xl overflow-hidden shadow-sm">
                  {/* Course Header */}
                  <button
                    onClick={() => setExpandedCourse(isExpanded ? null : course.id)}
                    className="w-full flex items-center gap-4 p-5 hover:bg-surface-container-lowest transition-colors text-left"
                  >
                    <img src={course.image} alt={course.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h2 className="font-display text-lg font-bold text-on-surface truncate">{course.title}</h2>
                      <p className="font-sans text-sm text-on-surface-variant">{course.instructor}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex-1 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                          <div className="h-full bg-secondary rounded-full transition-all" style={{ width: `${progressPct}%` }} />
                        </div>
                        <span className="font-sans text-xs font-bold text-primary shrink-0">{progressPct}%</span>
                        <span className="font-sans text-xs text-on-surface-variant shrink-0">{completedCourseLessons}/{totalCourseLessons} lessons</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant transition-transform duration-200 shrink-0" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      expand_more
                    </span>
                  </button>

                  {/* Modules & Lessons */}
                  {isExpanded && (
                    <div className="border-t border-outline-variant divide-y divide-outline-variant/40">
                      {course.modules.map((mod, modIndex) => (
                        <div key={mod.id}>
                          {/* Module header */}
                          <div className="px-5 py-3 bg-surface-container-lowest flex items-center gap-2">
                            <span className="font-sans text-xs font-bold text-primary uppercase tracking-wider">Module {modIndex + 1}</span>
                            <span className="font-sans text-sm font-semibold text-on-surface">{mod.title}</span>
                            <span className="ml-auto font-sans text-xs text-on-surface-variant">{mod.lessons.length} lessons</span>
                          </div>
                          {/* Lessons */}
                          {mod.lessons.map((lesson) => (
                            <button
                              key={lesson.id}
                              onClick={() => navigate(`/learning/${course.id}/${lesson.id}`, { state: { lesson, course, module: mod } })}
                              className="w-full flex items-center gap-4 px-6 py-4 hover:bg-surface-container-low transition-colors text-left group"
                            >
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors
                                ${lesson.completed ? 'bg-secondary text-on-secondary' : 'bg-surface-container-high text-on-surface-variant group-hover:bg-primary group-hover:text-on-primary'}`}>
                                <span className="material-symbols-outlined text-[18px]" style={lesson.completed ? { fontVariationSettings: "'FILL' 1" } : {}}>
                                  {lesson.completed ? 'check' : 'play_arrow'}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`font-sans text-sm font-medium truncate ${lesson.completed ? 'text-on-surface-variant line-through' : 'text-on-surface group-hover:text-primary'}`}>
                                  {lesson.title}
                                </p>
                              </div>
                              <span className="font-sans text-xs text-on-surface-variant shrink-0 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">schedule</span>
                                {lesson.duration}
                              </span>
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyLearning;
