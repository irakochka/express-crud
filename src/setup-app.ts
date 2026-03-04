import express, {Express} from "express";
import {HttpStatus} from "./core/types/http-statuses";
import {videosRouter} from "./videos/routers/videos.router";
import {testingRouter} from "./testing/routers/testing.router";

export const setupApp = (app: Express) => {
    app.use(express.json());

    app.get('/', (req, res) => {
        res.status(HttpStatus.Ok).send("Hello world!");
    });

    app.use('/api/videos', videosRouter);
    app.use('/api/testing', testingRouter);

    return app;
};