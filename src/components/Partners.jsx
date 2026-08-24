import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { partnersMediaContent, partnersMediaItems } from '../data/partnersMedia.js';
import MediaLightbox from './MediaLightbox.jsx';
import SectionTitle from './SectionTitle.jsx';

const SIZE_CLASSES = {
  feature: {
    cell: 'sm:col-span-2 lg:col-span-7',
    frame: 'aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[16rem]',
  },
  wide: {
    cell: 'sm:col-span-2 lg:col-span-12',
    frame: 'aspect-[16/10]',
  },
  lg: {
    cell: 'lg:col-span-6',
    frame: 'aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[13rem]',
  },
  md: {
    cell: 'lg:col-span-6',
    frame: 'aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[11rem]',
  },
  sm: {
    cell: 'lg:col-span-6',
    frame: 'aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[11rem]',
  },
};

const PRESS_SIZE_CLASSES = {
  feature: {
    cell: 'sm:col-span-2 lg:col-span-6',
    frame: 'min-h-[11.5rem] sm:min-h-[13rem] lg:min-h-[14.5rem]',
  },
  md: {
    cell: 'lg:col-span-3',
    frame: 'min-h-[10rem] sm:min-h-[11rem] lg:min-h-[12rem]',
  },
  sm: {
    cell: 'lg:col-span-3',
    frame: 'min-h-[9.5rem] sm:min-h-[10.5rem] lg:min-h-[11rem]',
  },
};

function leftoverCellClass(count) {
  if (count === 1) return 'sm:col-span-2 lg:col-span-12';
  if (count === 2 || count === 4) return 'lg:col-span-6';
  if (count % 3 === 0) return 'lg:col-span-4';
  if (count % 2 === 0) return 'lg:col-span-6';
  return 'lg:col-span-4';
}

const QUAD_COLLAGE_CHAPTERS = new Set(['field-workshops', 'community-outreach']);
const PAIR_CHAPTERS = new Set(['impact-highlights']);
const SINGLE_CHAPTERS = new Set();

const QUAD_COLLAGE_PLACEMENTS = [
  { cell: 'lg:col-span-7', frame: 'aspect-[4/3] lg:h-full' },
  { cell: 'lg:col-span-5', frame: 'aspect-[4/3] lg:h-full' },
  { cell: 'lg:col-span-5', frame: 'aspect-[4/3] lg:h-full' },
  { cell: 'lg:col-span-7', frame: 'aspect-[4/3] lg:h-full' },
];

