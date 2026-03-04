import express, {Express} from "express";
import {db} from "./db/in-memories.db";
import {Video} from "./drivers/types/video";
import {HttpStatus} from "./core/types/http-statuses";
import {videoInputDtoValidation} from "./drivers/validation/videoInputDtoValidation";
import {createErrorMessages} from "./core/utils/error.utils";

export const setupApp = (app: Express) => {
    app.use(express.json());

    app.get("/", (req, res) => {
        res.status(HttpStatus.Ok).send("Hello world!");
    });

    app.get("/videos", (req, res) => {
        res.status(HttpStatus.Ok).send(db.videos);
    });

    app.get("/videos/:id", (req, res) => {
        const video = db.videos.find(v => v.id === +req.params.id);
        if (!video) {
            return res.status(404).send({message: "Video not found"});
        }

        res.status(HttpStatus.Ok).send(video);
    });

    app.post("/videos", (req, res) => {
        const errors = videoInputDtoValidation(req.body);
        if (errors.length > 0) {
            res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
            return;
        }

        const newVideo: Video = {
            id: db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 1,
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toString(),
            publicationDate: new Date().toString(),
            availableResolutions: req.body.availableResolutions,
        };

        db.videos.push(newVideo);
        res.status(HttpStatus.Created).send(newVideo);
    });

    app.get("/testing", (req, res) => {
        res.status(200).send("testing url");
    });

    app.delete('/testing/all-data', (req, res) => {
        db.videos = [];
        res.sendStatus(HttpStatus.NoContent);
    });

    return app;
};