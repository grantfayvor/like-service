import StatusCodes from 'http-status-codes';
import { Response, Router } from 'express';

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
    return res.status(StatusCodes.CREATED).json({ page: pageDao.add(new Page(page)) });
  });

  router.get('/:pageId', (req: IRequest, res: Response) => {
    return res.status(StatusCodes.OK).json({ page: pageDao.getPageById(req.params.pageId) });
  });

  router.put('/:pageId', (req: IRequest, res: Response) => {
    return res.status(StatusCodes.OK).json({ page: pageDao.update(req.params.pageId) });
  })

  return router;
}

export default pageRoutes;