"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserData = void 0;
const zod_1 = require("zod");
const parseData_1 = require("../utils/parseData");
const model_1 = require("./model");
const userRegistrationSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'Invalid email format.' }),
    username: zod_1.z.string().min(1, { message: 'Username is required.' }),
    password: zod_1.z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
    role: zod_1.z.nativeEnum(model_1.UserRole).default(model_1.UserRole.USER),
});
const validateUserData = (userRegisterData) => {
    const result = userRegistrationSchema.safeParse(userRegisterData);
    const { hasError, errorMessages, userData } = (0, parseData_1.parseValidationResult)(result);
    return {
        hasError,
        errorMessages,
        userData,
    };
};
exports.validateUserData = validateUserData;
