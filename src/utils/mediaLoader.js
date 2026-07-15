import {
  ACTIVITY_PHASES,
  IMAGE_GLOB,
  MEDIA_REGISTRY_KEYS,
  PROJECT_STATE_IDS,
  RESOURCE_CATEGORIES,
  STATE_MEDIA_COLLECTIONS,
  mediaFolderByKey,
} from '../data/media.js';

const GLOB_OPTIONS = {
  eager: true,
  import: 'default',
  query: '?url',
};

/**
 * Vite requires static glob strings. Each entry maps a registry key to its asset map.
 */
const mediaGlobs = {
  [MEDIA_REGISTRY_KEYS.LOGOS]: import.meta.glob('../assets/logos/*.{png,jpg,jpeg,svg,webp}', GLOB_OPTIONS),
  [MEDIA_REGISTRY_KEYS.HERO]: import.meta.glob('../assets/hero/*.{png,jpg,jpeg,webp,avif}', GLOB_OPTIONS),
  [MEDIA_REGISTRY_KEYS.ABOUT]: import.meta.glob('../assets/about/*.{png,jpg,jpeg,webp,avif}', GLOB_OPTIONS),
  [MEDIA_REGISTRY_KEYS.ACTIVITIES_FLAT]: import.meta.glob(
    '../assets/activities/*.{png,jpg,jpeg,webp,avif}',
    GLOB_OPTIONS,
  ),
  [MEDIA_REGISTRY_KEYS.ACTIVITIES_INAUGURAL]: import.meta.glob(
    '../assets/activities/inaugural/*.{png,jpg,jpeg,webp,avif}',
    GLOB_OPTIONS,
  ),
  [MEDIA_REGISTRY_KEYS.ACTIVITIES_FGD]: import.meta.glob(
    '../assets/activities/fgd/*.{png,jpg,jpeg,webp,avif}',
    GLOB_OPTIONS,
  ),
  [MEDIA_REGISTRY_KEYS.ACTIVITIES_PHASE1]: import.meta.glob(
    '../assets/activities/phase1/*.{png,jpg,jpeg,webp,avif}',
    GLOB_OPTIONS,
  ),
  [MEDIA_REGISTRY_KEYS.ACTIVITIES_PHASE2]: import.meta.glob(
    '../assets/activities/phase2/*.{png,jpg,jpeg,webp,avif}',
    GLOB_OPTIONS,
  ),
  [MEDIA_REGISTRY_KEYS.NEWS]: import.meta.glob('../assets/news/*.{png,jpg,jpeg,webp,avif,pdf}', GLOB_OPTIONS),
  [MEDIA_REGISTRY_KEYS.RESEARCH]: import.meta.glob(
    '../assets/research/*.{png,jpg,jpeg,webp,avif,pdf,doc,docx}',
    GLOB_OPTIONS,
  ),
  [MEDIA_REGISTRY_KEYS.RESOURCES_TRAINING]: import.meta.glob(
    '../assets/resources/training-modules/*.{png,jpg,jpeg,webp,avif,pdf,doc,docx}',
    GLOB_OPTIONS,
  ),
  [MEDIA_REGISTRY_KEYS.RESOURCES_POLICY]: import.meta.glob(
    '../assets/resources/policy-briefs/*.{png,jpg,jpeg,webp,avif,pdf,doc,docx}',
    GLOB_OPTIONS,
  ),
  [MEDIA_REGISTRY_KEYS.RESOURCES_TOOLKITS]: import.meta.glob(
    '../assets/resources/toolkits/*.{png,jpg,jpeg,webp,avif,pdf,doc,docx}',
    GLOB_OPTIONS,
  ),
  [MEDIA_REGISTRY_KEYS.STATES]: import.meta.glob(
    '../assets/states/**/*.{png,jpg,jpeg,webp,avif,pdf,doc,docx,mp4,webm,mov}',
    GLOB_OPTIONS,
  ),
};

