// Navigation
import {
  Home,
  Layers,
  Store,
  Sparkles,
  Tag,
  LayoutDashboard,
  Grid3X3,
  Package,
  ShoppingCart,
  Users,
  Settings,
  ClipboardList,
  UserRound,
  LogOut,
  TicketPercent,
  MonitorPlay,
  Heart,
  ListOrdered,
} from 'lucide-react';

export const dashboardSidebar = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Categories',
    href: '/dashboard/categories',
    icon: Grid3X3,
  },
  {
    title: 'Products',
    href: '/dashboard/products',
    icon: Package,
  },
  {
    title: 'Carts',
    href: '/dashboard/carts',
    icon: ShoppingCart,
  },
  {
    title: 'Orders',
    href: '/dashboard/orders',
    icon: ListOrdered,
  },
  {
    title: 'Coupons',
    href: '/dashboard/coupons',
    icon: TicketPercent,
  },
  {
    title: 'Offers',
    href: '/dashboard/offers',
    icon: Tag,
  },
  {
    title: 'Customers',
    href: '/dashboard/customers',
    icon: Users,
  },
  {
    title: 'Wishlists',
    href: '/dashboard/wishlists',
    icon: Heart,
  },
  {
    title: 'Banners',
    href: '/dashboard/banners',
    icon: MonitorPlay,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
  {
    title: 'Logout',
    href: '#',
    icon: LogOut,
  },
];

export const navLinks = [
  {
    id: 1,
    name: 'Home',
    href: '/',
    icon: Home,
  },
  {
    id: 2,
    name: 'Categories',
    href: '/categories',
    icon: Layers,
  },
  {
    id: 3,
    name: 'Shop',
    href: '/products',
    icon: Store,
  },
  {
    id: 4,
    name: 'New Arrivals',
    href: '/new-arrivals',
    icon: Sparkles,
  },
  {
    id: 5,
    name: 'Offers',
    href: '/offers',
    icon: Tag,
  },
];

export const footerLinks = {
  shop: [
    {
      id: 1,
      name: 'All Products',
      href: '/products',
      title: 'Browse All Products',
    },
    {
      id: 2,
      name: 'New Arrivals',
      href: '/new-arrivals',
      title: 'Latest Baby Accessories',
    },
    {
      id: 3,
      name: 'Shop',
      href: '/products',
      title: 'Shop',
    },
    {
      id: 4,
      name: 'Best Selling',
      href: '/best-selling',
      title: 'Best Selling Products',
    },
    {
      id: 5,
      name: 'Categories',
      href: '/categories',
      title: 'Shop by Category',
    },
  ],

  company: [
    {
      id: 1,
      name: 'About Us',
      href: '/about',
      title: 'About Elegant Touch',
    },
    {
      id: 2,
      name: 'Contact Us',
      href: '/contact',
      title: 'Contact Elegant Touch',
    },
    {
      id: 3,
      name: 'Privacy Policy',
      href: '/privacy-policy',
      title: 'Privacy Policy',
    },
    {
      id: 4,
      name: 'Terms & Conditions',
      href: '/terms',
      title: 'Terms and Conditions',
    },
  ],

  support: [
    {
      id: 1,
      name: 'FAQs',
      href: '/faq',
      title: 'Frequently Asked Questions',
    },
    {
      id: 2,
      name: 'Shipping Information',
      href: '/shipping',
      title: 'Shipping Details',
    },
    {
      id: 3,
      name: 'Return Policy',
      href: '/returns',
      title: 'Return and Exchange Policy',
    },
    {
      id: 4,
      name: 'Track Order',
      href: '/track-order',
      title: 'Track Your Order',
    },
  ],

  social: [
    {
      id: 1,
      name: 'Instagram',
      href: 'https://instagram.com/elegantstouch',
    },
    {
      id: 2,
      name: 'Facebook',
      href: 'https://facebook.com/elegantstouch',
    },
    {
      id: 3,
      name: 'Twitter',
      href: 'https://twitter.com/elegantstouch',
    },
    {
      id: 4,
      name: 'WhatsApp',
      href: 'https://wa.me/',
    },
  ],
};

