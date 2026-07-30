'use client';

import { usePathname } from 'next/navigation';

// import Header from './Header';
import Footer from './Footer';
import Header from './Header';
import MobileBottomNav from './MobileBottomNav';

export default function MainLayout({ children }) {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith('/dashboard');
  const isProducts = pathname.startsWith('/products');
  const isCategories = pathname.startsWith('/categories');

  const hideFooter = isDashboard || isProducts || isCategories;
  // const hideFooter = isDashboard || isProducts;

  return (
    <div className="flex flex-col">
      {!isDashboard && <Header />}

      <main className="flex-1">{children}</main>

      {!isDashboard && <MobileBottomNav />}
      {!hideFooter && <Footer />}
    </div>
  );
}
