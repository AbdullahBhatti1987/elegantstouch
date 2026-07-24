'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLoading } from '@/context/LoadingContext';

export default function RouteLoader() {
  const pathname = usePathname();

  const { stopLoading } = useLoading();

  useEffect(() => {
    stopLoading();
  }, [pathname]);

  return null;
}
