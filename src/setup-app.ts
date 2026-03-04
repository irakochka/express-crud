import express, { Express } from "express";
import {db} from "./db/in-memories.db";
import {Video, VideoResolution} from "./drivers/types/video";

export const setupApp = (app: Express) => {
    app.use(express.json());

    app.get("/", (req, res) => {
        res.status(200).send("Hello world!");
    });

    app.get("/videos", (req, res) => {
        res.status(200).send(db.videos);
    });

    app.get("/videos/:id", (req, res) => {
        const video = db.videos.find(v => v.id === +req.params.id);
        if (!video) {
            return res.status(404).send({ message: "Video not found" });
        }

        res.status(200).send(video);
    });

    app.post("/videos", (req, res) => {
        const newVideo: Video = {
            id: db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 1,
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toString(),
            publicationDate:  new Date().toString(),
            availableResolutions: req.body.availableResolutions,
        };

        db.videos.push(newVideo);
        res.status(201).send(newVideo);
    })

    return app;
};