import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollIndicatorVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover animate-hero-video"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10, 22, 40, 0.5) 0%, rgba(10, 22, 40, 0.7) 60%, rgba(10, 22, 40, 0.95) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20 pb-[15vh]">
        {/* Tagline */}
        <p
          className="hero-anim animate-hero-tagline font-body font-light text-sm uppercase tracking-[0.2em] text-gold mb-6"
        >
          Age is never a barrier to innovation
        </p>

        {/* Name */}
        <h1
          className="hero-anim animate-hero-name font-display text-cream max-w-[900px]"
          style={{
            fontSize: 'clamp(36px, 8vw, 120px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          Lakshya Chelawat
        </h1>

        {/* Subtitle */}
        <p
          className="hero-anim animate-hero-subtitle font-body font-light text-cream-muted mt-4 max-w-[600px]"
          style={{
            fontSize: 'clamp(16px, 1.5vw, 22px)',
            lineHeight: 1.6,
          }}
        >
          Young Innovator | Robotics Enthusiast | Grade 7, Dubai
        </p>

        {/* CTA Buttons */}
        <div className="hero-anim animate-hero-cta flex flex-col sm:flex-row gap-4 sm:gap-5 mt-10">
          <a href="#about" data-scroll className="btn-primary text-center">
            Explore My Journey
          </a>
          <a
            href="#achievements"
            data-scroll
            className="btn-secondary text-center"
          >
            View Achievements
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`hero-anim animate-hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-500 hidden md:block ${
          scrollIndicatorVisible ? '' : 'opacity-0'
        }`}
      >
        <ChevronDown
          size={24}
          className="text-cream-muted animate-scroll-bounce"
        />
      </div>
    </section>
  );
}
