import { Mail, MapPin } from 'lucide-react';

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Journey', href: '#journey' },
  { label: 'Projects', href: '#projects' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="bg-navy-light border-t border-gold/20">
      <div
        className="max-w-[1400px] mx-auto"
        style={{ padding: '20px clamp(20px, 4vw, 80px) 0' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {/* Column 1: Brand */}
          <div>
            <h3 className="font-display text-gold text-[28px] mb-2">
              Lakshya Chelawat
            </h3>
            <p className="font-body text-sm text-cream-muted">
              Young Innovator & Robotics Enthusiast
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-[0.15em] text-gold mb-4">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-scroll
                  className="font-body text-[13px] text-cream-muted hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-[0.15em] text-gold mb-4">
              Contact
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-gold flex-shrink-0" />
                <span className="font-body text-[13px] text-cream-muted">
                  lakshya@example.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-gold flex-shrink-0" />
                <span className="font-body text-[13px] text-cream-muted">
                  Dubai, United Arab Emirates
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-cream-dim flex flex-col sm:flex-row justify-between items-center gap-4 pb-0">
          <p className="font-body text-xs text-cream-muted">
            &copy; 2025 Lakshya Chelawat. All Rights Reserved.
          </p>
          <p className="font-body text-xs text-cream-muted">
            Designed with passion
          </p>
        </div>
      </div>
    </footer>
  );
}
