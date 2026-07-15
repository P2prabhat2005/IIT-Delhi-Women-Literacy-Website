import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const siteName = 'Project Bharti';
const siteTitleSuffix = 'IIT Delhi';
const siteBaseUrl = 'https://your-domain.example';

function titleCase(value) {
  return value
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getPageMeta(pathname) {
  const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '');

  if (normalizedPath === '/') {
    return {
      title: `${siteName} | ${siteTitleSuffix}`,
      description:
        'Project Bharti is an IIT Delhi initiative focused on digital and financial literacy, women-led entrepreneurship, and community-led capacity building.',
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

  if (normalizedPath.startsWith('/states/')) {
    const stateName = decodeURIComponent(normalizedPath.split('/states/')[1] || '');
    const formattedState = titleCase(stateName);

    return {
      title: `${formattedState} | ${siteName} | ${siteTitleSuffix}`,
      description: `View Project Bharti progress, focus areas, and implementation context for ${formattedState}.`,
    };
  }

  return {
    title: `Page Not Found | ${siteName} | ${siteTitleSuffix}`,
    description: 'The page you requested could not be found on the Project Bharti website.',
  };
}

function setMetaTag(name, content, attributes = {}) {
  const element = document.querySelector(`meta[${name}]`) || document.createElement('meta');
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  element.setAttribute(name, content);
  if (!element.parentNode) {
    document.head.appendChild(element);
  }
}

export default function Seo() {
  const location = useLocation();

  useEffect(() => {
    const { description, title } = getPageMeta(location.pathname);
    const canonicalUrl = `${siteBaseUrl}${location.pathname === '/' ? '' : location.pathname}`;

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
