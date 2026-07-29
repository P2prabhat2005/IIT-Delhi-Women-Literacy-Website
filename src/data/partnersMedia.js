/**
 * Unified media wall for the Home partnerships section.
 * Add items here only — Partners.jsx lays them out from size hints.
 *
 * kind: 'press' | 'photo'
 * size: 'feature' | 'wide' | 'lg' | 'md' | 'sm'
 */

import auditoriumAudience from '../assets/images/partners/gallery/auditorium-audience.png';
import circleDiscussion from '../assets/images/partners/gallery/circle-discussion.png';
import communitySession from '../assets/images/partners/gallery/community-session.png';
import exlTrainingWorkshop from '../assets/images/partners/gallery/exl-training-workshop.png';
import fieldVisitMaal from '../assets/images/partners/gallery/field-visit-maal.png';
import fieldVisitTeam from '../assets/images/partners/gallery/field-visit-team.png';
import handbookLaunchCeremony from '../assets/images/partners/gallery/handbook-launch-ceremony.png';
import indoorParticipantsGroup from '../assets/images/partners/gallery/indoor-participants-group.png';
import indoorTrainingGroup from '../assets/images/partners/gallery/indoor-training-group.png';
import mountainFieldGroupA from '../assets/images/partners/gallery/mountain-field-group-a.png';
import mountainFieldGroupB from '../assets/images/partners/gallery/mountain-field-group-b.png';
import mountainHandbookGroupA from '../assets/images/partners/gallery/mountain-handbook-group-a.png';
import mountainHandbookGroupB from '../assets/images/partners/gallery/mountain-handbook-group-b.png';
import recognitionCeremony from '../assets/images/partners/gallery/recognition-ceremony.png';
import skillsWorkshop from '../assets/images/partners/gallery/skills-workshop.png';
import amarUjalaDelhi from '../assets/images/partners/newspapers/amar-ujala-delhi.png';
import arunachalTimesMou from '../assets/images/partners/newspapers/arunachal-times-mou.png';
import etGovernmentEmpower from '../assets/images/partners/newspapers/et-government-empower.png';
import narsanFinancialTraining from '../assets/images/partners/newspapers/narsan-financial-training.png';
import nationPressLaunch from '../assets/images/partners/newspapers/nation-press-launch.png';
import theTribuneGumma from '../assets/images/partners/newspapers/the-tribune-gumma.png';
import timesOfIndiaLiteracy from '../assets/images/partners/newspapers/times-of-india-literacy.png';
import womenEntrepreneursReview from '../assets/images/partners/newspapers/women-entrepreneurs-review.png';

