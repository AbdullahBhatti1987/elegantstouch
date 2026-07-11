'use client';

import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} `}
      >
        <AdminSidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </aside>

      {/* Main */}
      <div
        className={`flex flex-1 flex-col transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'} `}
      >
        {/* Header */}
        <header
          className={`fixed top-0 right-0 z-50 transition-all duration-300 ${collapsed ? 'left-20' : 'left-64'} `}
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
