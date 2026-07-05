import { useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import RevealOnScroll from '@/components/RevealOnScroll';
import { renderStyledText } from '@/components/DigiNurseText';

const paragraphs = [
  `Hello, I am Lakshya Chelawat, an 11-year-old student in Grade 7 studying in Dubai and a passionate young innovator in robotics and technology. My journey began at the age of 6 when I was introduced to robotics - an experience that completely changed my life. What started as a fun activity quickly became my hobby and eventually my passion.`,
  `At the age of 7, I developed my first project, Naaptol 2.0, a mobile application designed to encourage healthy living and fitness. As my knowledge grew, I continued exploring new technologies and building innovative solutions. In July 2024, I began developing an autonomous fire-fighting robot using Arduino-based technologies. In 2025, I participated in the Fire Safety Forum, where I was honored to be recognized by His Excellency Dhahi Khalfan Tamim Sir and received the Youngest Innovator Award. I was also the youngest and only student invited to speak on a stage shared by leading fire safety experts.`,
  `In 2025, I developed DigiNurse, a healthcare innovation that continuously monitors patient vital signs and sends real-time updates directly to nursing staff. I had the privilege of presenting DigiNurse to His Excellency Dr. Alawi Al-Sheikh Ali Sir, Director General of the Dubai Health Authority (DHA). Today, I am proud to be the youngest student selected for my school's incubation program sponsored by Dubai SME.`,
  // `I am also in the process of receiving a Non-provisional patent publication registered in my name for this innovation.`
  `Through robotics, healthcare technology, and innovation, I strive to create practical solutions that improve lives and contribute positively to society. I believe age is never a barrier to innovation, and I am committed to continuing my journey of learning, creating, and making a meaningful impact.`,
];

const stats = [
  { value: '6+', label: 'Years in Robotics' },
  { value: '3', label: 'Innovative Projects' },
];

export default function AboutSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="bg-navy-light section-padding">
      <div className="container-main">
        <SectionHeader
          label="ABOUT ME"
          heading="The Young Innovator"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[43%_57%] gap-10 lg:gap-14 lg:items-stretch">
          {/* Portrait — stretches to match biography height above stats */}
          <RevealOnScroll
            direction="left"
            className="flex justify-center lg:justify-start h-full min-h-[360px] lg:min-h-0"
          >
            <div className="relative h-full w-full max-w-[340px] lg:max-w-none">
              <img
                src="/images/profile.png"
                alt="Lakshya Chelawat"
                className="absolute inset-0 w-full h-full object-contain object-top object-left"
                loading="lazy"
              />
            </div>
          </RevealOnScroll>

          {/* Biography */}
          <div className="flex flex-col">
            {paragraphs.map((text, i) => (
                <RevealOnScroll
                  key={i}
                  delay={`${0.24 + i * 0.12}s`}
                  className={`${i >= 2 && !expanded ? 'hidden lg:block' : ''} ${expanded && i >= 2 ? 'visible' : ''}`}
                >
                  <p
                    className="font-body font-light text-cream-muted text-justify mb-5"
                    style={{
                      fontSize: 'clamp(15px, 1.2vw, 20px)',
                      lineHeight: 1.7,
                    }}
                  >
                    {renderStyledText(text)}
                  </p>
                </RevealOnScroll>
              ))}

            {!expanded && (
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="lg:hidden ghost-link mt-2"
              >
                Read more
              </button>
            )}
          </div>
        </div>

        {/* Stats Row */}
        <RevealOnScroll delay="0.7s">
          <div className="grid grid-cols-2 mt-12 pt-8 border-t border-cream-dim">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`flex flex-col items-center text-center ${
                  i === 0 ? 'border-r border-cream-dim' : ''
                }`}
              >
                <span className="font-display text-gold text-4xl md:text-5xl block">
                  {stat.value}
                </span>
                <span className="font-display italic text-sm md:text-[15px] text-cream uppercase tracking-wider mt-1 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
