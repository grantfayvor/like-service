import { Request } from 'express';
import { IPage } from '@entities/Page';


export const paramMissingError = 'One or more of the required parameters was missing.';

export interface IRequest extends Request {
    body: {
        page: IPage;
    }
} 
