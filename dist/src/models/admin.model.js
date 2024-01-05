"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tsyringe_1 = require("tsyringe");
let AdminModel = class AdminModel {
    constructor() {
        this.schema = new mongoose_1.Schema({
            firstName: {
                type: String,
                required: true,
                lowercase: true,
            },
            lastName: {
                type: String,
                required: true,
                lowercase: true,
            },
            email: {
                type: String,
                required: true,
            },
            verificationCode: {
                type: String,
            },
            balance: {
                type: Number,
                default: 0,
            },
            role: {
                type: String,
                value: "admin",
            },
        }, {
            timestamps: true,
        });
        this.model = (0, mongoose_1.model)("admins", this.schema);
    }
};
AdminModel = __decorate([
    (0, tsyringe_1.singleton)()
], AdminModel);
exports.default = AdminModel;
