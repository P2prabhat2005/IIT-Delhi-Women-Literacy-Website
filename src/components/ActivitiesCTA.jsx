import { Link } from 'react-router-dom';
import { activitiesPageContent } from '../data/activities.js';
import SectionTitle from './SectionTitle.jsx';
export default function ActivitiesCTA() {
  const { callToAction } = activitiesPageContent;

  return (
    <section className="section bg-white">
      <div className="site-container">
        <div className="rounded-[2rem] bg-red-900 p-8 text-white shadow-2xl shadow-red-950/20 md:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <SectionTitle eyebrow={callToAction.eyebrow} id="activities-cta" description={callToAction.description}>
              {callToAction.title}
            </SectionTitle>
            <div className="flex flex-col items-start lg:items-end">
              <Link className="inline-flex w-fit items-center justify-center rounded-full border border-white/30 px-5 py-3 font-semibold text-white transition hover:bg-white/10" to={callToAction.secondaryTo}>
                {callToAction.secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
