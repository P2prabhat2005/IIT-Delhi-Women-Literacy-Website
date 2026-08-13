import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { partnersMediaContent, partnersMediaItems } from '../data/partnersMedia.js';
import MediaLightbox from './MediaLightbox.jsx';
import SectionTitle from './SectionTitle.jsx';

const SIZE_CLASSES = {
  feature: {
    cell: 'sm:col-span-2 lg:col-span-7',
    frame: 'min-h-[16rem] sm:min-h-[18rem] lg:min-h-[22rem]',
  },
  wide: {
    cell: 'sm:col-span-2 lg:col-span-12',
    frame: 'min-h-[12rem] sm:min-h-[13.5rem] lg:min-h-[15rem]',
  },
  lg: {
    cell: 'lg:col-span-5',
    frame: 'min-h-[13rem] sm:min-h-[14rem] lg:min-h-[16rem]',
  },
  md: {
    cell: 'lg:col-span-5',
    frame: 'min-h-[11.5rem] sm:min-h-[12.5rem] lg:min-h-[10.5rem]',
  },
  sm: {
    cell: 'lg:col-span-4',
    frame: 'min-h-[10.5rem] sm:min-h-[11.5rem] lg:min-h-[12rem]',
  },
};

const PRESS_SIZE_CLASSES = {
  feature: {
    cell: 'sm:col-span-2 lg:col-span-6',
    frame: 'min-h-[16rem] sm:min-h-[18rem] lg:min-h-[20rem]',
  },
  md: {
    cell: 'lg:col-span-3',
    frame: 'min-h-[13rem] sm:min-h-[14rem] lg:min-h-[15.5rem]',
  },
  sm: {
    cell: 'lg:col-span-3',
    frame: 'min-h-[12rem] sm:min-h-[13rem] lg:min-h-[14rem]',
  },
};

function MediaTile({ item, onOpen, index, reduceMotion, sizeMap = SIZE_CLASSES }) {
  const size = sizeMap[item.size] || sizeMap.md || SIZE_CLASSES.md;
  const isPress = item.kind === 'press';

  return (
    <motion.div
      className={size.cell}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -32px 0px' }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.45, ease: 'easeOut', delay: Math.min(index * 0.05, 0.28) }
      }
    >
      <button
        type="button"
        onClick={() => onOpen(item.id)}
        className={`group relative flex h-full w-full overflow-hidden rounded-[1.35rem] border border-slate-200/90 text-left shadow-sm shadow-slate-200/35 transition-[box-shadow,border-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-red-100 hover:shadow-lg hover:shadow-slate-300/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-900/40 ${
          isPress ? 'bg-white p-3 sm:p-3.5' : 'bg-slate-100'
        } ${size.frame}`}
        aria-label={`Open ${item.caption || (isPress ? 'press cutting' : 'photo')}: ${item.alt}`}
      >
        <div
          className={`flex h-full w-full items-center justify-center overflow-hidden ${
            isPress ? 'rounded-[1rem] bg-slate-50' : ''
          }`}
        >
          <img
            src={item.src}
            srcSet={item.srcSet}
            sizes={item.sizes}
            alt=""
            loading="lazy"
            decoding="async"
            className={`transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.03] ${
              isPress
                ? 'h-auto max-h-full w-full object-contain'
                : 'h-full w-full object-cover object-[center_30%]'
            }`}
          />
        </div>
        {item.caption ? (
          <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/70 via-slate-950/25 to-transparent px-4 pb-3.5 pt-10 text-xs font-semibold tracking-wide text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            {item.caption}
          </span>
        ) : null}
      </button>
    </motion.div>
  );
}

function ChapterGrid({ chapter, onOpen }) {
  const reduceMotion = useReducedMotion();
  const isPressLayout = chapter.layout === 'press';
  const featured = chapter.items.find((item) => item.size === 'feature');
  const supporting = chapter.items.filter((item) => item.id !== featured?.id);

  if (isPressLayout) {
    return (
      <div
        className="mt-7 grid auto-rows-min grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5"
        aria-label={`${chapter.title} press coverage`}
      >
        {chapter.items.map((item, index) => (
          <MediaTile
            key={item.id}
            item={item}
            onOpen={onOpen}
            index={index}
            reduceMotion={reduceMotion}
            sizeMap={PRESS_SIZE_CLASSES}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className="mt-7 grid auto-rows-min grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5"
      aria-label={`${chapter.title} photography`}
    >
      {featured ? (
        <MediaTile
          item={featured}
          onOpen={onOpen}
          index={0}
          reduceMotion={reduceMotion}
        />
      ) : null}

      {supporting.length > 0 ? (
        <div className="grid auto-rows-min grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-5">
          {supporting.slice(0, 2).map((item, index) => (
            <MediaTile
              key={item.id}
              item={{ ...item, size: item.size === 'sm' ? 'md' : item.size }}
              onOpen={onOpen}
              index={index + 1}
              reduceMotion={reduceMotion}
              sizeMap={{
                ...SIZE_CLASSES,
                md: { cell: '', frame: SIZE_CLASSES.md.frame },
                lg: { cell: '', frame: SIZE_CLASSES.lg.frame },
                sm: { cell: '', frame: SIZE_CLASSES.sm.frame },
              }}
            />
          ))}
        </div>
      ) : null}

      {supporting.slice(2).map((item, index) => (
        <MediaTile
          key={item.id}
          item={item}
          onOpen={onOpen}
          index={index + 3}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  );
}

function MediaChapter({ chapter, onOpen }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}
      className="border-t border-slate-200/80 pt-10 first:border-t-0 first:pt-0 md:pt-12"
    >
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-800">{chapter.title}</p>
        <p className="mt-3 text-base leading-7 text-slate-600 md:text-[1.05rem] md:leading-8">{chapter.description}</p>
      </div>
      <ChapterGrid chapter={chapter} onOpen={onOpen} />
    </motion.article>
  );
}

export default function Partners() {
  const { chapters } = partnersMediaContent;
  const [lightbox, setLightbox] = useState({ items: [], index: 0, open: false });

  const openItem = (itemId) => {
    const index = partnersMediaItems.findIndex((item) => item.id === itemId);
    if (index < 0) return;
    setLightbox({ items: partnersMediaItems, index, open: true });
  };

  return (
    <section id="partners" aria-labelledby="partners-title" className="section scroll-mt-24 bg-slate-50 !pt-16">
      <div className="mx-auto w-[min(1320px,calc(100%-2rem))]">
        <SectionTitle
          align="center"
          eyebrow="Project Documentation"
          id="partners-title"
          description="A visual record of institutional leadership, field delivery, community outreach, and public coverage across Project Bharti’s implementation."
        >
          From research to field practice.
        </SectionTitle>

        <div className="mt-12 space-y-14 md:mt-14 md:space-y-16 lg:space-y-20">
          {chapters.map((chapter) => (
            <MediaChapter key={chapter.id} chapter={chapter} onOpen={openItem} />
          ))}
        </div>
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
