import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { icon: 'home', label: 'Home', to: '/dashboard' },
  { icon: 'explore', label: 'Explore', to: '/explore' },
  { icon: 'school', label: 'My Learning', to: '/learning' },
  { icon: 'medical_services', label: 'Clinical Cases', to: '/clinical' },
  { icon: 'smart_toy', label: 'Vetora AI', to: '/dashboard' },
  { icon: 'verified', label: 'Certificates', to: '/dashboard' },
  { icon: 'person', label: 'Profile', to: '/dashboard' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col h-screen p-4 space-y-2 bg-surface-container-low text-primary font-sans text-sm w-64 shadow-sm sticky top-0 z-40 shrink-0">
      <div className="mb-8 px-2">
        <div className="flex items-center gap-2 mb-6">
          <img alt="Student Profile Picture" className="w-10 h-10 rounded-full object-cover border-2 border-primary" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPQmBGn01KnqkuSPySbhOH37sR7r2GkTNO8u81tUNaxyl2Y3riAnRfRe8RsP5MY12ZIgd2iwjaaU3m7zYwJ01s5DYSNKuUjUD-uOsLaHpX1VlyyJAa_nphvtqJiwdHIMOE-s68o4dKSD6yNL47zwR7Nafn34Yoi0EOzztMtnt8p1xFsv5qp3ev46qIIDh-FPk3CcOkGIpYsIh2vtu0qWCpJGfL9xb0ac4ym89pyKJ7caQwTDMKxkF4"/>
          <div>
            <h2 className="font-display text-lg font-bold text-primary">Vetora Student</h2>
            <p className="font-sans text-xs text-on-surface-variant">Clinical Excellence</p>
          </div>
        </div>
        <nav className="flex flex-col space-y-2">
          {navItems.map(({ icon, label, to }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={label}
                to={to}
                className={`flex items-center gap-4 p-2 rounded-lg transition-all duration-100 font-sans text-sm ${
                  active
                    ? 'bg-secondary-container text-on-secondary-container font-bold hover:scale-95'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined" style={active ? { fontVariationSettings: "'FILL' 1" } : {}}>{icon}</span>
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto flex flex-col space-y-2">
        <button className="w-full py-2 bg-primary-container text-on-primary-container font-sans text-sm font-bold rounded-lg hover:bg-surface-tint hover:text-white transition-colors">Upgrade to Pro</button>
        <nav className="flex flex-col space-y-2 mt-4">
          <a className="flex items-center gap-4 p-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all" href="#">
            <span className="material-symbols-outlined">help</span>
            <span>Support</span>
          </a>
          <Link to="/login" className="flex items-center gap-4 p-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all">
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