export const slides = [
  {
    title: 'Baby Princess Collection',
    subtitle: 'New Arrival 2026',
    description: 'Soft & premium accessories for kids',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6ru_AFbX3p4n4EEfHJK1Asv6GQoFMVILq9JZrjn0T3bFsC5OAUWvwqaxr&s=10',
    primaryBtnText: 'Shop Now',
    primaryBtnLink: '/products',
    secondaryBtnText: 'Explore',
    secondaryBtnLink: '/categories',
  },
  {
    title: 'Elegant Hair Clips',
    subtitle: 'Trending Now',
    description: 'Stylish clips for every occasion',
    image:
      'https://bachaaparty.com/cdn/shop/files/IMG_2382_7a832479-3996-4295-b837-38a029214662.jpg?v=1690280546',
    primaryBtnText: 'Buy Now',
    primaryBtnLink: '/products',
    secondaryBtnText: 'View More',
    secondaryBtnLink: '/categories',
  },
  {
    title: 'Luxury Baby Jewellery',
    subtitle: 'Premium Collection',
    description: 'Safe & beautiful jewellery for kids',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbA5vVlw40fYd3e2dUUDh9RtqPm_33Hmd4IgGcf72wpA&s',
    primaryBtnText: 'Shop Collection',
    primaryBtnLink: '/products',
    secondaryBtnText: 'Discover',
    secondaryBtnLink: '/categories',
  },
];

export const metadata = {
  title: 'Best Selling Baby Accessories | Baby Princess',
  description:
    'Shop our best-selling baby girl hair accessories, jewellery, gift sets, and premium fashion essentials.',
};

export const orders = [
  {
    id: 'ORD-1001',
    customer: 'Ali Ahmed',
    email: 'ali@gmail.com',

    products: [
      {
        name: 'Elegant Pearl Hair Band',
        qty: 2,
      },
    ],

    total: 798,
    currency: 'PKR',

    payment: 'Paid',

    status: 'processing',

    createdAt: '2026-07-07',
  },

  {
    id: 'ORD-1002',
    customer: 'Sara Khan',
    email: 'sara@gmail.com',

    products: [
      {
        name: 'Baby Hair Clips',
        qty: 1,
      },
    ],

    total: 499,
    currency: 'PKR',

    payment: 'COD',

    status: 'pending',

    createdAt: '2026-07-07',
  },
];

export const dashboardStats = [
  {
    title: 'Categories',
    key: 'categories',
    icon: Layers,
    gradient: 'bg-gradient-to-br from-blue-100 to-cyan-200',
    link: '/dashboard/categories',
  },
  {
    title: 'Products',
    key: 'products',
    icon: Package,
    gradient: 'bg-gradient-to-br from-green-100 to-emerald-200',
    link: '/dashboard/products',
  },
  {
    title: 'Customers',
    key: 'customers',
    icon: Users,
    gradient: 'bg-gradient-to-br from-purple-100 to-violet-200',
    link: '/dashboard/customers',
  },
  {
    title: 'Orders',
    key: 'orders',
    icon: ClipboardList,
    gradient: 'bg-gradient-to-br from-orange-100 to-amber-200',
    link: '/dashboard/orders',
  },
  {
    title: 'Carts',
    key: 'carts',
    icon: ShoppingCart,
    gradient: 'bg-gradient-to-br from-red-100 to-rose-200',
    link: '/dashboard/carts',
  },
  {
    title: 'Banners',
    key: 'banners',
    icon: MonitorPlay,
    gradient: 'bg-gradient-to-br from-pink-100 to-fuchsia-200',
    link: '/dashboard/banners',
  },
  {
    title: 'Users',
    key: 'users',
    icon: UserRound,
    gradient: 'bg-gradient-to-br from-teal-100 to-lime-200',
    link: '/dashboard/users',
  },
  {
    title: 'Wishlists',
    key: 'wishlists',
    icon: Heart,
    gradient: 'bg-gradient-to-br from-yellow-100 to-orange-200',
    link: '/dashboard/wishlists',
  },
];
