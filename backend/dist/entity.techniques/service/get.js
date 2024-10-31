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
exports.getById = exports.get = void 0;
const model_1 = require("../model");
const model_2 = require("../../entity.users/model");
function get(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield model_2.User.findById(user_id);
            if (!user)
                throw new Error('User not found');
            // Personal techniques
            const personalTechniques = yield model_1.PersonalTechnique.find({ _id: { $in: user.techniques } }).exec();
            // General techniques
            const techniques = yield model_1.Technique.find({}).exec();
            return [...techniques, ...personalTechniques];
        }
        catch (err) {
            throw err;
        }
    });
}
exports.get = get;
function getById(technique_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const technique = yield model_1.Technique.findById(technique_id).exec();
            return technique;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getById = getById;
