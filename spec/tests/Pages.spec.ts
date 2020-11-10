import supertest from 'supertest';
import StatusCodes from 'http-status-codes';
import { SuperTest, Test } from 'supertest';

import app from '@server';
import PageDao from '@daos/Page/PageDao';
import Page from '@entities/Page';
import { paramMissingError } from '@shared/constants';
import { IReqBody, IResponse, Err } from '../support/types';

describe('Pages Routes', () => {

  const paths = {
    ADD_PAGE: '/api/page',
    LIKE_PAGE: '/api/page/:pageId'
  };

  let agent: SuperTest<Test>;

  beforeAll((done) => {
    agent = supertest.agent(app);
    done();
  });

  describe(`"POST:${paths.ADD_PAGE}"`, () => {
    const callApi = (reqBody: IReqBody) => {
      return agent.post(paths.ADD_PAGE).type('form').send(reqBody);
    };

    const page = {
      id: "23232323sd",
      name: 'Test Page',
      noOfLikes: 0
    };

    it(`should return a status code of "${StatusCodes.CREATED}" if the request was successful.`,
      (done) => {
        // Setup spy
        spyOn(PageDao.prototype, 'add').and.returnValue(page);
        // Call API
        callApi({ page })
          .end((err: Error, res: IResponse) => {
            expect(res.status).toBe(StatusCodes.CREATED);
            expect(res.body).toEqual(page);
            expect((res.body as Err).error).toBeUndefined();
            done();
          });
      });

    it(`should return a JSON object with an error message of "${paramMissingError}" and a status
      code of "${StatusCodes.BAD_REQUEST}" if the user param was missing.`, (done) => {
      // Call API
      callApi({})
        .end((err: Error, res: IResponse) => {
          expect(res.status).toBe(StatusCodes.BAD_REQUEST);
          expect((res.body as Err).error).toBe(paramMissingError);
          done();
        });
    });
  });

  describe(`"PUT:${paths.LIKE_PAGE}"`, () => {
    const page = {
      id: "23232323sd",
      name: 'Test Page',
      noOfLikes: 0
    };

    it(`should return a status code of "${StatusCodes.OK}" if the request was successful.`,
      (done) => {
        // Setup spy
        spyOn(PageDao.prototype, 'update')
          .and.returnValue({ ...page, noOfLikes: page.noOfLikes + 1 });
        // Call API
        agent.put(paths.LIKE_PAGE.replace(":pageId", page.id))
          .end((err: Error, res: IResponse) => {
            expect(res.status).toBe(StatusCodes.OK);
            expect((res.body as Page).noOfLikes).toEqual(page.noOfLikes + 1);
            expect((res.body as Err).error).toBeUndefined();
            done();
          });
      });

  });
});