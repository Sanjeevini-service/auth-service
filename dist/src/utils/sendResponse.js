"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, statusCode, success, data, message) => {
    res.status(statusCode).json({
        success,
        data,
        message,
    });
};
exports.default = sendResponse;
