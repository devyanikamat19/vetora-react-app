import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const navItems = [
  { icon: 'home', label: 'Home', to: '/dashboard' },
  { icon: 'explore', label: 'Explore', to: '/explore' },
  { icon: 'school', label: 'My Learning', to: '/my-learning' },
  { icon: 'medical_services', label: 'Clinical Cases', to: '/clinical' },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, showToast } = useApp();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="hidden md:flex flex-col h-screen p-4 bg-surface-container-low text-primary font-sans text-sm w-64 shadow-sm sticky top-0 z-40 shrink-0">
      {/* Logo */}
      <div className="px-2 mb-6">
        <Link to="/dashboard" className="font-display text-xl font-bold text-primary">Vetora</Link>
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-3 mb-6 px-3 py-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer">
        {user?.avatar ? (
          <img alt="Profile" className="w-9 h-9 rounded-full object-cover border-2 border-primary shrink-0" src={user.avatar} />
        ) : (
          <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm shrink-0">
            {user?.initials || 'VS'}
          </div>
        )}
        <div className="min-w-0">
          <p className="font-sans text-sm font-bold text-on-surface truncate">{user?.name || 'Vetora Student'}</p>
          <p className="font-sans text-xs text-on-surface-variant truncate">{user?.email || 'student@vetora.edu'}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-1 flex-1">
        {navItems.map(({ icon, label, to }) => {
          const active = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
          return (
            <Link
              key={label}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 font-sans text-sm
                ${active
                  ? 'bg-secondary-container text-on-secondary-container font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}
            >
              <span className="material-symbols-outlined text-[22px]" style={active ? { fontVariationSettings: "'FILL' 1" } : {}}>{icon}</span>
              {label}
            </Link>
          );
        })}

        {/* Coming soon items */}
        {[
          { icon: 'smart_toy', label: 'Vetora AI' },
          { icon: 'verified', label: 'Certificates' },
          { icon: 'person', label: 'Profile' },
        ].map(({ icon, label }) => (
          <button
            key={label}
            onClick={() => showToast(`${label} coming soon!`, 'info')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-sm"
          >
            <span className="material-symbols-outlined text-[22px]">{icon}</span>
            {label}
            <span className="ml-auto text-[10px] bg-secondary-container text-on-secondary-container px-1.5 py-0.5 rounded-full font-bold">Soon</span>
          </button>
        ))}
      </nav>

      {/* Logout (+ Admin shortcut) */}
      <div className="mt-auto pt-4 border-t border-outline-variant/50 space-y-1">
        {user?.role === 'admin' && (
          <Link
            to="/admin"
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-primary bg-primary-container hover:bg-primary hover:text-on-primary transition-all text-sm font-bold"
          >
            <span className="material-symbols-outlined text-[22px]">admin_panel_settings</span>
            Admin Dashboard
          </Link>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-error hover:bg-error-container/30 transition-all text-sm"
        >
          <span className="material-symbols-outlined text-[22px]">logout</span>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
