import request from "supertest";
import {setupApp} from "../src/setup-app";
import {VideoResolution} from "../src/videos/types/video";
import {HttpStatus} from "../src/core/types/http-statuses";
import express from "express";

describe('Video API', () => {
    const app = express();
    setupApp(app);

    beforeAll(async () => {
        await request(app).delete('/api/testing/all-data').expect(HttpStatus.NoContent);
    });

    it('should create video; POST /api/videos', async () => {
        const newVideo = {
            title: 'Video name',
            author: 'IT-Incubator',
            availableResolutions: [VideoResolution.P144]
        };

        const res = await request(app)
            .post('/api/videos')
            .send(newVideo);

        expect(res.status).toBe(HttpStatus.Created);
    });

    it('should return videos list; GET /api/videos', async () => {
        const newVideo = {
            title: 'Another video',
            author: 'Another IT-Incubator',
            availableResolutions: [VideoResolution.P144]
        };

        const newVideo2 = {
            title: 'Another2 video',
            author: 'Another2 IT-Incubator',
            availableResolutions: [VideoResolution.P144]
        };

        await request(app)
            .post('/api/videos')
            .send(newVideo)
            .expect(HttpStatus.Created);

        await request(app)
            .post('/api/videos')
            .send(newVideo)
            .expect(HttpStatus.Created);

        const videosListResponse = await request(app)
            .get('/api/videos')
            .expect(HttpStatus.Ok);

        expect(videosListResponse.body).toBeInstanceOf(Array);
        expect(videosListResponse.body.length).toBeGreaterThanOrEqual(2);
    });
});