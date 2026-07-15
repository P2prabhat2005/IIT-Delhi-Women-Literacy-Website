import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import { attachAdmin } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.post('/login', asyncHandler(authController.login));
router.post('/logout', authController.logout);
router.get('/me', attachAdmin, authController.me);

export default router;
