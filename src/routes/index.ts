import { Router } from 'express';
import PageRouter from './Pages';
import IDatabase from '@daos/Database';

// Init router and path
const router = Router();



// Export the base-router
export default (db: IDatabase) => {
  // Add sub-routes
  router.use('/page', PageRouter(db));

  return router;
};
