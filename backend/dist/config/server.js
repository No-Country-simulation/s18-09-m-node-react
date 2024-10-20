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
const express_1 = __importDefault(require("express"));
const express_jsdoc_swagger_1 = __importDefault(require("express-jsdoc-swagger"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = require("./environment");
const swagger_config_1 = require("./swagger.config");
const auth_mid_1 = __importDefault(require("../middlewares/auth.mid"));
const error_middleware_1 = require("../middlewares/error.middleware");
const usersRouter = __importStar(require("../entity.users/routes"));
const techniquesRouter = __importStar(require("../entity.techniques/routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.database();
        this.middlewares();
        this.setupSwagger();
        this.routes();
        this.errorHandler();
        this.listen();
    }
    database() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(environment_1.DBASE_URL);
                console.log('Connected to MongoDB database');
            }
            catch (err) {
                console.error('Unable to connect to the database:', err);
            }
        });
    }
    middlewares() {
        this.app.use((0, helmet_1.default)());
        this.app.use((0, hpp_1.default)());
        this.app.use((0, express_rate_limit_1.default)({ windowMs: 15 * 60 * 1000, max: 300, standardHeaders: true, legacyHeaders: false }));
        this.app.use((0, cors_1.default)({ origin: environment_1.CORS_ORIGIN }));
        this.app.use(express_1.default.json());
        if (environment_1.NODE_ENV === 'dev') {
            this.app.use((0, morgan_1.default)('dev'));
        }
    }
    routes() {
        // -- Unprotected routes --
        this.app.use(`/${environment_1.API_VERSION}`, usersRouter.notProtectedRoutes);
        // -- User protected routes --
        this.app.use(auth_mid_1.default.authenticate('userJWT', { session: false }));
        this.app.use(`/${environment_1.API_VERSION}`, usersRouter.userProtectedRoutes);
        this.app.use(`/${environment_1.API_VERSION}`, techniquesRouter.userProtectedRoutes);
        // -- Admin protected routes --
        this.app.use(auth_mid_1.default.authenticate('adminJWT', { session: false }));
        this.app.use(`/${environment_1.API_VERSION}`, usersRouter.adminProtectedRoutes);
        this.app.use(`/${environment_1.API_VERSION}`, techniquesRouter.adminProtectedRoutes);
    }
    errorHandler() {
        this.app.use(error_middleware_1.errorHandler);
    }
    setupSwagger() {
        (0, express_jsdoc_swagger_1.default)(this.app)(swagger_config_1.swaggerConfig);
    }
    listen() {
        this.server = this.app.listen(environment_1.PORT, () => {
            console.log(`Server running on port ${environment_1.PORT}`);
        });
    }
    close() {
        this.server.close();
    }
}
exports.default = Server;
