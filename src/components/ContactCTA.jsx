import SectionTitle from './SectionTitle.jsx';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { contactChannels, contactCtaContent } from '../data/homepage.js';

export default function ContactCTA() {
  return (
    <section aria-labelledby="contact-cta-title" className="section bg-white">
      <div className="site-container">
        <div className="rounded-[2rem] bg-red-900 p-8 text-white shadow-2xl shadow-red-950/20 md:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <SectionTitle
              eyebrow={contactCtaContent.eyebrow}
              id="contact-cta-title"
              description={contactCtaContent.description}
            >
              {contactCtaContent.title}
            </SectionTitle>
            <div>
              <div className="grid gap-3 sm:grid-cols-2">
                {contactChannels.map((channel) => (
                  <div key={channel} className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium">
                    {channel}
                  </div>
                ))}
              </div>
              <Link className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-red-900 shadow-lg shadow-red-950/10 transition duration-300 hover:-translate-y-0.5 hover:bg-red-50" to={contactCtaContent.buttonTo} aria-label={`${contactCtaContent.buttonLabel} for Project Bharti`}>
                {contactCtaContent.buttonLabel}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
