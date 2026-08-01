'use client';

import { useState } from 'react';
import {
  ChevronDown,
  HelpCircle,
  ShoppingBag,
  Truck,
  RotateCcw,
  CreditCard,
} from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      category: 'Orders',
      icon: ShoppingBag,
      questions: [
        {
          q: 'How can I place an order?',
          a: 'You can select your desired product, add it to cart, proceed to checkout, provide your delivery details, and confirm your order.',
        },
        {
          q: 'Can I cancel my order?',
          a: 'Order cancellation depends on the order processing status. Please contact ElegantTouch support as soon as possible.',
        },
        {
          q: 'How can I check my order status?',
          a: 'You can check your order status from your account orders section or contact our support team.',
        },
      ],
    },

    {
      category: 'Shipping',
      icon: Truck,
      questions: [
        {
          q: 'How long does delivery take?',
          a: 'Delivery time depends on your location and courier service availability.',
        },
        {
          q: 'Are delivery charges refundable?',
          a: 'Delivery charges are generally non-refundable. For returns, customers are responsible for delivery charges both ways.',
        },
      ],
    },

    {
      category: 'Returns & Refunds',
      icon: RotateCcw,
      questions: [
        {
          q: 'What is your return policy?',
          a: 'Customers can request a return within 3 days after receiving the order. Products must be unused, unworn, and in original packaging.',
        },
        {
          q: 'What information is required for a return?',
          a: 'Customers should provide order number, purchase details, and images/videos for damaged or wrong products if required.',
        },
        {
          q: 'How will I receive my refund?',
          a: 'For Cash on Delivery orders, approved refunds will be transferred through Easypaisa within 3 days after the returned order is received and verified.',
        },
      ],
    },

    {
      category: 'Payments',
      icon: CreditCard,
      questions: [
        {
          q: 'Which payment methods are available?',
          a: 'ElegantTouch supports Cash on Delivery and available online payment methods.',
        },
        {
          q: 'Is Cash on Delivery available?',
          a: 'Yes, Cash on Delivery is available for eligible locations.',
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      {/* Hero */}

      <section className="bg-gradient-to-r from-[#005b96] to-cyan-500 px-4 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold">
            Frequently Asked Questions
          </h1>

          <p className="mt-3 text-white/90">
            Find answers about orders, delivery, returns and payments.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="space-y-8">
          {faqs.map((section, index) => {
            const Icon = section.icon;

            return (
              <div
                key={index}

                className="rounded-2xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#005b96] dark:bg-zinc-800">
                    <Icon size={20} />
                  </div>

                  <h2 className="text-xl font-bold dark:text-white">
                    {section.category}
                  </h2>
                </div>

                <div className="space-y-3">
                  {section.questions.map((item, i) => (
                    <FAQItem
                      key={i}
                      question={item.q}
                      answer={item.a}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border dark:border-zinc-700">
      <button
        onClick={() => setOpen(!open)}

        className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-gray-50 dark:hover:bg-zinc-800"
      >
        <span className="text-sm font-semibold text-gray-800 dark:text-white">
          {question}
        </span>

        <ChevronDown
          size={18}

          className={`transition-transform ${
            open ? 'rotate-180 text-[#005b96]' : ''
          } `}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        } `}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
