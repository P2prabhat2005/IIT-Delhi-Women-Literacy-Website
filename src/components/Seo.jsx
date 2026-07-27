import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteSettings } from '../data/settings.js';

const siteName = siteSettings.siteName;
const siteTitleSuffix = siteSettings.siteTitleSuffix;

function getSiteBaseUrl() {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }

  return String(siteSettings.baseUrl || '').replace(/\/$/, '');
}

function getPageMeta(pathname) {
  const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '');

  if (normalizedPath === '/') {
    return {
      title: `${siteName} | ${siteTitleSuffix}`,
      description:
        'Project Bharti focuses on digital and financial literacy, women-led entrepreneurship, and community-led capacity building.',
    };
  }

  if (normalizedPath === '/about') {
    return {
      title: `About ${siteName} | ${siteTitleSuffix}`,
      description:
        'Learn about Project Bharti, its objectives, and the institutional partnerships supporting women-led literacy and entrepreneurship work.',
    };
  }

  if (normalizedPath === '/activities') {
    return {
      title: `Activities | ${siteName} | ${siteTitleSuffix}`,
      description:
        'Explore Project Bharti activities, training programmes, field engagement, and implementation milestones.',
    };
  }

  if (normalizedPath === '/resources') {
    return {
      title: `Resources | ${siteName} | ${siteTitleSuffix}`,
      description:
        'Access Project Bharti resources, training materials, policy briefs, toolkits, and learning content for community partners.',
    };
  }

  if (normalizedPath === '/contact') {
    return {
      title: `Contact ${siteName} | ${siteTitleSuffix}`,
      description:
        'Get in touch with Project Bharti for collaboration, outreach, and institutional engagement opportunities.',
    };
  }

  return {
    title: `Page Not Found | ${siteName} | ${siteTitleSuffix}`,
    description: 'The page you requested could not be found on the Project Bharti website.',
  };
}

export default function Seo() {
  const location = useLocation();

  useEffect(() => {
    const { description, title } = getPageMeta(location.pathname);
    const baseUrl = getSiteBaseUrl();
    const canonicalUrl = `${baseUrl}${location.pathname === '/' ? '' : location.pathname}`;

    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
  }, [location.pathname]);

  return null;
}
