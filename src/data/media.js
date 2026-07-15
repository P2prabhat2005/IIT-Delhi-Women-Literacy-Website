/**
 * Centralized media registry for Project Bharti.
 *
 * Maps every `src/assets/` folder to Google Drive source folders and provides
 * stable keys for dynamic loading via `src/utils/mediaLoader.js`.
 *
 * UI components are not wired to this file yet — import from mediaLoader when
 * migrating off inline `import.meta.glob` calls.
 */

export const MEDIA_ROOT = 'src/assets';

export const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp', 'avif', 'svg'];
export const DOCUMENT_EXTENSIONS = ['pdf', 'doc', 'docx'];
export const VIDEO_EXTENSIONS = ['mp4', 'webm', 'mov'];

export const IMAGE_GLOB = `*.{${IMAGE_EXTENSIONS.join(',')}}`;
export const DOCUMENT_GLOB = `*.{${DOCUMENT_EXTENSIONS.join(',')}}`;
export const VIDEO_GLOB = `*.{${VIDEO_EXTENSIONS.join(',')}}`;

export const PROJECT_STATE_IDS = [
  'delhi',
  'haryana',
  'himachal-pradesh',
  'uttarakhand',
  'uttar-pradesh',
];

/**
 * Aligns with `stateImpact.js` collection keys.
 */
export const STATE_MEDIA_COLLECTIONS = [
  {
    key: 'gallery',
    folder: 'gallery',
    stateImpactKey: 'galleryImages',
    mediaTypes: ['image'],
  },
  {
    key: 'news-clippings',
    folder: 'news-clippings',
    stateImpactKey: 'newsClippings',
    mediaTypes: ['image', 'document'],
  },
  {
    key: 'research-documents',
    folder: 'research-documents',
    stateImpactKey: 'researchDocuments',
    mediaTypes: ['document', 'image'],
  },
  {
    key: 'activities',
    folder: 'activities',
    stateImpactKey: 'activities',
    mediaTypes: ['image', 'video'],
  },
  {
    key: 'videos',
    folder: 'videos',
    stateImpactKey: 'videos',
    mediaTypes: ['video', 'image'],
  },
];

export const ACTIVITY_PHASES = [
  {
    key: 'inaugural',
    label: 'Inaugural Programme',
    driveFolder: '03-activities/inaugural',
    legacyImageKey: 'inaugural',
    timelinePhase: 'Phase 01',
  },
  {
    key: 'fgd',
    label: 'Focus Group Discussions',
    driveFolder: '03-activities/fgd',
    legacyImageKey: 'fgd',
    timelinePhase: 'Phase 02',
  },
  {
    key: 'phase1',
    label: 'District-wise Training — Phase 1',
    driveFolder: '03-activities/phase1',
    legacyImageKey: 'district-training',
    timelinePhase: 'Phase 03',
  },
  {
    key: 'phase2',
    label: 'Documentation and Learning — Phase 2',
    driveFolder: '03-activities/phase2',
    legacyImageKey: 'phase2',
    timelinePhase: 'Phase 04',
  },
];

export const RESOURCE_CATEGORIES = [
  {
    key: 'training-modules',
    label: 'Training Modules',
    driveFolder: '05-resources/training-modules',
  },
  {
    key: 'policy-briefs',
    label: 'Policy Briefs',
    driveFolder: '05-resources/policy-briefs',
  },
  {
    key: 'toolkits',
    label: 'Toolkits',
    driveFolder: '05-resources/toolkits',
  },
];

/**
 * Canonical folder registry.
 * `assetPath` is relative to `src/assets/`.
 * `driveFolder` is relative to `GOOGLE_DRIVE_ROOT/Project Bharti Website Media/`.
 */
export const mediaFolders = {
  logos: {
    key: 'logos',
    label: 'Brand Logos',
    assetPath: 'logos',
    driveFolder: '00-brand/logos',
    mediaTypes: ['image'],
    keywords: ['iit', 'delhi', 'exl'],
  },
  maps: {
    key: 'maps',
    label: 'Map Data',
    assetPath: 'maps',
    driveFolder: null,
    mediaTypes: ['geojson'],
    keywords: ['india', 'states'],
  },
  hero: {
    key: 'hero',
    label: 'Hero Background',
    assetPath: 'hero',
    driveFolder: '01-hero',
    mediaTypes: ['image'],
    keywords: ['hero', 'background'],
  },
  about: {
    key: 'about',
    label: 'About Collage',
    assetPath: 'about',
    driveFolder: '02-about',
    mediaTypes: ['image'],
    keywords: ['about'],
    maxItems: 3,
  },
  news: {
    key: 'news',
    label: 'Project News',
    assetPath: 'news',
    driveFolder: '07-news',
    mediaTypes: ['image', 'document'],
    keywords: ['news'],
  },
  research: {
    key: 'research',
    label: 'Research Outputs',
    assetPath: 'research',
    driveFolder: '08-research',
    mediaTypes: ['document', 'image'],
    keywords: ['research', 'brief', 'report'],
  },
  activities: {
    key: 'activities',
    label: 'Activities (legacy flat + phased)',
    assetPath: 'activities',
    driveFolder: '03-activities',
    mediaTypes: ['image'],
    keywords: ['activity'],
    phases: ACTIVITY_PHASES,
    legacyFlatPath: true,
  },
  resources: {
    key: 'resources',
    label: 'Resources Library',
    assetPath: 'resources',
    driveFolder: '05-resources',
    mediaTypes: ['document', 'image'],
    categories: RESOURCE_CATEGORIES,
  },
  states: {
    key: 'states',
    label: 'State-wise Field Media',
    assetPath: 'states',
    driveFolder: '04-states',
    mediaTypes: ['image', 'document', 'video'],
    stateIds: PROJECT_STATE_IDS,
    collections: STATE_MEDIA_COLLECTIONS,
  },
};

