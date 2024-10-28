"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("./validation");
class DTO {
    constructor() { }
    static register(data, user) {
        const validationResult = (0, validation_1.validateTechniqueData)(data);
        if (validationResult.hasError) {
            return {
                error: {
                    message: validationResult.errorMessages.join(', '),
                },
                value: null,
            };
        }
        const { name, description, focus_time, break_time, long_break_time, cycles_before_long_break, active_pause } = validationResult.userData;
        return {
            error: null,
            value: {
                user_id: user._id,
                name,
                description,
                focus_time,
                break_time,
                long_break_time,
                cycles_before_long_break,
                active_pause
            },
        };
    }
    static update(data, technique_id) {
        const validationResult = (0, validation_1.validateUpdateTechniqueData)(data);
        if (validationResult.hasError) {
            return {
                error: {
                    message: validationResult.errorMessages.join(', '),
                },
                value: null,
            };
        }
        const { name, description, focus_time, break_time, long_break_time, cycles_before_long_break, active_pause } = validationResult.userData;
        return {
            error: null,
            value: {
                _id: technique_id,
                name: name,
                description: description,
                focus_time: focus_time,
                break_time: break_time,
                long_break_time: long_break_time,
                cycles_before_long_break: cycles_before_long_break,
                active_pause: active_pause
            },
        };
    }
}
exports.default = DTO;
