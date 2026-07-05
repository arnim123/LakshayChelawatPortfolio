import { useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import RevealOnScroll from '@/components/RevealOnScroll';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

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

const INITIAL_VISIBLE_COUNT = 12;

const galleryItems = galleryFilenames.map((file) => ({
  src: `/images/gallery/${file}`,
  caption: captionFromFilename(file),
}));

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const visibleItems = showAll
    ? galleryItems
    : galleryItems.slice(0, INITIAL_VISIBLE_COUNT);
  const hasMore = galleryItems.length > INITIAL_VISIBLE_COUNT;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const goNext = () => {
    setLightboxIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const goPrev = () => {
    setLightboxIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <section id="gallery" className="bg-navy section-padding">
      <div className="container-main">
        <SectionHeader
          label="GALLERY"
          heading="Moments That Define the Journey"
          subtext="A visual collection of milestones, projects, and unforgettable experiences."
          subtextSingleLine
        />

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-5">
          {visibleItems.map((item, i) => (
            <RevealOnScroll
              key={item.src}
              delay={`${(i % 8) * 0.08}s`}
              className="break-inside-avoid mb-4 md:mb-5"
            >
              <button
                type="button"
                className="w-full cursor-pointer group text-left rounded overflow-hidden border border-cream-dim/20 bg-navy-light hover:border-gold/40 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-auto block"
                  loading="lazy"
                />
                <p className="font-body text-xs text-cream-muted px-3 py-2 text-center">
                  {item.caption}
                </p>
              </button>
            </RevealOnScroll>
          ))}
        </div>

        {hasMore && !showAll && (
          <div className="flex justify-center mt-10">
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

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[70] bg-navy/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-cream hover:text-gold transition-colors z-10"
            aria-label="Close gallery"
          >
            <X size={32} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 md:left-8 text-cream hover:text-gold transition-colors z-10"
            aria-label="Previous photo"
          >
            <ChevronLeft size={40} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 md:right-8 text-cream hover:text-gold transition-colors z-10"
            aria-label="Next photo"
          >
            <ChevronRight size={40} />
          </button>

          <div
            className="max-w-[90vw] max-h-[85vh] px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryItems[lightboxIndex].src}
              alt={galleryItems[lightboxIndex].caption}
              className="max-w-full max-h-[80vh] object-contain rounded mx-auto"
            />
            <p className="text-center font-body text-cream-muted text-sm mt-4">
              {galleryItems[lightboxIndex].caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