export const partnersMediaContent = {
  wall: {
    id: 'media-wall',
    items: [
      {
        id: 'times-of-india-literacy',
        src: timesOfIndiaLiteracy,
        alt: 'Times of India article on IIT Delhi joining a project to boost financial and digital literacy among women entrepreneurs',
        caption: 'The Times of India',
        kind: 'press',
        size: 'feature',
      },
      {
        id: 'skills-workshop',
        src: skillsWorkshop,
        alt: 'Women participating in a hands-on skills workshop during a Project Bharti capacity-building session',
        caption: 'Skills workshop',
        kind: 'photo',
        size: 'md',
      },
      {
        id: 'mountain-field-group-a',
        src: mountainFieldGroupA,
        alt: 'Project team and women entrepreneurs gathered on a mountain terrace during a field visit',
        caption: 'Mountain field visit',
        kind: 'photo',
        size: 'wide',
      },
      {
        id: 'et-government-empower',
        src: etGovernmentEmpower,
        alt: 'ET Government article on IIT Delhi and EXL empowering 500 micro-level women entrepreneurs through action research',
        caption: 'ET Government',
        kind: 'press',
        size: 'lg',
      },
      {
        id: 'circle-discussion',
        src: circleDiscussion,
        alt: 'Facilitators leading a circle discussion with women entrepreneurs in a community training room',
        caption: 'Circle discussion',
        kind: 'photo',
        size: 'sm',
      },
      {
        id: 'amar-ujala-delhi',
        src: amarUjalaDelhi,
        alt: 'Amar Ujala Delhi newspaper cutting about IIT Delhi Project Bharti training for women entrepreneurs',
        caption: 'Amar Ujala',
        kind: 'press',
        size: 'md',
      },
      {
        id: 'field-visit-maal',
        src: fieldVisitMaal,
        alt: 'Project team and women entrepreneurs gathered outside a Mission Shakti centre in Maal, Lalitpur',
        caption: 'Field visit',
        kind: 'photo',
        size: 'lg',
      },
      {
        id: 'women-entrepreneurs-review',
        src: womenEntrepreneursReview,
        alt: 'Women Entrepreneurs Review article on IIT Delhi and EXL MoU to empower female entrepreneurs through digital and financial literacy',
        caption: 'Women Entrepreneurs Review',
        kind: 'press',
        size: 'md',
      },
      {
        id: 'indoor-training-group',
        src: indoorTrainingGroup,
        alt: 'Project facilitators and women participants posing together after an indoor training session',
        caption: 'Training group',
        kind: 'photo',
        size: 'sm',
      },
      {
        id: 'mountain-handbook-group-a',
        src: mountainHandbookGroupA,
        alt: 'Large group of women entrepreneurs holding Project Bharti handbooks against a mountain backdrop',
        caption: 'Handbook distribution',
        kind: 'photo',
        size: 'feature',
      },
      {
        id: 'arunachal-times-mou',
        src: arunachalTimesMou,
        alt: 'The Arunachal Times article on IIT Delhi and ArSRLM MoU to empower women entrepreneurs',
        caption: 'The Arunachal Times',
        kind: 'press',
        size: 'md',
      },
      {
        id: 'exl-training-workshop',
        src: exlTrainingWorkshop,
        alt: 'Project Bharti training workshop with IIT Delhi and EXL facilitators addressing women entrepreneurs',
        caption: 'Training workshop',
        kind: 'photo',
        size: 'sm',
      },
      {
        id: 'the-tribune-gumma',
        src: theTribuneGumma,
        alt: 'The Tribune article on forty women entrepreneurs enhancing business skills in Gumma, Shimla under IIT Delhi and EXL',
        caption: 'The Tribune',
        kind: 'press',
        size: 'lg',
      },
      {
        id: 'recognition-ceremony',
        src: recognitionCeremony,
        alt: 'Project Bharti recognition ceremony with participants and facilitators in a training hall',
        caption: 'Recognition ceremony',
        kind: 'photo',
        size: 'sm',
      },
      {
        id: 'auditorium-audience',
        src: auditoriumAudience,
        alt: 'Women entrepreneurs seated in an auditorium during a Project Bharti programme',
        caption: 'Programme audience',
        kind: 'photo',
        size: 'wide',
      },
      {
        id: 'nation-press-launch',
        src: nationPressLaunch,
        alt: 'Nation Press article on IIT Delhi and EXL empowering women entrepreneurs through action research',
        caption: 'Nation Press',
        kind: 'press',
        size: 'md',
      },
      {
        id: 'handbook-launch-ceremony',
        src: handbookLaunchCeremony,
        alt: 'Large group at the Project Bharti handbook launch ceremony in an auditorium with IIT Delhi and EXL teams',
        caption: 'Handbook launch',
        kind: 'photo',
        size: 'feature',
      },
      {
        id: 'narsan-financial-training',
        src: narsanFinancialTraining,
        alt: 'Hindi newspaper report on IIT Delhi financial management training for self-help group women in Narsan',
        caption: 'Regional Press',
        kind: 'press',
        size: 'md',
      },
      {
        id: 'community-session',
        src: communitySession,
        alt: 'Community training session with women entrepreneurs seated in a hall listening to a facilitator',
        caption: 'Community session',
        kind: 'photo',
        size: 'sm',
      },
      {
        id: 'indoor-participants-group',
        src: indoorParticipantsGroup,
        alt: 'Women participants and facilitators gathered indoors after a Project Bharti training activity',
        caption: 'Participants group',
        kind: 'photo',
        size: 'md',
      },
      {
        id: 'mountain-handbook-group-b',
        src: mountainHandbookGroupB,
        alt: 'Women entrepreneurs celebrating outdoors with Project Bharti handbooks in a mountain region',
        caption: 'Field celebration',
        kind: 'photo',
        size: 'wide',
      },
      {
        id: 'field-visit-team',
        src: fieldVisitTeam,
        alt: 'Project team with women entrepreneurs outside a community centre during a field visit',
        caption: 'Community visit',
        kind: 'photo',
        size: 'lg',
      },
      {
        id: 'mountain-field-group-b',
        src: mountainFieldGroupB,
        alt: 'Community group with project facilitators on a mountain terrace overlooking green hills',
        caption: 'Hill community visit',
        kind: 'photo',
        size: 'md',
      },
    ],
  },
};
