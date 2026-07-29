// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import {
//   Menu,
//   X,
//   Search,
//   Heart,
//   ShoppingCart,
//   ChevronDown,
// } from 'lucide-react';

// import { navLinks } from '@/content/data';
// import { useRouter, usePathname } from 'next/navigation';

// import { useCart } from '@/context/CartContext';
// import { useWishlist } from '@/context/WishlistContext';

// import Image from 'next/image';
// import axios from 'axios';

// export default function Header() {
//   const router = useRouter();
//   const pathname = usePathname();

//   const { cartCount } = useCart();
//   const { wishlistCount } = useWishlist();

//   const searchRef = useRef(null);

//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);

//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   const [categories, setCategories] = useState([]);

//   // Fetch Categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const { data } = await axios.get('/api/categories/dropdown');

//         if (data.success) {
//           setCategories(data.data);
//         }
//       } catch (error) {
//         console.log('HEADER CATEGORY ERROR:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // Outside Click Search
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         searchRef.current &&
//         !searchRef.current.contains(event.target)
//       ) {
//         setSearchOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleSearch = () => {
//     const query = searchQuery.trim();

//     if (!query) return;

//     router.push(`/products?search=${encodeURIComponent(query)}`);

//     setSearchOpen(false);
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-white/80 shadow-sm backdrop-blur-3xl dark:bg-zinc-950/80">
//       <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
//         {/* LOGO */}

//         <Link
//           href="/dashboard"
//           className="relative block h-10 w-24 md:h-12 md:w-36"
//         >
//           <Image
//             src="/images/logo2.png"
//             alt="Elegants Touch"
//             fill
//             sizes="150px"
//             className="object-contain"
//             priority
//           />
//         </Link>

//         {/* DESKTOP NAV */}

//         <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
//           {navLinks.map((link) => {
//             const Icon = link.icon;

//             const isCategory = link.name === 'Categories';

//             const active = pathname === link.href;

//             return (
//               <div key={link.name} className="group relative">
//                 <Link
//                   href={isCategory ? '#' : link.href}

//                   className={`relative flex flex-col items-center gap-1 transition ${
//                     active
//                       ? 'text-primary'
//                       : 'text-textcolor hover:text-primary'
//                   } `}
//                 >
//                   <Icon
//                     size={17}
//                     className="group-hover:text-primary text-gray-500 transition group-hover:-translate-y-1"
//                   />

//                   <span>{link.name}</span>

//                   <span
//                     className={`bg-primary absolute -bottom-1 h-0.5 w-full transition-transform ${
//                       active
//                         ? 'scale-x-100'
//                         : 'scale-x-0 group-hover:scale-x-100'
//                     } `}
//                   />
//                 </Link>

//                 {/* CATEGORY DROPDOWN */}

//                 {isCategory && (
//                   <div className="invisible absolute top-full left-0 z-50 w-64 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
//                     <div className="rounded-xl border border-gray-100 bg-white px-2 py-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
//                       {categories.length ? (
//                         categories.map((category) => (
//                           <Link
//                             key={category._id}
//                             href={`/categories/${category._id}`}
//                             className="hover:text-primary block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-zinc-800"
//                           >
//                             {category.name}
//                           </Link>
//                         ))
//                       ) : (
//                         <p className="px-4 py-3 text-sm text-gray-400">
//                           No Categories
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </nav>

//         {/* Right Icons */}
//         <div className="text-textcolor flex items-center gap-4">
//           {/* Search */}
//           {/* <div ref={searchRef} className="relative"> */}
//           <div ref={searchRef}>
//             {/* Desktop Search */}
//             <div className="relative hidden lg:block">
//               {!searchOpen ? (
//                 <button
//                   type="button"
//                   onClick={() => setSearchOpen(true)}
//                   className="group hover:text-primary cursor-pointer transition"
//                 >
//                   <Search
//                     size={20}
//                     className="hover:text-primary mt-2 cursor-pointer transition-transform duration-300 group-hover:scale-125"
//                   />
//                 </button>
//               ) : (
//                 <div className="absolute -top-4.5 -right-2.5 flex h-10 w-64 items-center rounded-xl border border-gray-400 bg-white shadow-sm">
//                   <input
//                     autoFocus
//                     type="text"
//                     value={searchQuery}
//                     placeholder="Search..."
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="flex-1 bg-white px-3 outline-none"
//                   />

