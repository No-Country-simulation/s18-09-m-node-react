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
exports.SessionHelper = void 0;
const get_1 = require("../entity.techniques/service/get");
class SessionHelper {
    constructor() { }
    static addMinutesToTime(time, minutes) {
        const [hours, mins] = time.split(':').map(Number);
        const totalMinutes = hours * 60 + mins + minutes;
        const normalizedHours = Math.floor(totalMinutes / 60) % 24;
        const newMinutes = totalMinutes % 60;
        return `${String(normalizedHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
    }
    static getTotalExpectedTime(start_time, end_time) {
        const MINUTES_CONVERSION = 1000 * 60;
        return Math.floor((end_time.getTime() - start_time.getTime()) / MINUTES_CONVERSION);
    }
    static dateConverter(dateTime) {
        const date = new Date(dateTime);
        date.setHours(date.getHours() - 3);
        return date;
    }
    static getTechnique(technique_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const technique = yield (0, get_1.getById)(technique_id);
            if (!technique) {
                throw new Error('Technique not found');
            }
            return technique;
        });
    }
    static calculateCycleTimings(technique) {
        const { focus_time, break_time, cycles_before_long_break, long_break_time } = technique;
        return {
            cycle_time: focus_time + break_time,
            complete_cycle_time: cycles_before_long_break * (focus_time + break_time) + focus_time + long_break_time,
        };
    }
    static calculateTimeDistribution(expected_total_time, cycle_time, complete_cycle_time) {
        const total_rounded_cycles = Math.floor(expected_total_time / complete_cycle_time);
        const remainingTime = expected_total_time % complete_cycle_time;
        const remainingCycles = Math.floor(remainingTime / cycle_time);
        const extraTime = remainingTime - remainingCycles * cycle_time;
        return {
            total_rounded_cycles,
            remainingTime,
            remainingCycles,
            extraTime,
        };
    }
    static getExpectedFocusTime(technique_id, expected_total_time) {
        return __awaiter(this, void 0, void 0, function* () {
            const technique = yield this.getTechnique(technique_id);
            const { cycle_time, complete_cycle_time } = this.calculateCycleTimings(technique);
            const timeDistribution = this.calculateTimeDistribution(expected_total_time, cycle_time, complete_cycle_time);
            let total_focus_slots = timeDistribution.total_rounded_cycles * (technique.cycles_before_long_break + 1);
            if (timeDistribution.remainingTime > 0) {
                total_focus_slots += timeDistribution.remainingCycles;
                if (timeDistribution.extraTime >= technique.focus_time) {
                    total_focus_slots++;
                }
            }
            return total_focus_slots * technique.focus_time;
        });
    }
    static getExpectedBreakTime(technique_id, expected_total_time) {
        return __awaiter(this, void 0, void 0, function* () {
            const technique = yield this.getTechnique(technique_id);
            const { cycle_time, complete_cycle_time } = this.calculateCycleTimings(technique);
            const timeDistribution = this.calculateTimeDistribution(expected_total_time, cycle_time, complete_cycle_time);
            let total_break_time = timeDistribution.total_rounded_cycles * (technique.cycles_before_long_break * technique.break_time + technique.long_break_time);
            if (timeDistribution.remainingTime > 0) {
                total_break_time += timeDistribution.remainingCycles * technique.break_time;
                if (timeDistribution.extraTime >= technique.focus_time + technique.break_time) {
                    total_break_time += technique.break_time;
                }
            }
            return total_break_time;
        });
    }
    static generateSchedule(technique_id, start_time, expected_total_time) {
        return __awaiter(this, void 0, void 0, function* () {
            const technique = yield this.getTechnique(technique_id);
            const schedule = [];
            let currentTime = start_time;
            let remainingTime = expected_total_time;
            let cycleCount = 0;
            while (remainingTime > 0) {
                const workEndTime = this.addMinutesToTime(currentTime, technique.focus_time);
                cycleCount++;
                const isLongBreak = cycleCount % (technique.cycles_before_long_break + 1) === 0;
                const breakDuration = isLongBreak ? technique.long_break_time : technique.break_time;
                schedule.push({
                    start_working: currentTime,
                    break_time: {
                        time: workEndTime,
                        isLongBreak,
                    },
                });
                remainingTime -= technique.focus_time + breakDuration;
                currentTime = this.addMinutesToTime(workEndTime, breakDuration);
            }
            return {
                schedule,
                break_count: cycleCount,
            };
        });
    }
    static extractTimeFromISO(isoDate) {
        const date = new Date(isoDate);
        return date.toLocaleTimeString('es-AR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    }
}
exports.SessionHelper = SessionHelper;
