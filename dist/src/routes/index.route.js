"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_route_1 = __importDefault(require("./admin.route"));
const user_route_1 = __importDefault(require("./user.route"));
const indexRouter = (0, express_1.Router)();
indexRouter.get("/", (req, res) => res.send("Server is running"));
indexRouter.use("/admin", admin_route_1.default);
indexRouter.use("/user", user_route_1.default);
exports.default = indexRouter;
