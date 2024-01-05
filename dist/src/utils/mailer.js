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
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("./logger"));
function sendEmail(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const senderEmail = config_1.default.get("senderEmail");
            const senderEmailPassword = config_1.default.get("senderEmailPassword");
            // const transporter = nodemailer.createTransport(
            //   `smtp://${senderEmail}:${senderEmailPassword}@smtp-mail.outlook.com`
            // );
            const transporter = nodemailer_1.default.createTransport({
                host: "smtp-mail.outlook.com",
                secureConnection: false,
                port: 587,
                auth: {
                    user: senderEmail,
                    pass: senderEmailPassword,
                },
                tls: {
                    ciphers: "SSLv3",
                },
            });
            yield transporter.sendMail(payload);
            logger_1.default.info("Email sent successfully");
            return true;
        }
        catch (error) {
            return false;
        }
    });
}
exports.default = sendEmail;
