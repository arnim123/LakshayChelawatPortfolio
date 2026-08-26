import { Fragment, type ReactNode } from 'react';

const STYLED_PATTERN = /(DigiNurse|Youngest Innovator Award|RoBlaze|Roblaze)/gi;

function hasStyledPhrases(text: string) {
  return STYLED_PATTERN.test(text);
}

export function DigiNurse({ className = '' }: { className?: string }) {
  return (
    <span className={`font-display italic font-bold ${className}`}>
      <span style={{ color: '#5B7A94' }}>Digi</span>
      <span style={{ color: '#7A9150' }}>Nurse</span>
    </span>
  );
}

export function RoBlaze({ className = '' }: { className?: string }) {
  return (
    <span className={`inline whitespace-nowrap font-display italic align-baseline ${className}`}>
      <span style={{ color: '#C41E3A' }}>Ro</span>
      <span style={{ color: '#E8A317' }}>Blaze</span>
    </span>
  );
}

export function renderStyledText(text: string): ReactNode {
  if (!hasStyledPhrases(text)) {
    return text;
  }

  STYLED_PATTERN.lastIndex = 0;
  const parts = text.split(STYLED_PATTERN);

  return parts.map((part, i) => {
    if (part === 'DigiNurse') {
      return <DigiNurse key={i} />;
    }

    if (/^roblaze$/i.test(part)) {
      return <RoBlaze key={i} />;
    }

    if (part === 'Youngest Innovator Award') {
      return (
        <span
          key={i}
          className="text-gold font-medium"
        >
          {part}
        </span>
      );
    }

    return <Fragment key={i}>{part}</Fragment>;
  });
}
