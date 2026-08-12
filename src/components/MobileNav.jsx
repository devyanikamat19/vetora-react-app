import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const mobileNavItems = [
  { icon: 'home', label: 'Home', to: '/dashboard' },
  { icon: 'explore', label: 'Explore', to: '/explore' },
  { icon: 'school', label: 'Learning', to: '/my-learning' },
  { icon: 'medical_services', label: 'Cases', to: '/clinical' },
  { icon: 'smart_toy', label: 'AI', to: '/ai' },
  { icon: 'verified', label: 'Certs', to: '/certificates' },
  { icon: 'person', label: 'Profile', to: '/profile' },
];

const MobileNav = () => {
  const location = useLocation();
  const { user } = useApp();

  return (
    <>
      {/* Top Header Navigation (Mobile Only) */}
      <nav className="md:hidden flex justify-between items-center w-full px-4 py-2.5 bg-white border-b border-gray-200/80 sticky top-0 z-40 shadow-2xs">
        <Link to="/dashboard" className="font-display text-xl font-bold text-[#0d5c63] tracking-tight">
          Vetora
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/profile" className="flex items-center gap-2">
            <img
              alt="User Profile"
              className="w-8 h-8 rounded-full object-cover border border-gray-200"
              src={user?.avatar || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80"}
            />
          </Link>
        </div>
      </nav>

      {/* Bottom Bar Navigation (Mobile Only) */}
      <nav className="md:hidden flex justify-around items-center w-full bg-white border-t border-gray-200/80 fixed bottom-0 z-50 py-1.5 px-1 shadow-lg">
        {mobileNavItems.map(item => {
          const isActive = location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to));

          return (
            <Link
              key={item.label}
              to={item.to}
              className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
                isActive ? 'text-[#0d5c63] font-bold bg-[#0d5c63]/10' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              <span className="font-sans text-[9px] mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default MobileNav;

