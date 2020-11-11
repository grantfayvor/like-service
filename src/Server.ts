import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from "express-rate-limit";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger";

import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './routes';
import logger from '@shared/Logger';
import PageDao from '@daos/Page/PageDao';
import { Database } from '@daos/Database';

const app = express();
const { BAD_REQUEST } = StatusCodes;



/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

app.use(cors());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,
    message: "Max attempts reached. Please wait a while before trying again"
}));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const db = new Database({
    "1234": {
        id: "1234",
        name: "Sample Application",
        noOfLikes: 0
    }
});

// Add APIs
app.use('/api', BaseRouter(db));

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});



/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));
app.set('view engine', 'ejs');


app.get("/like", (req: Request, res: Response) => {
    if (!req.query.pageId) {
        throw new Error("Page id is required");
    }

    const pageDao = new PageDao(db);
    res.render('like_button', { page: pageDao.getPageById(req.query.pageId as string) || {} });
});

app.get('*', (req: Request, res: Response) => {
    res.sendFile('index.html', { root: viewsDir });
});

// Export express instance
export default app;
