/**
 * Delhi state media for the Interactive India Map.
 * Same module shape as other states:
 * { gallery: [...], activities: [...], videos?: [...], research?: [...], news?: [...] }
 */

import appreciationGiftExchange from '../../assets/images/states/delhi/appreciation-gift-exchange.png';
import appreciationPlantCeremony from '../../assets/images/states/delhi/appreciation-plant-ceremony.png';
import appreciationTwoWomen from '../../assets/images/states/delhi/appreciation-two-women.png';
import handbookLaunch from '../../assets/images/states/delhi/handbook-launch.png';
import institutionalVisitMural from '../../assets/images/states/delhi/institutional-visit-mural.png';
import interactiveTraining from '../../assets/images/states/delhi/interactive-training-elevated.png';
import keynoteOfficialLaunch from '../../assets/images/states/delhi/keynote-official-launch.png';
import keynoteOrientationScreen from '../../assets/images/states/delhi/keynote-orientation-screen.png';
import programmeOrientation from '../../assets/images/states/delhi/programme-orientation-wide.png';
import projectReview from '../../assets/images/states/delhi/project-review-banner.png';
import stakeholderConsultation from '../../assets/images/states/delhi/stakeholder-consultation-standing.png';
import teamCollaborationGifts from '../../assets/images/states/delhi/team-collaboration-gifts.png';
import teamCollaborationGroup from '../../assets/images/states/delhi/team-collaboration-group.png';

export const delhiMedia = {
  gallery: [
    {
      id: 'dl-gallery-institutional-visit',
      image: institutionalVisitMural,
      alt: 'Institutional visit with cultural interaction around a Madhubani mural in Delhi',
    },
    {
      id: 'dl-gallery-programme-orientation',
      image: programmeOrientation,
      alt: 'Programme orientation session with facilitators and participants around a conference table in Delhi',
    },
    {
      id: 'dl-gallery-stakeholder-consultation',
      image: stakeholderConsultation,
      alt: 'Stakeholder consultation led by a standing speaker in a Project Bharti meeting room in Delhi',
    },
    {
      id: 'dl-gallery-interactive-training',
      image: interactiveTraining,
      alt: 'Interactive training session with participants seated around a U-shaped conference table in Delhi',
    },
    {
      id: 'dl-gallery-project-review',
      image: projectReview,
      alt: 'Project review and planning discussion with IIT Delhi and EXL banner in Delhi',
    },
    {
      id: 'dl-gallery-appreciation-gift',
      image: appreciationGiftExchange,
      alt: 'Appreciation moment with gift presentation during a Project Bharti session in Delhi',
    },
    {
      id: 'dl-gallery-appreciation-two-women',
      image: appreciationTwoWomen,
      alt: 'Two women receiving recognition with an IIT Delhi gift bag during a Delhi programme session',
    },
    {
      id: 'dl-gallery-team-collaboration-gifts',
      image: teamCollaborationGifts,
      alt: 'Large team collaboration group photograph with appreciation tokens in Delhi',
    },
    {
      id: 'dl-gallery-team-collaboration-group',
      image: teamCollaborationGroup,
      alt: 'Team collaboration group photograph with Project Bharti banners at IIT Delhi',
    },
    {
      id: 'dl-gallery-keynote-orientation',
      image: keynoteOrientationScreen,
      alt: 'Programme orientation with Project Bharti slide presentation in a Delhi conference room',
    },
    {
      id: 'dl-gallery-appreciation-plant',
      image: appreciationPlantCeremony,
      alt: 'Formal appreciation ceremony with plant presentation on stage in Delhi',
    },
    {
      id: 'dl-gallery-keynote-launch',
      image: keynoteOfficialLaunch,
      alt: 'Keynote and official launch with Mission Director address for Project Bharti in Delhi',
    },
    {
      id: 'dl-gallery-handbook-launch',
      image: handbookLaunch,
      alt: 'Handbook launch with dignitaries holding Project Bharti handbooks on stage in Delhi',
    },
  ],
  activities: [
    {
      id: 'dl-activity-institutional-visit',
      title: 'Institutional Visit & Cultural Interaction',
      description:
        'Institutional visits that situate Project Bharti within Delhi’s academic and cultural spaces, connecting programme dialogue with local heritage and community identity.',
      image: institutionalVisitMural,
      alt: 'Institutional visit and cultural interaction in Delhi',
    },
    {
      id: 'dl-activity-programme-orientation',
      title: 'Programme Orientation',
      description:
        'Orientation sessions introducing partners, facilitators, and participants to Project Bharti’s financial and digital literacy goals, delivery approach, and expected outcomes.',
      image: programmeOrientation,
      alt: 'Programme orientation session in Delhi',
    },
    {
      id: 'dl-activity-stakeholder-consultation',
      title: 'Stakeholder Consultation',
      description:
        'Consultative discussions with academic, community, and programme stakeholders to align priorities, surface field insights, and refine implementation pathways.',
      image: stakeholderConsultation,
      alt: 'Stakeholder consultation meeting in Delhi',
    },
    {
      id: 'dl-activity-interactive-training',
      title: 'Interactive Training Session',
      description:
        'Facilitator-led interactive training that combines presentation, discussion, and note-taking to build practical financial and digital capabilities among participants.',
      image: interactiveTraining,
      alt: 'Interactive training session in Delhi',
    },
    {
      id: 'dl-activity-project-review',
      title: 'Project Review & Planning',
      description:
        'Structured review and planning meetings focused on progress tracking, operational coordination, and next-phase decisions for Delhi field engagement.',
      image: projectReview,
      alt: 'Project review and planning session in Delhi',
    },
    {
      id: 'dl-activity-appreciation',
      title: 'Appreciation & Recognition',
      description:
        'Formal appreciation moments recognising participant and partner contributions, reinforcing collaborative ownership of Project Bharti’s Delhi programme outcomes.',
      image: appreciationGiftExchange,
      alt: 'Appreciation and recognition ceremony in Delhi',
    },
    {
      id: 'dl-activity-team-collaboration',
      title: 'Team Collaboration',
      description:
        'Collaborative team gatherings documenting the shared work of faculty, facilitators, and community participants advancing literacy and enterprise support in Delhi.',
      image: teamCollaborationGroup,
      alt: 'Team collaboration group photograph in Delhi',
    },
    {
      id: 'dl-activity-keynote-launch',
      title: 'Keynote & Official Launch',
      description:
        'Official launch and keynote engagements with institutional leadership, establishing public commitment to empowering micro-level women entrepreneurs in Delhi.',
      image: keynoteOfficialLaunch,
      alt: 'Keynote and official launch event in Delhi',
    },
    {
      id: 'dl-activity-handbook-launch',
      title: 'Handbook Launch',
      description:
        'Formal launch of the Project Bharti handbook, presenting curated financial and digital literacy resources developed for women entrepreneurs and field facilitators.',
      image: handbookLaunch,
      alt: 'Handbook launch ceremony in Delhi',
    },
  ],
};
