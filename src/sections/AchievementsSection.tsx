import { useEffect, useRef, useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import RevealOnScroll from '@/components/RevealOnScroll';
import { renderStyledText } from '@/components/DigiNurseText';

type CodingAchievement = {
  image: string;
  year: string;
  title: string;
  awardedBy: string;
  description: string;
  badge: string;
  fullImage?: boolean;
};

type OtherAchievement = {
  image: string;
  title: string;
  items: string[];
  badge: string;
};

const codingAchievements: CodingAchievement[] = [
  {
    image: '/images/youngest-innovator-award.jpg',
    year: '2025',
    title: 'Youngest Innovator Award',
    awardedBy: '',
    description:
      'Recognized at the Fire Safety Forum 2025 for developing an autonomous fire-fighting robot. The youngest recipient of this prestigious honor.',
    badge: '🏆 AWARD',
  },
  {
    image: '/images/dhahi-khalfan-recognition.jpg',
    year: '2025',
    title: 'Recognized by His Excellency Lt. Gen. Dhahi Khalfan Tamim',
    awardedBy: '',
    description:
      'Honored to be recognized by His Excellency Lt. Gen. Dhahi Khalfan Tamim Sir for contributions to fire safety innovation and technology at a young age.',
    badge: '🤝 RECOGNITION',
  },
  {
    image: '/images/rashid-thani.png',
    year: '2025',
    title: 'Applauded by His Excellency Lt. Gen. Rashid Thani Al Matrooshi',
    awardedBy: '',
    description:
      'Had the privilege of presenting my project to His Excellency Lt. Gen. Rashid Thani Al Matrooshi Sir who applauded me for my dedication to innovation and community impact.',
    badge: '🤝 RECOGNITION',
  },
  {
    image: '/images/achievement-diginurse.jpg',
    year: '2026',
    title: 'DigiNurse Presented to His Excellency Dr. Alawi Al-Sheikh Ali - Director General',
    awardedBy: 'Dubai Health Authority',
    description:
      'The DigiNurse healthcare monitoring device was presented to His Excellency Dr. Alawi Al-Sheikh Ali, Director General of the Dubai Health Authority. The innovation was highly commended for its potential to enhance patient monitoring and transform healthcare delivery.',
    badge: '🏥 HEALTHCARE',
  },
  {
    image: '/images/youngest-speaker.png',
    year: '2025',
    title: 'Youngest Speaker at Fire Safety Forum',
    awardedBy: '',
    description:
      'The youngest and only student invited to speak on a stage shared by leading fire safety experts, sharing insights on youth innovation in safety technology.',
    badge: '🎤 SPEAKER',
  },
  {
    image: '/images/colonel-zaid-al.jpg',
    year: '2025',
    title: 'Received Appreciation from Colonel Zaid Al Sabouni',
    awardedBy: 'Director of the Media Department, Dubai Civil Defence',
    description:
      'Had the honor of meeting Colonel Zaid Al Sabouni Sir and received appreciation for exceptional achievements in innovation and technology, demonstrating leadership and excellence at a young age.',
    badge: '🤝 RECOGNITION',
  },
  {
    image: '/images/maryam-ghalita.png',
    year: '2025',
    title: 'Commended by Ms. Maryam Ghalita',
    awardedBy: 'Head of Innovation, Dubai Civil Defence',
    description:
      'Received commendation from Ms. Maryam Ghalita, Head of Innovation at Dubai Civil Defence, in recognition of contributions to innovation and youth leadership in fire safety technology.',
    badge: '🤝 RECOGNITION',
  },
  {
    image: '/images/anthony.jpg',
    year: '2025',
    title: 'Words of Encouragement from Dr. Anthony D. Parfitt',
    awardedBy: 'Founder and CEO, CiGlobal',
    description:
      'Received valuable encouragement from Dr. Anthony D. Parfitt, whose support and appreciation reinforced the commitment to driving innovation and creating meaningful technological impact.',
    badge: '🤝 RECOGNITION',
  },
  {
    image: '/images/nihas.jpg',
    year: '2025',
    title: 'Acknowledged by Dr. Nihas Salins',
    awardedBy: 'Hospital Director, Royal NMC, DIP',
    description:
      'Received acknowledgment from Dr. Nihas Salins, Hospital Director of Royal NMC, DIP, for advancing innovative healthcare solutions and demonstrating a commitment to improving patient care through digital innovation, DigiNurse.',
    badge: '🏥 HEALTHCARE',
    fullImage: true,
  },
  {
    image: '/images/school-incubation.jpeg',
    year: '2025',
    title: 'Youngest in School Incubation Program',
    awardedBy: 'Dubai SME & School Innovation Center',
    description:
      'Selected as the youngest student for the school\'s incubation program sponsored by Dubai SME - a platform to develop innovative ideas into viable solutions.',
    badge: '🚀 INCUBATION',
  },
];

const otherAchievements: OtherAchievement[] = [
  {
    image: '/images/achievements/other/sports-medals-awards.jpg',
    title: 'Sports, Medals and Awards',
    items: [
      'First position in Inter-House Table Tennis Championship (Doubles) 2026-27.',
      'Inter House Cricket Championship medals, 2023–24 & 2024–25, 2025-26.',
    ],
    badge: '🏅 SPORTS',
  },
  {
    image: '/images/achievements/other/academic-excellence.png',
    title: 'Academic Excellence',
    items: [
      'INNOFEST research showcase (2022-2026)',
      'Leadership Gemstone 2026-27.',
      'Scientific Sherlock 2026-27.',
      'Explorer of the month 2024-2025.',
      'Scientific Mind Investigator, 2023–24',
    ],
    badge: '📚 ACADEMIC',
  },
  {
    image: '/images/achievements/other/arts-media.jpg',
    title: 'Arts & Media',
    items: [
      'Featured in a short film by students of Middlesex University, Dubai',
      'Drama showcase winner, 2024-25',
      'Poster Making Competition, Consulate General of India, Dubai',
      'Painting & creative artistic expression',
    ],
    badge: '🎨 ARTS',
  },
  {
    image: '/images/achievements/other/community-service.png',
    title: 'Community Service',
    items: [
      '"Be the Change" Clean UAE campaign',
      'Elderly-care community service',
      'Advancing the UAE\'s innovation vision',
    ],
    badge: '🤝 COMMUNITY',
  },
];

type AchievementTab = 'coding' | 'other';

const achievementTabs: { id: AchievementTab; label: string }[] = [
  { id: 'coding', label: 'Coding, AI, and Robotics' },
  { id: 'other', label: 'Other Achievements' },
];

function AchievementTabs({
  activeTab,
  onChange,
}: {
  activeTab: AchievementTab;
  onChange: (tab: AchievementTab) => void;
}) {
  return (
    <RevealOnScroll className="mb-10 md:mb-14">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10">
        {achievementTabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`font-display transition-colors duration-300 ${
                isActive
                  ? 'text-gold'
                  : 'text-cream-muted hover:text-gold'
              }`}
              style={{
                fontSize: 'clamp(22px, 2.8vw, 34px)',
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
              }}
              aria-pressed={isActive}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </RevealOnScroll>
  );
}

function AchievementCard({
  achievement,
  index,
}: {
  achievement: CodingAchievement;
  index: number;
}) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const img = imageRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(img);
    return () => observer.disconnect();
  }, []);

  return (
    <RevealOnScroll
      delay={`${(index % 2) * 0.15 + Math.floor(index / 2) * 0.2}s`}
      className="h-full"
    >
      <div className="card-pattern overflow-hidden group hover:border-gold/40 transition-all duration-400 h-full">
        <div className="flex flex-col md:flex-row h-full min-h-0 md:min-h-[380px]">
          <div className="relative w-full md:w-[40%] shrink-0 overflow-hidden bg-navy">
            <img
              ref={imageRef}
              src={achievement.image}
              alt={achievement.title}
              className={`w-full h-auto max-h-72 sm:max-h-80 md:absolute md:inset-0 md:h-full md:max-h-none object-contain object-center ${
                achievement.fullImage
                  ? ''
                  : `md:object-cover transition-transform duration-[8000ms] ease-out ${
                      isVisible ? 'md:scale-105' : 'md:scale-100'
                    }`
              }`}
              loading="lazy"
            />
          </div>

          <div className="p-5 md:p-6 flex flex-col md:w-[60%] flex-1 min-h-0">
            <span className="caption-label mb-1.5">{achievement.year}</span>

            <h3
              className="font-display text-white mb-1.5"
              style={{
                fontSize: 'clamp(20px, 2.2vw, 26px)',
                lineHeight: 1.15,
              }}
            >
              {renderStyledText(achievement.title)}
            </h3>

            {achievement.awardedBy && (
              <p className="font-body text-sm text-cream mb-2">
                {achievement.awardedBy}
              </p>
            )}

            <p
              className="font-body font-light text-cream-muted mb-3 flex-1"
              style={{
                fontSize: 'clamp(13px, 1.1vw, 15px)',
                lineHeight: 1.55,
              }}
            >
              {renderStyledText(achievement.description)}
            </p>

            <span className="award-badge self-start mt-auto">{achievement.badge}</span>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
}

