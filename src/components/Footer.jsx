import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { footerLinks } from '../data/homepage.js';

export default function Footer() {
  const { isAdmin, logout } = useAuth();

  return (
    <footer className="bg-slate-950 text-white">
      <div className="site-container py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-red-200">IIT Delhi</p>
            <h2 className="mt-3 text-2xl font-semibold">PROJECT BHARTI</h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-300">
              Digital and Financial Literacy in the Context of Women's Entrepreneurship.
            </p>
          </div>
          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-3 text-sm">
            {footerLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className="text-slate-300 transition hover:text-white">
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-slate-400">
          <span>Official project website prototype for presentation and content planning.</span>
          {isAdmin ? (
            <button type="button" onClick={logout} className="font-semibold text-slate-300 transition hover:text-white">
              Admin Mode &middot; Logout
            </button>
          ) : (
            <NavLink to="/admin/login" className="font-semibold text-slate-500 transition hover:text-slate-300">
              Admin
            </NavLink>
          )}
        </div>
      </div>
    </footer>
  );
}
