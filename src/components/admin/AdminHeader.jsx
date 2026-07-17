// 'use client';

// import { useRouter } from 'next/navigation';
// import { Menu } from 'lucide-react';

// export default function AdminHeader({ onMenuClick }) {
//   const router = useRouter();

//   return (
//     <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6 dark:border-gray-800 dark:bg-gray-900">
//       {/* Mobile Menu Button */}

//       <button
//         onClick={onMenuClick}
//         className="rounded-lg p-2 hover:bg-gray-100 md:hidden dark:hover:bg-gray-800"
//       >
//         <Menu size={22} />
//       </button>

//       {/* Title */}

//       <h1
//         onClick={() => router.push('/')}
//         className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold md:static md:translate-x-0"
//       >
//         Admin Dashboard
//       </h1>

//       {/* Profile */}

//       <div className="flex items-center gap-3">
//         <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-lg font-semibold text-white">
//           A
//         </div>
//       </div>
//     </header>
//   );
// }

'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, User, Settings, LogOut } from 'lucide-react';

export default function AdminHeader({ onMenuClick }) {
  const router = useRouter();

  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  // Demo user data
  const user = {
    name: 'Admin User',
    email: 'admin@elegantstouch.com',
    image: '',
  };

  // Outside click close

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Avatar fallback

  const getAvatar = () => {
    if (user?.image) {
      return (
        <img
          src={user.image}
          alt={user.name}
          className="h-full w-full object-cover"
        />
      );
    }

    if (user?.name) {
      return <span>{user.name.charAt(0).toUpperCase()}</span>;
    }

    return <span>ET</span>;
  };

  return (
    <header className="relative flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6 dark:border-gray-800 dark:bg-gray-900">
      {/* Mobile Menu */}

      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 hover:bg-gray-100 md:hidden dark:hover:bg-gray-800"
      >
        <Menu size={22} />
      </button>

      {/* Title */}

      <h1
        onClick={() => router.push('/')}
        className="absolute left-1/2 -translate-x-1/2 cursor-pointer text-lg font-semibold md:static md:translate-x-0"
      >
        Admin Dashboard
      </h1>

      {/* Profile */}

      <div ref={profileRef} className="relative">
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-black font-semibold text-white"
        >
          {getAvatar()}
        </button>

        {profileOpen && (
          <div className="absolute top-12 right-0 z-50 w-64 rounded-xl border bg-white p-3 shadow-xl dark:border-gray-800 dark:bg-gray-900">
            {/* User */}

            <div className="flex items-center gap-3 border-b pb-3 dark:border-gray-800">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-black font-semibold text-white">
                {getAvatar()}
              </div>

              <div>
                <p className="font-semibold">
                  {user.name || 'ElegantTouch'}
                </p>

                <p className="text-sm text-gray-500">
                  {user.email || 'Admin'}
                </p>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <button
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => router.push('/dashboard/profile')}
              >
                <User size={18} />
                Profile
              </button>

              <button
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => router.push('/dashboard/settings')}
              >
                <Settings size={18} />
                Settings
              </button>

              <button
                onClick={() => router.push('/')}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
