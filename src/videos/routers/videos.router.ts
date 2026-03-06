import {Router} from "express";
import {HttpStatus} from "../../core/types/http-statuses";
import {db} from "../../db/in-memories.db";
import {createErrorMessages} from "../../core/utils/error.utils";
import {videoInputDtoValidation} from "../validation/videoInputDtoValidation";
import {Video} from "../types/video";

export const videosRouter = Router({});

videosRouter
    .get('', (req, res) => {
        res.status(HttpStatus.Ok).send(db.videos);
    })
    .get('/:id', (req, res) => {
        const video = db.videos.find(v => v.id === +req.params.id);
        if (!video) {
            return res.status(HttpStatus.NotFound).send({message: 'Video not found'});
        }

        res.status(HttpStatus.Ok).send(video);
    })
    .post('', (req, res) => {
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
    })
    .put('/:id', (req, res) => {
        const video = db.videos.find(v => v.id === +req.params.id);
        if (!video) {
            return res.status(HttpStatus.NotFound).send({message: 'Video not found'});
        }

        const updatedVideo = {
            ...video,
            title: req.body.title,
            author: req.body.author,
            availableResolutions: req.body.availableResolutions,
            canBeDownloaded: req.body.canBeDownloaded,
            minAgeRestriction: req.body.minAgeRestriction,
            publicationDate: req.body.publicationDate,
        }

        db.videos = db.videos.map(v => v.id === video.id ? updatedVideo : v);
        res.sendStatus(HttpStatus.NoContent);
    })
    .delete('/:id', (req, res) => {
        const video = db.videos.find(v => v.id === +req.params.id);
        if (!video) {
            return res.status(HttpStatus.NotFound).send({message: 'Video not found'});
        }

        db.videos = db.videos.filter(v => v.id !== video.id);
        res.sendStatus(HttpStatus.NoContent);
    })