function MediaTile({ item, onOpen, index, reduceMotion, sizeMap = SIZE_CLASSES, className = '', cell, frame }) {
  const size = sizeMap[item.size] || sizeMap.md || SIZE_CLASSES.md;
  const isPress = item.kind === 'press';
  const cellClass = cell ?? size.cell;
  const frameClass = frame ?? size.frame;

  return (
    <motion.div
      className={`${cellClass} ${className}`.trim()}
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
          isPress ? 'bg-white p-2 sm:p-2.5' : 'bg-slate-100'
        } ${frameClass}`}
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
                : 'h-full w-full object-cover object-top'
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

function SinglePhotoGrid({ items, onOpen, labelledBy }) {
  const reduceMotion = useReducedMotion();
  const item = items[0];

  if (!item) return null;

  return (
    <div className="mx-auto mt-6 max-w-3xl" aria-label={labelledBy}>
      <MediaTile
        item={item}
        onOpen={onOpen}
        index={0}
        reduceMotion={reduceMotion}
        cell=""
        frame="aspect-[16/10]"
      />
    </div>
  );
}

function PairGrid({ items, onOpen, labelledBy }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="mt-6 grid auto-rows-min grid-cols-1 items-stretch gap-3 sm:grid-cols-2 sm:gap-3.5"
      aria-label={labelledBy}
    >
      {items.map((item, index) => (
        <MediaTile
          key={item.id}
          item={item}
          onOpen={onOpen}
          index={index}
          reduceMotion={reduceMotion}
          className="h-full min-h-0"
          cell=""
          frame="aspect-[4/3] h-full"
        />
      ))}
    </div>
  );
}

function QuadCollageGrid({ items, onOpen, labelledBy }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="mt-6 grid auto-rows-min grid-cols-1 items-stretch gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-12"
      aria-label={labelledBy}
    >
      {items.map((item, index) => {
        const placement = QUAD_COLLAGE_PLACEMENTS[index] || QUAD_COLLAGE_PLACEMENTS[0];
        return (
          <MediaTile
            key={item.id}
            item={item}
            onOpen={onOpen}
            index={index}
            reduceMotion={reduceMotion}
            className="h-full min-h-0"
            cell={placement.cell}
            frame={placement.frame}
          />
        );
      })}
    </div>
  );
}

function ChapterGrid({ chapter, onOpen }) {
  const reduceMotion = useReducedMotion();
  const isPressLayout = chapter.layout === 'press';
  if (SINGLE_CHAPTERS.has(chapter.id)) {
    return (
      <SinglePhotoGrid
        items={chapter.items}
        onOpen={onOpen}
        labelledBy={`${chapter.title} photography`}
      />
    );
  }
  if (PAIR_CHAPTERS.has(chapter.id)) {
    return (
      <PairGrid
        items={chapter.items}
        onOpen={onOpen}
        labelledBy={`${chapter.title} photography`}
      />
    );
  }
  if (QUAD_COLLAGE_CHAPTERS.has(chapter.id)) {
    return (
      <QuadCollageGrid
        items={chapter.items}
        onOpen={onOpen}
        labelledBy={`${chapter.title} photography`}
      />
    );
  }

  const featured = chapter.items.find((item) => item.size === 'feature');
  const supporting = chapter.items.filter((item) => item.id !== featured?.id);
  const sideCount = supporting.length === 1 || supporting.length === 3 ? supporting.length : Math.min(2, supporting.length);
  const sideItems = supporting.slice(0, sideCount);
  const leftoverItems = supporting.slice(sideCount);
  const leftoverSpan = leftoverCellClass(leftoverItems.length);

  if (isPressLayout) {
    return (
      <div
        className="mt-6 grid auto-rows-min grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-12"
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

  const sideFrame =
    sideItems.length === 3
      ? 'aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-0'
      : SIZE_CLASSES.md.frame;

  const featuredSizeMap =
    sideItems.length === 3
      ? {
          ...SIZE_CLASSES,
          feature: {
            cell: SIZE_CLASSES.feature.cell,
            frame: 'aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[24rem]',
          },
        }
      : SIZE_CLASSES;

  const sideSizeMap = {
    ...SIZE_CLASSES,
    feature: { cell: '', frame: sideFrame },
    wide: { cell: '', frame: sideFrame },
    lg: { cell: '', frame: sideFrame },
    md: { cell: '', frame: sideFrame },
    sm: { cell: '', frame: sideFrame },
  };

  const leftoverSizeMap = {
    ...SIZE_CLASSES,
    feature: { cell: leftoverSpan, frame: 'aspect-[16/10]' },
    wide: { cell: leftoverSpan, frame: 'aspect-[16/10]' },
    lg: { cell: leftoverSpan, frame: 'aspect-[4/3]' },
    md: { cell: leftoverSpan, frame: 'aspect-[4/3]' },
    sm: { cell: leftoverSpan, frame: 'aspect-[4/3]' },
  };

  return (
    <div
      className="mt-6 grid auto-rows-min grid-cols-1 items-stretch gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-12"
      aria-label={`${chapter.title} photography`}
    >
      {featured ? (
        <MediaTile
          item={featured}
          onOpen={onOpen}
          index={0}
          reduceMotion={reduceMotion}
          className="h-full"
          sizeMap={featuredSizeMap}
        />
      ) : null}

      {sideItems.length > 0 ? (
        <div
          className={`grid auto-rows-fr grid-cols-1 gap-3 sm:col-span-2 sm:gap-3.5 lg:col-span-5 lg:grid-cols-1 ${
            sideItems.length === 3 ? 'sm:grid-cols-3' : sideItems.length === 1 ? 'sm:grid-cols-1' : 'sm:grid-cols-2'
          }`}
        >
          {sideItems.map((item, index) => (
            <MediaTile
              key={item.id}
              item={{ ...item, size: item.size === 'sm' || item.size === 'wide' ? 'md' : item.size }}
              onOpen={onOpen}
              index={index + 1}
              reduceMotion={reduceMotion}
              className="h-full min-h-0"
              sizeMap={sideSizeMap}
            />
          ))}
        </div>
      ) : null}

      {leftoverItems.map((item, index) => (
        <MediaTile
          key={item.id}
          item={item}
          onOpen={onOpen}
          index={index + sideItems.length + 1}
          reduceMotion={reduceMotion}
          sizeMap={leftoverSizeMap}
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
      className="border-t border-slate-200/80 pt-8 first:border-t-0 first:pt-0 md:pt-9"
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
    <section id="partners" aria-labelledby="partners-title" className="section scroll-mt-24 bg-slate-50 !pt-12">
      <div className="site-container">
        <SectionTitle
          align="center"
          eyebrow="Project Documentation"
          id="partners-title"
          description="A visual record of institutional leadership, field delivery, community outreach, and public coverage across Project Bharti’s implementation."
        >
          From research to field practice.
        </SectionTitle>

        <div className="mt-8 space-y-10 md:mt-10 md:space-y-12 lg:space-y-14">
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
