import { ApiError } from './errors.js';

const SAFE_ID_PATTERN = /^[a-zA-Z0-9:_-]{1,180}$/;
const SAFE_OWNER_PATTERN = /^[a-zA-Z0-9:._-]{1,220}$/;
const RESOURCE_KINDS = new Set(['pdf', 'video', 'scheme']);

const STRING_LIMITS = {
  title: 180,
  subtitle: 240,
  description: 2500,
  category: 80,
  sectionId: 80,
  duration: 40,
  pages: 40,
  source: 240,
  meta: 240,
  kind: 40,
  slug: 100,
  fullName: 160,
  designation: 180,
};

function assertSafeString(value, fieldName, { required = false, max = 240, pattern = null } = {}) {
  if (value === undefined || value === null || value === '') {
    if (required) throw ApiError.badRequest(`${fieldName} is required`);
    return;
  }

  if (typeof value !== 'string') {
    throw ApiError.badRequest(`${fieldName} must be a string`);
  }

  if (value.length > max) {
    throw ApiError.badRequest(`${fieldName} is too long`);
  }

  if (pattern && !pattern.test(value)) {
    throw ApiError.badRequest(`${fieldName} contains unsupported characters`);
  }
}

export function assertSafeId(value, fieldName = 'id') {
  assertSafeString(value, fieldName, { required: true, max: 180, pattern: SAFE_ID_PATTERN });
}

export function assertSafeOwnerValue(value, fieldName) {
  assertSafeString(value, fieldName, { required: true, max: 220, pattern: SAFE_OWNER_PATTERN });
}

export function assertSafeQueryString(value, fieldName, max = 240) {
  assertSafeString(value, fieldName, { max });
}

export function validateResourceFields(fields = {}, { partial = false } = {}) {
  if (!fields || typeof fields !== 'object' || Array.isArray(fields)) {
    throw ApiError.badRequest('Request body must be an object');
  }

  if (!partial) {
    assertSafeString(fields.title, 'title', { required: true, max: STRING_LIMITS.title });
  }

  Object.entries(STRING_LIMITS).forEach(([field, max]) => {
    if (Object.prototype.hasOwnProperty.call(fields, field)) {
      const pattern = field === 'category' || field === 'sectionId' ? SAFE_ID_PATTERN : null;
      assertSafeString(fields[field], field, { max, pattern });
    }
  });

  if (fields.kind && !RESOURCE_KINDS.has(fields.kind)) {
    throw ApiError.badRequest('kind is not supported');
  }

  if (Object.prototype.hasOwnProperty.call(fields, 'featured') && typeof fields.featured !== 'boolean') {
    throw ApiError.badRequest('featured must be a boolean');
  }

  if (Object.prototype.hasOwnProperty.call(fields, 'tags')) {
    if (!Array.isArray(fields.tags)) throw ApiError.badRequest('tags must be an array');
    if (fields.tags.length > 25) throw ApiError.badRequest('too many tags');
    fields.tags.forEach((tag) => assertSafeString(tag, 'tag', { max: 80 }));
  }
}

export function validateReorderPayload(sectionId, orderedIds) {
  assertSafeString(sectionId, 'sectionId', { required: true, max: 80, pattern: SAFE_ID_PATTERN });
  if (!Array.isArray(orderedIds)) {
    throw ApiError.badRequest('orderedIds must be an array');
  }
  if (orderedIds.length > 500) {
    throw ApiError.badRequest('orderedIds contains too many resources');
  }
  orderedIds.forEach((id) => assertSafeId(id, 'resourceId'));
}

export function validateTeamCategoryFields(fields = {}, { partial = false } = {}) {
  if (!fields || typeof fields !== 'object' || Array.isArray(fields)) {
    throw ApiError.badRequest('Request body must be an object');
  }

  if (!partial) {
    assertSafeString(fields.title, 'title', { required: true, max: STRING_LIMITS.title });
  }

  if (Object.prototype.hasOwnProperty.call(fields, 'title')) {
    assertSafeString(fields.title, 'title', { required: !partial, max: STRING_LIMITS.title });
  }

  if (Object.prototype.hasOwnProperty.call(fields, 'slug')) {
    assertSafeString(fields.slug, 'slug', { max: STRING_LIMITS.slug, pattern: SAFE_ID_PATTERN });
  }

  if (Object.prototype.hasOwnProperty.call(fields, 'description')) {
    assertSafeString(fields.description, 'description', { max: STRING_LIMITS.description });
  }

  if (Object.prototype.hasOwnProperty.call(fields, 'displayOrder') && !Number.isInteger(Number(fields.displayOrder))) {
    throw ApiError.badRequest('displayOrder must be a number');
  }

  if (Object.prototype.hasOwnProperty.call(fields, 'isActive') && typeof fields.isActive !== 'boolean') {
    throw ApiError.badRequest('isActive must be a boolean');
  }
}

export function validateTeamMemberFields(fields = {}, { partial = false } = {}) {
  if (!fields || typeof fields !== 'object' || Array.isArray(fields)) {
    throw ApiError.badRequest('Request body must be an object');
  }

  if (!partial) {
    assertSafeString(fields.fullName, 'fullName', { required: true, max: STRING_LIMITS.fullName });
    assertSafeString(fields.categoryId, 'categoryId', { required: true, max: 180, pattern: SAFE_ID_PATTERN });
  }

  if (Object.prototype.hasOwnProperty.call(fields, 'fullName')) {
    assertSafeString(fields.fullName, 'fullName', { required: !partial, max: STRING_LIMITS.fullName });
  }

  if (Object.prototype.hasOwnProperty.call(fields, 'designation')) {
    assertSafeString(fields.designation, 'designation', { max: STRING_LIMITS.designation });
  }

  if (Object.prototype.hasOwnProperty.call(fields, 'categoryId')) {
    assertSafeString(fields.categoryId, 'categoryId', { required: !partial, max: 180, pattern: SAFE_ID_PATTERN });
  }

  if (Object.prototype.hasOwnProperty.call(fields, 'displayOrder') && !Number.isInteger(Number(fields.displayOrder))) {
    throw ApiError.badRequest('displayOrder must be a number');
  }

  if (Object.prototype.hasOwnProperty.call(fields, 'isActive') && typeof fields.isActive !== 'boolean') {
    throw ApiError.badRequest('isActive must be a boolean');
  }
}
