import * as teamService from '../services/teamService.js';
import { sendCreated, sendSuccess } from '../utils/responses.js';
import { assertSafeId, validateTeamCategoryFields, validateTeamMemberFields } from '../utils/validation.js';
import { ApiError } from '../utils/errors.js';

function includeInactive(req) {
  return Boolean(req.admin && req.query.includeInactive === 'true');
}

export async function listTeamDirectory(req, res) {
  const data = await teamService.listTeamDirectory({ includeInactive: includeInactive(req) });
  sendSuccess(res, data);
}

export function createCategory(req, res) {
  validateTeamCategoryFields(req.body);
  const data = teamService.createTeamCategory(req.body);
  sendCreated(res, data);
}

export function updateCategory(req, res) {
  assertSafeId(req.params.id, 'categoryId');
  validateTeamCategoryFields(req.body || {}, { partial: true });
  const data = teamService.updateTeamCategory(req.params.id, req.body || {});
  sendSuccess(res, data);
}

export async function deleteCategory(req, res) {
  assertSafeId(req.params.id, 'categoryId');
  const data = await teamService.deleteTeamCategory(req.params.id);
  sendSuccess(res, data);
}

export function createMember(req, res) {
  validateTeamMemberFields(req.body);
  const data = teamService.createTeamMember(req.body);
  sendCreated(res, data);
}

export async function updateMember(req, res) {
  assertSafeId(req.params.id, 'memberId');
  validateTeamMemberFields(req.body || {}, { partial: true });
  const data = await teamService.updateTeamMember(req.params.id, req.body || {});
  sendSuccess(res, data);
}

export async function deleteMember(req, res) {
  assertSafeId(req.params.id, 'memberId');
  const data = await teamService.deleteTeamMember(req.params.id);
  sendSuccess(res, data);
}

export async function uploadMemberPhoto(req, res) {
  assertSafeId(req.params.id, 'memberId');

  if (!req.file) {
    throw ApiError.badRequest('No file uploaded');
  }

  const data = await teamService.uploadTeamMemberPhoto(req.params.id, req.file);
  sendSuccess(res, data);
}

export async function removeMemberPhoto(req, res) {
  assertSafeId(req.params.id, 'memberId');
  const removed = await teamService.removeTeamMemberPhoto(req.params.id);
  sendSuccess(res, { removed: Boolean(removed) });
}

