import { Router } from 'express';
import * as sectionController from '../controllers/sectionController.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(sectionController.listSections));

export default router;
