import aboutProjectGroupPhoto from '../assets/images/about/iit-delhi-project-bharti-group.jpg';

/**
 * Static site image map keyed by ownerId (same keys formerly used by the media API).
 * Import local files when available; otherwise leave null for empty-state UI.
 */

export function labelToImageKey(label) {
  return String(label || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const siteImages = {
  'about-collage-0': null,
  'about-collage-1': null,
  'about-collage-2': null,
  'about-overview': null,
  'activity-card-community-centered-delivery': null,
  'activity-card-practice-led-training': null,
  'activity-card-research-documentation': null,
  'activity-card-a-formal-launch-for-a-research-led-field-initiative': null,
  'activity-card-participant-insights': null,
  'activity-card-training-needs': null,
  'activity-card-research-inputs': null,
  'activity-card-diagnose': null,
  'activity-card-design': null,
  'activity-card-deliver': null,
  'activity-card-document': null,
  'activity-card-financial-confidence': null,
  'activity-card-digital-readiness': null,
  'activity-card-enterprise-capability': null,
  'activity-card-research-evidence': null,
  'dev-team-group': aboutProjectGroupPhoto,
};

export function getSiteImage(ownerId) {
  return siteImages[ownerId] ?? null;
}
