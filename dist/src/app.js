"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_route_1 = __importDefault(require("./routes/index.route"));
// import deserializeUser from "./middleware/deserializeUser";
const api_error_handler_1 = __importDefault(require("./middleware/error/api-error-handler"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", index_route_1.default);
app.use(api_error_handler_1.default);
exports.default = app;
