// // // 'use client';

// // // import { useEffect, useState } from 'react';
// // // import AdminSidebar from './AdminSidebar';
// // // import AdminHeader from './AdminHeader';

// // // const SIDEBAR_STORAGE_KEY = 'admin-sidebar-settings';

// // // export default function AdminLayout({ children }) {
// // //   const [sidebar, setSidebar] = useState({
// // //     collapsed: false,
// // //     width: '256px',
// // //   });

// // //   // Get from localStorage
// // //   useEffect(() => {
// // //     const savedSidebar = localStorage.getItem(SIDEBAR_STORAGE_KEY);

// // //     if (savedSidebar) {
// // //       setSidebar(JSON.parse(savedSidebar));
// // //     }
// // //   }, []);

// // //   // Save to localStorage
// // //   useEffect(() => {
// // //     localStorage.setItem(
// // //       SIDEBAR_STORAGE_KEY,
// // //       JSON.stringify(sidebar),
// // //     );
// // //   }, [sidebar]);

// // //   const handleSidebarToggle = () => {
// // //     setSidebar((prev) => ({
// // //       collapsed: !prev.collapsed,
// // //       width: !prev.collapsed ? '80px' : '256px',
// // //     }));
// // //   };

// // //   return (
// // //     <div className="flex h-screen overflow-hidden">
// // //       {/* Sidebar */}
// // //       <aside
// // //         style={{
// // //           width: sidebar.width,
// // //         }}
// // //         className="fixed top-0 left-0 h-screen transition-all duration-300"
// // //       >
// // //         <AdminSidebar
// // //           collapsed={sidebar.collapsed}
// // //           onToggle={handleSidebarToggle}
// // //         />
// // //       </aside>

// // //       {/* Main */}
// // //       <div
// // //         style={{
// // //           marginLeft: sidebar.width,
// // //         }}
// // //         className="flex flex-1 flex-col transition-all duration-300"
// // //       >
// // //         {/* Header */}
// // //         <header
// // //           style={{
// // //             left: sidebar.width,
// // //           }}
// // //           className="fixed top-0 right-0 z-50 transition-all duration-300"
// // //         >
// // //           <AdminHeader />
// // //         </header>

// // //         {/* Content */}
// // //         <main className="flex-1 overflow-y-auto bg-gray-50 p-6 pt-16 dark:bg-gray-950">
// // //           {children}
// // //         </main>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // 'use client';

// // // import { useEffect, useState } from 'react';
// // // import AdminSidebar from './AdminSidebar';
// // // import AdminHeader from './AdminHeader';

// // // const SIDEBAR_STORAGE_KEY = 'admin-sidebar-settings';

// // // export default function AdminLayout({ children }) {
// // //   const [mobileOpen, setMobileOpen] = useState(false);

// // //   const [sidebar, setSidebar] = useState({
// // //     collapsed: false,
// // //     width: '256px',
// // //   });

// // //   useEffect(() => {
// // //     const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);

