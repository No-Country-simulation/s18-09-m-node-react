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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
const model_1 = require("../model");
function update(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { _id } = userData, updateFields = __rest(userData, ["_id"]);
        try {
            const updatedUser = yield model_1.User.findByIdAndUpdate(_id, // ID del usuario a actualizar
            { $set: updateFields }, // Campos a actualizar
            { new: true, runValidators: true } // Opciones: `new` para devolver el documento actualizado
            );
            if (updatedUser) {
                return {
                    UserUpdate: updatedUser,
                };
            }
            else {
                return null;
            }
        }
        catch (err) {
            throw err;
        }
    });
}
exports.update = update;
