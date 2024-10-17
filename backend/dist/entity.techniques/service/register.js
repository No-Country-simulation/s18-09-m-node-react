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
exports.register = void 0;
const model_1 = require("../model");
function register(technique) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newTechnique = new model_1.Technique(technique);
            const registeredTechnique = yield newTechnique.save();
            if (!registeredTechnique)
                throw new Error("Unable to register technique.");
            return registeredTechnique;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.register = register;