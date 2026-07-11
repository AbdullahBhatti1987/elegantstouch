"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Grid3X3,
  ShoppingCart,
  Users,
  Settings,
  Menu,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Categories",
    href: "/dashboard/categories",
    icon: Grid3X3,
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function AdminSidebar({
  collapsed,
  setCollapsed
}) {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);


  return (
    <>
      {/* Mobile Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-black text-white
        "
      >
        <Menu size={20} />
      </button>


      <aside
        className={`
        fixed md:static
        top-0 left-0
        h-screen
       shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)]
       dark:shadow-[4px_0_6px_-1px_rgba(0,0,0,0.4)]
        bg-white dark:bg-gray-900
        transition-all duration-300
        z-40

        ${collapsed ? "w-20" : "w-64"}

        ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }
        `}
      >

        {/* Header */}
        <div className="px-4 h-16  flex items-center justify-between">

          {!collapsed && (
            <h2 className="text-xl font-bold">
              Admin Panel
            </h2>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu size={20}/>
          </button>

        </div>


        {/* Menu */}
        <nav className="p-3 space-y-2">

          {menuItems.map((item)=>{

            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                flex items-center
                gap-3
                rounded-lg
                px-3 py-3
                transition

                ${
                  active
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }

                `}
              >

                <Icon size={20}/>

                {!collapsed && (
                  <span>
                    {item.title}
                  </span>
                )}

              </Link>
            );

          })}

        </nav>

      </aside>
    </>
  );
}