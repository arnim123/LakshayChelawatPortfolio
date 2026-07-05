import { useEffect, useRef, useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import RevealOnScroll from '@/components/RevealOnScroll';
import { renderStyledText } from '@/components/DigiNurseText';


const achievements = [
  {
    image: '/images/youngest-innovator-award.jpg',
    year: '2025',
    title: 'Youngest Innovator Award',
    awardedBy: 'His Excellency Lt. Gen. Dhahi Khalfan Tamim Sir',
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
      'Honored to be recognized for contributions to fire safety innovation.',
    badge: '🤝 RECOGNITION',
  },
  {
    image: '/images/rashid-thani.png',
    year: '2025',
    title: 'Recognized by His Excellency Lt. Gen. Rashid Thani Al Matrooshi',
    awardedBy: '',
    description:
      'Had the privilege of being recognized by His Excellency Lt. Gen. Rashid Thani Al Matrooshi Sir for dedication to innovation and community impact.',
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
    awardedBy: 'Fire Safety Forum Organizing Committee',
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
  },
  {
    image: '/images/gallery-5.jpg',
    year: '2025',
    title: 'Youngest in School Incubation Program',
    awardedBy: 'Dubai SME & School Innovation Center',
    description:
      'Selected as the youngest student for the school\'s incubation program sponsored by Dubai SME - a platform to develop innovative ideas into viable solutions.',
    badge: '🚀 INCUBATION',
  },
];

function AchievementCard({
  achievement,
  index,
}: {
  achievement: (typeof achievements)[0];
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
        <div className="flex flex-col md:flex-row h-full min-h-[380px]">
          {/* Image */}
          <div className="relative h-40 md:h-full md:w-[40%] shrink-0 overflow-hidden">
            <img
              ref={imageRef}
              src={achievement.image}
              alt={achievement.title}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[8000ms] ease-out ${
                isVisible ? 'scale-105' : 'scale-100'
              }`}
              loading="lazy"
            />
          </div>

          {/* Content */}
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

export default function AchievementsSection() {
  return (
    <section id="achievements" className="bg-navy-light section-padding">
      <div className="container-main">
        <SectionHeader
          label="ACHIEVEMENTS"
          heading="Recognition & Honors"
          subtext="Milestones that mark the journey of a young innovator making a real impact."
          subtextSingleLine
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {achievements.map((achievement, i) => (
            <AchievementCard key={i} achievement={achievement} index={i} />
          ))}
        </div>


      </div>
    </section>
  );
}
