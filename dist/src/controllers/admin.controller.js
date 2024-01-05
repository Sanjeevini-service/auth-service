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
const bcrypt_1 = __importDefault(require("bcrypt"));
const admin_service_1 = __importDefault(require("../services/admin.service"));
const base_controller_1 = __importDefault(require("./base.controller"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const mailer_1 = __importDefault(require("../utils/mailer"));
const config_1 = __importDefault(require("config"));
const generateOTP_1 = require("../utils/generateOTP");
const emailTemplate_1 = require("../utils/emailTemplate");
let AdminController = class AdminController extends base_controller_1.default {
    constructor(service) {
        super(service);
        this.loginAdmin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const failedMessage = "Invalid email or password";
                // Check existing admin
                const admin = (yield this.service.getAdmin({ email: req.body.email }));
                if (!admin) {
                    (0, sendResponse_1.default)(res, 403, false, null, failedMessage);
                    return;
                }
                // Generate OTP
                const otp = (0, generateOTP_1.generateOTP)();
                console.log(otp);
                // Hash OTP
                const hash = (yield bcrypt_1.default.hash(otp, 10));
                // Add OTP to admin ddocument
                (yield this.service.findAdminAndUpdate({ email: admin.email }, { verificationCode: hash }));
                // Create email template for OTP
                const template = (0, emailTemplate_1.generateEmailTemplateForOTP)(admin.firstName, admin.lastName, otp);
                // Send OTP to admin email
                const response = (yield (0, mailer_1.default)({
                    to: admin.email,
                    from: config_1.default.get("senderEmail"),
                    subject: "Email Verification, Sanjeevini",
                    html: template,
                }));
                // If failed to send OTP
                if (!response) {
                    const failedEmailMessage = "Failed to send OTP";
                    (0, sendResponse_1.default)(res, 400, false, null, failedEmailMessage);
                }
                // Send success response
                const successMessage = "OTP sent successfully";
                (0, sendResponse_1.default)(res, 200, true, null, successMessage);
            }
            catch (error) {
                // Skip function with error if any error occurs
                next(error);
            }
        });
        this.verifyOTP = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // Check existing admin
            try {
                const admin = (yield this.service.getAdmin({ email: req.body.email }));
                if (!admin) {
                    const failedMessage = "Invalid email or password";
                    (0, sendResponse_1.default)(res, 403, false, null, failedMessage);
                    return;
                }
                // Compare verification code
                const compare = (yield bcrypt_1.default.compare(req.body.verificationCode, admin.verificationCode));
                // If verification code doesn't match
                if (!compare) {
                    const verificationFailedMessage = "Verification Failed";
                    (0, sendResponse_1.default)(res, 403, false, null, verificationFailedMessage);
                    return;
                }
                // sign a access token
                const accessToken = (yield this.service.signAccessToken(admin));
                // sign a refresh token
                const refreshToken = (yield this.service.signRefreshToken(admin));
                // Send success response
                const successMessage = "Logged in successfully";
                (0, sendResponse_1.default)(res, 200, true, { accessToken, refreshToken }, successMessage);
            }
            catch (error) {
                // Skip function with error if any error occurs
                next(error);
            }
        });
        this.service = service;
    }
};
AdminController = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [admin_service_1.default])
], AdminController);
exports.default = AdminController;
