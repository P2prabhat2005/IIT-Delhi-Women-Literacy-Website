import {
  BookOpenCheck,
  ChartNoAxesCombined,
  ClipboardCheck,
  FileText,
  Handshake,
  Landmark,
  MapPinned,
  Network,
  ShieldCheck,
  Smartphone,
  UsersRound,
} from 'lucide-react';

export const activitiesPageContent = {
  overview: {
    eyebrow: 'Activities',
    title: 'Field engagement for literacy, enterprise readiness, and research learning.',
    description:
      'Project Bharti activities are designed to connect academic research with field practice. Each programme is structured around women Self Help Groups, micro-level entrepreneurship, financial literacy, digital literacy, and capacity building.',
    cards: [
      {
        title: 'Community-centered delivery',
        description:
          'Activities are shaped around SHG participation, local enterprise realities, and practical learning needs.',
        Icon: UsersRound,
      },
      {
        title: 'Practice-led training',
        description:
          'Sessions focus on usable financial and digital skills that can support daily enterprise decisions.',
        Icon: Smartphone,
      },
      {
        title: 'Research documentation',
        description:
          'Field interactions are structured to capture insights for future training design, policy learning, and implementation refinement.',
        Icon: FileText,
      },
    ],
  },
  inauguralProgramme: {
    eyebrow: 'Inaugural Programme',
    title: 'A formal launch for a research-led field initiative.',
    description:
      'The inaugural programme introduces Project Bharti as a collaborative initiative between IIT Delhi and EXL. It frames the project purpose, field priorities, partner roles, and the pathway from literacy-building to community impact.',
    imageKey: 'inaugural',
    highlights: [
      'Project introduction and institutional context',
      'Orientation on women entrepreneurship and SHG-linked capacity building',
      'Shared roadmap for field activities, training, and documentation',
    ],
    Icon: Landmark,
  },
  focusGroupDiscussions: {
    eyebrow: 'Focus Group Discussions',
    title: 'Listening sessions to understand needs before intervention design.',
    description:
      'FGDs help the team understand women entrepreneurs, SHG dynamics, digital access, financial decision-making, barriers to enterprise growth, and community-specific training needs.',
    imageKey: 'fgd',
    cards: [
      {
        title: 'Participant insights',
        description:
          'Capture lived experiences around savings, credit, digital payments, smartphones, and enterprise operations.',
        Icon: UsersRound,
      },
      {
        title: 'Training needs',
        description:
          'Identify gaps in financial literacy, digital confidence, business practices, and market readiness.',
        Icon: ClipboardCheck,
      },
      {
        title: 'Research inputs',
        description:
          'Document recurring themes that can inform curriculum design, field strategy, and policy-oriented outputs.',
        Icon: ChartNoAxesCombined,
      },
    ],
  },
  districtTrainingProgrammes: {
    eyebrow: 'District-wise Training Programmes',
    title: 'A scalable model for state and district level implementation.',
    description:
      'District-wise programmes will translate the Project Bharti curriculum into practical sessions for women entrepreneurs and SHG-linked communities across the current project states.',
    imageKey: 'district-training',
    states: [
      'Delhi',
      'Haryana',
      'Himachal Pradesh',
      'Uttarakhand',
      'Uttar Pradesh',
    ],
    trainingFocus: [
      'Financial literacy and responsible decision-making',
      'Digital literacy, safe transactions, and smartphone usage',
      'Enterprise readiness, record keeping, and market access',
      'Community-led learning through SHGs and field partners',
    ],
  },
  methodology: {
    eyebrow: 'Training Methodology',
    title: 'A structured learning pathway from awareness to application.',
    description:
      'The methodology prioritizes simple language, local context, hands-on exercises, peer learning, and documentation of outcomes for continuous improvement.',
    steps: [
      {
        title: 'Diagnose',
        description:
          'Use FGDs and field interactions to understand digital access, financial practices, enterprise needs, and confidence gaps.',
        Icon: ClipboardCheck,
      },
      {
        title: 'Design',
        description:
          'Create training modules that connect financial literacy, digital literacy, and entrepreneurship to everyday business decisions.',
        Icon: BookOpenCheck,
      },
      {
        title: 'Deliver',
        description:
          'Conduct practical sessions with SHGs and women entrepreneurs using examples, exercises, and facilitator-led support.',
        Icon: Handshake,
      },
      {
        title: 'Document',
        description:
          'Capture participation, learnings, field observations, and evidence for research outputs and future programme refinement.',
        Icon: FileText,
      },
    ],
  },
  impactHighlights: {
    eyebrow: 'Impact Highlights',
    title: 'What the activities are designed to strengthen.',
    description:
      'Verified quantitative outcomes will be added after field implementation. The current highlights reflect the intended impact areas of the activity design.',
    cards: [
      {
        title: 'Financial confidence',
        description:
          'Improved understanding of savings, credit, banking, budgeting, and responsible use of financial services.',
        Icon: Landmark,
      },
      {
        title: 'Digital readiness',
        description:
          'Greater confidence in smartphones, digital payments, online services, and safer digital behavior.',
        Icon: Smartphone,
      },
      {
        title: 'Enterprise capability',
        description:
          'Better readiness for record keeping, customer engagement, market access, and micro-enterprise decision-making.',
        Icon: Network,
      },
      {
        title: 'Research evidence',
        description:
          'Field documentation that can support future policy learning, training design, and scalable literacy models.',
        Icon: ShieldCheck,
      },
    ],
  },
  callToAction: {
    eyebrow: 'Collaborate',
    title: 'Support the next phase of Project Bharti activities.',
    description:
      'The activities page is ready to receive official images, district data, training reports, and field documentation as the project implementation progresses.',
    primaryLabel: 'Contact the Team',
    primaryTo: '/contact',
    secondaryLabel: 'View Resources',
    secondaryTo: '/resources',
  },
  timeline: [
    {
      label: 'Phase 01',
      title: 'Inaugural Programme',
      description: 'Project launch, stakeholder orientation, and institutional alignment.',
    },
    {
      label: 'Phase 02',
      title: 'Focus Group Discussions',
      description: 'Community listening and field research to identify needs and barriers.',
    },
    {
      label: 'Phase 03',
      title: 'District-wise Training',
      description: 'Structured literacy and enterprise training across current project states.',
    },
    {
      label: 'Phase 04',
      title: 'Documentation and Learning',
      description: 'Evidence capture, reporting, and refinement for future scaling.',
    },
  ],
};
