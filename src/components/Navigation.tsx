import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Journey', href: '#journey' },
  { label: 'Projects', href: '#projects' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);

      // Detect active section
      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ${
          scrolled
            ? 'bg-navy/95 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
        style={{ padding: '24px clamp(20px, 4vw, 80px)' }}
      >
        <div className="flex items-center justify-between max-w-[1400px] mx-auto">
          {/* Logo */}
          <a
            href="#"
            data-scroll
            className="font-display font-bold text-sm sm:text-base md:text-lg uppercase tracking-[0.08em] sm:tracking-[0.1em] text-gold hover:text-gold-light transition-colors max-w-[55vw] sm:max-w-none truncate sm:overflow-visible sm:whitespace-normal"
          >
            Lakshya Chelawat
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-scroll
                className={`font-body font-light text-xs uppercase tracking-[0.15em] transition-colors duration-300 pb-1 border-b ${
                  activeSection === link.href.slice(1)
                    ? 'text-gold border-gold'
                    : 'text-cream border-transparent hover:text-gold'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-cream hover:text-gold transition-colors"
            aria-label="Open menu"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-navy transition-all duration-500 md:hidden ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full relative">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-6 right-6 text-cream hover:text-gold transition-colors"
            aria-label="Close menu"
          >
            <X size={28} strokeWidth={2} />
          </button>

          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              data-scroll
              onClick={() => setMobileOpen(false)}
              className="font-display text-white hover:text-gold transition-colors duration-300 py-4"
              style={{
                fontSize: 'clamp(32px, 8vw, 48px)',
                lineHeight: 1.1,
                transitionDelay: mobileOpen ? `${i * 0.05}s` : '0s',
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s`,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
