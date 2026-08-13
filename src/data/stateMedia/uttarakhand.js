/**
 * Uttarakhand state media for the Interactive India Map.
 * Same module shape as other states:
 * { gallery: [...], activities: [...], videos?: [...], research?: [...], news?: [...] }
 */

import capacityBuildingSession from '../../assets/images/states/uttarakhand/capacity-building-session.webp';
import communityMobilization from '../../assets/images/states/uttarakhand/community-mobilization.webp';
import financialLiteracyWorkshop from '../../assets/images/states/uttarakhand/financial-literacy-workshop.png';
import interactiveDiscussion from '../../assets/images/states/uttarakhand/interactive-discussion.webp';
import orientationMaterials from '../../assets/images/states/uttarakhand/orientation-materials.webp';
import participantEngagement from '../../assets/images/states/uttarakhand/participant-engagement.png';
import programmeFacilitation from '../../assets/images/states/uttarakhand/programme-facilitation.webp';
import programmeInauguration from '../../assets/images/states/uttarakhand/programme-inauguration.webp';

export const uttarakhandMedia = {
  gallery: [
    {
      id: 'uk-gallery-community-mobilization',
      image: communityMobilization,
      alt: 'Large outdoor group of women participants and facilitators during a community mobilisation event in Uttarakhand',
    },
    {
      id: 'uk-gallery-programme-inauguration',
      image: programmeInauguration,
      alt: 'Programme inauguration session with IIT Delhi and EXL presentation for women entrepreneurs in Uttarakhand',
    },
    {
      id: 'uk-gallery-interactive-discussion',
      image: interactiveDiscussion,
      alt: 'Facilitator engaging women participants in an interactive open discussion during a training workshop',
    },
    {
      id: 'uk-gallery-financial-literacy-workshop',
      image: financialLiteracyWorkshop,
      alt: 'Financial literacy training workshop with programme materials and women participants in Uttarakhand',
    },
    {
      id: 'uk-gallery-participant-engagement',
      image: participantEngagement,
      alt: 'Woman participant speaking into a microphone during an interactive learning session in Uttarakhand',
    },
    {
      id: 'uk-gallery-orientation-materials',
      image: orientationMaterials,
      alt: 'Large orientation gathering with women participants holding programme folders in Uttarakhand',
    },
    {
      id: 'uk-gallery-capacity-building',
      image: capacityBuildingSession,
      alt: 'Capacity building session with a facilitator addressing rows of women participants in Uttarakhand',
    },
    {
      id: 'uk-gallery-programme-facilitation',
      image: programmeFacilitation,
      alt: 'Young facilitator addressing women participants during a Project Bharti training session in Uttarakhand',
    },
  ],
  activities: [
    {
      id: 'uk-activity-community-mobilization',
      title: 'Community Mobilization & Participant Registration',
      description:
        'Large-scale community mobilisation bringing women entrepreneurs and facilitators together at the start of Project Bharti outreach in Uttarakhand.',
      image: communityMobilization,
      alt: 'Community mobilisation and participant gathering in Uttarakhand',
    },
    {
      id: 'uk-activity-programme-inauguration',
      title: 'Programme Inauguration & Orientation',
      description:
        'Formal inauguration and orientation introducing financial and digital literacy goals, partners, and programme expectations to local participants.',
      image: programmeInauguration,
      alt: 'Programme inauguration and orientation session in Uttarakhand',
    },
    {
      id: 'uk-activity-financial-literacy-workshop',
      title: 'Financial Literacy Training Workshop',
      description:
        'Structured workshop sessions supporting budgeting, savings, and enterprise finance skills through guided presentations and distributed learning materials.',
      image: financialLiteracyWorkshop,
      alt: 'Financial literacy training workshop in Uttarakhand',
    },
    {
      id: 'uk-activity-interactive-discussion',
      title: 'Interactive Learning & Open Discussion',
      description:
        'Facilitator-led open discussions where participants share questions, experiences, and practical literacy challenges in a peer learning format.',
      image: interactiveDiscussion,
      alt: 'Interactive learning and open discussion during a Uttarakhand workshop',
    },
    {
      id: 'uk-activity-capacity-building',
      title: 'Capacity Building Session',
      description:
        'Classroom-style capacity building focused on strengthening confidence, digital awareness, and enterprise-ready skills among SHG-linked women.',
      image: capacityBuildingSession,
      alt: 'Capacity building session with women entrepreneurs in Uttarakhand',
    },
    {
      id: 'uk-activity-participant-engagement',
      title: 'Participant Engagement',
      description:
        'Moments of active participant voice where women entrepreneurs speak, ask questions, and contribute to the learning dialogue.',
      image: participantEngagement,
      alt: 'Participant engagement during a Project Bharti session in Uttarakhand',
    },
    {
      id: 'uk-activity-programme-facilitation',
      title: 'Programme Facilitation & Coordination',
      description:
        'On-ground facilitation and coordination ensuring smooth delivery of training content, participant support, and session flow.',
      image: programmeFacilitation,
      alt: 'Programme facilitation and coordination during a Uttarakhand training session',
    },
  ],
};
