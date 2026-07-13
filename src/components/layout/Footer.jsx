import { footerLinks } from "@/content/data";
import Link from "next/link";


export default function Footer() {
  return (
    <footer className="bg-app border-t border-secondary mt-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-primary text-xl font-bold">
              Elegant Touch
            </h2>
            <p className="text-textcolor mt-3 text-sm leading-6">
              Premium baby hair accessories & jewellery store.  
              Stylish, soft and safe products for your little ones.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-textcolor font-semibold mb-4">Shop</h3>
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
            <h3 className="text-textcolor font-semibold mb-4">Company</h3>
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
            <h3 className="text-textcolor font-semibold mb-4">Support</h3>
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
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primery mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-textcolor">
            © 2026 Elegant Touch. All rights reserved.
          </p>

          {/* Social Icons (simple placeholders) */}
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-primary text-app transition">
              Instagram
            </a>
            <a href="#" className="hover:text-primary text-app transition">
              Facebook
            </a>
            <a href="#" className="hover:text-primary text-app transition">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}