import {VideoResolution} from "../types/video";

export type VideoInputDto = {
    title: string,
    author: string,
    availableResolutions: VideoResolution[];
}
