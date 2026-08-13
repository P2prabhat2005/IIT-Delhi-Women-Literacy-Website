/**
 * Himachal Pradesh state media for the Interactive India Map.
 * Other states can follow this same module shape:
 * { gallery: [...], activities: [...], videos?: [...], research?: [...], news?: [...] }
 */

import capacityBuildingSession from '../../assets/images/states/himachal-pradesh/capacity-building-session.png';
import cmtcShimlaVisit from '../../assets/images/states/himachal-pradesh/cmtc-shimla-visit.webp';
import financialLiteracyWorkshop from '../../assets/images/states/himachal-pradesh/financial-literacy-workshop.webp';
import interactiveLearningClassroom from '../../assets/images/states/himachal-pradesh/interactive-learning-classroom.png';
import moneyWiseOutreachCentre from '../../assets/images/states/himachal-pradesh/money-wise-outreach-centre.webp';
import participantAppreciation from '../../assets/images/states/himachal-pradesh/participant-appreciation.webp';

export const himachalPradeshMedia = {
  gallery: [
    {
      id: 'hp-gallery-financial-literacy-workshop',
      image: financialLiteracyWorkshop,
      alt: 'Women entrepreneurs attending a financial literacy training workshop around a conference table in Himachal Pradesh',
    },
    {
      id: 'hp-gallery-interactive-learning',
      image: interactiveLearningClassroom,
      alt: 'Facilitators leading an interactive classroom learning session with women participants in Himachal Pradesh',
    },
    {
      id: 'hp-gallery-participant-appreciation',
      image: participantAppreciation,
      alt: 'Participant appreciation moment with an IIT Delhi DMS gift bag during a training programme in Himachal Pradesh',
    },
    {
      id: 'hp-gallery-cmtc-shimla',
      image: cmtcShimlaVisit,
      alt: 'Group photograph at the Community Managed Training Centre in Shimla with IIT Delhi and EXL banner',
    },
    {
      id: 'hp-gallery-money-wise-centre',
      image: moneyWiseOutreachCentre,
      alt: 'Women standing behind the Money Wise Centre for Financial Literacy banner in Sarahan, Himachal Pradesh',
    },
    {
      id: 'hp-gallery-capacity-building',
      image: capacityBuildingSession,
      alt: 'Large capacity-building session with women participants taking notes in Himachal Pradesh',
    },
  ],
  activities: [
    {
      id: 'hp-activity-financial-literacy-workshop',
      title: 'Financial Literacy Training Workshop',
      description:
        'Structured workshop sessions helping women entrepreneurs strengthen budgeting, savings, and enterprise financial decisions through guided group learning.',
      image: financialLiteracyWorkshop,
      alt: 'Financial literacy training workshop with women entrepreneurs in Himachal Pradesh',
    },
    {
      id: 'hp-activity-interactive-learning',
      title: 'Community Participation & Interactive Learning',
      description:
        'Classroom-based interactive sessions where facilitators and SHG participants exchange practical questions, peer learning, and field-ready literacy concepts.',
      image: interactiveLearningClassroom,
      alt: 'Interactive community learning session in a Himachal Pradesh classroom',
    },
    {
      id: 'hp-activity-participant-appreciation',
      title: 'Recognition & Participant Appreciation',
      description:
        'Recognition moments celebrating participant engagement and learning milestones during Project Bharti field programmes in Himachal Pradesh.',
      image: participantAppreciation,
      alt: 'Recognition and participant appreciation during a Project Bharti training session',
    },
    {
      id: 'hp-activity-cmtc-visit',
      title: 'Community Managed Training Centre Visit',
      description:
        'Field visit to the Community Managed Training Centre in Shimla, documenting local infrastructure supporting women-focused livelihood training.',
      image: cmtcShimlaVisit,
      alt: 'Visit to the Community Managed Training Centre in Shimla, Himachal Pradesh',
    },
    {
      id: 'hp-activity-outreach-centre',
      title: 'Financial Literacy Outreach Centre',
      description:
        'Engagement at the Money Wise Centre for Financial Literacy in Sarahan, highlighting local outreach spaces for community financial education.',
      image: moneyWiseOutreachCentre,
      alt: 'Financial literacy outreach centre visit in Sarahan, Himachal Pradesh',
    },
    {
      id: 'hp-activity-capacity-building',
      title: 'Capacity Building Session',
      description:
        'Large-group capacity building sessions focused on practical enterprise skills, note-taking, and community dialogue for women entrepreneurs.',
      image: capacityBuildingSession,
      alt: 'Capacity building session with women participants in Himachal Pradesh',
    },
  ],
};
