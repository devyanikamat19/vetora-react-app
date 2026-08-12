import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { COURSE_CATALOGUE } from '../context/AppContext';

// ─── Mock student roster ───────────────────────────────────────────────────────
const STUDENTS = [
  { id: 's1', initials: 'JD', name: 'Jane Doe',      email: 'jane.doe@uni.edu',     course: 'Small Animal Clinical Medicine', progress: 78, score: 82, status: 'Active',   badge: 'On Track' },
  { id: 's2', initials: 'AS', name: 'Alex Smith',    email: 'alex.s@uni.edu',       course: 'Advanced Soft Tissue Surgery',  progress: 22, score: 58, status: 'At Risk',  badge: 'At Risk' },
  { id: 's3', initials: 'MG', name: 'Maria Garcia',  email: 'maria.g@uni.edu',      course: 'Small Animal Clinical Medicine', progress: 5,  score: 45, status: 'Inactive', badge: 'Inactive' },
  { id: 's4', initials: 'RK', name: 'Ravi Kumar',    email: 'ravi.k@uni.edu',       course: 'Equine Internal Medicine',      progress: 91, score: 95, status: 'Active',   badge: 'Top Performer' },
  { id: 's5', initials: 'LP', name: 'Laura Perez',   email: 'laura.p@uni.edu',      course: 'Avian and Exotic Pet Care',     progress: 60, score: 74, status: 'Active',   badge: 'On Track' },
  { id: 's6', initials: 'TW', name: 'Tom Walsh',     email: 't.walsh@uni.edu',      course: 'Advanced Soft Tissue Surgery',  progress: 38, score: 61, status: 'At Risk',  badge: 'At Risk' },
  { id: 's7', initials: 'AN', name: 'Aisha Nair',    email: 'aisha.n@uni.edu',      course: 'Equine Internal Medicine',      progress: 55, score: 79, status: 'Active',   badge: 'On Track' },
  { id: 's8', initials: 'CH', name: 'Carlos Herrera',email: 'c.herrera@uni.edu',    course: 'Avian and Exotic Pet Care',     progress: 100,score: 98, status: 'Completed','badge': 'Top Performer' },
];

const BADGE_STYLES = {
  'On Track':      'bg-secondary-container text-on-secondary-container',
  'At Risk':       'bg-error-container text-on-error-container',
  'Inactive':      'bg-surface-variant text-on-surface-variant',
  'Top Performer': 'bg-primary-container text-on-primary-container',
  'Completed':     'bg-primary text-on-primary',
};

// ─── Sub-views ────────────────────────────────────────────────────────────────

