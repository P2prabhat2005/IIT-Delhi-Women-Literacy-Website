export const siteSettings = {
  siteName: 'Project Bharti',
  siteTitleSuffix: 'Women\'s Entrepreneurship',
  tagline: 'Digital and Financial Literacy in the Context of Women\'s Entrepreneurship.',
  description:
    'Project Bharti strengthens SHG-linked women entrepreneurs through financial literacy, digital literacy, entrepreneurship support, and capacity building for community impact.',
  copyrightOwner: 'Project Bharti',
  copyrightText: 'All Rights Reserved.',
  // Optional fallback when window.location is unavailable (SSR/prerender).
  // Live canonical/OG URLs use the current origin in Seo.jsx.
  baseUrl: '',
};

export function getCopyrightLine(year = new Date().getFullYear()) {
  return `© ${year} ${siteSettings.copyrightOwner}. ${siteSettings.copyrightText}`;
}
