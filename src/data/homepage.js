import {
  BadgeIndianRupee,
  Banknote,
  BookOpenCheck,
  Building2,
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
import { projectBhartiStateNames, projectBhartiTotals } from './stateImpact.js';

export const impactMetrics = [
  { value: projectBhartiTotals.stateCount.toLocaleString('en-IN'), label: 'Current states' },
  { value: projectBhartiTotals.totalDistricts.toLocaleString('en-IN'), label: 'Districts covered' },
  { value: projectBhartiTotals.totalWomenTrained.toLocaleString('en-IN'), label: 'Women trained' },
];

export const heroContent = {
  eyebrow: 'IIT Delhi Research Project',
  title: 'Project Bharti',
  subtitle: 'Empowering Micro-Level Women Entrepreneurs through Financial and Digital Literacy',
  description:
    'Project Bharti is an IIT Delhi initiative with EXL focused on strengthening SHG-linked women entrepreneurs through financial literacy, digital literacy, entrepreneurship support, and capacity building for community impact.',
  primaryCta: {
    label: 'Explore Project',
    to: '/about',
  },
  secondaryCta: {
    label: 'View Resources',
    to: '/resources',
  },
  stats: [
    { value: projectBhartiTotals.stateCount.toLocaleString('en-IN'), label: 'Current states', detail: projectBhartiStateNames.join(', ') },
    { value: projectBhartiTotals.totalDistricts.toLocaleString('en-IN'), label: 'Districts covered', detail: 'Across current project states' },
    { value: projectBhartiTotals.totalWomenTrained.toLocaleString('en-IN'), label: 'Women trained', detail: 'Across current project states' },
  ],
  visual: {
    eyebrow: 'Research to field impact',
    title: 'Building capability for women-led micro-enterprises',
    footerNote: 'IIT Delhi x EXL collaboration',
  },
  pillars: [
    { label: 'Financial literacy', Icon: Landmark },
    { label: 'Digital literacy', Icon: BookOpenCheck },
    { label: 'Women empowerment', Icon: UsersRound },
  ],
};

export const aboutProjectContent = {
  section: {
    eyebrow: 'About Project',
    title: 'RESEARCH TO FIELD IMPACT',
    description:
      'A research-led initiative shaped by evidence, capacity building, and community-centered implementation.',
  },
  institutions: [
    {
      title: 'Research & Evidence',
      Icon: Building2,
      accent: 'text-red-900 bg-red-50 border-red-100',
      body:
        'Project Bharti begins with evidence-based research, community needs assessment, and academic insight. The work builds a grounded understanding of the realities facing women-led micro-enterprises and creates a strong foundation for responsive learning and action.',
      points: ['Evidence-based research', 'Community needs assessment', 'Academic insights', 'Data-driven understanding', 'Foundation for Project Bharti'],
    },
    {
      title: 'Implementation & Impact',
      Icon: ChartNoAxesCombined,
      accent: 'text-orange-700 bg-orange-50 border-orange-100',
      body:
        'From that foundation, Project Bharti moves into practical implementation through capacity building, digital literacy, financial literacy, and community engagement. With contributors from IIT Delhi and EXL, the journey is designed to translate insight into measurable field impact for women entrepreneurs and their communities.',
      points: ['Capacity building', 'Digital literacy', 'Financial literacy', 'Community engagement', 'Measurable field impact'],
    },
  ],
  overview: {
    eyebrow: 'Project Bharti',
    title: 'From literacy to livelihood confidence.',
    paragraphs: [
      'Project Bharti was created to support women Self Help Groups and micro-level entrepreneurs who need practical financial literacy, digital literacy, and entrepreneurship capability to participate more confidently in local markets.',
      'The project translates the preface into field-ready capacity building. Learning is connected to everyday enterprise decisions such as savings, payments, customer access, record keeping, and responsible use of digital tools.',
      'Through the IIT Delhi and EXL collaboration, Project Bharti combines academic research, data-informed thinking, and community-oriented implementation to create measurable impact for women-led enterprises.',
    ],
    highlights: ['Women SHGs', 'Financial literacy', 'Digital literacy', 'Capacity building'],
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
        'To build practical literacy, capacity building models, and research-informed pathways that help women-led micro-enterprises use finance, technology, and market access more effectively.',
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
      'Build confidence in using smartphones, digital payments, online services, and safe digital practices for daily enterprise activity.',
    Icon: Smartphone,
    tone: 'from-cyan-50 to-white text-cyan-900 border-cyan-100',
  },
  {
    title: 'Women Entrepreneurship',
    description:
      'Support women-led micro-enterprises through business awareness, record keeping, customer engagement, and growth-oriented thinking.',
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
      'Generate evidence from field implementation to inform scalable literacy programs, institutional strategy, and inclusive policy design.',
    Icon: ClipboardCheck,
    tone: 'from-slate-100 to-white text-slate-900 border-slate-200',
  },
];

export const objectiveImpactHighlights = [
  {
    label: 'Current States',
    value: projectBhartiTotals.stateCount,
    helper: 'Current project coverage',
  },
  {
    label: 'Districts Covered',
    value: projectBhartiTotals.totalDistricts,
    helper: 'Across current project states',
  },
  {
    label: 'Women Trained',
    value: projectBhartiTotals.totalWomenTrained,
    helper: 'Across current project states',
  },
];

export const states = [
  { name: 'Delhi NCR', focus: 'Urban micro-enterprises', tone: 'bg-red-50 text-red-800' },
  { name: 'Rajasthan', focus: 'Self-help group networks', tone: 'bg-amber-50 text-amber-800' },
  { name: 'Uttar Pradesh', focus: 'Emerging market clusters', tone: 'bg-emerald-50 text-emerald-800' },
  { name: 'Maharashtra', focus: 'Digital payment adoption', tone: 'bg-sky-50 text-sky-800' },
];

export const activities = [
  {
    title: 'Field Workshops',
    description:
      'Hands-on training sessions designed around real business tasks and local language contexts.',
    Icon: UsersRound,
  },
  {
    title: 'Financial Clinics',
    description:
      'Guided support for banking, credit, savings, and responsible digital transaction practices.',
    Icon: Landmark,
  },
  {
    title: 'Research Visits',
    description:
      'Structured field interactions to understand adoption barriers and measurable learning outcomes.',
    Icon: MapPinned,
  },
];

export const resources = [
  {
    title: 'Training Modules',
    description: 'Curriculum-ready digital and financial literacy modules for future release.',
    Icon: BookOpenCheck,
  },
  {
    title: 'Policy Briefs',
    description: 'Concise research outputs for institutions, public bodies, and implementation partners.',
    Icon: FileText,
  },
  {
    title: 'Toolkits',
    description: 'Practical checklists, facilitator guides, and enterprise support materials.',
    Icon: ShieldCheck,
  },
];

export const partners = [
  { name: 'IIT Delhi', Icon: Building2 },
  { name: 'Community Institutions', Icon: Network },
  { name: 'Financial Ecosystem', Icon: Banknote },
  { name: 'Implementation Partners', Icon: Handshake },
];

export const contactChannels = [
  'Academic collaboration',
  'Field partnerships',
  'Resource development',
  'Student engagement',
];

export const contactCtaContent = {
  eyebrow: 'Get Involved',
  title: 'Collaborate on Project Bharti.',
  description:
    'Connect with the Project Bharti team to support field partnerships, research collaboration, training resources, and community engagement for women entrepreneurs.',
  buttonLabel: 'Contact the Team',
  buttonTo: '/contact',
};

export const footerLinks = [
  { label: 'About', to: '/about' },
  { label: 'Activities', to: '/activities' },
  { label: 'Resources', to: '/resources' },
  { label: 'Contact', to: '/contact' },
  { label: 'Get Involved', to: '/#get-involved' },
];
