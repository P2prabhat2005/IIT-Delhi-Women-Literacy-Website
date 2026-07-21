import {
  createCategory,
  createMember,
  deleteCategory,
  deleteMember,
  getCategoryById,
  getCategoryBySlug,
  getMemberById,
  listCategories,
  listMembers,
  updateCategory,
  updateMember,
} from '../models/Team.js';
import { deleteAllAssetsForOwner, getAssetsForOwners, saveUploadedAsset, deleteAsset } from './mediaService.js';
import { ApiError } from '../utils/errors.js';

export const TEAM_MEMBER_OWNER_TYPE = 'team-member';

function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function normalizeSlug({ slug, title }) {
  const normalized = slugify(slug || title);
  if (!normalized) throw ApiError.badRequest('A category slug could not be generated');
  return normalized;
}

function requireCategory(id) {
  const category = getCategoryById(id);
  if (!category) throw ApiError.notFound(`Team category ${id} not found`);
  return category;
}

function requireMember(id) {
  const member = getMemberById(id);
  if (!member) throw ApiError.notFound(`Team member ${id} not found`);
  return member;
}

function toCategoryDto(row, members = []) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description || '',
    displayOrder: row.display_order,
    isActive: Boolean(row.is_active),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    members,
  };
}

function toMemberDto(row, photo = null) {
  return {
    id: row.id,
    categoryId: row.category_id,
    fullName: row.full_name,
    designation: row.designation || '',
    displayOrder: row.display_order,
    isActive: Boolean(row.is_active),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    photo,
  };
}

function hydrateDirectory({ includeInactive = false } = {}) {
  const categories = listCategories({ includeInactive });
  const members = listMembers({ includeInactive });
  const mediaByMember = getAssetsForOwners(TEAM_MEMBER_OWNER_TYPE, members.map((member) => member.id));
  const membersByCategory = members.reduce((map, member) => {
    if (!map[member.category_id]) map[member.category_id] = [];
    map[member.category_id].push(toMemberDto(member, mediaByMember[member.id]?.image || null));
    return map;
  }, {});

  return categories.map((category) => toCategoryDto(category, membersByCategory[category.id] || []));
}

export function listTeamDirectory({ includeInactive = false } = {}) {
  return hydrateDirectory({ includeInactive });
}

export function createTeamCategory(fields) {
  const slug = normalizeSlug(fields);
  const existing = getCategoryBySlug(slug);
  if (existing) throw ApiError.conflict(`Team category "${slug}" already exists`);

  return toCategoryDto(createCategory({
    title: fields.title.trim(),
    slug,
    description: fields.description?.trim() || '',
    displayOrder: Number.isInteger(Number(fields.displayOrder)) ? Number(fields.displayOrder) : undefined,
    isActive: fields.isActive ?? true,
  }));
}

export function updateTeamCategory(id, fields) {
  requireCategory(id);
  const updates = {};

  if (Object.prototype.hasOwnProperty.call(fields, 'title')) updates.title = fields.title.trim();
  if (Object.prototype.hasOwnProperty.call(fields, 'slug')) {
    const slug = normalizeSlug({ slug: fields.slug, title: fields.title });
    const existing = getCategoryBySlug(slug);
    if (existing && existing.id !== id) throw ApiError.conflict(`Team category "${slug}" already exists`);
    updates.slug = slug;
  }
  if (Object.prototype.hasOwnProperty.call(fields, 'description')) updates.description = fields.description?.trim() || '';
  if (Object.prototype.hasOwnProperty.call(fields, 'displayOrder')) updates.display_order = Number(fields.displayOrder);
  if (Object.prototype.hasOwnProperty.call(fields, 'isActive')) updates.is_active = fields.isActive;

  return toCategoryDto(updateCategory(id, updates));
}

export async function deleteTeamCategory(id) {
  const category = requireCategory(id);
  const members = listMembers({ includeInactive: true }).filter((member) => member.category_id === id);
  await Promise.all(members.map((member) => deleteAllAssetsForOwner(TEAM_MEMBER_OWNER_TYPE, member.id)));
  deleteCategory(id);
  return { id: category.id, deleted: true };
}

export function createTeamMember(fields) {
  requireCategory(fields.categoryId);

  return toMemberDto(createMember({
    categoryId: fields.categoryId,
    fullName: fields.fullName.trim(),
    designation: fields.designation?.trim() || '',
    displayOrder: Number.isInteger(Number(fields.displayOrder)) ? Number(fields.displayOrder) : undefined,
    isActive: fields.isActive ?? true,
  }));
}

export function updateTeamMember(id, fields) {
  requireMember(id);
  const updates = {};

  if (Object.prototype.hasOwnProperty.call(fields, 'categoryId')) {
    requireCategory(fields.categoryId);
    updates.category_id = fields.categoryId;
  }
  if (Object.prototype.hasOwnProperty.call(fields, 'fullName')) updates.full_name = fields.fullName.trim();
  if (Object.prototype.hasOwnProperty.call(fields, 'designation')) updates.designation = fields.designation?.trim() || '';
  if (Object.prototype.hasOwnProperty.call(fields, 'displayOrder')) updates.display_order = Number(fields.displayOrder);
  if (Object.prototype.hasOwnProperty.call(fields, 'isActive')) updates.is_active = fields.isActive;

  const row = updateMember(id, updates);
  const media = getAssetsForOwners(TEAM_MEMBER_OWNER_TYPE, [id]);
  return toMemberDto(row, media[id]?.image || null);
}

export async function deleteTeamMember(id) {
  const member = requireMember(id);
  await deleteAllAssetsForOwner(TEAM_MEMBER_OWNER_TYPE, id);
  deleteMember(id);
  return { id: member.id, deleted: true };
}

export async function uploadTeamMemberPhoto(id, file) {
  requireMember(id);
  return await saveUploadedAsset(TEAM_MEMBER_OWNER_TYPE, id, 'image', file);
}

export async function removeTeamMemberPhoto(id) {
  requireMember(id);
  return await deleteAsset(TEAM_MEMBER_OWNER_TYPE, id, 'image');
}

