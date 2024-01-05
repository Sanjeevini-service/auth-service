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
const user_service_1 = __importDefault(require("../services/user.service"));
const base_controller_1 = __importDefault(require("./base.controller"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const bcrypt_1 = __importDefault(require("bcrypt"));
let UserController = class UserController extends base_controller_1.default {
    constructor(service) {
        super(service);
        this.loginUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const failedMessage = "Invalid email or password";
                // Check existing user
                const user = yield this.service.getUser({ email: req.body.email });
                if (!user) {
                    (0, sendResponse_1.default)(res, 403, false, null, failedMessage);
                    return;
                }
                const compare = yield bcrypt_1.default.compare(req.body.password, user.password);
                if (!compare) {
                    (0, sendResponse_1.default)(res, 403, false, null, failedMessage);
                    return;
                }
                const accessToken = yield this.service.signAccessToken(user);
                // sign a refresh token
                const refreshToken = yield this.service.signRefreshToken(user);
                const successMessage = "Logged in successfully";
                (0, sendResponse_1.default)(res, 200, true, { accessToken, refreshToken }, successMessage);
            }
            catch (error) {
                next(error);
            }
        });
        this.service = service;
    }
};
UserController = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [user_service_1.default])
], UserController);
exports.default = UserController;
