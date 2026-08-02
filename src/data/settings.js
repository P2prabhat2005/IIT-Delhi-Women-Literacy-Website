export const siteSettings = {
  siteName: 'Project Bharti',
  siteTitleSuffix: 'IIT Delhi',
  tagline: 'An IIT Delhi research and outreach initiative on financial and digital literacy for women entrepreneurship.',
  description:
    'Project Bharti is an IIT Delhi research and outreach initiative that strengthens SHG-linked women entrepreneurs through financial literacy, digital literacy, capacity building, and community engagement.',
  copyrightOwner: 'Project Bharti',
  copyrightText: 'All Rights Reserved.',
  // Optional fallback when window.location is unavailable (SSR/prerender).
  // Live canonical/OG URLs use the current origin in Seo.jsx.
  baseUrl: '',
};

export function getCopyrightLine(year = new Date().getFullYear()) {
  return `© ${year} ${siteSettings.copyrightOwner}. ${siteSettings.copyrightText}`;
}
