"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("./validation");
const helper_1 = require("./helper");
class DTO {
    constructor() { }
    static register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const validationResult = (0, validation_1.validateSessionData)(data);
            if (validationResult.hasError) {
                return {
                    error: {
                        message: validationResult.errorMessages.join(', '),
                    },
                    value: null,
                };
            }
            const { user_id, technique_id, start_time, end_time, real_focus_time, real_break_time, real_break_count, finished, score } = validationResult.userData;
            const startDate = helper_1.SessionHelper.dateConverter(start_time);
            const endDate = helper_1.SessionHelper.dateConverter(end_time);
            const startTime = helper_1.SessionHelper.extractTimeFromISO(start_time);
            const expected_total_time = helper_1.SessionHelper.getTotalExpectedTime(start_time, end_time);
            const expected_focus_time = yield helper_1.SessionHelper.getExpectedFocusTime(technique_id, expected_total_time);
            const expected_break_time = yield helper_1.SessionHelper.getExpectedBreakTime(technique_id, expected_total_time);
            const schedule = yield helper_1.SessionHelper.generateSchedule(technique_id, startTime, expected_total_time);
            return {
                error: null,
                value: {
                    user_id,
                    technique_id,
                    start_time: startDate,
                    end_time: endDate,
                    expected_total_time,
                    expected_focus_time,
                    expected_break_time,
                    schedule: schedule.schedule,
                    real_focus_time,
                    real_break_time,
                    real_break_count: schedule.break_count,
                    finished,
                    score,
                },
            };
        });
    }
    static update(data, session_id) {
        const validationResult = (0, validation_1.validateUpdateSessionData)(data);
        if (validationResult.hasError) {
            return {
                error: {
                    message: validationResult.errorMessages.join(', '),
                },
                value: null,
            };
        }
        const { user_id, technique_id, start_time, end_time, expected_total_time, expected_focus_time, expected_break_time, schedule, real_focus_time, real_break_time, real_break_count, finished, score, } = validationResult.userData;
        if (!start_time || !end_time) {
            return {
                error: { message: 'Start time and end time are required.' },
                value: null,
            };
        }
        const startTime = helper_1.SessionHelper.dateConverter(start_time);
        const endTime = helper_1.SessionHelper.dateConverter(end_time);
        return {
            error: null,
            value: {
                _id: session_id,
                user_id: user_id,
                technique_id: technique_id,
                start_time: startTime,
                end_time: endTime,
                expected_total_time: expected_total_time,
                expected_focus_time: expected_focus_time,
                expected_break_time: expected_break_time,
                schedule: schedule,
                real_focus_time: real_focus_time,
                real_break_time: real_break_time,
                real_break_count: real_break_count,
                finished: finished,
                score: score,
            },
        };
    }
}
exports.default = DTO;
