import SectionTitle from './SectionTitle.jsx';
import { Link } from 'react-router-dom';
import { contactChannels, contactCtaContent } from '../data/homepage.js';

export default function ContactCTA() {
  return (
    <section aria-labelledby="contact-cta-title" className="section bg-white">
      <div className="site-container">
        <div className="rounded-[2rem] bg-red-900 p-8 text-white shadow-2xl shadow-red-950/20 md:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <SectionTitle
              eyebrow={contactCtaContent.eyebrow}
              id="contact-cta-title"
              description={contactCtaContent.description}
            >
              {contactCtaContent.title}
            </SectionTitle>
            <div className="grid w-full gap-3 sm:grid-cols-2">
              {contactChannels.map((channel) => (
                <Link
                  key={channel}
                  to={contactCtaContent.buttonTo}
                  aria-label={`Contact Project Bharti about ${channel}`}
                  className="cursor-pointer rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium transition hover:bg-white/15"
                >
                  {channel}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
