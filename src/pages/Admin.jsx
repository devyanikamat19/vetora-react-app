import React from 'react';
import { Link } from 'react-router-dom';

const metrics = [
  { icon: 'group', bg: 'bg-primary-container', color: 'text-on-primary-container', label: 'Total Students', value: '4,250', sub: '+5% this month', subColor: 'text-secondary', showBar: false },
  { icon: 'how_to_reg', bg: 'bg-secondary-container', color: 'text-on-secondary-container', label: 'Active Students', value: '1,840', sub: 'Currently engaged', subColor: 'text-on-surface-variant', showBar: false },
  { icon: 'check_circle', bg: 'bg-primary-container', color: 'text-on-primary-container', label: 'Completion Rate', value: '72%', sub: null, subColor: '', showBar: true, barWidth: '72%' },
  { icon: 'school', bg: 'bg-primary-container', color: 'text-on-primary-container', label: 'Avg Assessment', value: '84%', sub: '+2% vs last term', subColor: 'text-secondary', showBar: false },
];

const students = [
  { initials: 'JD', name: 'Jane Doe', course: 'Surgery Basics', badge: 'At Risk', badgeBg: 'bg-error-container text-on-error-container' },
  { initials: 'AS', name: 'Alex Smith', course: 'Internal Medicine', badge: 'At Risk', badgeBg: 'bg-error-container text-on-error-container' },
  { initials: 'MG', name: 'Maria Garcia', course: 'Equine Anatomy', badge: 'Inactive', badgeBg: 'bg-surface-variant text-on-surface-variant' },
];

const courses = [
  { name: 'Surgery Basics', instructor: 'Dr. E. Miller', enrollments: 420, status: 'Published', statusBg: 'bg-secondary-container text-on-secondary-container', stripe: false },
  { name: 'Internal Medicine Advanced', instructor: 'Dr. S. Chen', enrollments: 315, status: 'Published', statusBg: 'bg-secondary-container text-on-secondary-container', stripe: true },
  { name: 'Exotic Animal Care', instructor: 'Dr. J. Davis', enrollments: 150, status: 'Draft', statusBg: 'bg-surface-variant text-on-surface-variant', stripe: false },
  { name: 'Veterinary Pharmacology', instructor: 'Dr. A. Patel', enrollments: 280, status: 'Published', statusBg: 'bg-secondary-container text-on-secondary-container', stripe: true },
];

const navLinks = [
  { icon: 'dashboard', label: 'Overview', active: true },
  { icon: 'library_books', label: 'Courses', active: false },
  { icon: 'group', label: 'Students', active: false },
  { icon: 'analytics', label: 'Analytics', active: false },
  { icon: 'settings', label: 'Settings', active: false },
];

