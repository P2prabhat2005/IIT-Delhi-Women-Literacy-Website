import { delhiMedia } from './stateMedia/delhi.js';
import { haryanaMedia } from './stateMedia/haryana.js';
import { himachalPradeshMedia } from './stateMedia/himachalPradesh.js';
import { uttarakhandMedia } from './stateMedia/uttarakhand.js';
import { uttarPradeshMedia } from './stateMedia/uttarPradesh.js';

const buildPlaceholderMediaGroup = (key, label, countLabel) => ({
  key,
  label,
  countLabel,
  items: [],
  placeholder: 'Official content will be added by the Project Bharti Team.',
});

const createStateProfile = ({
  id,
  mapName,
  stateName,
  color,
  status,
  overview,
  focusAreas,
  implementationSnapshot,
  districts,
  media = {},
}) => {
  const totalDistricts = districts.length;
  const totalWomenTrained = districts.reduce((total, district) => total + district.womenTrained, 0);

  const defaultMediaGroups = [
    buildPlaceholderMediaGroup('gallery', 'Gallery', 'Gallery'),
    buildPlaceholderMediaGroup('activities', 'Activities', 'Activities'),
    buildPlaceholderMediaGroup('videos', 'Videos', 'Videos'),
    buildPlaceholderMediaGroup('research', 'Research Documents', 'Research'),
    buildPlaceholderMediaGroup('news', 'News', 'News'),
  ];

  return {
    id,
    mapName,
    stateName,
    color,
    districts,
    totalDistricts,
    totalWomenTrained,
    status,
    lastUpdated: 'Updated recently',
    overview,
    objectives: focusAreas,
    metrics: [
      { label: 'Total Districts Covered', value: totalDistricts.toLocaleString('en-IN'), icon: 'MapPin' },
      { label: 'Total Women Trained', value: totalWomenTrained.toLocaleString('en-IN'), icon: 'Users' },
    ],
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
    implementationSnapshot,
    mediaGroups: defaultMediaGroups.map((group) => ({
      ...group,
      items: media[group.key] || group.items,
    })),
    cta: {
      title: 'Join the next phase of Project Bharti',
      description: 'Collaborate with the team as new field content, reports, and media are added for this state.',
      label: 'Explore collaboration opportunities',
    },
  };
};

export const projectBhartiStates = [
  createStateProfile({
    id: 'delhi',
    mapName: 'Delhi',
    stateName: 'Delhi',
    color: '#dc2626',
    status: 'Active',
    overview: 'Urban and peri-urban engagement focused on women-led micro-enterprises, SHG networks, and practical adoption of financial and digital tools.',
    focusAreas: [
      'Strengthen digital payment confidence',
      'Support financial record keeping',
      'Enable enterprise readiness through community training',
    ],
    districts: [
      { name: 'North Delhi', womenTrained: 42 },
      { name: 'South Delhi', womenTrained: 106 },
    ],
    implementationSnapshot: {
      title: 'Implementation snapshot',
      description: 'The state profile is being prepared to support upcoming field outreach, training design, and community engagement.',
      partners: ['IIT Delhi', 'Community field partners'],
      focus: ['Field engagement', 'Capacity building'],
    },
    media: delhiMedia,
  }),
  createStateProfile({
    id: 'haryana',
    mapName: 'Haryana',
    stateName: 'Haryana',
    color: '#16a34a',
    status: 'Pilot',
    overview: 'Community-oriented literacy interventions planned around SHGs, local enterprise activity, and access to formal financial services.',
    focusAreas: [
      'Improve banking and savings awareness',
      'Build safe smartphone usage habits',
      'Support entrepreneurship capability at the group level',
    ],
    districts: [
      { name: 'Nuh', womenTrained: 69 },
      { name: 'Palwal', womenTrained: 56 },
    ],
    implementationSnapshot: {
      title: 'Implementation snapshot',
      description: 'The state experience will soon include field notes, activity records, and implementation milestones.',
      partners: ['IIT Delhi', 'Regional facilitators'],
      focus: ['Workshop planning', 'Field partnerships'],
    },
    media: haryanaMedia,
  }),
  createStateProfile({
    id: 'himachal-pradesh',
    mapName: 'Himachal Pradesh',
    stateName: 'Himachal Pradesh',
    color: '#9333ea',
    status: 'Planned',
    overview: 'A hill-state implementation context for strengthening digital confidence, financial awareness, and enterprise support in local communities.',
    focusAreas: [
      'Adapt literacy content for local access realities',
      'Support women entrepreneurs in remote geographies',
      'Document field insights for scalable models',
    ],
    districts: [
      { name: 'Dharamshala', womenTrained: 50 },
      { name: 'Hamirpur', womenTrained: 61 },
      { name: 'Narkanda', womenTrained: 43 },
      { name: 'Shimla', womenTrained: 33 },
    ],
    implementationSnapshot: {
      title: 'Implementation snapshot',
      description: 'The state profile will expand to include local case studies, practitioner notes, and community resources.',
      partners: ['IIT Delhi', 'Local implementation teams'],
      focus: ['Remote access', 'Local adaptation'],
    },
    media: himachalPradeshMedia,
  }),
  createStateProfile({
    id: 'uttarakhand',
    mapName: 'Uttarakhand',
    stateName: 'Uttarakhand',
    color: '#ea580c',
    status: 'Active',
    overview: 'Field engagement designed for SHG-linked women entrepreneurs in mountain and semi-urban contexts, with emphasis on usable digital and financial skills.',
    focusAreas: [
      'Build digital service awareness',
      'Improve confidence in formal financial systems',
      'Support community-led learning and capacity building',
    ],
    districts: [{ name: 'Haridwar', womenTrained: 116 }],
    implementationSnapshot: {
      title: 'Implementation snapshot',
      description: 'The state profile will continue to grow as new field documentation and training materials become available.',
      partners: ['IIT Delhi', 'Community facilitators'],
      focus: ['Community learning', 'Digital access'],
    },
    media: uttarakhandMedia,
  }),
  createStateProfile({
    id: 'uttar-pradesh',
    mapName: 'Uttar Pradesh',
    stateName: 'Uttar Pradesh',
    color: '#2563eb',
    status: 'Coming Soon',
    overview: 'Large-scale implementation potential focused on SHG networks, women entrepreneurs, local markets, and practical literacy for enterprise growth.',
    focusAreas: [
      'Support market-facing micro-enterprises',
      'Strengthen digital and financial literacy outcomes',
      'Generate field evidence for wider policy and program design',
    ],
    districts: [
      { name: 'Lucknow', womenTrained: 50 },
      { name: 'Prayagraj', womenTrained: 78 },
    ],
    implementationSnapshot: {
      title: 'Implementation snapshot',
      description: 'The state page is being prepared to host future activity updates, research outputs, and media documentation.',
      partners: ['IIT Delhi', 'Programme collaborators'],
      focus: ['Market access', 'Field evidence'],
    },
    media: uttarPradeshMedia,
  }),
];

export const projectBhartiStateNames = projectBhartiStates.map((state) => state.stateName);

export const projectBhartiStateByMapName = projectBhartiStates.reduce((accumulator, state) => {
  accumulator[state.mapName] = state;
  return accumulator;
}, {});

export const projectBhartiTotals = {
  stateCount: projectBhartiStates.length,
  totalDistricts: projectBhartiStates.reduce((total, state) => total + state.totalDistricts, 0),
  totalWomenTrained: projectBhartiStates.reduce((total, state) => total + state.totalWomenTrained, 0),
};
