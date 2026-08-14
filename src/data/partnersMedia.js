/**
 * Home partnerships media — organised as a visual story.
 * Partners.jsx renders each chapter with featured + supporting layout.
 *
 * kind: 'press' | 'photo'
 * size: 'feature' | 'wide' | 'lg' | 'md' | 'sm'
 */

import campusProgrammeGathering from '../assets/images/partners/gallery/campus-programme-gathering.jpg';
import collaborationSigning from '../assets/images/partners/gallery/collaboration-signing.jpg';
import communityHandbookGroup from '../assets/images/partners/gallery/community-handbook-group.png';
import communityMarketShowcase from '../assets/images/partners/gallery/community-market-showcase.jpg';
import communityProductShowcase from '../assets/images/partners/gallery/community-product-showcase.webp';
import communityProductShowcaseSm from '../assets/images/partners/gallery/community-product-showcase-800.webp';
import communityTrainingCentreGroup from '../assets/images/partners/gallery/community-training-centre-group.jpg';
import enterpriseStallVisit from '../assets/images/partners/gallery/enterprise-stall-visit.jpg';
import fieldTrainingWorkshop from '../assets/images/partners/gallery/field-training-workshop.png';
import fieldVisitTeam from '../assets/images/partners/gallery/field-visit-team.webp';
import researchCoordinationMeeting from '../assets/images/partners/gallery/research-coordination-meeting.png';
import officialInteraction from '../assets/images/partners/gallery/official-interaction.jpg';
import participantRecognition from '../assets/images/partners/gallery/participant-recognition.jpg';
import programmeAddress from '../assets/images/partners/gallery/programme-address.jpg';
import programmeRecognition from '../assets/images/partners/gallery/programme-recognition.jpg';
import programmeSessionMoment from '../assets/images/partners/gallery/programme-session-moment.jpg';
import programmeStageSession from '../assets/images/partners/gallery/programme-stage-session.jpg';
import amarUjalaDelhi from '../assets/images/partners/newspapers/amar-ujala-delhi.png';
import etGovernmentEmpower from '../assets/images/partners/newspapers/et-government-empower.png';
import narsanFinancialTraining from '../assets/images/partners/newspapers/narsan-financial-training.png';
import nationPressLaunch from '../assets/images/partners/newspapers/nation-press-launch.png';
import theTribuneGumma from '../assets/images/partners/newspapers/the-tribune-gumma.png';
import timesOfIndiaLiteracy from '../assets/images/partners/newspapers/times-of-india-literacy.png';
import womenEntrepreneursReview from '../assets/images/partners/newspapers/women-entrepreneurs-review.png';

