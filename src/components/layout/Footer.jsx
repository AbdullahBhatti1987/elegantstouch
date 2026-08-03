import { footerLinks } from '@/content/data';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-secondary mb-16 border-t-2 border-gray-300 lg:mb-0">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-6">
          {/* Brand - 1 column */}
          {/* Brand - 1 column */}
          <div className="md:col-span-2">
            <h2 className="text-primary text-xl font-bold">
              Elegant Touch
            </h2>

            <p className="text-textcolor mt-3 text-sm leading-6">
              Premium baby hair accessories & jewellery store.
              Stylish, soft and safe products for your little ones.
            </p>

            {/* Newsletter Subscription */}
            <div className="bg-secondary/10 mt-4 rounded-xl border border-gray-400 p-4">
              <h3 className="text-textcolor mb-2 text-sm font-semibold">
                Subscribe to our newsletter
              </h3>

              <p className="text-textcolor/80 mb-4 text-xs leading-5">
                Get updates about new arrivals, special offers and
                exclusive deals.
              </p>

              <form className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="text-textcolor focus:border-primary focus:ring-primary/20 h-11 w-full rounded-lg border border-gray-300 bg-white px-4 pr-28 text-sm transition outline-none focus:ring-2"
                />

                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 absolute top-1.5 right-1.5 h-8 rounded-md px-4 text-xs font-medium text-white transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Remaining 4 columns */}
          <div className="grid grid-cols-2 gap-8 md:col-span-4 md:grid-cols-4">
            {/* Shop */}
            <div>
              <h3 className="text-textcolor mb-4 font-semibold">
                Shop
              </h3>

              <ul className="space-y-2 text-sm">
                {footerLinks.shop.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-textcolor group hover:text-primary relative inline-flex transition-all duration-300 hover:translate-x-1"
                    >
                      {item.name}

                      <span className="bg-primary absolute -bottom-1 left-0 h-0.5 w-full origin-right scale-x-0 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-textcolor mb-4 font-semibold">
                Company
              </h3>

              <ul className="space-y-2 text-sm">
                {footerLinks.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-textcolor group hover:text-primary relative inline-flex transition-all duration-300 hover:translate-x-1"
                    >
                      {item.name}

                      <span className="bg-primary absolute -bottom-1 left-0 h-0.5 w-full origin-right scale-x-0 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-textcolor mb-4 font-semibold">
                Support
              </h3>

              <ul className="space-y-2 text-sm">
                {footerLinks.support.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-textcolor group hover:text-primary relative inline-flex transition-all duration-300 hover:translate-x-1"
                    >
                      {item.name}

                      <span className="bg-primary absolute -bottom-1 left-0 h-0.5 w-full origin-right scale-x-0 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            {/* Social */}
            <div>
              <h3 className="text-textcolor mb-4 font-semibold">
                Follow Us
              </h3>

              <div className="flex flex-col gap-3">
                {footerLinks.social.map((item) => {
                  const SocialIcon = item.icon;

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      className="text-textcolor group hover:text-primary relative flex items-center gap-3 transition-all duration-300"
                    >
                      <SocialIcon
                        size={18}
                        className="transition-transform duration-300 group-hover:-translate-y-1"
                      />

                      <span>{item.name}</span>

                      <span className="bg-primary absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="border-primery shadow-inside-sm my-5 flex items-center gap-4 border-t-2 border-gray-300 pt-6 md:flex-row">
        <p className="text-textcolor w-full text-center text-sm">
          © 2026 Elegant Touch. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
