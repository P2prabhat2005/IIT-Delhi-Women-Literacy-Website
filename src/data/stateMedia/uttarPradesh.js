/**
 * Uttar Pradesh state media for the Interactive India Map.
 * Same module shape as other states:
 * { gallery: [...], activities: [...], videos?: [...], research?: [...], news?: [...] }
 */

import expertPanelDiscussion from '../../assets/images/states/uttar-pradesh/expert-panel-discussion.png';
import hybridSessionAudience from '../../assets/images/states/uttar-pradesh/hybrid-session-audience.png';
import hybridSessionWide from '../../assets/images/states/uttar-pradesh/hybrid-session-wide.png';
import inaugurationAudienceView from '../../assets/images/states/uttar-pradesh/inauguration-audience-view.png';
import panelStageFull from '../../assets/images/states/uttar-pradesh/panel-stage-full.png';
import recognitionGiftCloseup from '../../assets/images/states/uttar-pradesh/recognition-gift-closeup.png';
import recognitionStageCeremony from '../../assets/images/states/uttar-pradesh/recognition-stage-ceremony.png';

export const uttarPradeshMedia = {
  gallery: [
    {
      id: 'up-gallery-recognition-gift',
      image: recognitionGiftCloseup,
      alt: 'Recognition moment with gift presentation to a woman entrepreneur during a Project Bharti programme in Uttar Pradesh',
    },
    {
      id: 'up-gallery-recognition-stage',
      image: recognitionStageCeremony,
      alt: 'Stage recognition ceremony with IIT Delhi and EXL branding during a Project Bharti event in Uttar Pradesh',
    },
    {
      id: 'up-gallery-hybrid-audience',
      image: hybridSessionAudience,
      alt: 'Hybrid knowledge sharing session with women participants watching a remote speaker in Uttar Pradesh',
    },
    {
      id: 'up-gallery-hybrid-wide',
      image: hybridSessionWide,
      alt: 'Wide view of a hybrid knowledge sharing session connecting field participants with remote experts in Uttar Pradesh',
    },
    {
      id: 'up-gallery-panel-stage',
      image: panelStageFull,
      alt: 'Panel stage presenting financial and digital literacy goals for women entrepreneurs in Uttar Pradesh',
    },
    {
      id: 'up-gallery-inauguration',
      image: inaugurationAudienceView,
      alt: 'Programme inauguration with audience and stage presentation for Project Bharti in Uttar Pradesh',
    },
    {
      id: 'up-gallery-expert-panel',
      image: expertPanelDiscussion,
      alt: 'Expert panel discussion on financial and digital literacy for micro-level women entrepreneurs in Uttar Pradesh',
    },
  ],
  activities: [
    {
      id: 'up-activity-programme-inauguration',
      title: 'Programme Inauguration',
      description:
        'Formal inauguration of Project Bharti engagement in Uttar Pradesh, introducing programme goals, partners, and financial–digital literacy priorities to community participants.',
      image: inaugurationAudienceView,
      alt: 'Programme inauguration session in Uttar Pradesh',
    },
    {
      id: 'up-activity-financial-literacy',
      title: 'Financial Literacy Capacity Building',
      description:
        'Capacity-building sessions focused on strengthening financial awareness, digital literacy, and enterprise readiness among micro-level women entrepreneurs.',
      image: panelStageFull,
      alt: 'Financial literacy capacity building session in Uttar Pradesh',
    },
    {
      id: 'up-activity-hybrid-knowledge',
      title: 'Hybrid Knowledge Sharing Session',
      description:
        'Hybrid knowledge-sharing formats connecting in-person community cohorts with remote experts, enabling real-time learning across field and institutional settings.',
      image: hybridSessionWide,
      alt: 'Hybrid knowledge sharing session in Uttar Pradesh',
    },
    {
      id: 'up-activity-expert-panel',
      title: 'Expert Panel Discussion',
      description:
        'Expert panel discussions bringing academic, institutional, and programme voices together to examine literacy needs and implementation pathways for women entrepreneurs.',
      image: expertPanelDiscussion,
      alt: 'Expert panel discussion in Uttar Pradesh',
    },
    {
      id: 'up-activity-community-leadership',
      title: 'Community Leadership Interaction',
      description:
        'Structured interaction between programme facilitators and community leaders to reinforce local ownership, participation, and sustained outreach for Project Bharti.',
      image: hybridSessionAudience,
      alt: 'Community leadership interaction during a Project Bharti session in Uttar Pradesh',
    },
    {
      id: 'up-activity-recognition',
      title: 'Recognition & Appreciation Ceremony',
      description:
        'Recognition ceremonies celebrating participant and stakeholder contributions, marking learning milestones within Uttar Pradesh field programmes.',
      image: recognitionGiftCloseup,
      alt: 'Recognition and appreciation ceremony in Uttar Pradesh',
    },
    {
      id: 'up-activity-project-coordination',
      title: 'Project Coordination & Closing Session',
      description:
        'Coordination and closing engagements summarising programme delivery, acknowledging collaborators, and consolidating next steps for continued field impact.',
      image: recognitionStageCeremony,
      alt: 'Project coordination and closing session in Uttar Pradesh',
    },
  ],
};