export const partnersMediaContent = {
  chapters: [
    {
      id: 'institutional-leadership',
      title: 'Institutional Leadership',
      description:
        'Formal programme documentation reflecting IIT Delhi’s academic leadership and institutional collaboration with EXL.',
      items: [
        {
          id: 'collaboration-signing',
          src: collaborationSigning,
          alt: 'Representatives signing documents during a formal project interaction',
          caption: 'Institutional collaboration',
          kind: 'photo',
          size: 'feature',
        },
        {
          id: 'research-coordination-meeting',
          src: researchCoordinationMeeting,
          alt: 'Project team and participants in a round-table coordination meeting',
          caption: 'Research coordination',
          kind: 'photo',
          size: 'md',
        },
        {
          id: 'programme-stage-session',
          src: programmeStageSession,
          alt: 'Speakers and facilitators on stage during a Project Bharti programme',
          caption: 'Programme session',
          kind: 'photo',
          size: 'md',
        },
        {
          id: 'campus-programme-gathering',
          src: campusProgrammeGathering,
          alt: 'Project participants and organisers gathered outside the Department of Management Studies building',
          caption: 'Campus programme',
          kind: 'photo',
          size: 'md',
        },
        {
          id: 'programme-address',
          src: programmeAddress,
          alt: 'A speaker addressing participants from a lectern during a Project Bharti programme',
          caption: 'Programme address',
          kind: 'photo',
          size: 'md',
        },
      ],
    },
    {
      id: 'field-workshops',
      title: 'Field Workshops',
      description:
        'Capacity-building sessions delivering financial literacy, digital literacy, and enterprise skills with community participants.',
      items: [
        {
          id: 'programme-session-moment',
          src: programmeSessionMoment,
          alt: 'A facilitator and participant during a Project Bharti session',
          caption: 'Training session',
          kind: 'photo',
          size: 'feature',
        },
        {
          id: 'official-interaction',
          src: officialInteraction,
          alt: 'Project representatives during a formal interaction',
          caption: 'Institutional interaction',
          kind: 'photo',
          size: 'md',
        },
        {
          id: 'community-product-showcase',
          src: communityProductShowcase,
          srcSet: `${communityProductShowcaseSm} 800w, ${communityProductShowcase} 1600w`,
          sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px',
          alt: 'Women participants gathered around handmade products and learning materials during a Project Bharti session',
          caption: 'Learning materials',
          kind: 'photo',
          size: 'sm',
        },
        {
          id: 'field-training-workshop',
          src: fieldTrainingWorkshop,
          alt: 'Women participants seated at a conference table during a field training workshop',
          caption: 'Field workshop',
          kind: 'photo',
          size: 'wide',
        },
      ],
    },
    {
      id: 'community-outreach',
      title: 'Community Outreach',
      description:
        'Field visits and market engagements connecting Project Bharti with local enterprises, SHG networks, and community spaces.',
      items: [
        {
          id: 'community-handbook-group',
          src: communityHandbookGroup,
          alt: 'A large group of women participants holding project handbooks outdoors with mountain scenery in the background',
          caption: 'Community engagement',
          kind: 'photo',
          size: 'feature',
        },
        {
          id: 'field-visit-team',
          src: fieldVisitTeam,
          alt: 'Project team with women entrepreneurs outside a community centre during a field visit',
          caption: 'Community visit',
          kind: 'photo',
          size: 'sm',
        },
        {
          id: 'community-market-showcase',
          src: communityMarketShowcase,
          alt: 'A project representative and producer at a community market display',
          caption: 'Enterprise showcase',
          kind: 'photo',
          size: 'sm',
        },
        {
          id: 'enterprise-stall-visit',
          src: enterpriseStallVisit,
          alt: 'Project representatives visiting a local enterprise stall',
          caption: 'Enterprise visit',
          kind: 'photo',
          size: 'md',
        },
        {
          id: 'community-training-centre-group',
          src: communityTrainingCentreGroup,
          alt: 'Project participants gathered outside a Community Managed Training Centre',
          caption: 'Training centre',
          kind: 'photo',
          size: 'md',
        },
      ],
    },
    {
      id: 'media-coverage',
      title: 'Media Coverage',
      description:
        'Selected press coverage documenting Project Bharti’s institutional partnerships, field programmes, and public reporting.',
      layout: 'press',
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
          id: 'et-government-empower',
          src: etGovernmentEmpower,
          alt: 'ET Government article on IIT Delhi and EXL empowering 500 micro-level women entrepreneurs through action research',
          caption: 'ET Government',
          kind: 'press',
          size: 'md',
        },
        {
          id: 'the-tribune-gumma',
          src: theTribuneGumma,
          alt: 'The Tribune article on forty women entrepreneurs enhancing business skills in Gumma, Shimla under IIT Delhi and EXL',
          caption: 'The Tribune',
          kind: 'press',
          size: 'md',
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
          id: 'women-entrepreneurs-review',
          src: womenEntrepreneursReview,
          alt: 'Women Entrepreneurs Review article on IIT Delhi and EXL MoU to empower female entrepreneurs through digital and financial literacy',
          caption: 'Women Entrepreneurs Review',
          kind: 'press',
          size: 'md',
        },
        {
          id: 'amar-ujala-delhi',
          src: amarUjalaDelhi,
          alt: 'Amar Ujala Delhi newspaper cutting about IIT Delhi Project Bharti training for women entrepreneurs',
          caption: 'Amar Ujala',
          kind: 'press',
          size: 'sm',
        },
        {
          id: 'narsan-financial-training',
          src: narsanFinancialTraining,
          alt: 'Hindi newspaper report on IIT Delhi financial management training for self-help group women in Narsan',
          caption: 'Regional Press',
          kind: 'press',
          size: 'sm',
        },
      ],
    },
    {
      id: 'impact-highlights',
      title: 'Impact Highlights',
      description:
        'Recognition and participation milestones documenting outcomes from Project Bharti’s field engagement.',
      items: [
        {
          id: 'programme-recognition',
          src: programmeRecognition,
          alt: 'A project representative presenting a bouquet and acknowledgement to a participant during a programme event',
          caption: 'Programme recognition',
          kind: 'photo',
          size: 'feature',
        },
        {
          id: 'participant-recognition',
          src: participantRecognition,
          alt: 'A participant receiving acknowledgement during a training session',
          caption: 'Participant recognition',
          kind: 'photo',
          size: 'lg',
        },
      ],
    },
  ],
};

export const partnersMediaItems = partnersMediaContent.chapters.flatMap((chapter) => chapter.items);
