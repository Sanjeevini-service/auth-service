"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
const tsyringe_1 = require("tsyringe");
const user_model_1 = __importDefault(require("../models/user.model"));
const base_service_1 = __importDefault(require("./base.service"));
const jwt_1 = require("../utils/jwt");
const config_1 = __importDefault(require("config"));
let UserService = class UserService extends base_service_1.default {
    constructor(modelI) {
        super(modelI);
        this.getUser = (data) => __awaiter(this, void 0, void 0, function* () {
            console.log(data);
            const user = {
                firstName: "Vinayak",
                lastName: "Naik",
                email: "vinayaknaik2403@gmail.com",
                role: "user --fake response",
                password: "$2b$10$pOlMhmTuExQtPH1HBivORu95PcduOVXlFwDGF.qR67tBORws58i7u",
                balance: 0,
            };
            return user;
        });
        this.signAccessToken = (user) => __awaiter(this, void 0, void 0, function* () {
            // const payload = omit(user.toJSON(), ["password"]);
            const accessTokenPayload = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            };
            const accessToken = (0, jwt_1.signJwt)(accessTokenPayload, "accessTokenPrivateKey", {
                expiresIn: config_1.default.get("accessTokenExpiration"),
            });
            return accessToken;
        });
        this.signRefreshToken = (user) => __awaiter(this, void 0, void 0, function* () {
            const refreshTokenPayload = {
                userId: user._id,
            };
            const refreshToken = (0, jwt_1.signJwt)(refreshTokenPayload, "refreshTokenPrivateKey", {
                expiresIn: config_1.default.get("refreshTokenExpiration"),
            });
            return refreshToken;
        });
    }
};
UserService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [user_model_1.default])
], UserService);
exports.default = UserService;