//                   <button onClick={handleSearch} className="mr-3">
//                     <Search size={20} />
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Mobile Search Icon */}
//             <button
//               type="button"
//               onClick={() => setSearchOpen(!searchOpen)}
//               className="hover:text-primary lg:hidden"
//             >
//               <Search size={20} />
//             </button>

//             {/* Wishlist */}
//             <button
//               type="button"
//               onClick={() => router.push('/wishlists')}
//               className={`group hover:text-primary relative cursor-pointer transition ${
//                 pathname === '/wish' ? 'text-primary' : ''
//               }`}
//             >
//               <div className="relative">
//                 <Heart
//                   size={20}
//                   fill={
//                     pathname === '/wish' ? 'currentColor' : 'none'
//                   }
//                   className="cursor-pointer transition-transform duration-300 group-hover:scale-125"
//                 />

//                 {wishlistCount >= 0 && (
//                   <span className="bg-primary absolute -top-2.5 -right-2.5 flex h-4.5 w-4.5 items-center justify-center rounded-full pt-[2px] pl-[0.5px] text-[10px] leading-none font-bold">
//                     {wishlistCount}
//                   </span>
//                 )}
//               </div>
//             </button>

//             {/* Cart */}
//             <button
//               type="button"
//               onClick={() => router.push('/carts')}
//               className={`group hover:text-primary relative cursor-pointer transition ${
//                 pathname === '/cart' ? 'text-primary' : ''
//               }`}
//             >
//               <div className="relative">
//                 <ShoppingCart
//                   size={20}
//                   fill={
//                     pathname === '/cart' ? 'currentColor' : 'none'
//                   }
//                   className="transition-transform duration-300 group-hover:scale-125"
//                 />

//                 {cartCount >= 0 && (
//                   <span className="bg-primary absolute -top-2.5 -right-2.5 flex h-4.5 w-4.5 items-center justify-center rounded-full pt-[2px] pl-[0.5px] text-[10px] leading-none font-semibold text-gray-600">
//                     {cartCount}
//                   </span>
//                 )}
//               </div>
//             </button>

//             <button
//               type="button"
//               onClick={() => setMobileOpen((prev) => !prev)}
//               className="hover:text-primary relative z-50 transition lg:hidden"
//             >
//               {mobileOpen ? <X size={22} /> : <Menu size={22} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Search Box */}

//       {searchOpen && (
//         <div className="border-t bg-white px-4 py-3 lg:hidden">
//           <div className="flex h-10 items-center rounded-xl border bg-white shadow">
//             <input
//               autoFocus
//               type="text"
//               value={searchQuery}
//               placeholder="Search products..."
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') {
//                   handleSearch();
//                 }
//               }}
//               className="flex-1 px-3 outline-none"
//             />

//             <button onClick={handleSearch} className="mr-3">
//               <Search size={20} />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Mobile Menu */}
//       <div
//         className={`border-primary bg-app overflow-hidden border-t transition-all duration-500 ease-in-out lg:hidden ${
//           mobileOpen
//             ? 'pointer-events-auto max-h-96 opacity-100'
//             : 'pointer-events-none max-h-0 opacity-0'
//         }`}
//       >
//         <nav className="text-app flex flex-col gap-4 px-4 py-4">
//           {navLinks.map((link, index) => {
//             const LinkIcon = link.icon;

//             return (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 onClick={() => setMobileOpen(false)}
//                 className={`group hover:text-primary flex items-center gap-3 transition-all duration-500 ${
//                   mobileOpen
//                     ? 'translate-x-0 opacity-100'
//                     : '-translate-x-8 opacity-0'
//                 }`}
//                 style={{
//                   transitionDelay: `${index * 100}ms`,
//                 }}
//               >
//                 <LinkIcon
//                   size={20}
//                   className="transition-transform duration-300 group-hover:scale-125"
//                 />

//                 <span>{link.name}</span>
//               </Link>
//             );
//           })}
//         </nav>
//       </div>
//     </header>
//   );
// }

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Heart, ShoppingCart } from 'lucide-react';
import { navLinks } from '@/content/data';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import Image from 'next/image';

