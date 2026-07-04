/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A1628',
          light: '#111D32',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E8C84B',
        },
        red: {
          accent: '#C41E3A',
        },
        cream: {
          DEFAULT: '#F5F0E8',
          muted: 'rgba(245, 240, 232, 0.6)',
          dim: 'rgba(245, 240, 232, 0.15)',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "hero-fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "hero-slide-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "hero-slide-up-sm": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "hero-slide-up-lg": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scroll-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        "timeline-pop": {
          "0%": { transform: "scale(0)" },
          "70%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
        "ken-burns": {
          from: { transform: "scale(1)" },
          to: { transform: "scale(1.05)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "hero-video": "hero-fade-in 1.2s ease-out forwards",
        "hero-tagline": "hero-slide-up-sm 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards",
        "hero-name": "hero-slide-up-lg 1.0s cubic-bezier(0.16, 1, 0.3, 1) 0.9s forwards",
        "hero-subtitle": "hero-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.2s forwards",
        "hero-cta": "hero-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.5s forwards",
        "hero-scroll": "hero-fade-in 0.6s ease-out 2.0s forwards",
        "scroll-bounce": "scroll-bounce 2s ease-in-out infinite",
        "timeline-pop": "timeline-pop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "ken-burns": "ken-burns 8s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
