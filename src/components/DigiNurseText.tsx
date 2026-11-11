import { Fragment, type ReactNode } from 'react';

const STYLED_PATTERN = /(AccessAbilities Expo|DigiNurse|Youngest Innovator Award|RoBlaze|Roblaze|Ms\. Fatima Martin)/gi;

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

export function AccessAbilitiesExpo({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline whitespace-nowrap align-baseline ${className}`}
      style={{
        fontFamily: '"Montserrat", sans-serif',
        fontWeight: 800,
        letterSpacing: '-0.03em',
      }}
    >
      <span style={{ color: '#FCB813' }}>Access</span>
      <span style={{ color: '#F26F21' }}>Abilities</span>
      <span style={{ color: '#FCB813' }}> Expo</span>
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
    if (/^accessabilities expo$/i.test(part)) {
      return <AccessAbilitiesExpo key={i} />;
    }

    if (part === 'DigiNurse') {
      return <DigiNurse key={i} />;
    }

    if (/^roblaze$/i.test(part)) {
      return <RoBlaze key={i} />;
    }

    if (/^ms\. fatima martin$/i.test(part)) {
      return (
        <span key={i} className="font-bold">
          {part}
        </span>
      );
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