export default function Header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);
  const pathname = usePathname();

  const handleSearch = () => {
    const query = searchQuery.trim();
    console.log('query==>', query);
    if (!query) return;

    router.push(`/products?search=${encodeURIComponent(query)}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 shadow-sm backdrop-blur-3xl">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 md:min-h-16 lg:px-8">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="relative block h-10 w-24 md:h-12 md:w-36"
        >
          <Image
            src="/images/logo2.png"
            alt="Elegants Touch"
            fill
            sizes="(max-width: 768px) 144px, 176px"
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="text-textcolor hidden h-full items-center gap-8 text-sm font-medium lg:flex">
          {navLinks.map((link) => {
            const LinkIcon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`group relative inline-flex flex-col items-center justify-center gap-1 transition ${
                  isActive
                    ? 'text-primary'
                    : 'text-textcolor hover:text-primary'
                }`}
              >
                <LinkIcon
                  size={17}
                  className={`transition-all duration-300 ${
                    isActive
                      ? 'text-primary'
                      : 'group-hover:text-primary text-gray-500 group-hover:-translate-y-1'
                  }`}
                />

                <span
                  className={isActive ? 'font-bold' : 'font-medium'}
                >
                  {link.name}
                </span>

                {/* Active underline + Hover underline */}
                <span
                  className={`bg-primary absolute -bottom-1 left-0 h-0.5 w-full transition-transform duration-300 ${
                    isActive
                      ? 'scale-x-100'
                      : 'origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right Icons */}
        <div className="text-textcolor flex items-center gap-4">
          {/* Search */}
          <div ref={searchRef} className="relative">
            {/* Desktop Search */}
            <div className="relative hidden lg:block">
              {!searchOpen ? (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="group hover:text-primary cursor-pointer transition"
                >
                  <Search
                    size={20}
                    className="hover:text-primary mt-2 cursor-pointer transition-transform duration-300 group-hover:scale-125"
                  />
                </button>
              ) : (
                <div className="absolute -top-4.5 -right-2.5 flex h-10 w-64 items-center rounded-xl border border-gray-400 bg-white shadow-sm">
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    placeholder="Search..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-white px-3 outline-none"
                  />

                  <button onClick={handleSearch} className="mr-3">
                    <Search size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Search Icon */}
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            className="hover:text-primary lg:hidden"
          >
            <Search size={20} />
          </button>

          {/* Wishlist */}
          <button
            type="button"
            onClick={() => router.push('/wishlists')}
            className="group hover:text-primary relative cursor-pointer transition"
          >
            <div className="relative">
              <Heart
                size={20}
                fill={
                  pathname === '/wishlists'
                    ? 'var(--primary)'
                    : 'none'
                }
                stroke="black"
                className="cursor-pointer transition-transform duration-300 group-hover:scale-125"
              />

              {wishlistCount >= 0 && (
                <span className="bg-primary absolute -top-2.5 -right-2.5 flex h-4.5 w-4.5 items-center justify-center rounded-full pt-[2px] pl-[0.5px] text-[10px] leading-none font-bold text-black">
                  {wishlistCount}
                </span>
              )}
            </div>
          </button>

          {/* Cart */}
          <button
            type="button"
            onClick={() => router.push('/carts')}
            className="group hover:text-primary relative cursor-pointer transition"
          >
            <div className="relative">
              <ShoppingCart
                size={20}
                fill={
                  pathname === '/carts' ? 'var(--primary)' : 'none'
                }
                stroke="black"
                className="cursor-pointer transition-transform duration-300 group-hover:scale-125"
              />

              {cartCount >= 0 && (
                <span className="bg-primary absolute  -top-2.5 -right-2.5 flex h-4.5 w-4.5 items-center justify-center rounded-full pt-[2px] pl-[0.5px] text-[10px] leading-none font-semibold text-black">
                  {cartCount}
                </span>
              )}
            </div>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="hover:text-primary relative z-50 transition lg:hidden"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Search Box */}

      {searchOpen && (
        <div className="border-t bg-white px-4 py-3 lg:hidden">
          <div className="flex h-10 items-center rounded-xl border bg-white shadow">
            <input
              autoFocus
              type="text"
              value={searchQuery}
              placeholder="Search products..."
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              className="flex-1 px-3 outline-none"
            />

            <button onClick={handleSearch} className="mr-3">
              <Search size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <div
        className={`border-primary bg-app overflow-hidden border-t transition-all duration-500 ease-in-out lg:hidden ${
          mobileOpen
            ? 'pointer-events-auto max-h-96 opacity-100'
            : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <nav className="text-app flex flex-col gap-4 px-4 py-4">
          {navLinks.map((link, index) => {
            const LinkIcon = link.icon;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`group hover:text-primary flex items-center gap-3 transition-all duration-500 ${
                  mobileOpen
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-8 opacity-0'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <LinkIcon
                  size={20}
                  className="transition-transform duration-300 group-hover:scale-125"
                />

                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
