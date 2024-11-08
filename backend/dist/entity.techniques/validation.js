"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateTechniqueData = exports.techniqueUpdateSchema = exports.validateTechniqueData = void 0;
const zod_1 = require("zod");
const parseData_1 = require("../utils/parseData");
const techniqueRegistrationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: 'Name is required.' }),
    description: zod_1.z.string().min(1, { message: 'Description is required.' }),
    focus_time: zod_1.z.number().min(1, { message: 'Focus time is required.' }),
    break_time: zod_1.z.number().min(1, { message: 'Break time is required.' }),
    long_break_time: zod_1.z.number().default(0),
    cycles_before_long_break: zod_1.z.number().default(0),
    active_pause: zod_1.z.boolean().default(true),
});
const validateTechniqueData = (techniqueRegisterData) => {
    const result = techniqueRegistrationSchema.safeParse(techniqueRegisterData);
    const { hasError, errorMessages, userData } = (0, parseData_1.parseValidationResult)(result);
    return {
        hasError,
        errorMessages,
        userData,
    };
};
exports.validateTechniqueData = validateTechniqueData;
exports.techniqueUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: 'Name is required.' }).optional(),
    description: zod_1.z.string().min(1, { message: 'Description is required.' }).optional(),
    focus_time: zod_1.z.number().min(1, { message: 'Focus time is required.' }).optional(),
    break_time: zod_1.z.number().min(1, { message: 'Break time is required.' }).optional(),
    long_break_time: zod_1.z.number().default(0).optional(),
    cycles_before_long_break: zod_1.z.number().default(0).optional(),
    active_pause: zod_1.z.boolean().default(true).optional(),
});
const validateUpdateTechniqueData = (techniqueRegisterData) => {
    const result = techniqueRegistrationSchema.partial().safeParse(techniqueRegisterData);
    const { hasError, errorMessages, userData } = (0, parseData_1.parseValidationResult)(result);
    return {
        hasError,
        errorMessages,
        userData,
    };
};
exports.validateUpdateTechniqueData = validateUpdateTechniqueData;
