import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const mainNavItems = [
  { icon: 'home', label: 'Home', to: '/dashboard' },
  { icon: 'explore', label: 'Explore', to: '/explore' },
  { icon: 'school', label: 'My Learning', to: '/my-learning' },
  { icon: 'medical_services', label: 'Clinical Cases', to: '/clinical' },
  { icon: 'smart_toy', label: 'Vetora AI', to: '/ai' },
  { icon: 'verified', label: 'Certificates', to: '/certificates' },
  { icon: 'person', label: 'Profile', to: '/profile' },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, showToast } = useApp();
  const [showProModal, setShowProModal] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <aside className="hidden md:flex flex-col h-screen p-4 bg-[#f8faf9] text-gray-800 font-sans text-sm w-64 border-r border-gray-200/70 sticky top-0 z-40 shrink-0">
        {/* User Profile Header */}
        <Link to="/profile" className="flex items-center gap-3 mb-6 px-3 py-3 rounded-2xl bg-white border border-gray-200/60 shadow-2xs hover:border-[#0d5c63]/40 transition-all">
          {user?.avatar ? (
            <img alt="Profile" className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-200" src={user.avatar} />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#0d5c63] text-white flex items-center justify-center font-bold text-sm shrink-0">
              {user?.initials || 'VS'}
            </div>
          )}
          <div className="min-w-0">
            <p className="font-sans text-sm font-bold text-gray-900 truncate">{user?.name || 'Vetora Student'}</p>
            <p className="font-sans text-xs text-gray-500 font-medium truncate">Clinical Excellence</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-1.5 flex-1">
          {mainNavItems.map(({ icon, label, to, isComingSoon }) => {
            const active = location.pathname === to || (to !== '/' && to !== '#' && location.pathname.startsWith(to));

            if (isComingSoon) {
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => showToast(`${label} module opening soon!`, 'info')}
                  className="flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100/80 transition-all font-sans text-sm text-left group"
                >
                  <span className="material-symbols-outlined text-[20px] text-gray-500 group-hover:text-gray-800">{icon}</span>
                  <span className="font-medium">{label}</span>
                </button>
              );
            }

            return (
              <Link
                key={label}
                to={to}
                className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition-all duration-150 font-sans text-sm
                  ${active
                    ? 'bg-[#86efac] text-[#052e16] font-bold shadow-2xs'
                    : 'text-gray-700 hover:bg-gray-100/80 hover:text-gray-900 font-medium'}`}
              >
                <span className="material-symbols-outlined text-[20px]" style={active ? { fontVariationSettings: "'FILL' 1" } : {}}>{icon}</span>
                {label}
              </Link>
            );
          })}

          {/* Upgrade to Pro Button */}
          <div className="pt-4 px-1">
            <button
              type="button"
              onClick={() => setShowProModal(true)}
              className="w-full bg-[#0d5c63] hover:bg-[#09474d] text-white font-sans text-sm font-semibold py-3 px-4 rounded-xl shadow-sm transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">workspace_premium</span> Upgrade to Pro
            </button>
          </div>
        </nav>

        {/* Footer Navigation (Support & Logout) */}
        <div className="mt-auto pt-4 border-t border-gray-200/60 space-y-1">
          <button
            type="button"
            onClick={() => showToast('Support team available 24/7 at support@vetora.edu', 'info')}
            className="flex items-center gap-3.5 px-4 py-2.5 w-full text-gray-600 hover:bg-gray-100/80 rounded-xl transition-all text-sm font-medium"
          >
            <span className="material-symbols-outlined text-[20px]">help_outline</span>
            Support
          </button>

          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="flex items-center gap-3.5 px-4 py-2.5 w-full rounded-xl text-[#0d5c63] bg-[#0d5c63]/10 hover:bg-[#0d5c63] hover:text-white transition-all text-sm font-bold"
            >
              <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
              Admin Dashboard
            </Link>
          )}

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3.5 px-4 py-2.5 w-full text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all text-sm font-medium"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Upgrade to Pro Subscription Modal */}
      {showProModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative border border-gray-200">
            <button
              onClick={() => setShowProModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#0d5c63]/10 text-[#0d5c63] flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined text-[32px]">workspace_premium</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-gray-900">Upgrade to Vetora Pro</h2>
              <p className="font-sans text-xs text-gray-500 mt-1">Unlock full clinical case simulations & unlimited AI copilot queries.</p>
            </div>

            {/* Monthly vs Annual Billing Toggle */}
            <div className="flex justify-center items-center gap-3 bg-gray-100 p-1.5 rounded-2xl mb-6 max-w-xs mx-auto text-xs font-sans font-bold">
              <button
                onClick={() => setIsAnnual(false)}
                className={`flex-1 py-2 rounded-xl transition-all ${!isAnnual ? 'bg-white text-[#0d5c63] shadow-2xs' : 'text-gray-500'}`}
              >
                Monthly ($29/mo)
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1 ${isAnnual ? 'bg-[#0d5c63] text-white shadow-2xs' : 'text-gray-500'}`}
              >
                Annual ($19/mo) <span className="bg-emerald-400 text-slate-900 text-[9px] px-1.5 py-0.5 rounded-full">Save 30%</span>
              </button>
            </div>

            {/* Feature Perks List */}
            <div className="space-y-3 mb-8 text-xs font-sans">
              {[
                'Unlimited Vetora AI Clinical Copilot queries & drug CRI calculations',
                'Official RACE-Accredited CE Certificates with board verification',
                'Full access to all 50+ interactive emergency case simulations',
                'Institutional performance analytics & board exam readiness scores',
              ].map(perk => (
                <div key={perk} className="flex items-start gap-2.5 text-gray-700">
                  <span className="material-symbols-outlined text-[18px] text-[#0d5c63] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => {
                setShowProModal(false);
                showToast('Welcome to Vetora Pro! 14-Day Free Trial activated.', 'success');
              }}
              className="w-full py-3.5 bg-[#0d5c63] hover:bg-[#09474d] text-white font-sans text-xs font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              Start 14-Day Free Trial <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;

