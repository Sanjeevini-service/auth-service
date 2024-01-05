"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = __importDefault(require("../controllers/admin.controller"));
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const admin_schema_1 = require("../schema/admin.schema");
const adminRouter = (0, express_1.Router)();
const adminController = new admin_controller_1.default();
adminRouter.post("/login", (0, validateResource_1.default)(admin_schema_1.loginAdminSchema), adminController.loginAdmin);
adminRouter.post("/verify", (0, validateResource_1.default)(admin_schema_1.verifyOTPSchema), adminController.verifyOTP);
exports.default = adminRouter;
