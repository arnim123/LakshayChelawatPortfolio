import WhatsAppIcon from '@/components/WhatsAppIcon';
import { WHATSAPP_NUMBER, WHATSAPP_URL } from '@/constants/contact';

export default function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat on WhatsApp at ${WHATSAPP_NUMBER}`}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition-transform duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
