import { apiDelete, apiGet, apiSend, apiUpload } from './apiClient.js';

/**
 * Backend-ready storage abstraction for the Resources library.
 *
 * Every function here is a thin wrapper around one REST call to the
 * Express + SQLite API. Nothing in `useResourceLibrary` (or the components
 * that consume it) needs to know that resources are persisted in SQLite —
 * swapping to PostgreSQL/MySQL later only means changing the server, not
 * this file or anything above it.
 */

export function fetchAllResources(search) {
  return apiGet('/resources', search ? { search } : undefined);
}

export function fetchSectionResources(sectionId, search) {
  return apiGet('/resources', { section: sectionId, search });
}

export function createResource(fields) {
  return apiSend('POST', '/resources', fields);
}

export function updateResource(resourceId, fields) {
  return apiSend('PUT', `/resources/${encodeURIComponent(resourceId)}`, fields);
}

export function deleteResource(resourceId) {
  return apiDelete(`/resources/${encodeURIComponent(resourceId)}`);
}

export function duplicateResource(resourceId) {
  return apiSend('POST', `/resources/${encodeURIComponent(resourceId)}/duplicate`);
}

export function reorderResources(sectionId, orderedIds) {
  return apiSend('POST', '/resources/reorder', { sectionId, orderedIds });
}

export function uploadResourceThumbnail(resourceId, file) {
  return apiUpload(`/resources/${encodeURIComponent(resourceId)}/thumbnail`, file);
}

export function removeResourceThumbnail(resourceId) {
  return apiDelete(`/resources/${encodeURIComponent(resourceId)}/thumbnail`);
}

export function uploadResourceDocument(resourceId, file) {
  return apiUpload(`/resources/${encodeURIComponent(resourceId)}/document`, file);
}

export function removeResourceDocument(resourceId) {
  return apiDelete(`/resources/${encodeURIComponent(resourceId)}/document`);
}

export function uploadResourceVideo(resourceId, file) {
  return apiUpload(`/resources/${encodeURIComponent(resourceId)}/video`, file);
}

export function removeResourceVideo(resourceId) {
  return apiDelete(`/resources/${encodeURIComponent(resourceId)}/video`);
}
