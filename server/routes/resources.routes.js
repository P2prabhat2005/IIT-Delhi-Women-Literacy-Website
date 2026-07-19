import { Router } from 'express';
import * as resourceController from '../controllers/resourceController.js';
import { requireAuth } from '../middleware/auth.js';
import { adminRateLimiter } from '../middleware/security.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploaders } from '../middleware/upload.js';

const router = Router();

// Read access stays public so visitors can browse resources.
router.get('/', asyncHandler(resourceController.listResources));
router.get('/:id', asyncHandler(resourceController.getResource));

// Every write/mutate/upload endpoint below requires an authenticated admin.
router.post('/', adminRateLimiter, requireAuth, asyncHandler(resourceController.createResource));
router.post('/reorder', adminRateLimiter, requireAuth, asyncHandler(resourceController.reorderResources));

router.put('/:id', adminRateLimiter, requireAuth, asyncHandler(resourceController.updateResourceMetadata));
router.patch('/:id', adminRateLimiter, requireAuth, asyncHandler(resourceController.updateResourceMetadata));
router.delete('/:id', adminRateLimiter, requireAuth, asyncHandler(resourceController.deleteResource));
router.post('/:id/duplicate', adminRateLimiter, requireAuth, asyncHandler(resourceController.duplicateResource));

router.post('/:id/thumbnail', adminRateLimiter, requireAuth, uploaders.thumbnail.single('file'), asyncHandler(resourceController.uploadThumbnail));
router.delete('/:id/thumbnail', adminRateLimiter, requireAuth, asyncHandler(resourceController.removeThumbnail));

router.post('/:id/document', adminRateLimiter, requireAuth, uploaders.document.single('file'), asyncHandler(resourceController.uploadDocument));
router.delete('/:id/document', adminRateLimiter, requireAuth, asyncHandler(resourceController.removeDocument));

router.post('/:id/video', adminRateLimiter, requireAuth, uploaders.video.single('file'), asyncHandler(resourceController.uploadVideo));
router.delete('/:id/video', adminRateLimiter, requireAuth, asyncHandler(resourceController.removeVideo));

export default router;
