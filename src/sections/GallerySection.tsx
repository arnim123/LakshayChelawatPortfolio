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

const layoutVariants = [
  { span: 'col-span-2 row-span-2', aspect: 'aspect-[3/4]' },
  { span: 'col-span-1 row-span-1', aspect: 'aspect-[4/3]' },
  { span: 'col-span-1 row-span-1', aspect: 'aspect-[4/3]' },
  { span: 'col-span-1 row-span-1', aspect: 'aspect-[4/3]' },
  { span: 'col-span-1 row-span-1', aspect: 'aspect-[4/3]' },
  { span: 'col-span-2 row-span-1', aspect: 'aspect-[16/9]' },
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

const INITIAL_VISIBLE_COUNT = 8;

const galleryItems = galleryFilenames.map((file, i) => ({
  src: `/images/gallery/${file}`,
  caption: captionFromFilename(file),
  ...layoutVariants[i % layoutVariants.length],
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
        />

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {visibleItems.map((item, i) => (
            <RevealOnScroll
              key={item.src}
              delay={`${(i % 8) * 0.1}s`}
              className={`${item.span} cursor-pointer group`}
            >
              <div
                className={`relative ${item.aspect} rounded overflow-hidden`}
                onClick={() => openLightbox(i)}
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="font-body text-sm text-cream">
                    {item.caption}
                  </span>
                </div>
              </div>
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

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[70] bg-navy/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-cream hover:text-gold transition-colors z-10"
          >
            <X size={32} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 md:left-8 text-cream hover:text-gold transition-colors z-10"
          >
            <ChevronLeft size={40} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 md:right-8 text-cream hover:text-gold transition-colors z-10"
          >
            <ChevronRight size={40} />
          </button>

          <div
            className="max-w-[90vw] max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryItems[lightboxIndex].src}
              alt={galleryItems[lightboxIndex].caption}
              className="max-w-full max-h-[80vh] object-contain rounded"
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
