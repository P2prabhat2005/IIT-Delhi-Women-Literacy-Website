import { Router } from 'express';
import authRoutes from './auth.routes.js';
import mediaRoutes from './media.routes.js';
import resourcesRoutes from './resources.routes.js';
import sectionsRoutes from './sections.routes.js';
import teamRoutes from './team.routes.js';

const router = Router();

router.get('/health', (req, res) => res.json({ success: true, data: { status: 'ok', timestamp: new Date().toISOString() } }));

router.use('/auth', authRoutes);
router.use('/sections', sectionsRoutes);
router.use('/resources', resourcesRoutes);
router.use('/media', mediaRoutes);
router.use('/team', teamRoutes);

export default router;
