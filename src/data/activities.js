import {
  BookOpenCheck,
  ChartNoAxesCombined,
  ClipboardCheck,
  FileText,
  Handshake,
  Landmark,
  Network,
  ShieldCheck,
  Smartphone,
  UsersRound,
} from 'lucide-react';

export const activitiesPageContent = {
  overview: {
    eyebrow: 'Activities',
    title: 'Field programmes linking research, literacy training, and enterprise readiness.',
    description:
      'Project Bharti activities connect academic research with structured field practice. Programmes are organised around women Self Help Groups and micro-level entrepreneurship, combining community-centred delivery, practice-oriented financial and digital literacy training, and systematic research documentation to inform curriculum design and implementation.',
    imageKey: 'community-centered-delivery',
    summaryTitle: 'Field programme approach',
    summary:
      'Across project states, field engagement moves from needs assessment to training delivery and evidence capture—linking SHG participation, enterprise-ready skills, and research learning in a single implementation pathway.',
  },
  inauguralProgramme: {
    eyebrow: 'Inaugural Programme',
    title: 'Formal launch of a research-led field initiative.',
    description:
      'The inaugural programme presents Project Bharti as an IIT Delhi research and outreach initiative implemented in collaboration with EXL. It sets out the project purpose, field priorities, institutional roles, and the pathway from literacy training to community impact.',
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
    title: 'Needs assessment preceding intervention design.',
    description:
      'Focus group discussions gather evidence on women entrepreneurs’ experiences, SHG dynamics, digital access, financial decision-making, barriers to enterprise growth, and community-specific training requirements.',
    imageKey: 'fgd',
    cards: [
      {
        title: 'Participant insights',
        description:
          'Document lived experience relating to savings, credit, digital payments, smartphone use, and enterprise operations.',
        Icon: UsersRound,
      },
      {
        title: 'Training needs',
        description:
          'Identify gaps in financial literacy, digital competence, business practices, and market readiness.',
        Icon: ClipboardCheck,
      },
      {
        title: 'Research inputs',
        description:
          'Capture recurring themes that inform curriculum design, field strategy, and policy-oriented outputs.',
        Icon: ChartNoAxesCombined,
      },
    ],
  },
  districtTrainingProgrammes: {
    eyebrow: 'District-wise Training Programmes',
    title: 'A scalable model for state and district implementation.',
    description:
      'District-level programmes translate the Project Bharti curriculum into practical sessions for women entrepreneurs and SHG-linked communities across the current project states.',
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
      'Digital literacy, safe transactions, and smartphone use',
      'Enterprise readiness, record keeping, and market access',
      'Community learning through SHGs and field partners',
    ],
  },
  methodology: {
    eyebrow: 'Training Methodology',
    title: 'A structured pathway from needs assessment to application.',
    description:
      'The methodology uses clear language, local context, practical exercises, peer learning, and systematic documentation of outcomes for continuous improvement.',
    steps: [
      {
        title: 'Diagnose',
        description:
          'Use focus group discussions and field interactions to assess digital access, financial practices, enterprise needs, and competence gaps.',
        Icon: ClipboardCheck,
      },
      {
        title: 'Design',
        description:
          'Develop training modules that connect financial literacy, digital literacy, and entrepreneurship to everyday business decisions.',
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
          'Record participation, learning outcomes, field observations, and evidence for research outputs and programme refinement.',
        Icon: FileText,
      },
    ],
  },
  impactHighlights: {
    eyebrow: 'Impact Highlights',
    title: 'Intended outcomes of the activity design.',
    description:
      'Verified quantitative outcomes are reported as field implementation progresses. The highlights below describe the primary impact areas guiding activity design.',
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
          'Greater competence in smartphone use, digital payments, online services, and safer digital practices.',
        Icon: Smartphone,
      },
      {
        title: 'Enterprise capability',
        description:
          'Stronger readiness for record keeping, customer engagement, market access, and micro-enterprise decision-making.',
        Icon: Network,
      },
      {
        title: 'Research evidence',
        description:
          'Field documentation that informs curriculum design, scalable literacy models, and policy learning.',
        Icon: ShieldCheck,
      },
    ],
  },
  callToAction: {
    eyebrow: 'Collaborate',
    title: 'Support the next phase of Project Bharti activities.',
    description:
      'Academic collaborators, government agencies, CSR partners, and field organisations can contribute to documentation, training delivery, and evidence generation as implementation expands.',
    primaryLabel: 'Contact Project Bharti',
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
      description: 'Community consultation and field research to identify needs and barriers.',
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