/**
 * Flat lookup: registry key → folder config.
 */
export const mediaFolderByKey = Object.values(mediaFolders).reduce((accumulator, folder) => {
  accumulator[folder.key] = folder;
  return accumulator;
}, {});

/**
 * Build a relative asset path under `src/assets/`.
 */
export function buildAssetPath(...segments) {
  return ['assets', ...segments.filter(Boolean)].join('/');
}

/**
 * Resolve the on-disk path for a top-level media folder.
 */
export function getMediaFolderPath(key) {
  const folder = mediaFolderByKey[key];
  return folder ? buildAssetPath(folder.assetPath) : null;
}

/**
 * Resolve path for an activity phase subfolder.
 */
export function getActivityPhasePath(phaseKey) {
  const phase = ACTIVITY_PHASES.find((item) => item.key === phaseKey);
  return phase ? buildAssetPath('activities', phase.key) : null;
}

/**
 * Resolve path for a resource category subfolder.
 */
export function getResourceCategoryPath(categoryKey) {
  const category = RESOURCE_CATEGORIES.find((item) => item.key === categoryKey);
  return category ? buildAssetPath('resources', category.key) : null;
}

/**
 * Resolve path for a state media collection.
 */
export function getStateCollectionPath(stateId, collectionKey) {
  if (!PROJECT_STATE_IDS.includes(stateId)) return null;

  const collection = STATE_MEDIA_COLLECTIONS.find((item) => item.key === collectionKey);
  return collection ? buildAssetPath('states', stateId, collection.folder) : null;
}

/**
 * Map a stateImpact.js collection key to a filesystem folder segment.
 */
export function stateImpactKeyToCollectionFolder(stateImpactKey) {
  const collection = STATE_MEDIA_COLLECTIONS.find((item) => item.stateImpactKey === stateImpactKey);
  return collection?.folder ?? null;
}

/**
 * Google Drive → local asset mapping reference.
 */
export const googleDriveMapping = [
  { drive: '00-brand/logos', local: 'src/assets/logos' },
  { drive: '01-hero', local: 'src/assets/hero' },
  { drive: '02-about', local: 'src/assets/about' },
  { drive: '03-activities/inaugural', local: 'src/assets/activities/inaugural' },
  { drive: '03-activities/fgd', local: 'src/assets/activities/fgd' },
  { drive: '03-activities/phase1', local: 'src/assets/activities/phase1' },
  { drive: '03-activities/phase2', local: 'src/assets/activities/phase2' },
  { drive: '03-activities', local: 'src/assets/activities', note: 'Legacy flat files for current UI' },
  { drive: '04-states/{stateId}/{collection}', local: 'src/assets/states/{stateId}/{collection}' },
  { drive: '05-resources/training-modules', local: 'src/assets/resources/training-modules' },
  { drive: '05-resources/policy-briefs', local: 'src/assets/resources/policy-briefs' },
  { drive: '05-resources/toolkits', local: 'src/assets/resources/toolkits' },
  { drive: '07-news', local: 'src/assets/news' },
  { drive: '08-research', local: 'src/assets/research' },
];

/**
 * All registry keys that mediaLoader preloads.
 */
export const MEDIA_REGISTRY_KEYS = {
  LOGOS: 'logos',
  HERO: 'hero',
  ABOUT: 'about',
  ACTIVITIES_FLAT: 'activities-flat',
  ACTIVITIES_INAUGURAL: 'activities-inaugural',
  ACTIVITIES_FGD: 'activities-fgd',
  ACTIVITIES_PHASE1: 'activities-phase1',
  ACTIVITIES_PHASE2: 'activities-phase2',
  NEWS: 'news',
  RESEARCH: 'research',
  RESOURCES_TRAINING: 'resources-training-modules',
  RESOURCES_POLICY: 'resources-policy-briefs',
  RESOURCES_TOOLKITS: 'resources-toolkits',
  STATES: 'states',
};
