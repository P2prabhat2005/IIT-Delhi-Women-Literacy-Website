import { Router } from 'express';
import * as mediaController from '../controllers/mediaController.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploaders } from '../middleware/upload.js';

const router = Router();

const uploaderByAssetType = (req, res, next) => {
  const uploader = uploaders[req.params.assetType];
  if (!uploader) {
    res.status(400).json({ success: false, error: { code: 'BAD_REQUEST', message: `Unsupported asset type: ${req.params.assetType}` } });
    return;
  }
  uploader.single('file')(req, res, next);
};

// Reads stay public (visitors need to see uploaded photographs/documents).
router.get('/', asyncHandler(mediaController.listAssetsByOwnerType));
router.get('/:ownerType/:ownerId/:assetType', asyncHandler(mediaController.getAsset));

// Uploading/replacing/deleting any media asset requires an authenticated admin.
router.post('/:ownerType/:ownerId/:assetType', requireAuth, uploaderByAssetType, asyncHandler(mediaController.uploadAsset));
router.delete('/:ownerType/:ownerId/:assetType', requireAuth, asyncHandler(mediaController.removeAsset));

export default router;
