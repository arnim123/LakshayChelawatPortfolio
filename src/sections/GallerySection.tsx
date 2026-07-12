import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import SectionHeader from '@/components/SectionHeader';
import RevealOnScroll from '@/components/RevealOnScroll';
import { X, ChevronLeft, ChevronRight, Play, Volume2, VolumeX } from 'lucide-react';

type GalleryItem = {
  src: string;
  caption: string;
  type: 'image' | 'video';
};

const galleryFilenames = [
  'lakshya-pic.jpg',
  '20231008_161958.jpg',
  '20231018_111429.jpg',
  '20240724_120602.jpg',
  '20240731_111924.jpg',
  '20240921_224937.jpg',
  '20250419_085113.jpg',
  '20250424_074154.jpg',
  '20250424_074532.jpg',
  '20250424_103736.jpg',
  '20250424_103929.jpg',
  '20250424_131439.jpg',
  '20250424_133738.jpg',
  '20250424_135653.jpg',
  '20250424_140924.jpg',
  '20250424_141310.jpg',
  '20250424_141402.jpg',
  '20250424_142052.jpg',
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',
  '6.jpg',
  '7.jpg',
  '8.jpg',
  '9.jpg',
  '10.jpg',
  '222.jpg',
  '555.jpg',
];

const galleryVideoFilenames = [
  '20250424_103420.mp4',
  '20250424_103527.mp4',
  '20250424_130011.mp4',
];

const HIGHLIGHTED_VIDEO = '/images/gallery/highlighted.mp4';
const HIGHLIGHTED_CAPTION = 'Featured moment';
const FEATURED_SIDE_IMAGE = '/images/gallery/2.jpg';

function captionFromFilename(name: string): string {
  if (name === 'lakshya-pic.jpg') return 'Lakshya';

  const dateMatch = name.match(/^(\d{4})(\d{2})(\d{2})/);
  if (dateMatch) {
    const [, year, month, day] = dateMatch;
    const monthName = new Date(
      Number(year),
      Number(month) - 1
    ).toLocaleString('en', { month: 'long' });
    return `${monthName} ${Number(day)}, ${year}`;
  }

  return 'A moment from the journey';
}

const imageItems: GalleryItem[] = galleryFilenames.map((file) => ({
  src: `/images/gallery/${file}`,
  caption: captionFromFilename(file),
  type: 'image' as const,
}));

const videoItems: GalleryItem[] = galleryVideoFilenames.map((file) => ({
  src: `/images/gallery/${file}`,
  caption: captionFromFilename(file.replace('.mp4', '.jpg')),
  type: 'video' as const,
}));

const INITIAL_VISIBLE_COUNT = 12;
const FEATURED_SIDE_COUNT = 4;

function shuffleIntoGallery(images: GalleryItem[], videos: GalleryItem[]): GalleryItem[] {
  const featured = images.slice(0, FEATURED_SIDE_COUNT);
  const rest = [...images.slice(FEATURED_SIDE_COUNT), ...videos];

  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }

  return [...featured, ...rest];
}

const galleryItems: GalleryItem[] = shuffleIntoGallery(imageItems, videoItems);

function PlayOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/35 group-hover:bg-black/45 transition-colors duration-300">
      <span className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-cream/80 bg-navy/60 text-cream shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
        <Play size={22} className="ml-1 fill-current" aria-hidden="true" />
      </span>
    </div>
  );
}

