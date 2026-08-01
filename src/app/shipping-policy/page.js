import {
  Truck,
  Clock3,
  PackageCheck,
  MapPin,
  Wallet,
  Headphones,
} from 'lucide-react';

export default function ShippingPolicyPage() {
  const sections = [
    {
      icon: Truck,
      title: 'Delivery Service',
      description:
        'ElegantTouch delivers products safely through trusted courier partners. Delivery availability depends on customer location.',
    },

    {
      icon: Clock3,
      title: 'Delivery Time',
      description:
        'Orders are normally delivered within the estimated delivery timeframe provided at checkout. Delivery time may vary due to location and courier delays.',
    },

    {
      icon: PackageCheck,
      title: 'Order Processing',
      description:
        'Orders are processed after successful confirmation. Customers should ensure that all provided information is correct before placing an order.',
    },

    {
      icon: MapPin,
      title: 'Shipping Address',
      description:
        'Customers are responsible for providing accurate delivery details including name, phone number, and complete address.',
    },

    {
      icon: Wallet,
      title: 'Delivery Charges',
      description:
        'Shipping charges are calculated according to order details and delivery location. Charges will be displayed before order confirmation.',
    },

    {
      icon: Headphones,
      title: 'Delivery Support',
      description:
        'For any delivery related issue, customers can contact ElegantTouch customer support.',
    },
  ];

  return <PolicyLayout title="Shipping Policy" sections={sections} />;
}

function PolicyLayout({ title, sections }) {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <section className="bg-gradient-to-r from-[#005b96] to-cyan-500 px-4 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold">{title}</h1>

          <p className="mt-4 max-w-3xl leading-7 text-white/90">
            Learn about ElegantTouch delivery process and shipping
            guidelines.
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
                className="rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#005b96] dark:bg-zinc-800">
                  <Icon size={25} />
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
