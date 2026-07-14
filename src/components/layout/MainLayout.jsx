'use client';

import { usePathname } from 'next/navigation';

import Header from './Header';
import Footer from './Footer';

export default function MainLayout({ children }) {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <div className="flex min-h-screen flex-col">
      {!isDashboard && <Header />}

      <main className="flex-1">{children}</main>

      {!isDashboard && <Footer />}
    </div>
  );
}
