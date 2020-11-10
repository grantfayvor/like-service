import { Router } from 'express';
import PageRouter from './Pages';

// Init router and path
const router = Router();

const db = {
  pages: []
};

// Add sub-routes
router.use('/page', PageRouter(db));

// Export the base-router
export default router;
