import SectionTitle from './SectionTitle.jsx';
import { partners } from '../data/homepage.js';

export default function Partners() {
  return (
    <section aria-labelledby="partners-title" className="section bg-slate-50">
      <div className="site-container">
        <SectionTitle
          align="center"
          eyebrow="Collaborative Ecosystem"
          id="partners-title"
          description="The project is positioned to work across academic, community, financial, and implementation networks."
        >
          Built for credible partnerships.
        </SectionTitle>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map(({ Icon, name }) => (
            <div key={name} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="icon-badge">
                <Icon size={20} aria-hidden="true" />
              </div>
              <p className="font-semibold text-slate-800">{name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
