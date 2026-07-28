import { useState } from 'react';
import { partnersMediaContent } from '../data/partnersMedia.js';
import MediaLightbox from './MediaLightbox.jsx';
import SectionTitle from './SectionTitle.jsx';

const SIZE_CLASSES = {
  feature: {
    cell: 'sm:col-span-2 lg:col-span-8',
    frame: 'min-h-[15rem] sm:min-h-[17rem] lg:min-h-[19rem]',
  },
  wide: {
    cell: 'sm:col-span-2 lg:col-span-12',
    frame: 'min-h-[11rem] sm:min-h-[13rem] lg:min-h-[15rem]',
  },
  lg: {
    cell: 'lg:col-span-5',
    frame: 'min-h-[13rem] sm:min-h-[14rem] lg:min-h-[15.5rem]',
  },
  md: {
    cell: 'lg:col-span-4',
    frame: 'min-h-[11.5rem] sm:min-h-[12.5rem] lg:min-h-[13.5rem]',
  },
  sm: {
    cell: 'lg:col-span-3',
    frame: 'min-h-[10rem] sm:min-h-[11rem] lg:min-h-[12rem]',
  },
};

function MediaWallCard({ item, onOpen }) {
  const size = SIZE_CLASSES[item.size] || SIZE_CLASSES.md;
  const isPress = item.kind === 'press';
  const isWide = item.size === 'wide';

  return (
    <div className={size.cell}>
      <button
        type="button"
        onClick={() => onOpen(item.id)}
        className={`group relative flex h-full w-full overflow-hidden rounded-[1.25rem] border border-slate-200/90 text-left shadow-sm shadow-slate-200/40 hover:border-red-100 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-900/40 ${
          isPress ? 'bg-white p-2 sm:p-2.5' : 'bg-slate-100'
        } ${size.frame}`}
        aria-label={`Open ${item.caption || (isPress ? 'press cutting' : 'photo')}: ${item.alt}`}
      >
        <div
          className={`flex h-full w-full items-center justify-center overflow-hidden ${
            isPress ? 'rounded-[0.9rem] bg-slate-50' : ''
          }`}
        >
          <img
            src={item.src}
            alt=""
            loading="lazy"
            decoding="async"
            className={
              isPress
                ? 'h-auto max-h-full w-full object-contain'
                : isWide
                  ? 'h-full w-full object-cover object-center'
                  : 'h-full w-full object-cover object-[center_28%]'
            }
          />
        </div>
      </button>
    </div>
  );
}

function MediaWall({ items, onOpen }) {
  return (
    <div
      className="mt-4 grid auto-rows-min grid-cols-1 gap-2 sm:grid-cols-2 md:mt-5 lg:grid-flow-dense lg:grid-cols-12 lg:gap-2"
      aria-label="Project Bharti press coverage and field photography"
    >
      {items.map((item) => (
        <MediaWallCard key={item.id} item={item} onOpen={onOpen} />
      ))}
    </div>
  );
}

export default function Partners() {
  const { wall } = partnersMediaContent;
  const [lightbox, setLightbox] = useState({ items: [], index: 0, open: false });

  const openItem = (itemId) => {
    const index = wall.items.findIndex((item) => item.id === itemId);
    if (index < 0) return;
    setLightbox({ items: wall.items, index, open: true });
  };

  return (
    <section aria-labelledby="partners-title" className="section bg-slate-50">
      <div className="mx-auto w-[min(1320px,calc(100%-2rem))]">
        <SectionTitle
          align="center"
          eyebrow="Collaborative Ecosystem"
          id="partners-title"
          description="The project is positioned to work across academic, community, financial, and implementation networks."
        >
          Built for credible partnerships.
        </SectionTitle>

        <MediaWall items={wall.items} onOpen={openItem} />
      </div>

      <MediaLightbox
        items={lightbox.items}
        initialIndex={lightbox.index}
        isOpen={lightbox.open}
        onClose={() => setLightbox((current) => ({ ...current, open: false }))}
      />
    </section>
  );
}