const activityPhaseRegistryKeys = {
  inaugural: MEDIA_REGISTRY_KEYS.ACTIVITIES_INAUGURAL,
  fgd: MEDIA_REGISTRY_KEYS.ACTIVITIES_FGD,
  phase1: MEDIA_REGISTRY_KEYS.ACTIVITIES_PHASE1,
  phase2: MEDIA_REGISTRY_KEYS.ACTIVITIES_PHASE2,
};

const resourceCategoryRegistryKeys = {
  'training-modules': MEDIA_REGISTRY_KEYS.RESOURCES_TRAINING,
  'policy-briefs': MEDIA_REGISTRY_KEYS.RESOURCES_POLICY,
  toolkits: MEDIA_REGISTRY_KEYS.RESOURCES_TOOLKITS,
};

/**
 * Sort asset map entries by path for deterministic selection.
 */
export function sortAssetEntries(assetMap) {
  return Object.entries(assetMap).sort(([left], [right]) => left.localeCompare(right));
}

/**
 * Return all resolved URLs from an asset map.
 */
export function listAssetUrls(assetMap) {
  return sortAssetEntries(assetMap).map(([, url]) => url);
}

/**
 * Return the first asset URL from a map, or null.
 */
export function getFirstAsset(assetMap) {
  return sortAssetEntries(assetMap)[0]?.[1] ?? null;
}

/**
 * Find an asset whose path contains all keywords (case-insensitive).
 */
export function findAssetByKeywords(assetMap, keywords = []) {
  if (!keywords.length) return getFirstAsset(assetMap);

  return (
    sortAssetEntries(assetMap).find(([path]) =>
      keywords.every((keyword) => path.toLowerCase().includes(keyword.toLowerCase())),
    )?.[1] ?? null
  );
}

/**
 * Filter assets whose paths contain any of the keywords.
 */
export function filterAssetsByKeywords(assetMap, keywords = []) {
  if (!keywords.length) return listAssetUrls(assetMap);

  return sortAssetEntries(assetMap)
    .filter(([path]) => keywords.some((keyword) => path.toLowerCase().includes(keyword.toLowerCase())))
    .map(([, url]) => url);
}

/**
 * Get the raw Vite asset map for a registry key.
 */
export function getMediaAssetMap(registryKey) {
  return mediaGlobs[registryKey] ?? {};
}

/**
 * Get assets for a top-level media folder key (hero, about, news, etc.).
 */
export function getMediaByFolderKey(folderKey) {
  const folder = mediaFolderByKey[folderKey];
  if (!folder) return [];

  switch (folderKey) {
    case 'logos':
      return listAssetUrls(getMediaAssetMap(MEDIA_REGISTRY_KEYS.LOGOS));
    case 'hero':
      return listAssetUrls(getMediaAssetMap(MEDIA_REGISTRY_KEYS.HERO));
    case 'about':
      return listAssetUrls(getMediaAssetMap(MEDIA_REGISTRY_KEYS.ABOUT));
    case 'news':
      return listAssetUrls(getMediaAssetMap(MEDIA_REGISTRY_KEYS.NEWS));
    case 'research':
      return listAssetUrls(getMediaAssetMap(MEDIA_REGISTRY_KEYS.RESEARCH));
    case 'activities':
      return [
        ...listAssetUrls(getMediaAssetMap(MEDIA_REGISTRY_KEYS.ACTIVITIES_FLAT)),
        ...ACTIVITY_PHASES.flatMap((phase) => listActivityPhaseAssets(phase.key)),
      ];
    case 'resources':
      return RESOURCE_CATEGORIES.flatMap((category) => listResourceCategoryAssets(category.key));
    case 'states':
      return listAssetUrls(getMediaAssetMap(MEDIA_REGISTRY_KEYS.STATES));
    default:
      return [];
  }
}

/**
 * Resolve a single asset using folder config keywords with optional overrides.
 */
