"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const SessionSchema = new mongoose_1.Schema({
    user_id: {
        type: String,
        required: true,
        ref: 'User',
    },
    technique_id: {
        type: String,
        required: true,
        ref: 'Technique',
    },
    start_time: {
        type: Date,
        required: true,
    },
    end_time: {
        type: Date,
        required: true,
    },
    expected_total_time: {
        type: Number,
        min: 0,
    },
    expected_focus_time: {
        type: Number,
        min: 0,
    },
    expected_break_time: {
        type: Number,
        min: 0,
    },
    schedule: {
        type: [
            {
                start_working: { type: String, required: true },
                break_time: {
                    type: {
                        time: { type: String, required: true },
                        isLongBreak: { type: Boolean, required: true },
                    },
                    required: true,
                    _id: false,
                },
            },
        ],
        _id: false,
    },
    real_focus_time: {
        type: Number,
        required: true,
        min: 0,
    },
    real_break_time: {
        type: Number,
        required: true,
        min: 0,
    },
    real_break_count: {
        type: Number,
        default: 0,
        min: 0,
    },
    finished: {
        type: Boolean,
        default: false,
    },
    score: {
        type: Number,
        default: 0,
        min: 0,
    },
}, { timestamps: true });
exports.Session = mongoose_1.default.model('Session', SessionSchema);