function OtherAchievementCard({
  achievement,
  index,
}: {
  achievement: OtherAchievement;
  index: number;
}) {
  return (
    <RevealOnScroll
      delay={`${(index % 2) * 0.15 + Math.floor(index / 2) * 0.2}s`}
      className="h-full"
    >
      <div className="card-pattern overflow-hidden group hover:border-gold/40 transition-all duration-400 h-full">
        <div className="flex flex-col md:flex-row h-full min-h-0 md:min-h-[380px]">
          <div className="relative w-full md:w-[40%] shrink-0 overflow-hidden bg-navy">
            <img
              src={achievement.image}
              alt={achievement.title}
              className="w-full h-auto max-h-72 sm:max-h-80 md:absolute md:inset-0 md:h-full md:max-h-none object-contain object-center"
              loading="lazy"
            />
          </div>

          <div className="p-5 md:p-6 flex flex-col md:w-[60%] flex-1 min-h-0">
            <h3
              className="font-display text-white mb-3"
              style={{
                fontSize: 'clamp(20px, 2.2vw, 26px)',
                lineHeight: 1.15,
              }}
            >
              {achievement.title}
            </h3>

            <ul
              className="font-body font-light text-cream-muted mb-3 flex-1 space-y-2 list-disc pl-5"
              style={{
                fontSize: 'clamp(13px, 1.1vw, 15px)',
                lineHeight: 1.55,
              }}
            >
              {achievement.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <span className="award-badge self-start mt-auto">{achievement.badge}</span>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
}

export default function AchievementsSection() {
  const [activeTab, setActiveTab] = useState<AchievementTab>('coding');

  return (
    <section id="achievements" className="bg-navy-light section-padding">
      <div className="container-main">
        <SectionHeader
          label="ACHIEVEMENTS"
          heading="Recognition & Honors"
          subtext="Milestones that mark the journey of a young innovator making a real impact."
          subtextSingleLine
          centered
        />

        <AchievementTabs activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'coding' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
            {codingAchievements.map((achievement, i) => (
              <AchievementCard key={achievement.title} achievement={achievement} index={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
            {otherAchievements.map((achievement, i) => (
              <OtherAchievementCard key={achievement.title} achievement={achievement} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
