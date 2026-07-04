import { useScrollReveal } from '@/hooks/useScrollReveal';
import { type ReactNode } from 'react';

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right';
  delay?: string;
  threshold?: number;
}

export default function RevealOnScroll({
  children,
  className = '',
  direction = 'up',
  delay = '0s',
  threshold = 0.15,
}: RevealOnScrollProps) {
  const ref = useScrollReveal<HTMLDivElement>(threshold);

  const revealClass =
    direction === 'up'
      ? 'reveal'
      : direction === 'left'
      ? 'reveal-left'
      : 'reveal-right';

  return (
    <div
      ref={ref}
      className={`${revealClass} ${className}`}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
}
