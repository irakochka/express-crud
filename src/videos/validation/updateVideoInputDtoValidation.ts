import {ValidationError} from "../types/validationError";
import {UpdateVideoInputDto} from "../dto/update-video-input.dto";
import {VideoResolution} from "../types/video";

export const updateVideoInputDtoValidation = (data: UpdateVideoInputDto): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (!data.title || typeof data.title !== 'string' || data.title.trim().length < 2 || data.title.trim().length > 40) {
        errors.push({field: 'title', message: 'Invalid title'});
    }

    if (!data.author || typeof data.author !== 'string' || data.author.trim().length < 2 || data.author.trim().length > 20) {
        errors.push({field: 'author', message: 'Invalid author'});
    }

    if (!Array.isArray(data.availableResolutions)) {
        errors.push({field: 'availableResolutions', message: 'availableResolutions must be an array'});
    } else {
        if (data.availableResolutions.length === 0) {
            errors.push({field: 'availableResolutions', message: 'At least one resolution should be added'});
        }

        const allowed = Object.values(VideoResolution) as string[];

        data.availableResolutions.forEach((resolution) => {
            if (typeof resolution !== 'string' || !allowed.includes(resolution)) {
                errors.push({
                    field: 'availableResolutions',
                    message: 'availableResolutions contains invalid value'
                });
            }
        });
    }

    if (typeof data.canBeDownloaded !== 'boolean') {
        errors.push({field: 'canBeDownloaded', message: 'canBeDownloaded must be boolean'});
    }

    if (data.minAgeRestriction !== null && (typeof data.minAgeRestriction !== 'number' ||
        !Number.isInteger(data.minAgeRestriction) || data.minAgeRestriction < 1 || data.minAgeRestriction > 18)) {
        errors.push({
            field: 'minAgeRestriction',
            message: 'minAgeRestriction must be null or integer from 1 to 18'
        });
    }

    if (typeof data.publicationDate !== 'string' || Number.isNaN(Date.parse(data.publicationDate))) {
        errors.push({
            field: 'publicationDate',
            message: 'publicationDate must be a valid ISO date string'
        });
    }

    return errors;
};