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
const admin_model_1 = __importDefault(require("../models/admin.model"));
const base_service_1 = __importDefault(require("./base.service"));
const jwt_1 = require("../utils/jwt");
const config_1 = __importDefault(require("config"));
let AdminService = class AdminService extends base_service_1.default {
    constructor(modelI) {
        super(modelI);
        this.getAdmin = (data) => __awaiter(this, void 0, void 0, function* () {
            console.log(data);
            const admin = {
                firstName: "Vinayak",
                lastName: "Naik",
                email: "vinayaknaik7259@gmail.com",
                role: "admin --fake response",
                verificationCode: "$2b$10$pOlMhmTuExQtPH1HBivORu95PcduOVXlFwDGF.qR67tBORws58i7u",
                balance: 0,
            };
            return admin;
        });
        this.findAdminAndUpdate = (match, update) => __awaiter(this, void 0, void 0, function* () {
            console.log("match=============", match);
            console.log("update=============", update);
            const admin = {
                firstName: "Vinayak",
                lastName: "Naik",
                email: "vinayaknaik7259@gmail.com",
                role: "admin --fake response",
                verificationCode: "1234566",
                balance: 0,
            };
            return admin;
        });
        this.signAccessToken = (admin) => __awaiter(this, void 0, void 0, function* () {
            // const payload = omit(admin.toJSON(), ["password"]);
            const accessTokenPayload = {
                firstName: admin.firstName,
                lastName: admin.lastName,
                email: admin.email,
            };
            const accessToken = (0, jwt_1.signJwt)(accessTokenPayload, "accessTokenPrivateKey", {
                expiresIn: config_1.default.get("accessTokenExpiration"),
            });
            return accessToken;
        });
        this.signRefreshToken = (admin) => __awaiter(this, void 0, void 0, function* () {
            const refreshTokenPayload = {
                adminId: admin._id,
            };
            const refreshToken = (0, jwt_1.signJwt)(refreshTokenPayload, "refreshTokenPrivateKey", {
                expiresIn: config_1.default.get("refreshTokenExpiration"),
            });
            return refreshToken;
        });
    }
};
AdminService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [admin_model_1.default])
], AdminService);
exports.default = AdminService;
