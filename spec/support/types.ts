import { Response } from 'supertest';
import { IPage } from '@entities/Page';

export interface Err {
    error: string
}

export interface IResponse extends Response {
    body: IPage | Err
}

export interface IReqBody {
    page?: IPage;
}