const Admin = () => {
  return (
    <div className="bg-background text-on-background font-sans antialiased overflow-x-hidden flex h-screen">
      {/* Admin Sidebar */}
      <nav className="bg-surface-container-highest text-primary font-sans text-sm hidden md:flex flex-col h-screen p-6 gap-4 w-72 shadow-md sticky top-0 shrink-0 z-50">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <img
            className="w-12 h-12 rounded-full object-cover border border-outline-variant"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWFpcYQmOlXhpgaTxI93bnTU7WgpnTSe0QbMqcQcEKTsOgo1VF9vJ2xsw2lJJXc-agj7ttIQ2f0kCSw1RIxRJifS1bYdxOHRSSXXmFpedwi1Xd8KbJC9NQ1IuZOQWzQqMULdbJkv6l9u5x0jPYc2CuA36FRoP5WPvHfyoDOfH6xzla1klRGHwDzASE6UNuyjgcJ8LnFPbeTBe7Si-cNKqURJtXMyIG-bVmosKlt69W0tC-Y6XJA2-S"
            alt="Admin"
          />
          <div>
            <h2 className="font-display text-base font-bold text-primary">Vetora Admin</h2>
            <p className="font-sans text-xs text-on-surface-variant">Institutional Dashboard</p>
          </div>
        </div>
        {/* Nav Links */}
        <ul className="flex-1 flex flex-col gap-1 w-full">
          {navLinks.map(({ icon, label, active }) => (
            <li key={label}>
              <a
                href="#"
                className={`flex items-center gap-2 p-2 rounded-lg transition-all font-sans text-sm ${
                  active
                    ? 'bg-primary text-on-primary shadow-sm opacity-90'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:translate-x-1'
                }`}
              >
                <span className="material-symbols-outlined" style={active ? { fontVariationSettings: "'FILL' 1" } : {}}>{icon}</span>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-4 border-t border-outline-variant/50 space-y-1">
          <Link to="/dashboard" className="flex items-center gap-2 p-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all font-sans text-sm">
            <span className="material-symbols-outlined">arrow_back</span> Student View
          </Link>
          <Link to="/login" className="flex items-center gap-2 p-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all font-sans text-sm">
            <span className="material-symbols-outlined">logout</span> Logout
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full">
        {/* Mobile Header */}
        <header className="md:hidden bg-surface-bright border-b border-outline-variant p-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
          <h1 className="font-display text-2xl font-bold text-primary">Vetora</h1>
          <button className="text-on-surface-variant"><span className="material-symbols-outlined">menu</span></button>
        </header>

        <div className="p-4 md:p-16 max-w-7xl mx-auto space-y-8">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-outline-variant pb-4">
            <div>
              <h1 className="font-display text-3xl font-bold text-primary mb-1">Dashboard Overview</h1>
              <p className="text-on-surface-variant font-sans text-base">Welcome back, Dr. Aris. Here is the latest performance data across the institution.</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-surface border border-primary text-primary px-4 py-2 rounded-lg font-sans text-sm hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm">
                Generate Report
              </button>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((m) => (
              <div key={m.label} className="bg-surface rounded-xl p-6 border border-outline-variant shadow-[0px_2px_4px_rgba(13,92,99,0.08)] hover:border-primary hover:shadow-[0px_8px_16px_rgba(13,92,99,0.12)] transition-all">
                <div className="flex items-center gap-2 mb-4">
                  <div className={`p-2 ${m.bg} rounded-lg ${m.color}`}>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{m.icon}</span>
                  </div>
                  <h3 className="font-sans text-sm text-on-surface-variant">{m.label}</h3>
                </div>
                <p className="font-display text-3xl font-bold text-on-surface">{m.value}</p>
                {m.showBar && (
                  <div className="w-full h-1 bg-surface-variant rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: m.barWidth }}></div>
                  </div>
                )}
                {m.sub && (
                  <p className={`font-sans text-xs ${m.subColor} mt-1 flex items-center gap-1`}>
                    {m.subColor === 'text-secondary' && <span className="material-symbols-outlined text-[16px]">trending_up</span>}
                    {m.sub}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Actionable Analytics */}
            <div className="lg:col-span-2 bg-surface rounded-xl border border-outline-variant shadow-[0px_2px_4px_rgba(13,92,99,0.08)] p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-2xl font-semibold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">insights</span>
                  Actionable Analytics
                </h2>
              </div>
              <div className="space-y-4 flex-1">
                <div className="flex gap-4 p-4 bg-error-container/20 rounded-lg border border-error-container">
                  <div className="mt-1">
                    <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                  </div>
                  <div>
                    <p className="font-sans text-base text-on-surface font-medium">23% of students drop off during Module 3 of Surgery Basics</p>
                    <p className="font-sans text-xs text-on-surface-variant mt-1">Suggested Action: Review video lecture clarity and split assessment into smaller parts.</p>
                    <button className="mt-2 text-primary font-sans text-sm hover:underline">Review Module Content</button>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-surface-container rounded-lg border border-outline-variant">
                  <div className="mt-1">
                    <span className="material-symbols-outlined text-on-surface-variant" style={{ fontVariationSettings: "'FILL' 1" }}>trending_down</span>
                  </div>
                  <div>
                    <p className="font-sans text-base text-on-surface font-medium">Assessment performance dropped by 12% in Internal Medicine</p>
                    <p className="font-sans text-xs text-on-surface-variant mt-1">Recent cohort scored lower on 'Canine Cardiology' section.</p>
                    <button className="mt-2 text-primary font-sans text-sm hover:underline">View Detailed Scores</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Students Needing Attention */}
            <div className="bg-surface rounded-xl border border-outline-variant shadow-[0px_2px_4px_rgba(13,92,99,0.08)] p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-2xl font-semibold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-error">assignment_late</span>
                  Attention Needed
                </h2>
              </div>
              <ul className="flex-1 space-y-2 overflow-y-auto max-h-[300px] pr-2">
                {students.map((s) => (
                  <li key={s.name} className="flex items-center justify-between p-2 hover:bg-surface-container rounded-lg transition-colors border border-transparent hover:border-outline-variant">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold font-sans text-xs">{s.initials}</div>
                      <div>
                        <p className="font-sans text-sm text-on-surface font-semibold">{s.name}</p>
                        <p className="font-sans text-xs text-on-surface-variant">{s.course}</p>
                      </div>
                    </div>
                    <span className={`${s.badgeBg} px-2 py-1 rounded font-sans text-xs font-bold`}>{s.badge}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-4 w-full py-2 border border-outline-variant rounded-lg text-primary font-sans text-sm hover:bg-surface-container transition-colors text-center">
                View All Students
              </button>
            </div>
          </div>

          {/* Course Performance Table */}
          <div className="bg-surface rounded-xl border border-outline-variant shadow-[0px_2px_4px_rgba(13,92,99,0.08)] overflow-hidden">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center">
              <h2 className="font-display text-2xl font-semibold text-on-surface">Course Performance</h2>
              <button className="text-primary font-sans text-sm hover:underline flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">filter_list</span> Filter
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full font-sans text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant font-sans text-xs uppercase tracking-wider">
                    <th className="p-4 font-semibold">Course Name</th>
                    <th className="p-4 font-semibold">Instructor</th>
                    <th className="p-4 font-semibold">Enrollments</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {courses.map((c) => (
                    <tr key={c.name} className={`hover:bg-surface-container-low transition-colors ${c.stripe ? 'bg-tertiary-fixed/30' : ''}`}>
                      <td className="p-4 font-medium text-on-surface">{c.name}</td>
                      <td className="p-4 text-on-surface-variant">{c.instructor}</td>
                      <td className="p-4 text-on-surface">{c.enrollments}</td>
                      <td className="p-4">
                        <span className={`${c.statusBg} px-2 py-1 rounded font-sans text-xs font-bold`}>{c.status}</span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-on-surface-variant hover:text-primary transition-colors">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
