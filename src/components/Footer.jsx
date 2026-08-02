import { NavLink } from 'react-router-dom';
import { footerLinks } from '../data/homepage.js';
import { getCopyrightLine, siteSettings } from '../data/settings.js';
import FadeIn from './FadeIn.jsx';

function isHashNavItem(to) {
  return String(to || '').includes('#');
}

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="site-container py-12">
        <FadeIn>
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="text-2xl font-semibold">PROJECT BHARTI</h2>
              <p className="mt-4 max-w-xl leading-7 text-slate-300">{siteSettings.tagline}</p>
            </div>
            <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-3 text-sm">
              {footerLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  aria-current={isHashNavItem(link.to) ? false : undefined}
                  className="text-slate-300 transition duration-300 hover:text-white motion-safe:hover:translate-x-0.5"
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-slate-400">
            <span>{getCopyrightLine()}</span>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
