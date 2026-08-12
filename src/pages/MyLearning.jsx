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
    <div className="bg-[#f4f7f6] text-gray-900 font-sans antialiased min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-white">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-1">My Learning</h1>
          <p className="font-sans text-sm text-gray-500 font-medium">
            {enrolledCourses.length} courses enrolled · {completedLessons}/{totalLessons} lessons completed
          </p>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
            <span className="material-symbols-outlined text-5xl text-gray-300 mb-3">school</span>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-1">No courses yet</h2>
            <p className="font-sans text-xs text-gray-500 mb-6">Head to the Explore page to enroll in your first course.</p>
            <button
              onClick={() => navigate('/explore')}
              className="px-6 py-2.5 bg-[#0d5c63] text-white font-sans text-xs font-bold rounded-xl hover:bg-[#09474d] transition-all shadow-xs"
            >
              Explore Courses
            </button>
          </div>
        ) : (
          <div className="space-y-6 max-w-5xl">
            {enrolledCourses.map(course => {
              const totalCourseLessons = course.modules.reduce((a, m) => a + m.lessons.length, 0);
              const completedCourseLessons = course.modules.reduce((a, m) => a + m.lessons.filter(l => l.completed).length, 0);
              const progressPct = totalCourseLessons > 0 ? Math.round((completedCourseLessons / totalCourseLessons) * 100) : 0;
              const isExpanded = expandedCourse === course.id;

              return (
                <div key={course.id} className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all">
                  {/* Course Header Bar */}
                  <button
                    onClick={() => setExpandedCourse(isExpanded ? null : course.id)}
                    className="w-full flex items-center gap-4 p-5 hover:bg-gray-50/70 transition-colors text-left select-none"
                  >
                    <img src={course.image} alt={course.title} className="w-14 h-14 rounded-xl object-cover shrink-0 border border-gray-200" />
                    <div className="flex-1 min-w-0">
                      <h2 className="font-display text-base font-bold text-gray-900 truncate">{course.title}</h2>
                      <p className="font-sans text-xs text-gray-500 font-medium">{course.instructor}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#0d5c63] rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
                        </div>
                        <span className="font-sans text-xs font-bold text-[#0d5c63] shrink-0">{progressPct}%</span>
                        <span className="font-sans text-xs text-gray-400 shrink-0">{completedCourseLessons}/{totalCourseLessons} lessons</span>
                      </div>
                    </div>
                    <span
                      className="material-symbols-outlined text-gray-400 transition-transform duration-200 shrink-0"
                      style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      expand_more
                    </span>
                  </button>

                  {/* Modules & Lessons List */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 divide-y divide-gray-100 bg-gray-50/30">
                      {course.modules.map((mod, modIndex) => (
                        <div key={mod.id}>
                          {/* Module Header */}
                          <div className="px-6 py-3 bg-gray-50/80 flex items-center gap-2">
                            <span className="font-sans text-[10px] font-bold text-[#0d5c63] uppercase tracking-wider">Module {modIndex + 1}:</span>
                            <span className="font-sans text-xs font-bold text-gray-800">{mod.title}</span>
                            <span className="ml-auto font-sans text-xs text-gray-400 font-medium">{mod.lessons.length} lessons</span>
                          </div>
                          {/* Lessons */}
                          {mod.lessons.map((lesson) => (
                            <button
                              key={lesson.id}
                              onClick={() => navigate(`/learning/${course.id}/${lesson.id}`, { state: { lesson, course, module: mod } })}
                              className="w-full flex items-center gap-4 px-6 py-3.5 hover:bg-white transition-colors text-left group"
                            >
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors
                                ${lesson.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500 group-hover:bg-[#0d5c63] group-hover:text-white'}`}>
                                <span className="material-symbols-outlined text-[16px]" style={lesson.completed ? { fontVariationSettings: "'FILL' 1" } : {}}>
                                  {lesson.completed ? 'check' : 'play_arrow'}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`font-sans text-xs font-bold truncate ${lesson.completed ? 'text-gray-400 line-through' : 'text-gray-900 group-hover:text-[#0d5c63]'}`}>
                                  {lesson.title}
                                </p>
                              </div>
                              <span className="font-sans text-[11px] text-gray-400 shrink-0 flex items-center gap-1">
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

