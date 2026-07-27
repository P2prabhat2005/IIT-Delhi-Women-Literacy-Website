import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';

function scrollToHashTarget(targetId) {
  const element = document.getElementById(targetId);
  if (!element) return false;
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return true;
}

export default function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return undefined;

    const targetId = location.hash.replace(/^#/, '');
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
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
