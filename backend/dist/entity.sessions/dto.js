"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("./validation");
class DTO {
    constructor() { }
    static register(data) {
        const validationResult = (0, validation_1.validateSessionData)(data);
        if (validationResult.hasError) {
            return {
                error: {
                    message: validationResult.errorMessages.join(', '),
                },
                value: null,
            };
        }
        const { user_id, technique_id, start_time, end_time, expected_total_time, real_focus_time, real_break_time, real_break_count, finished, score } = validationResult.userData;
        return {
            error: null,
            value: {
                user_id,
                technique_id,
                start_time,
                end_time,
                expected_total_time,
                real_focus_time,
                real_break_time,
                real_break_count,
                finished,
                score,
            },
        };
    }
    static update(data, session_id) {
        const validationResult = (0, validation_1.validateSessionData)(data);
        if (validationResult.hasError) {
            return {
                error: {
                    message: validationResult.errorMessages.join(', '),
                },
                value: null,
            };
        }
        const { user_id, technique_id, start_time, end_time, expected_total_time, real_focus_time, real_break_time, real_break_count, finished, score } = validationResult.userData;
        return {
            error: null,
            value: {
                _id: session_id,
                user_id,
                technique_id,
                start_time,
                end_time,
                expected_total_time,
                real_focus_time,
                real_break_time,
                real_break_count,
                finished,
                score,
            },
        };
    }
}
exports.default = DTO;
