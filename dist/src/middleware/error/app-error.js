"use strict";
// src/errors/AppError.ts
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = "AppError";
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
exports.default = AppError;
