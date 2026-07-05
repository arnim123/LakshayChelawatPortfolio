import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Play, X } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import RevealOnScroll from '@/components/RevealOnScroll';
import { renderStyledText } from '@/components/DigiNurseText';

type Project = {
  image: string;
  year: string;
  title: string;
  description: string;
  tags: string[];
  award: string | null;
  video?: string;
};

const projects: Project[] = [
  {
    image: '/images/projects/naptol.jpg',
    year: '2021',
    title: 'Naaptol 2.0',
    description:
      'A mobile application designed to encourage healthy living and fitness among young people. My first project at age 7 - proving that innovation has no age limit.',
    tags: ['Mobile App', 'Health Tech'],
    award: null,
  },
  {
    image: '/images/projects/roblaze.jpg',
    year: '2024',
    title: 'RoBlaze\u00a0Fire-Fighting Robot',
    description:
      'An Arduino-based autonomous robot designed to detect and extinguish fires. Equipped with sensors for fire detection, autonomous navigation, and a water-pumping mechanism. A life-saving innovation recognized at the Fire Safety Forum.',
    tags: ['Arduino', 'Robotics', 'IoT', 'Autonomous'],
    award: '🏆 Youngest Innovator Award - Fire Safety Forum 2025',
    video: '/videos/roblaze-fsf.mp4',
  },
  {
    image: '/images/projects/diginurse.jpg',
    year: '2025',
    title: 'DigiNurse',
    description:
      'A healthcare innovation that continuously monitors patient vital signs and sends real-time updates directly to nursing staff. Presented to the Director General of Dubai Health Authority.',
      // 'A Non-provisional patent publication is in process.',
    tags: ['Healthcare', 'IoT', 'Arduino'],
    // tags: ['Healthcare', 'IoT', 'Arduino', 'Patent Pending'],
    award: '🏆 Presented to DHA Director General',
    // award: '🏆 Presented to DHA Director General | Patent Pending',
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const openVideo = () => {
    setVideoOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setVideoOpen(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    if (!card || !image) return;

    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = (vh - rect.top) / (vh + rect.height);
        const clamped = Math.max(0, Math.min(1, progress));
        const translateY = (clamped - 0.5) * 20;
        image.style.transform = `translateY(${translateY}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <RevealOnScroll delay={`${index * 0.2}s`}>
      <div
        ref={cardRef}
        className="card-pattern overflow-hidden group hover:-translate-y-1 transition-all duration-400"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <div ref={imageRef} className="w-full h-[120%] -mt-[10%]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          {/* Year Badge */}
          <span
            className="absolute top-4 right-4 award-badge z-10"
            style={{ backgroundColor: '#C41E3A' }}
          >
            {project.year}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <h3
            className="font-display text-white mb-3"
            style={{
              fontSize: 'clamp(22px, 3vw, 32px)',
              lineHeight: 1.1,
            }}
          >
            {renderStyledText(project.title)}
          </h3>

          <p
            className="font-body font-light text-cream-muted mb-4"
            style={{
              fontSize: 'clamp(14px, 1.2vw, 18px)',
              lineHeight: 1.7,
            }}
          >
            {renderStyledText(project.description)}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-body text-[11px] text-gold border border-gold rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.video && (
            <button
              type="button"
              onClick={openVideo}
              className="group mb-4 flex w-full items-center justify-center gap-2.5 rounded border border-gold bg-gold/10 px-5 py-3.5 font-body text-sm font-medium uppercase tracking-widest text-gold transition-all duration-300 hover:bg-gold hover:text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/60 bg-gold/15 transition-colors duration-300 group-hover:border-navy group-hover:bg-navy/10">
                <Play size={14} className="ml-0.5 fill-current" aria-hidden="true" />
              </span>
              Show video
            </button>
          )}

          {/* Award Banner */}
          {project.award && (
            <div
              className="mt-4 p-3 rounded border-l-[3px]"
              style={{
                backgroundColor: 'rgba(196, 30, 58, 0.15)',
                borderLeftColor: '#C41E3A',
              }}
            >
              <p className="font-body text-[13px] text-cream">
                {project.award}
              </p>
            </div>
          )}
        </div>
      </div>

      {project.video &&
        videoOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[70] bg-navy/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={closeVideo}
            role="dialog"
            aria-modal="true"
            aria-label="RoBlaze FSF video"
          >
            <div
              className="relative w-full max-w-4xl rounded-lg border border-gold/30 bg-navy shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-gold/20">
                <p className="font-display text-white text-lg md:text-xl">
                  {renderStyledText('RoBlaze')} FSF
                </p>
                <button
                  type="button"
                  onClick={closeVideo}
                  className="text-cream hover:text-gold transition-colors"
                  aria-label="Close video"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-4 md:p-6 bg-black/40">
                <video
                  src={project.video}
                  controls
                  autoPlay
                  className="w-full max-h-[70vh] rounded object-contain bg-black"
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </RevealOnScroll>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-navy section-padding">
      <div className="container-main">
        <SectionHeader
          label="PROJECTS"
          heading="Innovations Built with Purpose"
          subtext="From mobile apps to healthcare devices - each project solves a real-world problem."
          subtextSingleLine
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
