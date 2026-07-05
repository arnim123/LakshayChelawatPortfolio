import { useEffect, useRef, useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import { renderStyledText } from '@/components/DigiNurseText';
import { Trophy, Heart, Mic, Rocket, FileText, Lightbulb } from 'lucide-react';

const milestones = [
  {
    badge: 'AGE 6',
    title: 'The Spark',
    description:
      'Introduced to robotics for the first time. What started as a fun activity quickly became my hobby and eventually my lifelong passion. A single moment that changed everything.',
    icon: Lightbulb,
    side: 'left' as const,
  },
  {
    badge: 'AGE 7',
    title: 'First Innovation: Naaptol 2.0',
    description:
      'Developed Naaptol 2.0, a mobile application designed to encourage healthy living and fitness. My first project proved that young minds can create meaningful solutions.',
    icon: FileText,
    side: 'right' as const,
  },
  {
    badge: '2024',
    title: 'Building the Fire-Fighting Robot RoBlaze',
    description:
      'Embarked on the development of an autonomous fire-fighting robot using Arduino-based technologies. Dedicated months to learning, research, programming, testing, and refining the solution designed to enhance emergency response and help save lives.',
    icon: Rocket,
    side: 'left' as const,
  },
  {
    badge: '2025',
    title: 'Youngest Innovator Award',
    description:
      'Participated in the Fire Safety Forum and was honored to be recognized by His Excellency Dhahi Khalfan Tamim Sir. Received the Youngest Innovator Award and became the youngest - and only - student invited to speak on a stage shared by leading fire safety experts.',
    icon: Trophy,
    side: 'right' as const,
  },
  {
    badge: '2025',
    title: 'Youngest in School Incubation',
    description:
      'Selected as the youngest student for my school\'s incubation program sponsored by Dubai SME. A recognition of the potential to turn innovative ideas into real-world impact.',
    icon: Mic,
    side: 'left' as const,
  },
  {
    badge: '2026',
    title: 'DigiNurse & DHA Presentation',
    description:
      'Developed DigiNurse, a system for continuous patient vital monitoring with real-time updates to nursing staff, and presented it to His Excellency Dr. Alawi Al-Sheikh Ali, Director General of the Dubai Health Authority (DHA).',
    icon: Heart,
    side: 'right' as const,
  },
];

export default function JourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lineVisible, setLineVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [visibleDots, setVisibleDots] = useState<Set<number>>(new Set());

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLineVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    milestones.forEach((_, i) => {
      const cardTimer = setTimeout(() => {
        setVisibleCards((prev) => new Set(prev).add(i));
      }, 400 + i * 200);

      const dotTimer = setTimeout(() => {
        setVisibleDots((prev) => new Set(prev).add(i));
      }, 300 + i * 200);

      timers.push(cardTimer, dotTimer);
    });

    return () => timers.forEach(clearTimeout);
  }, [lineVisible]);

  return (
    <section id="journey" ref={sectionRef} className="bg-navy-light section-padding">
      <div className="container-narrow">
        <SectionHeader
          label="MY JOURNEY"
          heading="A Timeline of Innovation"
          subtext="From curiosity at age 6 to groundbreaking innovation at 11."
          centered
        />

        {/* Timeline */}
        <div className="relative">
          {/* Center Line - Desktop */}
          <div
            className={`hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 timeline-line ${
              lineVisible ? 'visible' : ''
            }`}
            style={{ backgroundColor: 'rgba(212, 175, 55, 0.3)' }}
          />

          {/* Left Line - Mobile/Tablet */}
          <div
            className={`lg:hidden absolute left-6 md:left-10 top-0 bottom-0 w-0.5 timeline-line ${
              lineVisible ? 'visible' : ''
            }`}
            style={{ backgroundColor: 'rgba(212, 175, 55, 0.3)' }}
          />

          {/* Milestones */}
          <div className="flex flex-col" style={{ gap: '0px' }}>
            {milestones.map((milestone, i) => {
              const Icon = milestone.icon;
              const isLeft = milestone.side === 'left';
              const isVisible = visibleCards.has(i);
              const isDotVisible = visibleDots.has(i);

              return (
                <div
                  key={i}
                  className={`relative flex items-start ${
                    isLeft
                      ? 'lg:flex-row'
                      : 'lg:flex-row-reverse'
                  }`}
                  style={i > 0 ? { marginTop: '-60px' } : undefined}
                >
                  {/* Card */}
                  <div
                    className={`ml-14 md:ml-20 lg:ml-0 lg:w-[calc(50%-40px)] transition-all duration-800 ${
                      isVisible
                        ? 'opacity-100 translate-x-0'
                        : isLeft
                        ? 'opacity-0 -translate-x-10'
                        : 'opacity-0 translate-x-10'
                    }`}
                    style={{
                      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <div className="card-pattern p-6 md:p-8">
                      {/* Badge */}
                      <span className="award-badge mb-4 inline-block">
                        {milestone.badge}
                      </span>

                      {/* Title */}
                      <h3 className="font-display text-white flex items-center gap-3 mb-3"
                        style={{
                          fontSize: 'clamp(22px, 3vw, 32px)',
                          lineHeight: 1.1,
                        }}
                      >
                        <Icon size={22} className="text-gold flex-shrink-0" />
                        {renderStyledText(milestone.title)}
                      </h3>

                      {/* Description */}
                      <p
                        className="font-body font-light text-cream-muted"
                        style={{
                          fontSize: 'clamp(14px, 1.2vw, 18px)',
                          lineHeight: 1.7,
                        }}
                      >
                        {renderStyledText(milestone.description)}
                      </p>
                    </div>
                  </div>

                  {/* Center Dot - Desktop */}
                  <div
                    className={`hidden lg:flex absolute left-1/2 -translate-x-1/2 top-8 w-3 h-3 rounded-full border-2 border-navy-light items-center justify-center timeline-dot ${
                      isDotVisible ? 'visible' : ''
                    }`}
                    style={{ backgroundColor: '#D4AF37' }}
                  />

                  {/* Left Dot - Mobile */}
                  <div
                    className={`lg:hidden absolute left-6 md:left-10 -translate-x-1/2 top-8 w-3 h-3 rounded-full border-2 border-navy-light timeline-dot ${
                      isDotVisible ? 'visible' : ''
                    }`}
                    style={{ backgroundColor: '#D4AF37' }}
                  />

                  {/* Connector - Desktop */}
                  <div
                    className={`hidden lg:block absolute top-9 w-10 h-px ${
                      isLeft ? 'left-[calc(50%-40px)]' : 'right-[calc(50%-40px)]'
                    }`}
                    style={{ backgroundColor: 'rgba(212, 175, 55, 0.5)' }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
