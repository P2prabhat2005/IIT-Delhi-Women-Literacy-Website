import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import PageTransition from '../components/PageTransition.jsx';
import SessionIntroVideo from '../components/SessionIntroVideo.jsx';
import { sanitizeHashTargetId } from '../utils/safeUrl.js';

function getStickyHeaderOffset() {
  const header = document.querySelector('header.sticky, header');
  return header?.getBoundingClientRect().height ?? 80;
}

function scrollToHashTarget(targetId) {
  const element = document.getElementById(targetId);
  if (!element) return false;

  const top = Math.max(
    0,
    element.getBoundingClientRect().top + window.scrollY - getStickyHeaderOffset() - 8,
  );

  window.scrollTo({ top, behavior: 'smooth' });
  return true;
}

function scrollToPageTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
}

export default function MainLayout() {
  const location = useLocation();
  const isHomeRoute = location.pathname === '/';

  useEffect(() => {
    if (!location.hash) {
      scrollToPageTop();
      return undefined;
    }

    const targetId = sanitizeHashTargetId(location.hash);
    if (!targetId) {
      scrollToPageTop();
      return undefined;
    }
    let frameId = 0;
    let attempts = 0;
    const maxAttempts = 60;

    const tryScroll = () => {
      if (scrollToHashTarget(targetId) || attempts >= maxAttempts) {
        return;
      }

      attempts += 1;
      frameId = window.requestAnimationFrame(tryScroll);
    };

    frameId = window.requestAnimationFrame(tryScroll);

    return () => window.cancelAnimationFrame(frameId);
  }, [location.pathname, location.hash, location.key]);

  return (
    <div className="app-shell">
      {isHomeRoute ? <SessionIntroVideo /> : null}
      <Navbar />
      <main>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
