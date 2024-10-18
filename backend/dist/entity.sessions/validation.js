"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSessionData = exports.sessionRegistrationSchema = void 0;
const zod_1 = require("zod");
const parseData_1 = require("../utils/parseData");
exports.sessionRegistrationSchema = zod_1.z.object({
    user_id: zod_1.z.string({
        message: 'Invalid user ID format.',
    }),
    technique_id: zod_1.z.string({
        message: 'Invalid technique ID format.',
    }),
    start_time: zod_1.z.preprocess((arg) => {
        if (typeof arg === "string" || arg instanceof Date)
            return new Date(arg);
    }, zod_1.z.date()),
    end_time: zod_1.z.preprocess((arg) => {
        if (typeof arg === "string" || arg instanceof Date)
            return new Date(arg);
    }, zod_1.z.date()),
    expected_total_time: zod_1.z
        .number({
        required_error: 'Expected total time is required.',
    })
        .min(0, {
        message: 'Expected total time must be greater than or equal to 0.',
    }),
    real_focus_time: zod_1.z
        .number({
        required_error: 'Real focus time is required.',
    })
        .min(0, {
        message: 'Real focus time must be greater than or equal to 0.',
    })
        .default(0),
    real_break_time: zod_1.z
        .number({
        required_error: 'Real break time is required.',
    })
        .min(0, {
        message: 'Real break time must be greater than or equal to 0.',
    })
        .default(0),
    real_break_count: zod_1.z
        .number()
        .min(0, {
        message: 'Real break count must be greater than or equal to 0.',
    })
        .default(0),
    finished: zod_1.z.boolean().default(false),
    score: zod_1.z
        .number()
        .min(0, {
        message: 'Score must be greater than or equal to 0.',
    })
        .default(0),
});
const validateSessionData = (techniqueRegisterData) => {
    const result = exports.sessionRegistrationSchema.safeParse(techniqueRegisterData);
    const { hasError, errorMessages, userData } = (0, parseData_1.parseValidationResult)(result);
    return {
        hasError,
        errorMessages,
        userData,
    };
};
exports.validateSessionData = validateSessionData;
