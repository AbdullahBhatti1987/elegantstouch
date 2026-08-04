import {
  WHATSAPP_NUMBER,
  WHATSAPP_DEFAULT_MESSAGE,
} from '@/constants/whatsapp';

export function openWhatsApp() {
  if (typeof window === 'undefined') return;

  const message = encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE);

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  window.open(url, '_blank', 'noopener,noreferrer');
}
