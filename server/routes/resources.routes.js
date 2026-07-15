import { Router } from 'express';
import * as resourceController from '../controllers/resourceController.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploaders } from '../middleware/upload.js';

const router = Router();

// Read access stays public so visitors can browse resources.
router.get('/', asyncHandler(resourceController.listResources));
router.get('/:id', asyncHandler(resourceController.getResource));

// Every write/mutate/upload endpoint below requires an authenticated admin.
router.post('/', requireAuth, asyncHandler(resourceController.createResource));
router.post('/reorder', requireAuth, asyncHandler(resourceController.reorderResources));

router.put('/:id', requireAuth, asyncHandler(resourceController.updateResourceMetadata));
router.patch('/:id', requireAuth, asyncHandler(resourceController.updateResourceMetadata));
router.delete('/:id', requireAuth, asyncHandler(resourceController.deleteResource));
router.post('/:id/duplicate', requireAuth, asyncHandler(resourceController.duplicateResource));

router.post('/:id/thumbnail', requireAuth, uploaders.thumbnail.single('file'), asyncHandler(resourceController.uploadThumbnail));
router.delete('/:id/thumbnail', requireAuth, asyncHandler(resourceController.removeThumbnail));

router.post('/:id/document', requireAuth, uploaders.document.single('file'), asyncHandler(resourceController.uploadDocument));
router.delete('/:id/document', requireAuth, asyncHandler(resourceController.removeDocument));

router.post('/:id/video', requireAuth, uploaders.video.single('file'), asyncHandler(resourceController.uploadVideo));
router.delete('/:id/video', requireAuth, asyncHandler(resourceController.removeVideo));

export default router;
