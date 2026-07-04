import { useEffect, useRef, useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import RevealOnScroll from '@/components/RevealOnScroll';
import { Plus } from 'lucide-react';

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
    image: '/images/colonel-zaid-al.jpg',
    year: '2025',
    title: 'Recognized by Colonel Zaid Al Sabouni Sir',
    awardedBy: 'Colonel Zaid Al Sabouni Sir, Director of Media Department',
    description:
      'Met and was recognized by Colonel Zaid Al Sabouni Sir for contributions to innovation and technology at a young age.',
    badge: '🤝 RECOGNITION',
  },
  {
    image: '/images/achievement-diginurse.jpg',
    year: '2026',
    title: 'DigiNurse Presented to DHA',
    awardedBy: 'His Excellency Dr. Alawi Al-Sheikh Ali - Director General, Dubai Health Authority',
    description:
      'Presented the DigiNurse healthcare monitoring device to the Director General of DHA. The innovation received high praise for its potential to transform patient care.',
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
    image: '/images/maryam-ghalita.png',
    year: '2025',
    title: 'Recognized by Ms. Maryam Ghalita',
    awardedBy: 'Ms. Maryam Ghalita, Head of Innovation, Dubai Civil Defence',
    description:
      'Honored to be recognized by Ms. Maryam Ghalita for contributions to innovation and youth leadership in safety technology.',
    badge: '🤝 RECOGNITION',
  },
  {
    image: '/images/rashid-thani.png',
    year: '2025',
    title: 'Recognized by His Excellency Lt. Gen. Rashid Thani Al Matrooshi',
    awardedBy: 'His Excellency Lt. Gen. Rashid Thani Al Matrooshi Sir',
    description:
      'Had the privilege of being recognized by His Excellency Lt. Gen. Rashid Thani Al Matrooshi Sir for dedication to innovation and community impact.',
    badge: '🤝 RECOGNITION',
  },
  {
    image: '/images/dhahi-khalfan-recognition.jpg',
    year: '2025',
    title: 'Recognized by His Excellency Lt. Gen. Dhahi Khalfan Tamim',
    awardedBy: 'His Excellency Lt. Gen. Dhahi Khalfan Tamim Sir',
    description:
      'Honored to be recognized by His Excellency Lt. Gen. Dhahi Khalfan Tamim Sir for contributions to innovation and technology at a young age.',
    badge: '🤝 RECOGNITION',
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
    >
      <div className="card-pattern overflow-hidden group hover:border-gold/40 transition-all duration-400">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-[40%] aspect-video md:aspect-auto overflow-hidden flex-shrink-0">
            <img
              ref={imageRef}
              src={achievement.image}
              alt={achievement.title}
              className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${
                isVisible ? 'scale-105' : 'scale-100'
              }`}
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 flex flex-col justify-center md:w-[60%]">
            <span className="caption-label mb-2">{achievement.year}</span>

            <h3
              className="font-display text-white mb-2"
              style={{
                fontSize: 'clamp(22px, 2.5vw, 28px)',
                lineHeight: 1.15,
              }}
            >
              {achievement.title}
            </h3>

            <p className="font-body text-sm text-cream mb-3">
              {achievement.awardedBy}
            </p>

            <p
              className="font-body font-light text-cream-muted mb-4"
              style={{
                fontSize: 'clamp(13px, 1.1vw, 16px)',
                lineHeight: 1.6,
              }}
            >
              {achievement.description}
            </p>

            <span className="award-badge self-start">{achievement.badge}</span>
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
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {achievements.map((achievement, i) => (
            <AchievementCard key={i} achievement={achievement} index={i} />
          ))}
        </div>

        {/* Add Your Own Note */}
        <RevealOnScroll delay="0.3s" className="mt-12">
          <div className="border-2 border-dashed border-cream-dim rounded-lg p-8 text-center">
            <Plus size={24} className="text-gold mx-auto mb-3" />
            <p className="font-body text-sm text-cream-muted max-w-xl mx-auto">
              Have more achievements to add? This section is designed to grow
              with Lakshya's journey. Simply duplicate any achievement card
              above and update the image, title, date, and description.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
