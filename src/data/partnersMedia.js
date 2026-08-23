/**
 * Home partnerships media — organised as a visual story.
 * Partners.jsx renders each chapter with featured + supporting layout.
 *
 * kind: 'press' | 'photo'
 * size: 'feature' | 'wide' | 'lg' | 'md' | 'sm'
 */

import campusProgrammeGathering from '../assets/images/partners/gallery/campus-programme-gathering.jpg';
import communityDigitalLiteracySession from '../assets/images/partners/gallery/community-digital-literacy-session.webp';
import communityMarketShowcase from '../assets/images/partners/gallery/community-market-showcase.jpg';
import communityProductShowcase from '../assets/images/partners/gallery/community-product-showcase.webp';
import communityProductShowcaseSm from '../assets/images/partners/gallery/community-product-showcase-800.webp';
import communityStandeeDiscussion from '../assets/images/partners/gallery/community-standee-discussion.webp';
import communityTrainingCentreGroup from '../assets/images/partners/gallery/community-training-centre-group.jpg';
import fieldVisitTeam from '../assets/images/partners/gallery/field-visit-team.webp';
import fieldWelcomeHandover from '../assets/images/partners/gallery/field-welcome-handover.webp';
import mountainHandbookGroupB from '../assets/images/partners/gallery/mountain-handbook-group-b.png';
import programmeHandbookRelease from '../assets/images/partners/gallery/programme-handbook-release.webp';
import communityMobilization from '../assets/images/states/haryana/community-mobilization.png';
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
          id: 'campus-programme-gathering',
          src: campusProgrammeGathering,
          alt: 'Project participants and faculty gathered outside the Department of Management Studies, IIT Delhi',
          caption: 'Campus programme',
          kind: 'photo',
          size: 'lg',
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
          id: 'programme-handbook-release',
          src: programmeHandbookRelease,
          alt: 'Project team on stage holding Project Bharti handbooks after a field programme session',
          caption: 'Handbook release',
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
          size: 'md',
        },
        {
          id: 'community-mobilization',
          src: communityMobilization,
          alt: 'Community participants gathered outdoors with IIT Delhi and EXL programme banners during a field workshop',
          caption: 'Field gathering',
          kind: 'photo',
          size: 'md',
        },
        {
          id: 'field-welcome-handover',
          src: fieldWelcomeHandover,
          alt: 'Project representatives and community participants at a building entrance with IIT Delhi and EXL literacy standees',
          caption: 'Field programme',
          kind: 'photo',
          size: 'md',
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
          id: 'field-visit-team',
          src: fieldVisitTeam,
          alt: 'Project team with women entrepreneurs outside a community centre during a field visit',
          caption: 'Community visit',
          kind: 'photo',
          size: 'md',
        },
        {
          id: 'community-market-showcase',
          src: communityMarketShowcase,
          alt: 'A project representative and producer at a community market display',
          caption: 'Enterprise showcase',
          kind: 'photo',
          size: 'md',
        },
        {
          id: 'community-digital-literacy-session',
          src: communityDigitalLiteracySession,
          alt: 'A facilitator presenting a digital literacy session to women participants around a conference table',
          caption: 'Digital literacy session',
          kind: 'photo',
          size: 'md',
        },
        {
          id: 'community-standee-discussion',
          src: communityStandeeDiscussion,
          alt: 'Participants in discussion around a conference table with an IIT Delhi and EXL programme standee',
          caption: 'Programme discussion',
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
          id: 'community-training-centre-group',
          src: communityTrainingCentreGroup,
          alt: 'Project participants gathered outside a Community Managed Training Centre',
          caption: 'Training centre',
          kind: 'photo',
          size: 'md',
        },
        {
          id: 'mountain-handbook-group-b',
          src: mountainHandbookGroupB,
          alt: 'Women participants holding financial and digital literacy handbooks outdoors in a mountain setting',
          caption: 'Community materials',
          kind: 'photo',
          size: 'md',
        },
      ],
    },
  ],
};

export const partnersMediaItems = partnersMediaContent.chapters.flatMap((chapter) => chapter.items);
