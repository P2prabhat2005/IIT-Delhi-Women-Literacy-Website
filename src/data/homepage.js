import {
  BadgeIndianRupee,
  BookOpenCheck,
  Building2,
  ChartNoAxesCombined,
  CirclePlay,
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
import { projectBhartiStateNames, projectBhartiTotals, formatWomenTrainedDisplay } from './stateImpact.js';

const womenTrainedDisplay = formatWomenTrainedDisplay(projectBhartiTotals);

export const heroContent = {
  eyebrow: 'Project Bharti',
  title: 'Project Bharti',
  subtitle: 'Financial and Digital Literacy for Women Entrepreneurship',
  description:
    'An IIT Delhi research and outreach initiative that builds financial literacy, digital literacy, and enterprise capability among SHG-linked women entrepreneurs through evidence-based capacity building and community engagement.',
  primaryCta: {
    label: 'About the Project',
    to: '/about',
  },
  secondaryCta: {
    label: 'View Resources',
    to: '/resources',
  },
  stats: [
    { value: projectBhartiTotals.stateCount.toLocaleString('en-IN'), label: 'Project states', detail: projectBhartiStateNames.join(', ') },
    { value: projectBhartiTotals.totalDistricts.toLocaleString('en-IN'), label: 'Districts covered', detail: 'Across current project states' },
    { value: womenTrainedDisplay.formatted, label: womenTrainedDisplay.label, detail: 'Across current project states' },
  ],
  visual: {
    eyebrow: 'Research to field impact',
    title: 'Building enterprise capability through literacy and capacity building',
    footerNote: 'IIT Delhi–led research and outreach',
  },
  pillars: [
    { label: 'Financial literacy', Icon: Landmark },
    { label: 'Digital literacy', Icon: BookOpenCheck },
    { label: 'Women entrepreneurship', Icon: UsersRound },
  ],
};

export const aboutProjectContent = {
  section: {
    eyebrow: 'About the Project',
    title: 'Research to Field Impact',
    description:
      'An IIT Delhi–led initiative that connects academic research with structured field implementation in financial literacy, digital literacy, and women entrepreneurship.',
  },
  institutions: [
    {
      title: 'Research & Evidence',
      Icon: Building2,
      accent: 'text-red-900 bg-red-50 border-red-100',
      body:
        'Project Bharti begins with evidence-based research, community needs assessment, and academic analysis. This work establishes a clear understanding of the conditions facing women-led micro-enterprises and informs curriculum design, delivery methods, and evaluation.',
      points: ['Evidence-based research', 'Community needs assessment', 'Academic analysis', 'Data-informed design', 'Foundation for implementation'],
    },
    {
      title: 'Implementation & Impact',
      Icon: ChartNoAxesCombined,
      accent: 'text-orange-700 bg-orange-50 border-orange-100',
      body:
        'Research findings are translated into field programmes through capacity building, financial literacy, digital literacy, and community engagement. Delivered under IIT Delhi’s academic leadership in collaboration with EXL, the model is designed to generate measurable outcomes for women entrepreneurs and their communities.',
      points: ['Capacity building', 'Digital literacy', 'Financial literacy', 'Community engagement', 'Measurable field impact'],
    },
  ],
  overview: {
    eyebrow: 'Project Bharti',
    title: 'From literacy to livelihood practice.',
    paragraphs: [
      'Project Bharti supports women Self Help Groups and micro-level entrepreneurs who require practical financial literacy, digital literacy, and entrepreneurship skills to participate more effectively in local markets.',
      'The project converts research insight into field-ready capacity building. Learning is linked to everyday enterprise decisions such as savings, payments, customer access, record keeping, and responsible use of digital tools.',
      'Under IIT Delhi’s institutional leadership, and in collaboration with EXL, Project Bharti combines academic research, data-informed programme design, and community-centred delivery to produce measurable impact for women-led enterprises.',
    ],
    highlights: ['Women SHGs', 'Financial literacy', 'Digital literacy', 'Capacity building'],
  },
  aboutIntro: {
    whatIs: {
      title: 'What is Project Bharti?',
      body: [
        'Project Bharti is an IIT Delhi research and outreach initiative that enables SHG-linked women entrepreneurs to strengthen financial confidence, digital readiness, and enterprise capability. Academic leadership at IIT Delhi guides the research agenda, while collaboration with EXL supports structured field delivery.',
        'The project centres on financial and digital literacy for women-led micro-enterprises. Training is applied to everyday decisions—savings, payments, record keeping, customer access, and safe use of digital tools—so participants can transfer skills directly into livelihood practice. Through community engagement and capacity building across project states, Project Bharti translates research into measurable community impact for women entrepreneurs and local enterprise networks.',
      ],
    },
    focusAreas: [
      {
        title: 'Financial Literacy',
        description:
          'Builds practical financial confidence for women-led micro-enterprises, applied to everyday decisions such as savings, payments, and record keeping.',
        Icon: Landmark,
      },
      {
        title: 'Digital Literacy',
        description:
          'Strengthens digital readiness and safe use of digital tools so participants can engage more effectively with digital financial systems.',
        Icon: Smartphone,
      },
      {
        title: 'Women Entrepreneurship',
        description:
          'Supports SHG-linked women entrepreneurs in building enterprise capability, reinforcing local enterprise networks, and strengthening market participation.',
        Icon: UsersRound,
      },
    ],
    approach: {
      title: 'Project Approach',
      steps: [
        'Research',
        'Community Engagement',
        'Training & Capacity Building',
        'Measurable Community Impact',
      ],
    },
    highlights: [
      { label: `${projectBhartiTotals.stateCount} States` },
      { label: `${womenTrainedDisplay.formatted} Women Trained` },
      { label: 'IIT Delhi + EXL Collaboration' },
      { label: 'Financial & Digital Literacy' },
    ],
  },
  visionMission: [
    {
      title: 'Vision',
      description:
        'To enable SHG-linked women entrepreneurs to participate in local economies with stronger financial confidence, digital readiness, and enterprise capability.',
      Icon: ShieldCheck,
    },
    {
      title: 'Mission',
      description:
        'To develop practical literacy programmes, capacity-building models, and research-informed pathways that help women-led micro-enterprises use finance, technology, and market access more effectively.',
      Icon: Handshake,
    },
  ],
};

export const objectives = [
  {
    title: 'Financial Literacy',
    description:
      'Strengthen practical knowledge of savings, budgeting, banking, credit, insurance, and responsible financial decision-making for women entrepreneurs.',
    Icon: BadgeIndianRupee,
    tone: 'from-red-50 to-white text-red-900 border-red-100',
  },
  {
    title: 'Digital Literacy',
    description:
      'Build competence in using smartphones, digital payments, online services, and safe digital practices for everyday enterprise activity.',
    Icon: Smartphone,
    tone: 'from-cyan-50 to-white text-cyan-900 border-cyan-100',
  },
  {
    title: 'Women Entrepreneurship',
    description:
      'Support women-led micro-enterprises through business awareness, record keeping, customer engagement, and growth-oriented planning.',
    Icon: UsersRound,
    tone: 'from-rose-50 to-white text-rose-900 border-rose-100',
  },
  {
    title: 'Capacity Building',
    description:
      'Develop training models, facilitator resources, and community learning pathways that help SHGs sustain knowledge beyond workshops.',
    Icon: BookOpenCheck,
    tone: 'from-amber-50 to-white text-amber-900 border-amber-100',
  },
  {
    title: 'Market Linkages',
    description:
      'Enable women entrepreneurs to connect with local markets, digital channels, institutional networks, and support ecosystems.',
    Icon: Network,
    tone: 'from-emerald-50 to-white text-emerald-900 border-emerald-100',
  },
  {
    title: 'Research & Policy Impact',
    description:
      'Generate evidence from field implementation to inform scalable literacy programmes, institutional strategy, and inclusive policy design.',
    Icon: ClipboardCheck,
    tone: 'from-slate-100 to-white text-slate-900 border-slate-200',
  },
];

export const objectiveImpactHighlights = [
  {
    label: 'Project States',
    value: projectBhartiTotals.stateCount,
    helper: 'Current geographic coverage',
  },
  {
    label: 'Districts Covered',
    value: projectBhartiTotals.totalDistricts,
    helper: 'Across current project states',
  },
  {
    label: 'Women Trained',
    value: womenTrainedDisplay.value,
    suffix: womenTrainedDisplay.suffix,
    helper: 'Across current project states',
  },
];

export const activities = [
  {
    title: 'Field Workshops',
    description:
      'Structured training sessions designed around enterprise tasks, local contexts, and practical application of financial and digital skills.',
    Icon: UsersRound,
  },
  {
    title: 'Financial Clinics',
    description:
      'Facilitated support for banking, credit, savings, and responsible digital transaction practices.',
    Icon: Landmark,
  },
  {
    title: 'Research Visits',
    description:
      'Field engagements that document adoption barriers, learning outcomes, and evidence for programme refinement.',
    Icon: MapPinned,
  },
];

export const resources = [
  {
    title: 'Case Studies',
    description: 'Official field stories of women entrepreneurs featured in Stories from the Field.',
    Icon: UsersRound,
    to: '/resources#case-studies',
  },
  {
    title: 'Training Videos',
    description: 'Short instructional videos for community learning and outreach sessions.',
    Icon: CirclePlay,
    to: '/resources',
  },
  {
    title: 'Other Documents',
    description: 'Training materials, reference guides, and supporting documents for facilitators and partners.',
    Icon: FileText,
    to: '/resources#other-documents',
  },
];

export const contactChannels = [
  'Academic collaboration',
  'Field partnerships',
  'Resource development',
  'Student engagement',
];

export const contactCtaContent = {
  eyebrow: 'Collaborate',
  title: 'Partner with Project Bharti.',
  description:
    'Institutions, public agencies, CSR partners, and community organisations can collaborate on research, field delivery, training resources, and community engagement for women entrepreneurs.',
  buttonLabel: 'Contact Project Bharti',
  buttonTo: '/contact',
};
