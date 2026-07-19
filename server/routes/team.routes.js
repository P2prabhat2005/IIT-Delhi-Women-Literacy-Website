import { Router } from 'express';
import * as teamController from '../controllers/teamController.js';
import { attachAdmin, requireAuth } from '../middleware/auth.js';
import { adminRateLimiter } from '../middleware/security.js';
import { uploaders } from '../middleware/upload.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get('/', attachAdmin, asyncHandler(teamController.listTeamDirectory));

router.post('/categories', adminRateLimiter, requireAuth, asyncHandler(teamController.createCategory));
router.put('/categories/:id', adminRateLimiter, requireAuth, asyncHandler(teamController.updateCategory));
router.patch('/categories/:id', adminRateLimiter, requireAuth, asyncHandler(teamController.updateCategory));
router.delete('/categories/:id', adminRateLimiter, requireAuth, asyncHandler(teamController.deleteCategory));

router.post('/members', adminRateLimiter, requireAuth, asyncHandler(teamController.createMember));
router.put('/members/:id', adminRateLimiter, requireAuth, asyncHandler(teamController.updateMember));
router.patch('/members/:id', adminRateLimiter, requireAuth, asyncHandler(teamController.updateMember));
router.delete('/members/:id', adminRateLimiter, requireAuth, asyncHandler(teamController.deleteMember));
router.post('/members/:id/photo', adminRateLimiter, requireAuth, uploaders.image.single('file'), asyncHandler(teamController.uploadMemberPhoto));
router.delete('/members/:id/photo', adminRateLimiter, requireAuth, asyncHandler(teamController.removeMemberPhoto));

export default router;

