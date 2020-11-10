import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import { paramMissingError, IRequest } from '@shared/constants';
import IDatabase from '@daos/Database';
import PageDao from '@daos/Page/PageDao';
import Page from '@entities/Page';

const router = Router();

const pageRoutes = (db: IDatabase) => {
  const pageDao = new PageDao(db);

  router.post('/', (req: IRequest, res: Response) => {
    const { page } = req.body;
    if (!page) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: paramMissingError,
      });
    }
    return res.status(StatusCodes.CREATED).json(pageDao.add(new Page(page)));
  });

  return router;
}

export default pageRoutes;