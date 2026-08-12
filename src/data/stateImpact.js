/**
 * Single source of truth for Project Bharti geographic coverage.
 * Hierarchy: State → District → Place → womenTrained
 * District, state, and project totals are derived from place-level counts.
 */

import { delhiMedia } from './stateMedia/delhi.js';
import { haryanaMedia } from './stateMedia/haryana.js';
import { himachalPradeshMedia } from './stateMedia/himachalPradesh.js';
import { uttarakhandMedia } from './stateMedia/uttarakhand.js';
import { uttarPradeshMedia } from './stateMedia/uttarPradesh.js';

const toId = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const buildPlaceholderMediaGroup = (key, label, countLabel) => ({
  key,
  label,
  countLabel,
  items: [],
  placeholder: 'Official content will be added as Project Bharti documentation is published.',
});

const createPlace = ({ id, name, womenTrained }) => {
  const placeName = String(name || '').trim();

  return {
    id: id || toId(placeName),
    name: placeName,
    womenTrained: Number(womenTrained) || 0,
  };
};

const createDistrict = ({ id, name, places = [] }) => {
  const districtName = String(name || '').trim();
  const normalizedPlaces = places.map((place) => createPlace(place));
  const womenTrained = normalizedPlaces.reduce((total, place) => total + place.womenTrained, 0);

  return {
    id: id || toId(districtName),
    name: districtName,
    places: normalizedPlaces,
    placeCount: normalizedPlaces.length,
    // Derived from places only — never authored separately.
    womenTrained,
  };
};

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
  const normalizedDistricts = districts.map((district) => createDistrict(district));
  const totalDistricts = normalizedDistricts.length;
  const totalPlaces = normalizedDistricts.reduce((total, district) => total + district.placeCount, 0);
  const totalWomenTrained = normalizedDistricts.reduce((total, district) => total + district.womenTrained, 0);

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
    districts: normalizedDistricts,
    totalDistricts,
    totalPlaces,
    totalWomenTrained,
    status,
    lastUpdated: 'Recently updated',
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
        description: 'State-level engagement planning and preparation for field delivery.',
        status: 'completed',
      },
      {
        label: 'Survey',
        title: 'Survey',
        description: 'Baseline engagement and stakeholder mapping to guide focused outreach.',
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
      title: 'Contribute to Project Bharti’s next phase',
      description: 'Collaborate on field documentation, training delivery, and research outputs as this state profile expands.',
      label: 'Discuss collaboration',
    },
  };
};

/**
 * Approved Project Bharti geographic coverage.
 * Hierarchy: State → District → Place → womenTrained
 * Counts follow the professor's verified place list. Totals are derived from places.
 */
