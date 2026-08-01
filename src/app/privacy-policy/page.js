import {
  ShieldCheck,
  UserRound,
  Database,
  Lock,
  Cookie,
  Headphones,
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: ShieldCheck,
      title: 'Customer Privacy',
      description:
        'ElegantTouch respects customer privacy and protects personal information provided during shopping.',
    },

    {
      icon: UserRound,
      title: 'Information We Collect',
      description:
        'We may collect customer name, phone number, address, order details, and payment related information required to complete orders.',
    },

    {
      icon: Database,
      title: 'Use Of Information',
      description:
        'Customer information is used for order processing, delivery, customer support, and improving shopping experience.',
    },

    {
      icon: Lock,
      title: 'Data Security',
      description:
        'We take reasonable security measures to protect customer information from unauthorized access.',
    },

    {
      icon: Cookie,
      title: 'Cookies',
      description:
        'ElegantTouch may use cookies to improve website functionality and provide a better user experience.',
    },

    {
      icon: Headphones,
      title: 'Contact Support',
      description:
        'For privacy related questions, customers can contact ElegantTouch support.',
    },
  ];

  return <PolicyLayout title="Privacy Policy" sections={sections} />;
}

function PolicyLayout({ title, sections }) {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <section className="bg-gradient-to-r from-[#005b96] to-cyan-500 px-4 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold">{title}</h1>

          <p className="mt-4 text-white/90">
            Your privacy and security are important to us.
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
