import { Response } from 'supertest';
import { IPage } from '@entities/Page';

export interface Err {
    error: string
}

export interface IResponse extends Response {
    body: {
        page?: IPage;
        error?: string;
    }
}

export interface IReqBody {
    page?: IPage;
}
