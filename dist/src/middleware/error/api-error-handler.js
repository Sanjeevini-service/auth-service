"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_error_1 = __importDefault(require("./app-error"));
const logger_1 = __importDefault(require("../../utils/logger"));
const errorHandler = (err, req, res) => {
    if (err instanceof app_error_1.default) {
        // Handle application-specific errors
        return res.status(err.statusCode).json({ error: err.message });
    }
    // Handle other types of errors
    logger_1.default.error(err);
    return res.status(500).json({ error: err.message });
};
exports.default = errorHandler;
