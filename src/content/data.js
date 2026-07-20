// Navigation
import {
  Home,
  Layers,
  Flame,
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
  Heart,
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
    title: 'Orders',
    href: '/dashboard/orders',
    icon: ShoppingCart,
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
    name: 'Best Selling',
    href: '/best-selling',
    icon: Flame,
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

// Categories
// export const categories = [
//   {
//     id: "hair-bands",
//     name: "Hair Bands",
//     slug: "hair-bands",
//     image: "/categories/hair-bands.jpg",
//     alt: "Cute Hair Bands for Baby Girls",
//     description: "Premium quality baby girl hair bands suitable for everyday and party wear.",
//     keywords: ["hair bands", "baby hair bands", "girls hair accessories"],
//     status: "active",
//     featured: true,
//     sortOrder: 1,
//     productCount: 25,
//     seoTitle: "Baby Girl Hair Bands Collection",
//     seoDescription: "Shop premium baby girl hair bands online.",
//     createdAt: "2026-07-07",
//     updatedAt: "2026-07-07",
//   },

//   {
//     id: "hair-clips",
//     name: "Hair Clips",
//     slug: "hair-clips",
//     image: "/categories/hair-clips.jpg",
//     alt: "Fashion Hair Clips",
//     description: "Stylish and colorful hair clips designed for girls of all ages.",
//     keywords: ["hair clips", "baby clips", "girls accessories"],
//     status: "active",
//     featured: true,
//     sortOrder: 2,
//     productCount: 40,
//     seoTitle: "Cute Hair Clips Collection",
//     seoDescription: "Beautiful hair clips for baby girls.",
//     createdAt: "2026-07-07",
//     updatedAt: "2026-07-07",
//   },

//   {
//     id: "jewellery",
//     name: "Jewellery",
//     slug: "baby-jewellery",
//     image: "/categories/jewellery.jpg",
//     alt: "Kids Jewellery",
//     description: "Safe and elegant jewellery collection for baby girls.",
//     keywords: ["kids jewellery", "baby jewellery"],
//     status: "active",
//     featured: true,
//     sortOrder: 3,
//     productCount: 35,
//     seoTitle: "Baby Jewellery Collection",
//     seoDescription: "Premium jewellery for kids.",
//     createdAt: "2026-07-07",
//     updatedAt: "2026-07-07",
//   },

//   {
//     id: "gift-sets",
//     name: "Gift Sets",
//     slug: "gift-sets",
//     image: "/categories/gift-sets.jpg",
//     alt: "Baby Gift Sets",
//     description: "Luxury gift sets for birthdays and special occasions.",
//     keywords: ["gift set", "baby gifts"],
//     status: "active",
//     featured: false,
//     sortOrder: 4,
//     productCount: 18,
//     seoTitle: "Baby Gift Sets",
//     seoDescription: "Beautiful gift sets for baby girls.",
//     createdAt: "2026-07-07",
//     updatedAt: "2026-07-07",
//   },

//   {
//     id: "hair-bows",
//     name: "Hair Bows",
//     slug: "hair-bows",
//     image: "/categories/hair-bows.jpg",
//     alt: "Cute Hair Bows",
//     description: "Premium handmade hair bows for girls.",
//     keywords: ["hair bows", "baby bows"],
//     status: "active",
//     featured: false,
//     sortOrder: 5,
//     productCount: 30,
//   },

//   {
//     id: "scrunchies",
//     name: "Scrunchies",
//     slug: "scrunchies",
//     image: "/categories/scrunchies.jpg",
//     alt: "Colorful Scrunchies",
//     description: "Soft and comfortable scrunchies collection.",
//     keywords: ["scrunchies", "hair bands"],
//     status: "active",
//     featured: false,
//     sortOrder: 6,
//     productCount: 22,
//   },

//   {
//     id: "bracelets",
//     name: "Bracelets",
//     slug: "bracelets",
//     image: "/categories/bracelets.jpg",
//     alt: "Kids Bracelets",
//     description: "Beautiful bracelets designed for kids.",
//     keywords: ["kids bracelets", "baby accessories"],
//     status: "inactive",
//     featured: false,
//     sortOrder: 7,
//     productCount: 15,
//   },

//   {
//     id: "necklaces",
//     name: "Necklaces",
//     slug: "necklaces",
//     image: "/categories/necklaces.jpg",
//     alt: "Kids Necklaces",
//     description: "Elegant necklaces for special events.",
//     keywords: ["kids necklace", "baby jewellery"],
//     status: "active",
//     featured: false,
//     sortOrder: 8,
//     productCount: 12,
//   },

//   {
//     id: "hair-combs",
//     name: "Hair Combs",
//     slug: "hair-combs",
//     image: "/categories/hair-combs.jpg",
//     alt: "Baby Hair Combs",
//     description: "Gentle hair combs specially designed for babies.",
//     keywords: ["baby comb", "hair care"],
//     status: "active",
//     featured: false,
//     sortOrder: 9,
//     productCount: 10,
//   },

//   {
//     id: "party-accessories",
//     name: "Party Accessories",
//     slug: "party-accessories",
//     image: "/categories/party-accessories.jpg",
//     alt: "Party Accessories",
//     description: "Cute accessories for birthdays and celebrations.",
//     keywords: ["party accessories", "birthday accessories"],
//     status: "active",
//     featured: true,
//     sortOrder: 10,
//     productCount: 28,
//   },
// ];

// Featured Products
// export const products = [
//   {
//     id: 101,
//     sku: "HB-001",
//     name: "Elegant Pearl Hair Band",
//     slug: "elegant-pearl-hair-band",

//     categoryId: "hair-bands",
//     category: "Hair Bands",

//     brand: "Baby Princess",
//     collection: "Luxury Collection",

//     price: 499,
//     salePrice: 399,
//     currency: "PKR",

//     image: "/products/hair-band-1.jpg",

//     images: [
//       "/products/hair-band-1.jpg",
//       "/products/hair-band-1-2.jpg",
//       "/products/hair-band-1-3.jpg",
//     ],

//     stock: 25,
//     inStock: true,

//     rating: 4.9,
//     reviews: 56,

//     badge: "Best Seller",

//     shortDescription: "Soft pearl hair band for baby girls.",

//     description:
//       "Premium quality pearl hair band made with soft elastic for maximum comfort. Perfect for birthdays, weddings and everyday use.",

//     features: ["Premium Fabric", "Soft Elastic", "Light Weight", "Comfortable"],

//     specifications: {
//       material: "Cotton + Pearl",
//       color: "Pink",
//       ageGroup: "0-8 Years",
//       weight: "45g",
//     },

//     tags: ["hair band", "baby girl", "party wear", "premium"],

//     seo: {
//       title: "Elegant Pearl Hair Band | Baby Princess Pakistan",
//       description:
//         "Buy premium pearl hair band for baby girls in Pakistan with fast delivery.",
//       keywords: [
//         "baby hair band",
//         "girls hair accessories",
//         "pearl hair band",
//         "hair bands pakistan",
//       ],
//     },
//   },

//   {
//     id: 102,
//     sku: "HC-001",
//     name: "Golden Butterfly Hair Clips",
//     slug: "golden-butterfly-hair-clips",

//     categoryId: "hair-clips",
//     category: "Hair Clips",

//     brand: "Baby Princess",

//     price: 699,
//     salePrice: 599,

//     currency: "PKR",

//     image: "/products/clip-1.jpg",

//     stock: 30,

//     rating: 4.8,

//     reviews: 41,

//     badge: "Trending",

//     shortDescription: "Golden butterfly clips set for girls.",

//     description: "Beautiful butterfly clips with premium finishing for kids.",

//     features: ["Premium Finish", "Strong Grip", "Light Weight"],

//     specifications: {
//       material: "Metal",
//       color: "Golden",
//       ageGroup: "2-12 Years",
//     },

//     seo: {
//       title: "Golden Butterfly Hair Clips Pakistan",
//       description: "Stylish butterfly clips for girls at affordable prices.",
//       keywords: ["hair clips", "butterfly clips", "baby clips"],
//     },
//   },

//   {
//     id: 103,
//     sku: "JW-001",
//     name: "Princess Jewellery Box",
//     slug: "princess-jewellery-box",

//     categoryId: "jewellery",
//     category: "Jewellery",

//     brand: "Baby Princess",

//     price: 1499,

//     currency: "PKR",

//     image: "/products/jewellery.jpg",

//     stock: 15,

//     rating: 5,

//     reviews: 19,

//     badge: "Premium",

//     createdAt:"2026-06-25",

//     description: "Luxury jewellery box with matching accessories.",

//     seo: {
//       title: "Princess Jewellery Box Pakistan",
//       description: "Premium jewellery gift box for baby girls.",
//       keywords: ["kids jewellery", "gift box", "baby jewellery"],
//     },
//   },

//   {
//     id: 104,
//     sku: "GS-001",
//     name: "Luxury Gift Combo",
//     slug: "luxury-gift-combo",

//     categoryId: "gift-sets",
//     category: "Gift Sets",

//     brand: "Baby Princess",

//     price: 999,

//     salePrice: 849,

//     currency: "PKR",

//     image: "/products/gift-set.jpg",

//     stock: 20,

//     rating: 4.7,

//     reviews: 33,

//     isNew:true,

//     badge: "New Arrival",

//     createdAt:"2026-07-01",

//     description: "Luxury gift combo including clips, hair band and jewellery.",

//     seo: {
//       title: "Luxury Baby Gift Set Pakistan",
//       description: "Beautiful gift combo for birthdays and baby showers.",
//       keywords: ["baby gift", "gift set", "girls accessories"],
//     },
//   },
// ];

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
      name: 'Best Selling',
      href: '/best-selling',
      title: 'Best Selling Products',
    },
    {
      id: 4,
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
      title: 'Learn About Our Brand',
    },
    {
      id: 2,
      name: 'Contact Us',
      href: '/contact',
      title: 'Get in Touch',
    },
    {
      id: 3,
      name: 'Our Blog',
      href: '/blog',
      title: 'Baby Fashion & Parenting Tips',
    },
    {
      id: 4,
      name: 'Careers',
      href: '/careers',
      title: 'Join Our Team',
    },
  ],

  support: [
    {
      id: 1,
      name: 'FAQ',
      href: '/faq',
      title: 'Frequently Asked Questions',
    },
    {
      id: 2,
      name: 'Shipping Policy',
      href: '/shipping',
      title: 'Shipping Information',
    },
    {
      id: 3,
      name: 'Return & Refund',
      href: '/returns',
      title: 'Returns and Refund Policy',
    },
    {
      id: 4,
      name: 'Privacy Policy',
      href: '/privacy-policy',
      title: 'Privacy Policy',
    },
    {
      id: 5,
      name: 'Terms & Conditions',
      href: '/terms-and-conditions',
      title: 'Terms and Conditions',
    },
    {
      id: 6,
      name: 'Help Center',
      href: '/help',
      title: 'Customer Support',
    },
  ],

  social: [
    {
      id: 1,
      name: 'Facebook',
      href: 'https://facebook.com/yourpage',
      external: true,
    },
    {
      id: 2,
      name: 'Instagram',
      href: 'https://instagram.com/yourpage',
      external: true,
    },
    {
      id: 3,
      name: 'TikTok',
      href: 'https://tiktok.com/@yourpage',
      external: true,
    },
    {
      id: 4,
      name: 'WhatsApp',
      href: 'https://wa.me/923001234567',
      external: true,
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
    gradient: 'bg-gradient-to-br from-blue-100 to-blue-200',
    link: '/dashboard/categories',
  },
  {
    title: 'Products',
    key: 'products',
    icon: Package,
    gradient: 'bg-gradient-to-br from-green-100 to-green-200',
    link: '/dashboard/products',
  },
  {
    title: 'Customers',
    key: 'customers',
    icon: Users,
    gradient: 'bg-gradient-to-br from-purple-100 to-purple-200',
    link: '/dashboard/customers',
  },
  {
    title: 'Orders',
    key: 'orders',
    icon: ClipboardList,
    gradient: 'bg-gradient-to-br from-orange-100 to-orange-200',
    link: '/dashboard/orders',
  },
  {
    title: 'Carts',
    key: 'carts',
    icon: ShoppingCart,
    gradient: 'bg-gradient-to-br from-orange-100 to-orange-200',
    link: '/dashboard/carts',
  },
  {
    title: 'Users',
    key: 'users',
    icon: UserRound,
    gradient: 'bg-gradient-to-br from-red-100 to-red-200',
    link: '/dashboard/users',
  },
  {
    title: 'Wishlists',
    key: 'wishlists',
    icon: Heart,
    gradient: 'bg-gradient-to-br from-red-100 to-red-200',
    link: '/dashboard/wishlists',
  },
];
