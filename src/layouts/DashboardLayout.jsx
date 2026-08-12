import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MobileNav from '../components/MobileNav';

const DashboardLayout = () => {
  return (
    <div className="bg-background text-on-background font-sans min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <MobileNav />
        <main className="flex-1 w-full max-w-[1200px] mx-auto p-4 md:p-6 lg:p-16 overflow-y-auto bg-background pb-20 md:pb-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