function VideoPlayerModal({
  src,
  caption,
  onClose,
}: {
  src: string;
  caption: string;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-[70] bg-navy/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 text-cream hover:text-gold transition-colors z-10"
        aria-label="Close video"
      >
        <X size={28} className="md:w-8 md:h-8" />
      </button>

      <div
        className="relative w-full max-w-5xl rounded-lg border border-gold/30 bg-navy shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 md:p-6 bg-black/40">
          <video
            src={src}
            controls
            autoPlay
            playsInline
            className="w-full max-h-[75vh] rounded object-contain bg-black mx-auto"
          />
          {caption && (
            <p className="text-center font-body text-cream-muted text-sm mt-4">
              {caption}
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

function FeaturedVideo({ onOpenPlayer }: { onOpenPlayer: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMuted((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className="relative rounded overflow-hidden border border-gold/40 bg-navy-light shadow-lg shadow-black/20 h-full min-h-[220px] sm:min-h-[280px] lg:min-h-[360px] cursor-pointer group"
      onClick={onOpenPlayer}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenPlayer();
        }
      }}
      aria-label="Open featured video"
    >
      <video
        ref={videoRef}
        src={HIGHLIGHTED_VIDEO}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover video-pan-mobile pointer-events-none"
      />

      <button
        type="button"
        onClick={toggleMute}
        className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-navy/75 text-cream border border-cream/25 backdrop-blur-sm transition-colors duration-300 hover:bg-navy hover:text-gold hover:border-gold/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
        aria-label={muted ? 'Unmute video' : 'Mute video'}
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    </div>
  );
}

function VideoThumbnail({
  item,
  onClick,
}: {
  item: GalleryItem;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="w-full cursor-pointer group text-left rounded overflow-hidden border border-cream-dim/20 bg-navy-light hover:border-gold/40 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
      onClick={onClick}
    >
      <div className="relative">
        <video
          src={item.src}
          muted
          playsInline
          preload="metadata"
          className="w-full h-auto block bg-black pointer-events-none"
        />
        <PlayOverlay />
      </div>
    </button>
  );
}

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [videoPlayer, setVideoPlayer] = useState<{ src: string; caption: string } | null>(null);

  const masonryItems = (
    showAll
      ? galleryItems.slice(FEATURED_SIDE_COUNT)
      : galleryItems.slice(FEATURED_SIDE_COUNT, FEATURED_SIDE_COUNT + INITIAL_VISIBLE_COUNT)
  ).filter((item) => item.src !== FEATURED_SIDE_IMAGE);
  const featuredSideImageIndex = galleryItems.findIndex(
    (item) => item.src === FEATURED_SIDE_IMAGE
  );
  const hasMore =
    galleryItems.length - FEATURED_SIDE_COUNT > INITIAL_VISIBLE_COUNT;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const openVideoPlayer = (src: string, caption: string) => {
    setVideoPlayer({ src, caption });
  };

  const closeVideoPlayer = () => {
    setVideoPlayer(null);
  };

  const goNext = () => {
    setLightboxIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const goPrev = () => {
    setLightboxIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const currentItem = galleryItems[lightboxIndex];

  return (
    <section id="gallery" className="bg-navy section-padding">
      <div className="container-main">
        <SectionHeader
          label="GALLERY"
          heading="Moments That Define the Journey"
          subtext="A visual collection of milestones, projects, and unforgettable experiences."
          subtextSingleLine
        />

        <RevealOnScroll className="mb-6 md:mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_3fr] gap-4 md:gap-5 lg:items-stretch">
            <FeaturedVideo
              onOpenPlayer={() => openVideoPlayer(HIGHLIGHTED_VIDEO, HIGHLIGHTED_CAPTION)}
            />

            <button
              type="button"
              className="cursor-pointer group text-left rounded overflow-hidden border border-cream-dim/20 bg-navy-light hover:border-gold/40 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 min-h-[220px] sm:min-h-[280px] lg:min-h-[360px] h-full"
              onClick={() => openLightbox(featuredSideImageIndex)}
            >
              <img
                src={FEATURED_SIDE_IMAGE}
                alt={captionFromFilename('2.jpg')}
                className="w-full h-full object-contain object-center"
                loading="lazy"
              />
            </button>
          </div>
        </RevealOnScroll>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-5">
          {masonryItems.map((item, i) => {
            const globalIndex = galleryItems.findIndex(
              (galleryItem) => galleryItem.src === item.src
            );
            return (
              <RevealOnScroll
                key={item.src}
                delay={`${(i % 8) * 0.08}s`}
                className="break-inside-avoid mb-4 md:mb-5"
              >
                {item.type === 'video' ? (
                  <VideoThumbnail
                    item={item}
                    onClick={() => openVideoPlayer(item.src, item.caption)}
                  />
                ) : (
                  <button
                    type="button"
                    className="w-full cursor-pointer group text-left rounded overflow-hidden border border-cream-dim/20 bg-navy-light hover:border-gold/40 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                    onClick={() => openLightbox(globalIndex)}
                  >
                    <img
                      src={item.src}
                      alt={item.caption}
                      className="w-full h-auto block"
                      loading="lazy"
                    />
                  </button>
                )}
              </RevealOnScroll>
            );
          })}
        </div>

        {hasMore && !showAll && (
          <div className="flex justify-center mt-8 md:mt-10">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="btn-secondary"
            >
              View More
            </button>
          </div>
        )}
      </div>

      {videoPlayer && (
        <VideoPlayerModal
          src={videoPlayer.src}
          caption={videoPlayer.caption}
          onClose={closeVideoPlayer}
        />
      )}

      {lightboxOpen && currentItem && (
        <div
          className="fixed inset-0 z-[70] bg-navy/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-cream hover:text-gold transition-colors z-10"
            aria-label="Close gallery"
          >
            <X size={28} className="md:w-8 md:h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-2 md:left-8 text-cream hover:text-gold transition-colors z-10"
            aria-label="Previous"
          >
            <ChevronLeft size={32} className="md:w-10 md:h-10" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-2 md:right-8 text-cream hover:text-gold transition-colors z-10"
            aria-label="Next"
          >
            <ChevronRight size={32} className="md:w-10 md:h-10" />
          </button>

          <div
            className="max-w-[90vw] max-h-[85vh] px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentItem.src}
              alt={currentItem.caption}
              className="max-w-full max-h-[80vh] object-contain rounded mx-auto"
            />
          </div>
        </div>
      )}
    </section>
  );
}
