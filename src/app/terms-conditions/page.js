import {
  FileText,
  ShoppingBag,
  CreditCard,
  AlertCircle,
  RefreshCcw,
  Headphones,
} from 'lucide-react';

export default function TermsConditionsPage() {
  const sections = [
    {
      icon: FileText,
      title: 'Acceptance Of Terms',
      description:
        'By using ElegantTouch website and services, customers agree to follow these terms and conditions.',
    },

    {
      icon: ShoppingBag,
      title: 'Orders And Products',
      description:
        'Customers should review product details, prices, and information before placing an order.',
    },

    {
      icon: CreditCard,
      title: 'Payments',
      description:
        'Customers must provide accurate payment and order information. Cash on Delivery availability depends on location.',
    },

    {
      icon: AlertCircle,
      title: 'Product Information',
      description:
        'ElegantTouch tries to provide accurate product descriptions, images, and details. Minor variations may occur.',
    },

    {
      icon: RefreshCcw,
      title: 'Returns And Refunds',
      description:
        'Returns and refunds are processed according to ElegantTouch Return Policy.',
    },

    {
      icon: Headphones,
      title: 'Customer Support',
      description:
        'For questions regarding these terms, customers can contact ElegantTouch support.',
    },
  ];

  return (
    <PolicyLayout title="Terms & Conditions" sections={sections} />
  );
}

function PolicyLayout({ title, sections }) {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <section className="bg-gradient-to-r from-[#005b96] to-cyan-500 px-4 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold">{title}</h1>

          <p className="mt-4 text-white/90">
            Please read these terms before using ElegantTouch
            services.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-2xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#005b96] dark:bg-zinc-800">
                  <Icon />
                </div>

                <h2 className="mb-3 text-xl font-semibold dark:text-white">
                  {item.title}
                </h2>

                <p className="leading-7 text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
