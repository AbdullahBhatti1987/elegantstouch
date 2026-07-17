'use client';

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {} from 'lucide-react';
import DashboardCard from './DashboardCard';
import { dashboardStats } from '@/content/data';

export default function DashboardStats() {
  const [counts, setCounts] = useState({
    categories: 0,
    products: 0,
    customers: 0,
    orders: 0,
    carts: 0,
    users: 0,
  });

  const [loading, setLoading] = useState(true);

  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;

    called.current = true;

    async function getCounts() {
      try {
        const { data } = await axios.get('/api/dashboard/status');

        if (data.success) {
          setCounts(data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getCounts();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-4 xl:grid-cols-6">
      {dashboardStats.map((item) => (
        <DashboardCard
          key={item.title}

          title={item.title}

          value={counts[item.key]}

          icon={item.icon}

          gradient={item.gradient}

          loading={loading}
        />
      ))}
    </div>
  );
}
