import SectionHeader from '@/components/SectionHeader';
import RevealOnScroll from '@/components/RevealOnScroll';
import WhatsAppIcon, { WHATSAPP_NUMBER, WHATSAPP_URL } from '@/components/WhatsAppIcon';
import { Mail } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="bg-navy pt-24 lg:pt-32 pb-16 lg:pb-24 section-padding-x">
      <div className="container-narrow">
        <SectionHeader
          label="GET IN TOUCH"
          heading="Let's Connect"
          subtext="Whether it's a collaboration, speaking opportunity, or just to say hello - I'd love to hear from you."
          centered
        />

        <RevealOnScroll className="text-center">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-14">
            <div className="flex flex-col items-center gap-2">
              <Mail size={20} className="text-gold" />
              <span className="caption-label">Email</span>
              <span className="font-body text-base text-cream">
                lakshya@example.com
              </span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <WhatsAppIcon className="w-5 h-5 text-gold" />
              <span className="caption-label">WhatsApp</span>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-base text-cream hover:text-gold transition-colors duration-300"
              >
                {WHATSAPP_NUMBER}
              </a>
            </div>
          </div>

          <p
            className="font-body font-light text-cream-muted mt-10 mb-0"
            style={{ fontSize: '16px', lineHeight: 1.7 }}
          >
            Follow my journey of innovation and discovery.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay="0.3s" className="mt-16">
          <blockquote className="text-center m-0">
            <p
              className="font-display italic text-gold px-2"
              style={{
                fontSize: 'clamp(24px, 3vw, 36px)',
                lineHeight: 1.3,
              }}
            >
              "I believe age is never a barrier to innovation."
            </p>
            <cite className="font-body text-sm text-cream-muted mt-3 block not-italic">
              - Lakshya Chelawat
            </cite>
          </blockquote>
        </RevealOnScroll>
      </div>
    </section>
  );
}
