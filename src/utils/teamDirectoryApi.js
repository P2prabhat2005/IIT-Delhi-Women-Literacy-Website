import { apiDelete, apiGet, apiSend, apiUpload } from './apiClient.js';

export function fetchTeamDirectory({ includeInactive = false } = {}) {
  return apiGet('/team', includeInactive ? { includeInactive: 'true' } : undefined);
}

export function createTeamCategory(fields) {
  return apiSend('POST', '/team/categories', fields);
}

export function updateTeamCategory(categoryId, fields) {
  return apiSend('PATCH', `/team/categories/${encodeURIComponent(categoryId)}`, fields);
}

export function deleteTeamCategory(categoryId) {
  return apiDelete(`/team/categories/${encodeURIComponent(categoryId)}`);
}

export function createTeamMember(fields) {
  return apiSend('POST', '/team/members', fields);
}

export function updateTeamMember(memberId, fields) {
  return apiSend('PATCH', `/team/members/${encodeURIComponent(memberId)}`, fields);
}

export function deleteTeamMember(memberId) {
  return apiDelete(`/team/members/${encodeURIComponent(memberId)}`);
}

export function uploadTeamMemberPhoto(memberId, file) {
  return apiUpload(`/team/members/${encodeURIComponent(memberId)}/photo`, file);
}

export function removeTeamMemberPhoto(memberId) {
  return apiDelete(`/team/members/${encodeURIComponent(memberId)}/photo`);
}

