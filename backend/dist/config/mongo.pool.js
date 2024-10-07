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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = require("./environment");
class MongoPool {
    constructor() { }
    // Método estático para obtener la instancia de la clase
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!MongoPool.instance) {
                MongoPool.instance = new MongoPool();
                yield MongoPool.instance.connect();
            }
            return MongoPool.instance;
        });
    }
    // Método privado para conectarse a la base de datos
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(environment_1.DBASE_URL); // Mongoose maneja internamente la conexión
                console.log('Connected to MongoDB database');
            }
            catch (err) {
                console.error('Unable to connect to the database:', err);
            }
        });
    }
    // Método público para cerrar la conexión
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.disconnect();
                console.log('Connection to MongoDB database closed');
            }
            catch (err) {
                console.error('Error closing the database connection:', err);
            }
        });
    }
}
exports.default = MongoPool;
