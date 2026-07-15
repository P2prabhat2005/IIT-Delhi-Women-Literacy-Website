import SectionTitle from './SectionTitle.jsx';
import { activities } from '../data/homepage.js';

export default function ActivitiesPreview() {
  return (
    <section aria-labelledby="activities-preview-title" className="section bg-slate-950 text-white">
      <div className="site-container">
        <SectionTitle
          eyebrow="Activities"
          id="activities-preview-title"
          description="Programs are structured for learning, practice, observation, and evidence generation."
        >
          Field activity designed with institutional rigor.
        </SectionTitle>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {activities.map(({ description, Icon, title }) => (
            <article key={title} className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-700 text-white">
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
