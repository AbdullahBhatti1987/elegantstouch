'use client';

import { usePathname } from 'next/navigation';

// import Header from './Header';
import Footer from './Footer';
import Header from './Header';

export default function MainLayout({ children }) {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <div className="flex flex-col">
      {!isDashboard && <Header />}

      <main className="flex-1">{children}</main>

      {!isDashboard && <Footer />}
    </div>
  );
}