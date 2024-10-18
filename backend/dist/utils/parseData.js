"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseValidationResult = void 0;
const parseValidationResult = (result) => {
    var _a, _b;
    if (result.success) {
        return {
            hasError: false,
            errorMessages: [],
            userData: result.data,
        };
    }
    else {
        const errorMessages = (_b = (_a = result.error) === null || _a === void 0 ? void 0 : _a.issues.map((issue) => {
            const field = issue.path[0];
            if (issue.message === 'Required') {
                return `Field '${field}' is required.`;
            }
            return issue.message;
        })) !== null && _b !== void 0 ? _b : [];
        return {
            hasError: true,
            errorMessages,
            userData: undefined,
        };
    }
};
exports.parseValidationResult = parseValidationResult;
