import { getSection, listSections, sectionExists } from '../models/Section.js';
import {
  createResource,
  getById,
  insertDuplicate,
  listAllActive,
  listBySection,
  moveResourceToSection,
  reorderSection,
  softDeleteResource,
  updateResource,
} from '../models/Resource.js';
import { getTagsForResource, getTagsForResources, setResourceTags } from '../models/Tag.js';
import { deleteAllAssetsForOwner, duplicateAsset, getAssetsForOwners } from './mediaService.js';
import { ApiError } from '../utils/errors.js';

const RESOURCE_OWNER_TYPE = 'resource';

function computeMeta(row) {
  if (row.kind === 'video' && row.duration) return `Video • ${row.duration}`;
  if (row.kind === 'pdf' && row.pages) {
    const suffix = /pages?$/i.test(String(row.pages)) ? '' : ' pages';
    return `PDF • ${row.pages}${suffix}`;
  }
  return row.meta || '';
}

function toDto(row, { tags = [], media = {} } = {}) {
  return {
    id: row.id,
    collectionId: row.section_id,
    sectionId: row.section_id,
    kind: row.kind,
    title: row.title,
    subtitle: row.subtitle || '',
    description: row.description || '',
    category: row.category || row.section_id,
    tags,
    duration: row.duration || '',
    pages: row.pages || '',
    source: row.source || '',
    featured: Boolean(row.featured),
    isCustom: Boolean(row.is_custom),
    meta: computeMeta(row),
    orderIndex: row.order_index,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    thumbnail: media.thumbnail || null,
    document: media.document || null,
    video: media.video || null,
  };
}

async function hydrateRows(rows) {
  const ids = rows.map((row) => row.id);
  const tagsByResource = getTagsForResources(ids);
  const mediaByResource = await getAssetsForOwners(RESOURCE_OWNER_TYPE, ids);

  return rows.map((row) =>
    toDto(row, {
      tags: tagsByResource[row.id] || [],
      media: mediaByResource[row.id] || {},
    }),
  );
}

function requireSection(sectionId) {
  if (!sectionExists(sectionId)) {
    throw ApiError.badRequest(`Unknown section: ${sectionId}`);
  }
}

export function listSectionsWithMeta() {
  return listSections().map((section) => ({
    id: section.id,
    title: section.title,
    description: section.description,
    iconKey: section.icon_key,
    accent: section.accent,
  }));
}

export async function listResources({ section, search } = {}) {
  const rows = section ? listBySection(section) : listAllActive();
  let hydrated = await hydrateRows(rows);

  if (search) {
    const normalized = search.trim().toLowerCase();
    if (normalized) {
      hydrated = hydrated.filter((resource) => {
        const haystack = [resource.title, resource.description, resource.category, resource.subtitle, ...resource.tags]
          .join(' ')
          .toLowerCase();
        return haystack.includes(normalized);
      });
    }
  }

  return hydrated;
}

export async function getResourceDto(id) {
  const row = getById(id);
  if (!row) throw ApiError.notFound(`Resource ${id} not found`);
  const [dto] = await hydrateRows([row]);
  return dto;
}

export async function createResourceEntry(fields) {
  const sectionId = fields.category || fields.sectionId;
  requireSection(sectionId);

  const row = createResource({
    sectionId,
    kind: fields.kind || 'pdf',
    title: fields.title || 'Untitled resource',
    subtitle: fields.subtitle || '',
    description: fields.description || '',
    category: sectionId,
    duration: fields.duration || '',
    pages: fields.pages || '',
    source: fields.source || '',
    meta: fields.meta || '',
    featured: Boolean(fields.featured),
  });

  setResourceTags(row.id, fields.tags || []);
  return await getResourceDto(row.id);
}

export async function updateResourceEntry(id, fields) {
  const existing = getById(id);
  if (!existing) throw ApiError.notFound(`Resource ${id} not found`);

  if (fields.category && fields.category !== existing.section_id) {
    requireSection(fields.category);
    moveResourceToSection(id, fields.category);
  }

  updateResource(id, fields);

  if (Object.prototype.hasOwnProperty.call(fields, 'tags')) {
    setResourceTags(id, fields.tags || []);
  }

  return await getResourceDto(id);
}

export async function deleteResourceEntry(id) {
  const existing = getById(id);
  if (!existing) throw ApiError.notFound(`Resource ${id} not found`);

  softDeleteResource(id);
  await deleteAllAssetsForOwner(RESOURCE_OWNER_TYPE, id);
}

export async function duplicateResourceEntry(id) {
  const existing = getById(id);
  if (!existing) throw ApiError.notFound(`Resource ${id} not found`);

  const duplicatedRow = insertDuplicate(existing);
  const tags = getTagsForResource(id);
  setResourceTags(duplicatedRow.id, tags);

  await Promise.all(['thumbnail', 'document', 'video'].map((assetType) => 
    duplicateAsset(RESOURCE_OWNER_TYPE, id, duplicatedRow.id, assetType)
  ));

  return await getResourceDto(duplicatedRow.id);
}

export async function reorderResourcesInSection(sectionId, orderedIds) {
  requireSection(sectionId);
  reorderSection(sectionId, orderedIds);
  return await listResources({ section: sectionId });
}

export { RESOURCE_OWNER_TYPE };
export { getSection };
