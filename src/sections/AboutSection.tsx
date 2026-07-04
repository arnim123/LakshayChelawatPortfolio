import { useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import RevealOnScroll from '@/components/RevealOnScroll';

const paragraphs = [
  `Hello, I am Lakshya Chelawat, an 11-year-old student in Grade 7 studying in Dubai and a passionate young innovator in robotics and technology. My journey began at the age of 6 when I was introduced to robotics - an experience that completely changed my life. What started as a fun activity quickly became my hobby and eventually my passion.`,
  `At the age of 7, I developed my first project, Naaptol, a mobile application designed to encourage healthy living and fitness. As my knowledge grew, I continued exploring new technologies and building innovative solutions. In July 2024, I began developing an autonomous fire-fighting robot using Arduino-based technologies. In 2025, I participated in the Fire Safety Forum, where I was honored to be recognized by His Excellency Dhahi Khalfan Tamim Sir and received the Youngest Innovator Award.`,
  `I was also the youngest and only student invited to speak on a stage shared by leading fire safety experts. In 2025, I developed DigiNurse, a healthcare innovation that continuously monitors patient vital signs and sends real-time updates directly to nursing staff. I had the privilege of presenting DigiNurse to His Excellency Dr. Alawi Al-Sheikh Ali Sir, Director General of the Dubai Health Authority (DHA). Today, I am proud to be the youngest student selected for my school's incubation program sponsored by Dubai SME.`,
  // `I am also in the process of receiving a Non-provisional patent publication registered in my name for this innovation.`
  `Through robotics, healthcare technology, and innovation, I strive to create practical solutions that improve lives and contribute positively to society. I believe age is never a barrier to innovation, and I am committed to continuing my journey of learning, creating, and making a meaningful impact.`,
];

const HIGHLIGHT_PHRASE = 'Youngest Innovator Award';

function renderParagraph(text: string) {
  const parts = text.split(HIGHLIGHT_PHRASE);
  return parts.length > 1
    ? parts.map((part, j) => (
        <span key={j}>
          {part}
          {j < parts.length - 1 && (
            <span
              className="text-gold font-medium"
              style={{ textShadow: '0 0 12px rgba(212, 175, 55, 0.3)' }}
            >
              {HIGHLIGHT_PHRASE}
            </span>
          )}
        </span>
      ))
    : text;
}

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

        <div className="grid grid-cols-1 lg:grid-cols-[43%_57%] gap-10 lg:gap-14">
          {/* Portrait Image */}
          <RevealOnScroll direction="left" className="flex justify-center lg:justify-start">
            <div className="w-full max-w-[360px] lg:max-w-none aspect-[4/5] rounded overflow-hidden border border-cream-dim">
              <img
                src="/images/profile.jpg"
                alt="Lakshya Chelawat"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </RevealOnScroll>

          {/* Biography */}
          <div>
            {paragraphs.map((text, i) => (
                <RevealOnScroll
                  key={i}
                  delay={`${0.24 + i * 0.12}s`}
                  className={`${i >= 2 && !expanded ? 'hidden lg:block' : ''} ${expanded && i >= 2 ? 'visible' : ''}`}
                >
                  <p
                    className="font-body font-light text-cream-muted mb-5"
                    style={{
                      fontSize: 'clamp(15px, 1.2vw, 20px)',
                      lineHeight: 1.7,
                    }}
                  >
                    {renderParagraph(text)}
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

            {/* Stats Row */}
            <RevealOnScroll delay="0.7s">
              <div className="flex items-center gap-6 md:gap-12 mt-12 pt-8 border-t border-cream-dim">
                {stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-6 md:gap-12">
                    <div>
                      <span className="font-display text-gold text-4xl md:text-5xl block">
                        {stat.value}
                      </span>
                      <span className="font-display italic text-sm md:text-[15px] text-cream uppercase tracking-wider mt-1 block">
                        {stat.label}
                      </span>
                    </div>
                    {i < stats.length - 1 && (
                      <div className="w-px h-10 bg-cream-dim hidden sm:block" />
                    )}
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
