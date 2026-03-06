import {VideoResolution} from "../types/video";

export type UpdateVideoInputDto = {
    title: string,
    author: string,
    availableResolutions: VideoResolution[],
    canBeDownloaded: boolean,
    minAgeRestriction: number,
    publicationDate: string
}
