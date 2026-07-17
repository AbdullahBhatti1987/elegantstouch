'use client';

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
  Layers,
  Package,
  Users,
  ShoppingCart,
  ClipboardList,
  UserRound,
} from 'lucide-react';
import DashboardCard from './DashboardCard';

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

  const stats = [
    {
      title: 'Categories',
      value: counts.categories,
      icon: Layers,
      gradient: 'bg-gradient-to-br from-blue-100 to-blue-200',
    },

    {
      title: 'Products',
      value: counts.products,
      icon: Package,
      gradient: 'bg-gradient-to-br from-purple-100 to-purple-200',
    },

    {
      title: 'Customers',
      value: counts.customers,
      icon: Users,
      gradient: 'bg-gradient-to-br from-green-100 to-green-200',
    },

    {
      title: 'Orders',
      value: counts.orders,
      icon: ClipboardList,
      gradient: 'bg-gradient-to-br from-orange-100 to-orange-200',
    },

    {
      title: 'Carts',
      value: counts.carts,
      icon: ShoppingCart,
      gradient: 'bg-gradient-to-br from-pink-100 to-pink-200',
    },

    {
      title: 'Users',
      value: counts.users,
      icon: UserRound,
      gradient: 'bg-gradient-to-br from-red-100 to-red-200',
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((item) => (
        <DashboardCard key={item.title} {...item} loading={loading} />
      ))}
    </div>
  );
}
