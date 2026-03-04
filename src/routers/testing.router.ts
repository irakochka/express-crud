import {Router} from "express";
import {db} from "../db/in-memories.db";
import {HttpStatus} from "../core/types/http-statuses";

export const testingRouter = Router({});

testingRouter
    .get('', (req, res) => {
        res.status(200).send("testing url");
    })
    .delete('/all-data', (req, res) => {
        db.videos = [];
        res.sendStatus(HttpStatus.NoContent);
    });