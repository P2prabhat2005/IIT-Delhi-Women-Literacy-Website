import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import { attachAdmin } from '../middleware/auth.js';
import { authRateLimiter } from '../middleware/security.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.post('/login', authRateLimiter, asyncHandler(authController.login));
router.post('/logout', authController.logout);
router.get('/me', attachAdmin, authController.me);
// TEMPORARY DIAGNOSTIC — remove after login issue is confirmed fixed
router.get('/probe', asyncHandler(authController.probe));

export default router;
