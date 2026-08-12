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
        'Project Bharti is an IIT Delhi research and outreach initiative on financial literacy, digital literacy, and women entrepreneurship.',
    };
  }

  if (normalizedPath === '/about') {
    return {
      title: `About ${siteName} | ${siteTitleSuffix}`,
      description:
        'About Project Bharti: research objectives, institutional leadership at IIT Delhi, and the pathway from evidence to field impact.',
    };
  }

  if (normalizedPath === '/activities') {
    return {
      title: `Activities | ${siteName} | ${siteTitleSuffix}`,
      description:
        'Project Bharti field activities, training programmes, community engagement, and implementation milestones.',
    };
  }

  if (normalizedPath === '/resources') {
    return {
      title: `Resources | ${siteName} | ${siteTitleSuffix}`,
      description:
        'Training materials, policy briefs, toolkits, and learning resources developed under Project Bharti.',
    };
  }

  if (normalizedPath.startsWith('/stories/')) {
    return {
      title: `Stories from the Field | ${siteName} | ${siteTitleSuffix}`,
      description:
        'Field case studies of women entrepreneurs building enterprises through Project Bharti’s literacy and capacity-building work.',
    };
  }

  if (normalizedPath === '/contact') {
    return {
      title: `Contact ${siteName} | ${siteTitleSuffix}`,
      description:
        'Contact Project Bharti for academic collaboration, institutional partnerships, and community engagement.',
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
