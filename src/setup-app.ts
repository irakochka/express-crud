import express, { Express } from "express";
import {db} from "./db/in-memories.db";

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

    return app;
};