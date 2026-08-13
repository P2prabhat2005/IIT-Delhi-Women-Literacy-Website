import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projectBhartiStateNames } from '../data/stateImpact.js';

export default function ProjectReach() {
  return (
    <section
      id="project-reach"
      aria-labelledby="geographic-reach-title"
      className="scroll-mt-24 border-y border-slate-200 bg-[#fbfaf8] py-8 md:py-10"
    >
      <div className="site-container">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-red-900/90">
              Geographic Reach
            </p>
            <h2 id="geographic-reach-title" className="mt-2 text-lg font-semibold text-slate-950 md:text-xl">
              Five project states
            </h2>
          </div>

          <ul className="flex flex-wrap gap-2" aria-label="Project Bharti states">
            {projectBhartiStateNames.map((stateName) => (
              <li
                key={stateName}
                className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-slate-700"
              >
                {stateName}
              </li>
            ))}
          </ul>

          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-red-900 transition hover:text-red-800"
            to="/about"
          >
            Explore detailed map
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