export function resolveMediaForFolder(folderKey, keywordOverrides = []) {
  const folder = mediaFolderByKey[folderKey];
  if (!folder) return null;

  const keywords = keywordOverrides.length ? keywordOverrides : folder.keywords ?? [];
  const registryKeyMap = {
    logos: MEDIA_REGISTRY_KEYS.LOGOS,
    hero: MEDIA_REGISTRY_KEYS.HERO,
    about: MEDIA_REGISTRY_KEYS.ABOUT,
    news: MEDIA_REGISTRY_KEYS.NEWS,
    research: MEDIA_REGISTRY_KEYS.RESEARCH,
  };

  const registryKey = registryKeyMap[folderKey];
  if (!registryKey) return null;

  return findAssetByKeywords(getMediaAssetMap(registryKey), keywords) ?? getFirstAsset(getMediaAssetMap(registryKey));
}

/**
 * List assets for an activity phase subfolder.
 */
export function listActivityPhaseAssets(phaseKey) {
  const registryKey = activityPhaseRegistryKeys[phaseKey];
  return registryKey ? listAssetUrls(getMediaAssetMap(registryKey)) : [];
}

/**
 * Resolve one activity phase image, with fallback to legacy flat folder.
 */
export function resolveActivityPhaseAsset(phaseKey) {
  const phase = ACTIVITY_PHASES.find((item) => item.key === phaseKey);
  if (!phase) return null;

  const phasedAsset =
    findAssetByKeywords(getMediaAssetMap(activityPhaseRegistryKeys[phaseKey]), [phase.key]) ??
    getFirstAsset(getMediaAssetMap(activityPhaseRegistryKeys[phaseKey]));

  if (phasedAsset) return phasedAsset;

  return findAssetByKeywords(getMediaAssetMap(MEDIA_REGISTRY_KEYS.ACTIVITIES_FLAT), [phase.legacyImageKey]);
}

/**
 * List assets for a resource category subfolder.
 */
export function listResourceCategoryAssets(categoryKey) {
  const registryKey = resourceCategoryRegistryKeys[categoryKey];
  return registryKey ? listAssetUrls(getMediaAssetMap(registryKey)) : [];
}

/**
 * Resolve one resource category asset.
 */
export function resolveResourceCategoryAsset(categoryKey, keywords = []) {
  const registryKey = resourceCategoryRegistryKeys[categoryKey];
  if (!registryKey) return null;

  const assetMap = getMediaAssetMap(registryKey);
  return findAssetByKeywords(assetMap, keywords) ?? getFirstAsset(assetMap);
}

/**
 * List assets for a state collection (gallery, news-clippings, etc.).
 */
export function listStateCollectionAssets(stateId, collectionKey) {
  if (!PROJECT_STATE_IDS.includes(stateId)) return [];

  const collection = STATE_MEDIA_COLLECTIONS.find((item) => item.key === collectionKey);
  if (!collection) return [];

  const pathFragment = `/states/${stateId}/${collection.folder}/`.toLowerCase();

  return sortAssetEntries(getMediaAssetMap(MEDIA_REGISTRY_KEYS.STATES))
    .filter(([path]) => path.toLowerCase().includes(pathFragment))
    .map(([, url]) => url);
}

/**
 * List all assets for a given state across every collection.
 */
export function listStateAssets(stateId) {
  if (!PROJECT_STATE_IDS.includes(stateId)) return {};

  return STATE_MEDIA_COLLECTIONS.reduce((accumulator, collection) => {
    accumulator[collection.stateImpactKey] = listStateCollectionAssets(stateId, collection.key);
    return accumulator;
  }, {});
}

/**
 * Build stateImpact-ready media items from filesystem assets.
 */
export function buildStateImpactMediaItems(stateId) {
  const assetsByCollection = listStateAssets(stateId);

  return Object.entries(assetsByCollection).reduce((accumulator, [stateImpactKey, urls]) => {
    accumulator[stateImpactKey] = urls.map((url, index) => ({
      title: `${stateId} ${stateImpactKey} ${index + 1}`,
      url,
    }));
    return accumulator;
  }, {});
}

/**
 * Export all preloaded registry keys and their asset counts (for debugging).
 */
export function getMediaInventory() {
  return Object.entries(mediaGlobs).map(([registryKey, assetMap]) => ({
    registryKey,
    count: Object.keys(assetMap).length,
    paths: Object.keys(assetMap).sort(),
  }));
}

export { IMAGE_GLOB, MEDIA_REGISTRY_KEYS, mediaGlobs };
