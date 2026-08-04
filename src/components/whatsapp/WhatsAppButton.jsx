'use client';

import { MessageCircle } from 'lucide-react';
import { openWhatsApp } from '@/lib/whatsapp';

export default function WhatsAppButton() {
  return (
    <button
      type="button"
      aria-label="Chat on WhatsApp"
      onClick={openWhatsApp}
      className="fixed right-5 bottom-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] p-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <MessageCircle size={22} />

      {/* <span className="hidden font-medium sm:block">
        Chat With Us
      </span> */}
    </button>
  );
}
