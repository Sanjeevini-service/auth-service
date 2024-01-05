"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTPSchema = exports.loginAdminSchema = exports.createAdminSchema = void 0;
const zod_1 = require("zod");
exports.createAdminSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        firstName: (0, zod_1.string)({ required_error: "First Name is Required" }).min(1),
        lastName: (0, zod_1.string)({ required_error: "Last Name is Required" }).min(1),
        email: (0, zod_1.string)({
            required_error: "Email is required",
        }).email("Invalid email or password"),
    }),
});
exports.loginAdminSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: "Email is required",
        }).email("Invalid email or password"),
    }),
});
exports.verifyOTPSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        verificationCode: (0, zod_1.string)({ required_error: "First Name is Required" }),
        email: (0, zod_1.string)({
            required_error: "Email is required",
        }).email("Invalid email or password"),
    }),
});
