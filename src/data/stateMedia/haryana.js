/**
 * Haryana state media for the Interactive India Map.
 * Same module shape as other states:
 * { gallery: [...], activities: [...], videos?: [...], research?: [...], news?: [...] }
 */

import certificateHandover from '../../assets/images/states/haryana/certificate-handover.png';
import certificateRecognition from '../../assets/images/states/haryana/certificate-recognition.png';
import communityMobilization from '../../assets/images/states/haryana/community-mobilization.png';
import expertAddress from '../../assets/images/states/haryana/expert-address-digital-star.png';
import financialLiteracyClassroom from '../../assets/images/states/haryana/financial-literacy-classroom.png';
import handbookDistribution from '../../assets/images/states/haryana/handbook-distribution.png';
import interactiveClassroom from '../../assets/images/states/haryana/interactive-classroom.png';
import participantRecognition from '../../assets/images/states/haryana/participant-recognition.png';
import programmeInauguration from '../../assets/images/states/haryana/programme-inauguration.png';

export const haryanaMedia = {
  gallery: [
    {
      id: 'hr-gallery-programme-inauguration',
      image: programmeInauguration,
      alt: 'Programme inauguration with Project Bharti banners and expert address to women participants in Haryana',
    },
    {
      id: 'hr-gallery-community-mobilization',
      image: communityMobilization,
      alt: 'Outdoor community mobilisation group photograph with IIT Delhi and EXL banners in Haryana',
    },
    {
      id: 'hr-gallery-expert-address',
      image: expertAddress,
      alt: 'Expert addressing women participants during a financial and digital literacy session in Haryana',
    },
    {
      id: 'hr-gallery-financial-literacy-classroom',
      image: financialLiteracyClassroom,
      alt: 'Financial literacy classroom workshop with women participants and a facilitator in Haryana',
    },
    {
      id: 'hr-gallery-interactive-classroom',
      image: interactiveClassroom,
      alt: 'Interactive classroom session with facilitator and engaged women entrepreneurs in Haryana',
    },
    {
      id: 'hr-gallery-handbook-distribution',
      image: handbookDistribution,
      alt: 'Women participants holding Project Bharti handbooks outside the venue in Haryana',
    },
    {
      id: 'hr-gallery-certificate-recognition',
      image: certificateRecognition,
      alt: 'Certificate and recognition moment with women participants holding handbooks in Haryana',
    },
    {
      id: 'hr-gallery-certificate-handover',
      image: certificateHandover,
      alt: 'Facilitator presenting recognition materials to a participant during a Haryana programme ceremony',
    },
    {
      id: 'hr-gallery-participant-recognition',
      image: participantRecognition,
      alt: 'Participant recognition ceremony with handbook and gift presentation in Haryana',
    },
  ],
  activities: [
    {
      id: 'hr-activity-programme-inauguration',
      title: 'Programme Inauguration & Expert Address',
      description:
        'Formal inauguration of Project Bharti field engagement in Haryana, featuring expert addresses that introduce financial and digital literacy priorities to community participants.',
      image: programmeInauguration,
      alt: 'Programme inauguration and expert address in Haryana',
    },
    {
      id: 'hr-activity-community-mobilization',
      title: 'Community Mobilization',
      description:
        'Large-scale community mobilisation bringing women entrepreneurs, facilitators, and local partners together to anchor programme outreach and participation.',
      image: communityMobilization,
      alt: 'Community mobilisation group event in Haryana',
    },
    {
      id: 'hr-activity-financial-literacy-workshop',
      title: 'Financial Literacy Training Workshop',
      description:
        'Classroom-based workshops supporting practical financial awareness, enterprise decision-making, and guided learning through structured facilitator-led sessions.',
      image: financialLiteracyClassroom,
      alt: 'Financial literacy training workshop in Haryana',
    },
    {
      id: 'hr-activity-interactive-classroom',
      title: 'Interactive Classroom Session',
      description:
        'Interactive classroom sessions where facilitators and participants exchange questions, examples, and peer insights in an active learning environment.',
      image: interactiveClassroom,
      alt: 'Interactive classroom session with women participants in Haryana',
    },
    {
      id: 'hr-activity-participant-engagement',
      title: 'Participant Engagement & Discussion',
      description:
        'Discussion-led engagement moments that encourage dialogue on digital tools, financial practices, and enterprise challenges among women entrepreneurs.',
      image: expertAddress,
      alt: 'Participant engagement and discussion during a Haryana training session',
    },
    {
      id: 'hr-activity-handbook-distribution',
      title: 'Handbook Distribution',
      description:
        'Distribution of Project Bharti learning handbooks to participants, ensuring take-home resources that reinforce financial and digital literacy concepts.',
      image: handbookDistribution,
      alt: 'Handbook distribution to women participants in Haryana',
    },
    {
      id: 'hr-activity-certificate-recognition',
      title: 'Certificate & Recognition Ceremony',
      description:
        'Recognition ceremonies celebrating participant completion and engagement, highlighting collective progress across Haryana field cohorts.',
      image: certificateHandover,
      alt: 'Certificate and recognition ceremony in Haryana',
    },
  ],
};
