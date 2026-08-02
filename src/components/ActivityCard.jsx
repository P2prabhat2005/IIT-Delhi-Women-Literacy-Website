import { motion, useReducedMotion } from 'framer-motion';
import { fadeUpTransition, staggerDelay, viewportOnce } from '../utils/motion.js';
import { labelToImageKey } from '../data/siteImages.js';
import PersistentImageSlot from './PersistentImageSlot.jsx';

export default function ActivityCard({
  className = '',
  description,
  Icon,
  image,
  imageClassName = 'aspect-[4/3] w-full bg-slate-50',
  index = 0,
  items,
  layout = 'vertical',
  title,
}) {
  const isHorizontal = layout === 'horizontal';
  const mediaClassName = isHorizontal
    ? 'h-48 w-full bg-slate-50 md:h-full'
    : imageClassName;
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={reduceMotion ? { duration: 0 } : fadeUpTransition(staggerDelay(index), 0.4)}
      className={`group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm shadow-slate-200/60 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-xl motion-safe:hover:scale-[1.01] ${
        isHorizontal ? 'md:flex-row md:items-stretch' : ''
      } ${className}`}
    >
      <PersistentImageSlot
        ownerId={`activity-card-${labelToImageKey(title)}`}
        image={image}
        title="Official Project Photograph"
        alt={`${title} activity photograph`}
        className={mediaClassName}
        wrapperClassName={isHorizontal ? 'md:w-[42%] md:shrink-0 overflow-hidden' : 'shrink-0 overflow-hidden'}
      />
      <div className={`flex flex-1 flex-col p-5 sm:p-6 ${isHorizontal ? 'md:flex-1' : ''}`}>
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-900 transition duration-300 motion-safe:group-hover:scale-105">
          <Icon size={20} aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-slate-950 sm:text-xl">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600 sm:mt-2.5 sm:leading-7">{description}</p>
        {items?.length ? (
          <ul className="mt-5 space-y-3">
            {items.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-red-800" />
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </motion.article>
  );
}
