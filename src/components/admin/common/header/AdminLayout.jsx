'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const SIDEBAR_STORAGE_KEY = 'admin-sidebar-settings';

export default function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [sidebar, setSidebar] = useState({
    collapsed: false,
    width: '256px',
  });

  useEffect(() => {
    const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);

    if (saved) {
      setSidebar(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      SIDEBAR_STORAGE_KEY,
      JSON.stringify(sidebar),
    );
  }, [sidebar]);

  const handleSidebarToggle = () => {
    setSidebar((prev) => ({
      collapsed: !prev.collapsed,
      width: !prev.collapsed ? '80px' : '256px',
    }));
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}

      <div
        className="hidden transition-all duration-300 md:block"
        style={{
          width: sidebar.width,
        }}
      >
        <AdminSidebar
          collapsed={sidebar.collapsed}
          onToggle={handleSidebarToggle}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
      </div>

      {/* Mobile Sidebar */}

      <div className="md:hidden">
        <AdminSidebar
          collapsed={false}
          onToggle={() => {}}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
      </div>

      {/* Main */}

      <div className="flex flex-1 flex-col transition-all duration-300">
        <div className="relative top-0 right-0 left-0 z-40 md:left-auto">
          <AdminHeader onMenuClick={() => setMobileOpen(true)} />
        </div>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6 dark:bg-gray-950">
          {children}
        </main>
      </div>
    </div>
  );
}
