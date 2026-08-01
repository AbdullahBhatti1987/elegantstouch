import {
  Clock3,
  PackageCheck,
  Ban,
  Truck,
  MessageCircle,
  Wallet,
  ImagePlus,
  RotateCcw,
  ShieldCheck,
  Headphones,
} from 'lucide-react';

export default function ReturnPolicyPage() {
  const sections = [
    {
      icon: Clock3,
      title: 'Return Time Period',
      description:
        'Customers can request a return within 3 days of receiving their order. Return requests after this period will not be accepted.',
    },

    {
      icon: ShieldCheck,
      title: 'Return Eligibility',
      description:
        'Products must be unused, unworn, in original packaging, and include tags and accessories (if applicable). Products should not be washed, altered, or damaged.',
    },

    {
      icon: PackageCheck,
      title: 'Required Information',
      description:
        'Customers must provide order number, purchase details, return reason, and images/videos for damaged or wrong products when required.',
    },

    {
      icon: RotateCcw,
      title: 'Return Process',
      description:
        'Open My Orders, select the product, submit a return request, provide required details, wait for approval, and send the product back after confirmation.',
    },

    {
      icon: Truck,
      title: 'Return Delivery Charges',
      description:
        'For approved returns, customers are responsible for both original delivery charges and return shipping charges.',
    },

    {
      icon: MessageCircle,
      title: 'WhatsApp Return Notification',
      description:
        'After submitting a return request, customers must inform ElegantTouch support through WhatsApp with order number, customer name, product details, reason, and images/videos if required.',
    },

    {
      icon: Wallet,
      title: 'Refund Policy',
      description:
        'For Cash on Delivery orders, refunds will be transferred through EasyPaisa after the returned product is received and verified.',
    },

    {
      icon: Clock3,
      title: 'Refund Processing Time',
      description:
        'After successful inspection of the returned product, refunds will be processed within 3 working days.',
    },

    {
      icon: Ban,
      title: 'Non Returnable Conditions',
      description:
        'Returns will not be accepted for used, worn, washed, altered, damaged products, missing packaging, missing tags, or requests submitted after 3 days.',
    },

    {
      icon: ImagePlus,
      title: 'Damaged or Wrong Product',
      description:
        'If you receive a damaged or incorrect product, contact ElegantTouch support immediately and provide clear images/videos as proof.',
    },

    {
      icon: RotateCcw,
      title: 'Exchange Policy',
      description:
        'Exchange requests are reviewed according to product availability and approval conditions.',
    },

    {
      icon: Headphones,
      title: 'Customer Support',
      description:
        'For any return or refund related questions, please contact ElegantTouch customer support.',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      {/* Header */}

      <section className="bg-gradient-to-r from-[#005b96] to-cyan-500 px-4 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3">
            <PackageCheck size={40} />

            <h1 className="text-4xl font-bold">Return Policy</h1>
          </div>

          <p className="mt-4 max-w-3xl leading-7 text-white/90">
            At ElegantTouch, we want our customers to have a smooth
            shopping experience. Please review our return and refund
            guidelines before submitting a request.
          </p>
        </div>
      </section>

      {/* Cards */}

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#005b96] dark:bg-zinc-800">
                  <Icon size={25} />
                </div>

                <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h2>

                <p className="leading-7 text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Important Note */}

        <div className="mt-10 rounded-2xl border bg-blue-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-2 text-lg font-bold dark:text-white">
            Important Note
          </h3>

          <p className="leading-7 text-gray-600 dark:text-gray-300">
            Return approval depends on product condition and
            verification. ElegantTouch reserves the right to reject
            returns that do not meet the return policy requirements.
          </p>
        </div>
      </section>
    </main>
  );
}