// // //     if (saved) {
// // //       setSidebar(JSON.parse(saved));
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     localStorage.setItem(
// // //       SIDEBAR_STORAGE_KEY,
// // //       JSON.stringify(sidebar),
// // //     );
// // //   }, [sidebar]);

// // //   const handleSidebarToggle = () => {
// // //     setSidebar((prev) => ({
// // //       collapsed: !prev.collapsed,

// // //       width: !prev.collapsed ? '80px' : '256px',
// // //     }));
// // //   };

// // //   return (
// // //     <div className="flex h-screen overflow-hidden">
// // //       {/* Sidebar */}

// // //       <AdminSidebar
// // //         collapsed={sidebar.collapsed}

// // //         onToggle={handleSidebarToggle}

// // //         mobileOpen={mobileOpen}

// // //         setMobileOpen={setMobileOpen}
// // //       />

// // //       {/* Main */}

// // //       <div
// // //         style={{
// // //           marginLeft:
// // //             typeof window !== 'undefined' && window.innerWidth >= 768
// // //               ? sidebar.width
// // //               : '0px',
// // //         }}

// // //         className="flex flex-1 flex-col transition-all duration-300"
// // //       >
// // //         <AdminHeader onMenuClick={() => setMobileOpen(true)} />

// // //         <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6 dark:bg-gray-950">
// // //           {children}
// // //         </main>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // 'use client';

// // import { useEffect, useState } from 'react';
// // import AdminSidebar from './AdminSidebar';
// // import AdminHeader from './AdminHeader';

// // const SIDEBAR_STORAGE_KEY = 'admin-sidebar-settings';

// // export default function AdminLayout({ children }) {
// //   const [mobileOpen, setMobileOpen] = useState(false);

// //   const [sidebar, setSidebar] = useState({
// //     collapsed: false,
// //     width: '256px',
// //   });

// //   useEffect(() => {
// //     const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);

// //     if (saved) {
// //       setSidebar(JSON.parse(saved));
// //     }
// //   }, []);

// //   useEffect(() => {
// //     localStorage.setItem(
// //       SIDEBAR_STORAGE_KEY,
// //       JSON.stringify(sidebar),
// //     );
// //   }, [sidebar]);

// //   const handleSidebarToggle = () => {
// //     setSidebar((prev) => ({
// //       collapsed: !prev.collapsed,
// //       width: !prev.collapsed ? '80px' : '256px',
// //     }));
// //   };

// //   return (
// //     <div className="h-screen overflow-hidden">
// //       {/* Sidebar */}

// //       <div
// //         className="fixed top-0 left-0 z-50 h-screen transition-all duration-300"
// //         style={{
// //           width: sidebar.width,
// //         }}
// //       >
// //         <AdminSidebar
// //           collapsed={sidebar.collapsed}

// //           onToggle={handleSidebarToggle}

// //           mobileOpen={mobileOpen}

// //           setMobileOpen={setMobileOpen}
// //         />
// //       </div>

// //       {/* Main Area */}

// //       <div
// //         className="flex h-screen flex-col transition-all duration-300"

// //         style={{
// //           marginLeft: sidebar.width,
// //         }}
// //       >
// //         {/* Header */}

// //         <div
// //           className="fixed top-0 right-0 z-40 transition-all duration-300"
// //           style={{
// //             left: sidebar.width,
// //           }}
// //         >
// //           <AdminHeader onMenuClick={() => setMobileOpen(true)} />
// //         </div>

// //         {/* Content */}

// //         <main className="flex-1 overflow-y-auto bg-gray-50 p-4 pt-20 md:p-6 md:pt-20 dark:bg-gray-950">
// //           {children}
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }

// 'use client';

// import { useEffect, useState } from 'react';
// import AdminSidebar from './AdminSidebar';
// import AdminHeader from './AdminHeader';

// const SIDEBAR_STORAGE_KEY = 'admin-sidebar-settings';

// export default function AdminLayout({ children }) {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const [isMobile, setIsMobile] = useState(false);

//   const [sidebar, setSidebar] = useState({
//     collapsed: false,
//     width: '256px',
//   });

//   // Detect screen

//   useEffect(() => {
//     const checkScreen = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkScreen();

//     window.addEventListener('resize', checkScreen);

//     return () => window.removeEventListener('resize', checkScreen);
//   }, []);

//   // Load sidebar

//   useEffect(() => {
//     const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);

//     if (saved) {
//       setSidebar(JSON.parse(saved));
//     }
//   }, []);

//   // Save sidebar

//   useEffect(() => {
//     localStorage.setItem(
//       SIDEBAR_STORAGE_KEY,
//       JSON.stringify(sidebar),
//     );
//   }, [sidebar]);

//   const handleSidebarToggle = () => {
//     setSidebar((prev) => ({
//       collapsed: !prev.collapsed,

//       width: !prev.collapsed ? '80px' : '256px',
//     }));
//   };

//   const sidebarWidth = isMobile ? '0px' : sidebar.width;

//   return (
//     <div className="h-screen overflow-hidden">
//       {/* Sidebar */}

//       <div
//         className="fixed top-0 left-0 z-50 h-screen transition-all duration-300"

//         style={{
//           width: isMobile ? '256px' : sidebar.width,
//         }}
//       >
//         <AdminSidebar
//           collapsed={isMobile ? false : sidebar.collapsed}

//           onToggle={handleSidebarToggle}

//           mobileOpen={mobileOpen}

//           setMobileOpen={setMobileOpen}
//         />
//       </div>

//       {/* Main */}

//       <div
//         className="flex h-screen flex-col transition-all duration-300"

//         style={{
//           marginLeft: sidebarWidth,
//         }}
//       >
//         {/* Header */}

//         <div
//           className="fixed top-0 right-0 z-40 transition-all duration-300"

//           style={{
//             left: sidebarWidth,
//           }}
//         >
//           <AdminHeader onMenuClick={() => setMobileOpen(true)} />
//         </div>

//         {/* Content */}

//         <main className="flex-1 overflow-y-auto bg-gray-50 p-4 pt-20 md:p-6 md:pt-20 dark:bg-gray-950">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

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
