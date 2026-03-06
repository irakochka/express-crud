import {Video, VideoResolution} from "../videos/types/video";

export const db = {
    videos: <Video[]> [
        {
            id: 1,
            title: 'NestJS Crash Course',
            author: 'IT-Incubator',
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: '2026-03-01T10:15:00.000Z',
            publicationDate: '2026-03-02T08:00:00.000Z',
            availableResolutions: [
                VideoResolution.P144,
                VideoResolution.P360,
                VideoResolution.P720,
                VideoResolution.P1080,
            ],
        },
        {
            id: 2,
            title: 'PostgreSQL Joins',
            author: 'DB Lab',
            canBeDownloaded: true,
            minAgeRestriction: 12,
            createdAt: '2026-02-20T18:40:12.000Z',
            publicationDate: '2026-02-21T07:30:00.000Z',
            availableResolutions: [VideoResolution.P240, VideoResolution.P480, VideoResolution.P720],
        },
        {
            id: 3,
            title: 'Redis Basics',
            author: 'Backend Notes',
            canBeDownloaded: true,
            minAgeRestriction: 16,
            createdAt: '2026-01-15T12:05:33.000Z',
            publicationDate: '2026-01-18T12:00:00.000Z',
            availableResolutions: [VideoResolution.P144, VideoResolution.P240, VideoResolution.P360],
        },
        {
            id: 4,
            title: 'RabbitMQ',
            author: 'Message Bros',
            canBeDownloaded: false,
            minAgeRestriction: 18,
            createdAt: '2026-03-03T21:10:00.000Z',
            publicationDate: '2026-03-04T09:00:00.000Z',
            availableResolutions: [VideoResolution.P360, VideoResolution.P480, VideoResolution.P720],
        },
        {
            id: 5,
            title: 'Angular NgRx',
            author: 'Frontend Samurai',
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: '2026-02-05T09:00:00.000Z',
            publicationDate: '2026-02-06T09:00:00.000Z',
            availableResolutions: [VideoResolution.P720, VideoResolution.P1080, VideoResolution.P1440],
        },
    ]
}