export const projectBhartiStates = [
  createStateProfile({
    id: 'delhi',
    mapName: 'Delhi',
    stateName: 'Delhi',
    color: '#dc2626',
    status: 'Active',
    overview: 'Urban and peri-urban engagement focused on women-led micro-enterprises, SHG networks, and practical adoption of financial and digital tools.',
    focusAreas: [
      'Strengthen digital payment competence',
      'Support financial record keeping',
      'Build enterprise readiness through community training',
    ],
    districts: [
      {
        id: 'north-delhi',
        name: 'North Delhi',
        places: [{ id: 'north-delhi', name: 'North Delhi', womenTrained: 42 }],
      },
      {
        id: 'south-delhi',
        name: 'South Delhi',
        places: [{ id: 'south-delhi', name: 'South Delhi', womenTrained: 106 }],
      },
    ],
    implementationSnapshot: {
      title: 'Implementation snapshot',
      description: 'The Delhi profile documents institutional engagement, training design, and community outreach under Project Bharti’s urban implementation stream.',
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
    overview: 'Community-oriented literacy interventions organised around SHGs, local enterprise activity, and access to formal financial services.',
    focusAreas: [
      'Improve banking and savings awareness',
      'Build safe smartphone usage habits',
      'Support entrepreneurship capability at the group level',
    ],
    districts: [
      {
        id: 'nuh',
        name: 'Nuh',
        places: [{ id: 'nuh', name: 'Nuh', womenTrained: 69 }],
      },
      {
        id: 'palwal',
        name: 'Palwal',
        places: [{ id: 'palwal', name: 'Palwal', womenTrained: 56 }],
      },
    ],
    implementationSnapshot: {
      title: 'Implementation snapshot',
      description: 'The Haryana profile records pilot workshops, community mobilisation, and field partnerships supporting literacy and enterprise readiness.',
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
    overview: 'A hill-state implementation context for strengthening digital competence, financial awareness, and enterprise support in local communities.',
    focusAreas: [
      'Adapt literacy content for local access conditions',
      'Support women entrepreneurs in remote geographies',
      'Document field insights for scalable models',
    ],
    districts: [
      {
        id: 'hamirpur',
        name: 'Hamirpur',
        places: [{ id: 'hamirpur', name: 'Hamirpur', womenTrained: 61 }],
      },
      {
        id: 'kangra',
        name: 'Kangra',
        places: [{ id: 'dharamshala', name: 'Dharamshala', womenTrained: 50 }],
      },
      {
        id: 'sirmaur',
        name: 'Sirmaur',
        places: [{ id: 'nahan', name: 'Nahan', womenTrained: 63 }],
      },
      {
        id: 'shimla',
        name: 'Shimla',
        places: [
          { id: 'shimla', name: 'Shimla', womenTrained: 33 },
          { id: 'narkanda', name: 'Narkanda', womenTrained: 43 },
        ],
      },
    ],
    implementationSnapshot: {
      title: 'Implementation snapshot',
      description: 'The Himachal Pradesh profile captures outreach, training-centre engagement, and locally adapted capacity-building activity.',
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
    districts: [
      {
        id: 'dehradun',
        name: 'Dehradun',
        places: [{ id: 'dehradun', name: 'Dehradun', womenTrained: 84 }],
      },
      {
        id: 'haridwar',
        name: 'Haridwar',
        places: [{ id: 'haridwar', name: 'Haridwar', womenTrained: 116 }],
      },
    ],
    implementationSnapshot: {
      title: 'Implementation snapshot',
      description: 'The Uttarakhand profile documents community mobilisation, training workshops, and facilitator-led capacity building.',
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
      'Generate field evidence for wider programme and policy design',
    ],
    districts: [
      {
        id: 'lucknow',
        name: 'Lucknow',
        places: [{ id: 'lucknow', name: 'Lucknow', womenTrained: 50 }],
      },
      {
        id: 'prayagraj',
        name: 'Prayagraj',
        places: [{ id: 'prayagraj', name: 'Prayagraj', womenTrained: 78 }],
      },
    ],
    implementationSnapshot: {
      title: 'Implementation snapshot',
      description: 'The Uttar Pradesh profile will expand with activity updates, research outputs, and media documentation as field programmes progress.',
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

export const projectBhartiStateById = projectBhartiStates.reduce((accumulator, state) => {
  accumulator[state.id] = state;
  return accumulator;
}, {});

const computedWomenTrained = projectBhartiStates.reduce(
  (total, state) => total + state.totalWomenTrained,
  0,
);

/**
 * Headline women-trained figure uses an explicit display policy so the UI can
 * keep showing the current manual "1000+" while computed place totals remain available.
 * Flip mode to "computed" (or update value) only after a verified figure is approved.
 */
export const projectBhartiTotals = {
  stateCount: projectBhartiStates.length,
  totalDistricts: projectBhartiStates.reduce((total, state) => total + state.totalDistricts, 0),
  totalPlaces: projectBhartiStates.reduce((total, state) => total + state.totalPlaces, 0),
  computedWomenTrained,
  // Back-compat alias for existing consumers that expect totalWomenTrained.
  totalWomenTrained: computedWomenTrained,
  womenTrainedDisplay: {
    mode: 'manual',
    value: 1000,
    suffix: '+',
    label: 'Women trained',
  },
};

export function formatWomenTrainedDisplay(totals = projectBhartiTotals) {
  const display = totals.womenTrainedDisplay || {
    mode: 'computed',
    value: totals.computedWomenTrained,
    suffix: '',
    label: 'Women trained',
  };

  if (display.mode === 'computed') {
    const value = totals.computedWomenTrained;
    const suffix = display.suffix || '';
    return {
      mode: 'computed',
      value,
      suffix,
      formatted: `${value.toLocaleString('en-IN')}${suffix}`,
      label: display.label || 'Women trained',
    };
  }

  const value = display.value;
  const suffix = display.suffix || '';
  return {
    mode: 'manual',
    value,
    suffix,
    // Keep manual headline formatting literal (e.g. "1000+") until a verified figure is approved.
    formatted: `${value}${suffix}`,
    label: display.label || 'Women trained',
  };
}

export function getStateById(stateId) {
  return projectBhartiStateById[stateId] || null;
}
