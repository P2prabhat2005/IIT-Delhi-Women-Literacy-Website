import SectionTitle from './SectionTitle.jsx';
import { Link } from 'react-router-dom';
import { resources } from '../data/homepage.js';

export default function ResourcesPreview() {
  return (
    <section aria-labelledby="resources-preview-title" className="section bg-white">
      <div className="site-container">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionTitle
            eyebrow="Resources"
            id="resources-preview-title"
            description="Future releases will include curated training assets, research briefs, and implementation materials."
          >
            A knowledge base for educators and partners.
          </SectionTitle>
          <Link className="link-pill" to="/resources">
            View Resources
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {resources.map(({ description, Icon, title }) => (
            <article key={title} className="resource-card">
              <Icon className="text-red-800" size={28} aria-hidden="true" />
              <h3 className="mt-5 text-xl font-semibold text-slate-950">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
