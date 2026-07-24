import { footerLinks } from '@/content/data';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-secondary mt-16 border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-6">
          {/* Brand - 1 column */}
          <div className="md:col-span-2">
            <h2 className="text-primary text-xl font-bold">
              Elegant Touch
            </h2>

            <p className="text-textcolor mt-3 text-sm leading-6">
              Premium baby hair accessories & jewellery store.
              Stylish, soft and safe products for your little ones.
            </p>
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
                      className="text-textcolor hover:text-primary transition"
                    >
                      {item.name}
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
                      className="text-textcolor hover:text-primary transition"
                    >
                      {item.name}
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
                      className="text-textcolor hover:text-primary transition"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-textcolor mb-4 font-semibold">
                Follow Us
              </h3>

              <div className="flex flex-col gap-2 text-sm">
                {footerLinks.social.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    className="text-textcolor hover:text-primary transition"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="border-primery mt-10 flex items-center gap-4 border-t pt-6 md:flex-row">
          <p className="text-textcolor text-center text-sm w-full">
            © 2026 Elegant Touch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
