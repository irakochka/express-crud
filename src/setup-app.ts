import express, {Express} from "express";
import {HttpStatus} from "./core/types/http-statuses";
import {videosRouter} from "./routers/videos.router";
import {testingRouter} from "./routers/testing.router";

export const setupApp = (app: Express) => {
    app.use(express.json());

    app.get('/', (req, res) => {
        res.status(HttpStatus.Ok).send("Hello world!");
    });

    app.use('/videos', videosRouter);
    app.use('/testing', testingRouter);

    return app;
};