import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { navItems } from '../data/navigation.js';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = '';
      return undefined;
    }

    document.body.style.overflow = 'hidden';

    const handlePointerDown = (event) => {
      const target = event.target;
      const buttonClicked = buttonRef.current?.contains(target);
      const menuClicked = menuRef.current?.contains(target);

      if (!buttonClicked && !menuClicked) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/88 backdrop-blur-xl">
      <div className="site-container flex min-h-20 items-center justify-between gap-4 py-3">
        <NavLink to="/" className="flex items-center gap-3 text-slate-950">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-900 text-sm font-bold text-white">
            SHU
          </span>
          <span>
            <span className="block text-sm font-bold uppercase text-slate-950">Project Bharti</span>
          </span>
        </NavLink>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-sm md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className="nav-link">
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="mobile-nav-toggle inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 md:hidden"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((previous) => !previous)}
        >
          <div className="relative flex h-5 w-5 flex-col justify-center gap-1.5">
            <motion.span
              className="h-0.5 w-full rounded-full bg-current"
              animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="h-0.5 w-full rounded-full bg-current"
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="h-0.5 w-full rounded-full bg-current"
              animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            ref={menuRef}
            id="mobile-navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="border-t border-slate-200 bg-white/95 px-4 py-4 shadow-sm backdrop-blur md:hidden"
          >
            <nav aria-label="Mobile primary navigation" className="flex flex-col gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? 'bg-red-50 text-red-900'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