const OverviewTab = ({ courses, showToast }) => {
  const totalStudents = STUDENTS.length;
  const activeStudents = STUDENTS.filter(s => s.status === 'Active').length;
  const avgScore = Math.round(STUDENTS.reduce((a, s) => a + s.score, 0) / STUDENTS.length);
  const completionRate = Math.round(STUDENTS.reduce((a, s) => a + s.progress, 0) / STUDENTS.length);
  const atRisk = STUDENTS.filter(s => s.status === 'At Risk' || s.status === 'Inactive');

  const metrics = [
    { icon: 'group', bg: 'bg-primary-container', color: 'text-on-primary-container', label: 'Total Students', value: totalStudents, sub: '+5% this month', trend: true },
    { icon: 'how_to_reg', bg: 'bg-secondary-container', color: 'text-on-secondary-container', label: 'Active Students', value: activeStudents, sub: 'Currently engaged', trend: false },
    { icon: 'check_circle', bg: 'bg-primary-container', color: 'text-on-primary-container', label: 'Avg Completion', value: `${completionRate}%`, bar: completionRate },
    { icon: 'school', bg: 'bg-primary-container', color: 'text-on-primary-container', label: 'Avg Assessment', value: `${avgScore}%`, sub: 'Across all courses', trend: false },
  ];

  return (
    <div className="space-y-8">
      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map(m => (
          <div key={m.label} className="bg-white rounded-xl p-5 border border-outline-variant shadow-sm hover:border-primary hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-3">
              <div className={`p-2 ${m.bg} rounded-lg ${m.color}`}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{m.icon}</span>
              </div>
              <p className="font-sans text-sm text-on-surface-variant">{m.label}</p>
            </div>
            <p className="font-display text-3xl font-bold text-on-surface">{m.value}</p>
            {m.bar !== undefined && (
              <div className="w-full h-1.5 bg-surface-variant rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-secondary rounded-full transition-all" style={{ width: `${m.bar}%` }} />
              </div>
            )}
            {m.sub && (
              <p className={`font-sans text-xs mt-1 flex items-center gap-1 ${m.trend ? 'text-secondary' : 'text-on-surface-variant'}`}>
                {m.trend && <span className="material-symbols-outlined text-[14px]">trending_up</span>}
                {m.sub}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Analytics + At-Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-outline-variant shadow-sm p-6">
          <h2 className="font-display text-xl font-bold text-on-surface mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">insights</span> Actionable Analytics
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 bg-error-container/20 rounded-xl border border-error/20">
              <span className="material-symbols-outlined text-error mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
              <div>
                <p className="font-sans text-sm font-medium text-on-surface">23% of students drop off in Module 3 of Surgery Basics</p>
                <p className="font-sans text-xs text-on-surface-variant mt-1">Suggested: Review video clarity and split assessment into smaller parts.</p>
                <button onClick={() => showToast('Module content review opened.', 'info')} className="mt-2 text-primary font-sans text-sm hover:underline">Review Module Content →</button>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-surface-container rounded-xl border border-outline-variant">
              <span className="material-symbols-outlined text-on-surface-variant mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>trending_down</span>
              <div>
                <p className="font-sans text-sm font-medium text-on-surface">Assessment performance dropped 12% in Internal Medicine</p>
                <p className="font-sans text-xs text-on-surface-variant mt-1">Recent cohort scored lower on the 'Canine Cardiology' section.</p>
                <button onClick={() => showToast('Detailed score report opened.', 'info')} className="mt-2 text-primary font-sans text-sm hover:underline">View Detailed Scores →</button>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-secondary-container/20 rounded-xl border border-secondary/20">
              <span className="material-symbols-outlined text-secondary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
              <div>
                <p className="font-sans text-sm font-medium text-on-surface">2 students completed all modules this week</p>
                <p className="font-sans text-xs text-on-surface-variant mt-1">Ravi Kumar and Carlos Herrera are ready for certification.</p>
                <button onClick={() => showToast('Certificate generation coming soon!', 'success')} className="mt-2 text-primary font-sans text-sm hover:underline">Generate Certificates →</button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6 flex flex-col">
          <h2 className="font-display text-xl font-bold text-on-surface mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-error">assignment_late</span> Attention Needed
          </h2>
          <ul className="flex-1 space-y-2">
            {atRisk.map(s => (
              <li key={s.id} className="flex items-center justify-between p-2.5 hover:bg-surface-container rounded-xl transition-colors border border-transparent hover:border-outline-variant">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs shrink-0">{s.initials}</div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-on-surface">{s.name}</p>
                    <p className="font-sans text-xs text-on-surface-variant">{s.progress}% progress</p>
                  </div>
                </div>
                <span className={`${BADGE_STYLES[s.badge]} px-2 py-1 rounded-lg font-sans text-xs font-bold`}>{s.badge}</span>
              </li>
            ))}
          </ul>
          <button onClick={() => showToast('Sending nudge emails to at-risk students...', 'success')} className="mt-4 w-full py-2.5 border border-primary text-primary rounded-xl font-sans text-sm hover:bg-primary-container transition-colors">
            Send Nudge to All At-Risk
          </button>
        </div>
      </div>
    </div>
  );
};

const CoursesTab = ({ courses, showToast }) => {
  const [search, setSearch] = useState('');
  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
      <div className="p-5 border-b border-outline-variant flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <h2 className="font-display text-xl font-bold text-on-surface">Course Management</h2>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg border border-outline-variant text-sm font-sans focus:outline-none focus:border-primary bg-surface-container-lowest"
              placeholder="Search courses..."
            />
          </div>
          <button onClick={() => showToast('Course creation wizard coming soon!', 'info')} className="px-4 py-2 bg-primary text-on-primary rounded-lg font-sans text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-1 shrink-0">
            <span className="material-symbols-outlined text-[18px]">add</span> New Course
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full font-sans text-sm text-left">
          <thead>
            <tr className="bg-surface-container-low text-on-surface-variant text-xs uppercase tracking-wider border-b border-outline-variant">
              <th className="p-4 font-semibold">Course</th>
              <th className="p-4 font-semibold">Instructor</th>
              <th className="p-4 font-semibold">Students</th>
              <th className="p-4 font-semibold">Modules</th>
              <th className="p-4 font-semibold">Level</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/50">
            {filtered.map(c => (
              <tr key={c.id} className="hover:bg-surface-container-lowest transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={c.image} alt={c.title} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                    <div>
                      <p className="font-medium text-on-surface">{c.title}</p>
                      <p className="text-xs text-on-surface-variant">{c.tag}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-on-surface-variant">{c.instructor}</td>
                <td className="p-4 text-on-surface">{c.students}</td>
                <td className="p-4 text-on-surface">{c.modules.length}</td>
                <td className="p-4">
                  <span className={`${c.tagBg} px-2.5 py-1 rounded-lg text-xs font-bold`}>{c.level}</span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => showToast(`Editing "${c.title}"...`, 'info')} className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary-container/30 rounded-lg transition-colors">
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button onClick={() => showToast(`Analytics for "${c.title}" opening...`, 'info')} className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary-container/30 rounded-lg transition-colors">
                      <span className="material-symbols-outlined text-[18px]">analytics</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-on-surface-variant font-sans text-sm">No courses found.</div>
        )}
      </div>
    </div>
  );
};

const StudentsTab = ({ showToast }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const filtered = STUDENTS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === 'All' || s.status === statusFilter)
  );

  return (
    <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
      <div className="p-5 border-b border-outline-variant flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
        <h2 className="font-display text-xl font-bold text-on-surface">Student Roster</h2>
        <div className="flex gap-2 flex-wrap">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg border border-outline-variant text-sm font-sans focus:outline-none focus:border-primary bg-surface-container-lowest"
              placeholder="Search students..."
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-outline-variant text-sm font-sans focus:outline-none focus:border-primary bg-surface-container-lowest text-on-surface"
          >
            {['All', 'Active', 'At Risk', 'Inactive', 'Completed'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full font-sans text-sm text-left">
          <thead>
            <tr className="bg-surface-container-low text-on-surface-variant text-xs uppercase tracking-wider border-b border-outline-variant">
              <th className="p-4 font-semibold">Student</th>
              <th className="p-4 font-semibold">Current Course</th>
              <th className="p-4 font-semibold">Progress</th>
              <th className="p-4 font-semibold">Avg Score</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/50">
            {filtered.map(s => (
              <tr key={s.id} className="hover:bg-surface-container-lowest transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm shrink-0">{s.initials}</div>
                    <div>
                      <p className="font-medium text-on-surface">{s.name}</p>
                      <p className="text-xs text-on-surface-variant">{s.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-on-surface-variant max-w-[160px] truncate">{s.course}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full" style={{ width: `${s.progress}%` }} />
                    </div>
                    <span className="text-xs text-on-surface-variant">{s.progress}%</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`font-bold ${s.score >= 80 ? 'text-secondary' : s.score >= 60 ? 'text-on-surface' : 'text-error'}`}>{s.score}%</span>
                </td>
                <td className="p-4">
                  <span className={`${BADGE_STYLES[s.badge]} px-2.5 py-1 rounded-lg text-xs font-bold`}>{s.badge}</span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => showToast(`Viewing ${s.name}'s full profile...`, 'info')} className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary-container/30 rounded-lg transition-colors">
                      <span className="material-symbols-outlined text-[18px]">person</span>
                    </button>
                    <button onClick={() => showToast(`Nudge email sent to ${s.name}!`, 'success')} className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary-container/30 rounded-lg transition-colors">
                      <span className="material-symbols-outlined text-[18px]">mail</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-on-surface-variant font-sans text-sm">No students match your filters.</div>
        )}
      </div>
    </div>
  );
};

// ─── Main Admin Page ───────────────────────────────────────────────────────────
const Admin = () => {
  const { user, logout, showToast } = useApp();
  const navigate = useNavigate();
  const courses = COURSE_CATALOGUE;
  const [activeTab, setActiveTab] = useState('Overview');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const tabs = ['Overview', 'Courses', 'Students'];

  return (
    <div className="bg-background text-on-background font-sans antialiased min-h-screen flex">

      {/* Admin Sidebar */}
      <nav className="bg-surface-container-highest text-primary font-sans text-sm hidden md:flex flex-col h-screen p-5 gap-3 w-64 shadow-md sticky top-0 shrink-0 z-50">
        <div className="flex items-center gap-2 mb-4 px-2">
          <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm shrink-0">
            {user?.initials || 'AD'}
          </div>
          <div>
            <p className="font-sans text-sm font-bold text-on-surface">{user?.name || 'Admin'}</p>
            <p className="font-sans text-xs text-on-surface-variant">Institutional Dashboard</p>
          </div>
        </div>

        <div className="flex flex-col gap-1 flex-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-sans text-sm text-left
                ${activeTab === tab ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              <span className="material-symbols-outlined text-[20px]" style={activeTab === tab ? { fontVariationSettings: "'FILL' 1" } : {}}>
                {tab === 'Overview' ? 'dashboard' : tab === 'Courses' ? 'library_books' : 'group'}
              </span>
              {tab}
            </button>
          ))}
        </div>

        <div className="pt-4 border-t border-outline-variant/40 space-y-1">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-3 px-3 py-2.5 w-full text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all text-sm">
            <span className="material-symbols-outlined">arrow_back</span> Student View
          </button>
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 w-full text-error hover:bg-error-container/30 rounded-xl transition-all text-sm">
            <span className="material-symbols-outlined">logout</span> Logout
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile top bar */}
        <header className="md:hidden bg-surface border-b border-outline-variant p-4 flex items-center justify-between sticky top-0 z-40">
          <h1 className="font-display text-xl font-bold text-primary">Vetora Admin</h1>
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${activeTab === t ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}>
                {t}
              </button>
            ))}
          </div>
        </header>

        <div className="p-5 md:p-8 max-w-7xl mx-auto">
          {/* Page title */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-on-surface">{activeTab}</h1>
              <p className="font-sans text-sm text-on-surface-variant mt-0.5">
                {activeTab === 'Overview' && 'Performance data across your institution.'}
                {activeTab === 'Courses' && `${courses.length} courses in the catalogue.`}
                {activeTab === 'Students' && `${STUDENTS.length} students enrolled.`}
              </p>
            </div>
            <button
              onClick={() => showToast('Report generation coming soon!', 'info')}
              className="px-4 py-2.5 border border-primary text-primary rounded-xl font-sans text-sm hover:bg-primary-container transition-colors flex items-center gap-2 self-start sm:self-auto"
            >
              <span className="material-symbols-outlined text-[18px]">download</span> Export Report
            </button>
          </div>

          {activeTab === 'Overview'  && <OverviewTab  courses={courses} showToast={showToast} />}
          {activeTab === 'Courses'   && <CoursesTab   courses={courses} showToast={showToast} />}
          {activeTab === 'Students'  && <StudentsTab  showToast={showToast} />}
        </div>
      </main>
    </div>
  );
};

export default Admin;
