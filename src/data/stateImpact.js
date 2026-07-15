const buildPlaceholderMediaGroup = (key, label, countLabel) => ({
  key,
  label,
  countLabel,
  items: [],
  placeholder: 'Official content will be added by the Project Bharti Team.',
});

const createStateProfile = (stateName, status, overview, focusAreas, districtSummary, implementationSnapshot, metrics) => ({
  stateName,
  status,
  lastUpdated: 'Updated recently',
  overview,
  objectives: focusAreas,
  districtSummary,
  implementationSnapshot,
  metrics,
  timeline: [
    {
      label: 'Planning',
      title: 'Planning',
      description: 'State-level engagement planning and field readiness preparation.',
      status: 'completed',
    },
    {
      label: 'Survey',
      title: 'Survey',
      description: 'Baseline engagement and stakeholder mapping for focused outreach.',
      status: 'current',
    },
    {
      label: 'Training',
      title: 'Training',
      description: 'Workshops and facilitator-led sessions for women entrepreneurs.',
      status: 'upcoming',
    },
    {
      label: 'Implementation',
      title: 'Implementation',
      description: 'Field delivery and community engagement in priority districts.',
      status: 'upcoming',
    },
    {
      label: 'Impact',
      title: 'Impact Assessment',
      description: 'Evaluation of outcomes, learning, and evidence generation.',
      status: 'upcoming',
    },
  ],
  mediaGroups: [
    buildPlaceholderMediaGroup('gallery', 'Gallery', 'Gallery'),
    buildPlaceholderMediaGroup('activities', 'Activities', 'Activities'),
    buildPlaceholderMediaGroup('videos', 'Videos', 'Videos'),
    buildPlaceholderMediaGroup('research', 'Research Documents', 'Research'),
    buildPlaceholderMediaGroup('news', 'News', 'News'),
  ],
  cta: {
    title: 'Join the next phase of Project Bharti',
    description: 'Collaborate with the team as new field content, reports, and media are added for this state.',
    label: 'Explore collaboration opportunities',
  },
});

export const projectBhartiStates = [
  createStateProfile(
    'Delhi',
    'Active',
    'Urban and peri-urban engagement focused on women-led micro-enterprises, SHG networks, and practical adoption of financial and digital tools.',
    [
      'Strengthen digital payment confidence',
      'Support financial record keeping',
      'Enable enterprise readiness through community training',
    ],
    {
      title: 'District coverage summary',
      description: 'District-level implementation planning is being prepared for the next phase of engagement.',
      districts: ['Central Delhi', 'South Delhi', 'North Delhi'],
    },
    {
      title: 'Implementation snapshot',
      description: 'The state profile is being prepared to support upcoming field outreach, training design, and community engagement.',
      partners: ['IIT Delhi', 'Community field partners'],
      focus: ['Field engagement', 'Capacity building'],
    },
    [
      { label: 'Districts Covered', value: '12', icon: 'MapPin' },
      { label: 'Women Reached', value: '1000+', icon: 'Users' },
    ],
  ),
  createStateProfile(
    'Haryana',
    'Pilot',
    'Community-oriented literacy interventions planned around SHGs, local enterprise activity, and access to formal financial services.',
    [
      'Improve banking and savings awareness',
      'Build safe smartphone usage habits',
      'Support entrepreneurship capability at the group level',
    ],
    {
      title: 'District coverage summary',
      description: 'State outreach is being structured around priority district clusters and implementation partners.',
      districts: ['Gurugram', 'Faridabad', 'Rohtak'],
    },
    {
      title: 'Implementation snapshot',
      description: 'The state experience will soon include field notes, activity records, and implementation milestones.',
      partners: ['IIT Delhi', 'Regional facilitators'],
      focus: ['Workshop planning', 'Field partnerships'],
    },
    [
      { label: 'Districts Covered', value: '12', icon: 'MapPin' },
      { label: 'Field partners', value: 'Coming Soon', icon: 'Handshake' },
      { label: 'Community outreach', value: 'Coming Soon', icon: 'Users' },
    ],
  ),
  createStateProfile(
    'Himachal Pradesh',
    'Planned',
    'A hill-state implementation context for strengthening digital confidence, financial awareness, and enterprise support in local communities.',
    [
      'Adapt literacy content for local access realities',
      'Support women entrepreneurs in remote geographies',
      'Document field insights for scalable models',
    ],
    {
      title: 'District coverage summary',
      description: 'District-level planning will be completed as implementation activity expands across the state.',
      districts: ['Shimla', 'Kangra', 'Mandi'],
    },
    {
      title: 'Implementation snapshot',
      description: 'The state profile will expand to include local case studies, practitioner notes, and community resources.',
      partners: ['IIT Delhi', 'Local implementation teams'],
      focus: ['Remote access', 'Local adaptation'],
    },
    [
      { label: 'Districts Covered', value: '12', icon: 'MapPin' },
      { label: 'Women Reached', value: '1000+', icon: 'Users' },
      { label: 'Research notes', value: 'Coming Soon', icon: 'FileText' },
      { label: 'Training modules', value: 'Coming Soon', icon: 'BookOpen' },
    ],
  ),
  createStateProfile(
    'Uttarakhand',
    'Active',
    'Field engagement designed for SHG-linked women entrepreneurs in mountain and semi-urban contexts, with emphasis on usable digital and financial skills.',
    [
      'Build digital service awareness',
      'Improve confidence in formal financial systems',
      'Support community-led learning and capacity building',
    ],
    {
      title: 'District coverage summary',
      description: 'The state profile will soon include district-specific field activity and implementation updates.',
      districts: ['Dehradun', 'Nainital', 'Pauri Garhwal'],
    },
    {
      title: 'Implementation snapshot',
      description: 'The state profile will continue to grow as new field documentation and training materials become available.',
      partners: ['IIT Delhi', 'Community facilitators'],
      focus: ['Community learning', 'Digital access'],
    },
    [
      { label: 'Districts Covered', value: '12', icon: 'MapPin' },
      { label: 'Community partners', value: 'Coming Soon', icon: 'Handshake' },
    ],
  ),
  createStateProfile(
    'Uttar Pradesh',
    'Coming Soon',
    'Large-scale implementation potential focused on SHG networks, women entrepreneurs, local markets, and practical literacy for enterprise growth.',
    [
      'Support market-facing micro-enterprises',
      'Strengthen digital and financial literacy outcomes',
      'Generate field evidence for wider policy and program design',
    ],
    {
      title: 'District coverage summary',
      description: 'District-level updates will be added as implementation planning progresses.',
      districts: ['Lucknow', 'Agra', 'Varanasi'],
    },
    {
      title: 'Implementation snapshot',
      description: 'The state page is being prepared to host future activity updates, research outputs, and media documentation.',
      partners: ['IIT Delhi', 'Programme collaborators'],
      focus: ['Market access', 'Field evidence'],
    },
    [
      { label: 'Districts Covered', value: '12', icon: 'MapPin' },
      { label: 'Women Reached', value: '1000+', icon: 'Users' },
      { label: 'Training hubs', value: 'Coming Soon', icon: 'BookOpen' },
    ],
  ),
];

export const projectBhartiStateNames = projectBhartiStates.map((state) => state.stateName);

export const projectBhartiStateByName = projectBhartiStates.reduce((accumulator, state) => {
  accumulator[state.stateName] = state;
  return accumulator;
}, {});
