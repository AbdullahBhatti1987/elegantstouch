'use client';

import Link from 'next/link';
import {
  RotateCcw,
  Truck,
  ShieldCheck,
  FileText,
  MessageCircle,
  PackageSearch,
  HelpCircle,
  ShoppingBag,
} from 'lucide-react';

export default function SupportMegaMenu() {
  const items = [
    {
      title: 'Return Policy',
      desc: 'Returns & refunds',
      icon: RotateCcw,
      link: '/return-policy',
    },
    {
      title: 'Shipping Policy',
      desc: 'Delivery info',
      icon: Truck,
      link: '/shipping-policy',
    },
    {
      title: 'Privacy Policy',
      desc: 'Data protection',
      icon: ShieldCheck,
      link: '/privacy-policy',
    },
    {
      title: 'Terms & Conditions',
      desc: 'Rules & policies',
      icon: FileText,
      link: '/terms-conditions',
    },
    {
      title: 'Track Order',
      desc: 'Order status',
      icon: PackageSearch,
      link: '/track-order',
    },
    {
      title: 'Contact Support',
      desc: 'Get help',
      icon: MessageCircle,
      link: '/contact',
    },
    {
      title: 'FAQs',
      desc: 'Common questions',
      icon: HelpCircle,
      link: '/faq',
    },
    {
      title: 'Order Help',
      desc: 'Order assistance',
      icon: ShoppingBag,
      link: '/orders',
    },
  ];

  return (
    <div className="w-[700px] max-w-[calc(100vw-32px)] rounded-2xl border bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
      <div className="grid grid-cols-3 gap-3">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <Link
              key={index}
              href={item.link}

              className="group flex items-center gap-3 rounded-xl p-3 transition hover:bg-gray-50 dark:hover:bg-zinc-800"
            >
              {/* Icon */}

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#005b96] dark:bg-zinc-800">
                <Icon size={20} />
              </div>

              {/* Text */}

              <div className="min-w-0">
                <h4 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h4>

                <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom Support Banner */}

      <div className="mt-4 flex items-center justify-between rounded-xl bg-gradient-to-r from-[#005b96] to-cyan-500 px-4 py-3 text-white">
        <div>
          <h4 className="text-sm font-bold">Need Help?</h4>

          <p className="text-xs text-white/90">
            Our team is ready to assist
          </p>
        </div>

        <Link
          href="/contact"
          className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-[#005b96]"
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
