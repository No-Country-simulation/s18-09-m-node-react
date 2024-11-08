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
exports.update = void 0;
const model_1 = require("../model");
function update(sessiondata) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { _id, user_id, technique_id, start_time, end_time, expected_total_time, real_focus_time, real_break_time, real_break_count, finished, score, } = sessiondata;
            const updatedSession = yield model_1.Session.findOneAndUpdate({ _id }, { user_id, technique_id, start_time, end_time, expected_total_time, real_focus_time, real_break_time, real_break_count, finished, score }, { new: true });
            return updatedSession;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.update = update;
