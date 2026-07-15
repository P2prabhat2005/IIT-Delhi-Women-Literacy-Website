import { motion } from 'framer-motion';

export default function ActivityTimeline({ items }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-4 hidden h-[calc(100%-2rem)] w-px bg-slate-200 md:block" />
      <div className="grid gap-4">
        {items.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex gap-4">
              <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-900 text-xs font-bold text-white">
                {index + 1}
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-red-800">{item.label}</p>
                <h3 className="mt-1 text-lg font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
