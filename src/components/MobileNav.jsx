import React from 'react';

const MobileNav = () => {
  return (
    <>
      {/* Top Navigation (Mobile Only) */}
      <nav className="md:hidden flex justify-between items-center w-full px-6 py-2 bg-surface-bright border-b border-outline-variant shadow-sm sticky top-0 z-40">
        <div className="font-display text-2xl font-bold text-primary">Vetora</div>
        <div className="flex items-center gap-2">
          <button className="hover:bg-surface-container-high rounded-full p-2 text-on-surface-variant transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <img alt="User Profile" className="w-8 h-8 rounded-full object-cover border border-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQQQr3lB67ZHVCfkNoN3Z-evoAYA7zm8FIrcXoc5Ko17bq9WDFkZ0UxfBcPxBYnPRPca8obXAlLTjefCWg4jS3LOrC2JxlADFgPP9wKA4mvsEvPZ266cDctr13b-_zCpHxFmBaBk9ODj1fddl1x0uHjl3_AUy48ZDfcNFb-0FqdjEVB0-abrOcuvsbXH2WeviUTCNXFMMsbbeEOPRmB7uC5MGRXlRMIecrOxXRn3mXN9qeZdh-n36I"/>
        </div>
      </nav>

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="md:hidden flex justify-around items-center w-full bg-surface border-t border-outline-variant fixed bottom-0 z-40 pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <a className="flex flex-col items-center justify-center w-full py-2 text-primary" href="#">
          <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="font-sans text-[10px] font-bold">Home</span>
        </a>
        <a className="flex flex-col items-center justify-center w-full py-2 text-on-surface-variant" href="#">
          <span className="material-symbols-outlined mb-1">explore</span>
          <span className="font-sans text-[10px]">Explore</span>
        </a>
        <a className="flex flex-col items-center justify-center w-full py-2 text-on-surface-variant" href="#">
          <span className="material-symbols-outlined mb-1">school</span>
          <span className="font-sans text-[10px]">Learning</span>
        </a>
        <a className="flex flex-col items-center justify-center w-full py-2 text-on-surface-variant" href="#">
          <span className="material-symbols-outlined mb-1">person</span>
          <span className="font-sans text-[10px]">Profile</span>
        </a>
      </nav>
    </>
  );
};

export default MobileNav;
