'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const SIDEBAR_STORAGE_KEY = 'admin-sidebar-settings';

export default function AdminLayout({ children }) {
  const [sidebar, setSidebar] = useState({
    collapsed: false,
    width: '256px',
  });

  // Get from localStorage
  useEffect(() => {
    const savedSidebar = localStorage.getItem(SIDEBAR_STORAGE_KEY);

    if (savedSidebar) {
      setSidebar(JSON.parse(savedSidebar));
    }
  }, []);

  // Save to localStorage
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
      <aside
        style={{
          width: sidebar.width,
        }}
        className="fixed top-0 left-0 h-screen transition-all duration-300"
      >
        <AdminSidebar
          collapsed={sidebar.collapsed}
          onToggle={handleSidebarToggle}
        />
      </aside>

      {/* Main */}
      <div
        style={{
          marginLeft: sidebar.width,
        }}
        className="flex flex-1 flex-col transition-all duration-300"
      >
        {/* Header */}
        <header
          style={{
            left: sidebar.width,
          }}
          className="fixed top-0 right-0 z-50 transition-all duration-300"
        >
          <AdminHeader />
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6 pt-16 dark:bg-gray-950">
          {children}
        </main>
      </div>
    </div>
  );
}
