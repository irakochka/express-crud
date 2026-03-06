import {VideoResolution} from "../types/video";

export type CreateVideoInputDto = {
    title: string,
    author: string,
    availableResolutions: VideoResolution[];
}
