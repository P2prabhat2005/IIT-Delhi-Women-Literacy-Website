import aboutProjectGroupPhoto from '../assets/images/about/iit-delhi-project-bharti-group.jpg';
import communityCenteredDeliveryPhoto from '../assets/images/activities/community-centered-delivery.jpg';
import practiceLedTrainingPhoto from '../assets/images/activities/practice-led-training.jpg';
import researchDocumentationPhoto from '../assets/images/activities/research-documentation.jpg';
import formalLaunchPhoto from '../assets/images/activities/inaugural-formal-launch.jpg';
import participantInsightsPhoto from '../assets/images/activities/participant-insights.jpg';
import trainingNeedsPhoto from '../assets/images/activities/training-needs.jpg';
import researchInputsPhoto from '../assets/images/activities/research-inputs.jpg';
import designPhoto from '../assets/images/activities/design.jpg';
import diagnosePhoto from '../assets/images/activities/diagnose.png';
import deliverPhoto from '../assets/images/activities/deliver.jpg';
import documentPhoto from '../assets/images/activities/document.jpg';
import financialConfidencePhoto from '../assets/images/activities/financial-confidence.jpg';
import digitalReadinessPhoto from '../assets/images/activities/digital-readiness.jpg';
import enterpriseCapabilityPhoto from '../assets/images/activities/enterprise-capability.jpg';
import researchEvidencePhoto from '../assets/images/activities/research-evidence.jpg';

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
  'activity-card-community-centered-delivery': communityCenteredDeliveryPhoto,
  'activity-card-field-programme-approach': communityCenteredDeliveryPhoto,
  'activity-card-practice-led-training': practiceLedTrainingPhoto,
  'activity-card-research-documentation': researchDocumentationPhoto,
  'activity-card-a-formal-launch-for-a-research-led-field-initiative': formalLaunchPhoto,
  'activity-card-participant-insights': participantInsightsPhoto,
  'activity-card-training-needs': trainingNeedsPhoto,
  'activity-card-research-inputs': researchInputsPhoto,
  'activity-card-diagnose': diagnosePhoto,
  'activity-card-design': designPhoto,
  'activity-card-deliver': deliverPhoto,
  'activity-card-document': documentPhoto,
  'activity-card-financial-confidence': financialConfidencePhoto,
  'activity-card-digital-readiness': digitalReadinessPhoto,
  'activity-card-enterprise-capability': enterpriseCapabilityPhoto,
  'activity-card-research-evidence': researchEvidencePhoto,
  'dev-team-group': aboutProjectGroupPhoto,
};

export function getSiteImage(ownerId) {
  return siteImages[ownerId] ?? null;
}
