import request from "supertest";
import {setupApp} from "../src/setup-app";
import {VideoResolution} from "../src/videos/types/video";
import {HttpStatus} from "../src/core/types/http-statuses";
import express from "express";

describe('Video API', () => {
    const app = express();
    setupApp(app);

    beforeEach(async () => {
        await request(app).delete('/api/testing/all-data').expect(HttpStatus.NoContent);
    });

    it('should return videos list; GET /api/videos', async () => {
        const newVideo = {
            title: 'New video',
            author: 'IT-Incubator',
            availableResolutions: [VideoResolution.P144]
        };

        await request(app)
            .post('/api/videos')
            .send(newVideo)
            .expect(HttpStatus.Created);

        const newVideo2 = {
            title: 'New video 2',
            author: 'IT-Incubator 2',
            availableResolutions: [VideoResolution.P144]
        };

        await request(app)
            .post('/api/videos')
            .send(newVideo2)
            .expect(HttpStatus.Created);

        const videosListResponse = await request(app)
            .get('/api/videos')
            .expect(HttpStatus.Ok);

        expect(videosListResponse.body).toBeInstanceOf(Array);
        expect(videosListResponse.body.length).toBeGreaterThanOrEqual(2);
    });

    it('should return video by id; GET /api/videos/:id', async () => {
        const newVideo = {
            title: 'New video',
            author: 'IT-Incubator',
            availableResolutions: [VideoResolution.P144]
        };

        const createResponse = await request(app)
            .post('/api/videos')
            .send(newVideo)
            .expect(HttpStatus.Created);

        const createdVideoId = createResponse.body.id;

        const videosListResponse = await request(app)
            .get(`/api/videos/${createdVideoId}`)
            .expect(HttpStatus.Ok);

        expect(videosListResponse.body).toBeInstanceOf(Object);
        expect(videosListResponse.body.id).toBe(1);
        expect(videosListResponse.body.title).toBe('New video');
    });

    it('should create video; POST /api/videos', async () => {
        const newVideo = {
            title: 'New video',
            author: 'IT-Incubator',
            availableResolutions: [VideoResolution.P144]
        };

        const res = await request(app)
            .post('/api/videos')
            .send(newVideo);

        expect(res.status).toBe(HttpStatus.Created);
    });

    it('should update video; PUT /api/videos', async () => {
        const newVideo = {
            title: 'New video',
            author: 'IT-Incubator',
            availableResolutions: [VideoResolution.P144]
        };

        const createResponse = await request(app)
            .post('/api/videos')
            .send(newVideo)
            .expect(HttpStatus.Created);

        const createdVideoId = createResponse.body.id;

        const updatedVideo = {
            title: 'Updated video',
            author: 'Updated author',
            availableResolutions: [VideoResolution.P144, VideoResolution.P720],
            canBeDownloaded: true,
            minAgeRestriction: 18,
            publicationDate: new Date().toISOString(),
        };

        const res = await request(app)
            .put(`/api/videos/${createdVideoId}`)
            .send(updatedVideo)
            .expect(HttpStatus.NoContent);

        const videosListResponse = await request(app)
            .get(`/api/videos/${createdVideoId}`)
            .expect(HttpStatus.Ok);

        expect(res.status).toBe(HttpStatus.NoContent);
        expect(videosListResponse.body.title).toBe('Updated video');
        expect(videosListResponse.body.minAgeRestriction).toBe(18);
    });

    it('should delete video by id; DELETE /api/videos/:id', async () => {
        const newVideo = {
            title: 'New video',
            author: 'IT-Incubator',
            availableResolutions: [VideoResolution.P144]
        };

        const createResponse = await request(app)
            .post('/api/videos')
            .send(newVideo)
            .expect(HttpStatus.Created);

        const createdVideoId = createResponse.body.id;

        await request(app)
            .delete(`/api/videos/${createdVideoId}`)
            .expect(HttpStatus.NoContent);

        const videosListResponse = await request(app)
            .get('/api/videos')
            .expect(HttpStatus.Ok);

        expect(videosListResponse.body).toBeInstanceOf(Array);
        expect(videosListResponse.body.length).toBe(0);
    });
});