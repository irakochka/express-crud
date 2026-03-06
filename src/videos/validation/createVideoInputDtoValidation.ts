import {CreateVideoInputDto} from "../dto/create-video-input.dto";
import {ValidationError} from "../types/validationError";
import {VideoResolution} from "../types/video";

export const createVideoInputDtoValidation = (data: CreateVideoInputDto): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (!data.title || typeof data.title !== 'string' || data.title.trim().length < 2 || data.title.trim().length > 40) {
        errors.push({ field: 'title', message: 'Invalid title' });
    }

    if (!data.author || typeof data.author !== 'string' || data.author.trim().length < 2 || data.author.trim().length > 20) {
        errors.push({ field: 'author', message: 'Invalid author' });
    }

    if (!Array.isArray(data.availableResolutions)) {
        errors.push({ field: 'availableResolutions', message: 'availableResolutions must be an array' });
        return errors;
    }

    if (data.availableResolutions.length === 0) {
        errors.push({ field: 'availableResolutions', message: 'At least one resolution should be added' });
        return errors;
    }

    const allowed = Object.values(VideoResolution) as string[];

    data.availableResolutions.forEach((resolution) => {
        if (typeof resolution !== 'string' || !allowed.includes(resolution)) {
            errors.push({ field: 'availableResolutions', message: 'availableResolutions contains invalid value' });
        }
    });

    return errors;
};