import { useScrollReveal } from '@/hooks/useScrollReveal';

interface SectionHeaderProps {
  label: string;
  heading: string;
  subtext?: React.ReactNode;
  centered?: boolean;
  subtextSingleLine?: boolean;
  className?: string;
}

export default function SectionHeader({
  label,
  heading,
  subtext,
  centered = false,
  subtextSingleLine = false,
  className = '',
}: SectionHeaderProps) {
  const labelRef = useScrollReveal<HTMLParagraphElement>();
  const headingRef = useScrollReveal<HTMLHeadingElement>();
  const subtextRef = useScrollReveal<HTMLParagraphElement>();

  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''} ${className}`}>
      <p ref={labelRef} className="reveal caption-label mb-4">
        {label}
      </p>
      <h2
        ref={headingRef}
        className="reveal font-display text-white"
        style={{
          fontSize: 'clamp(40px, 5vw, 80px)',
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          transitionDelay: '0.12s',
        }}
      >
        {heading}
      </h2>
      {subtext && (
        <p
          ref={subtextRef}
          className={`reveal mt-4 font-body text-cream-muted ${
            subtextSingleLine ? '' : 'max-w-2xl'
          } ${centered ? 'mx-auto' : ''}`}
          style={{
            fontSize: 'clamp(18px, 1.5vw, 22px)',
            lineHeight: 1.6,
            transitionDelay: '0.24s',
          }}
        >
          {subtext}
        </p>
      )}
    </div>
  );
}
