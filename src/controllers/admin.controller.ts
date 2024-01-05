import { autoInjectable } from "tsyringe";
import bcrypt from "bcrypt";
import AdminService from "../services/admin.service";
import BaseController from "./base.controller";
import { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import sendEmail from "../utils/mailer";
import config from "config";
import { generateOTP } from "../utils/generateOTP";
import { generateEmailTemplateForOTP } from "../utils/emailTemplate";
import AdminSI from "../interfaces/admin.interface";

@autoInjectable()
export default class AdminController extends BaseController {
  service: AdminService<any>;
  constructor(service?: AdminService<any>) {
    super(service);
    this.service = service;
  }

  loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const failedMessage = "Invalid email or password";
      // Check existing admin
      const admin = (await this.service.getAdmin({ email: req.body.email })) as AdminSI;
      if (!admin) {
        sendResponse(res, 403, false, null, failedMessage);
        return;
      }
      // Generate OTP
      const otp = generateOTP();

      console.log(otp);

      // Hash OTP
      const hash = (await bcrypt.hash(otp, 10)) as string;

      // Add OTP to admin ddocument
      (await this.service.findAdminAndUpdate({ email: admin.email }, { verificationCode: hash })) as AdminSI;

      // Create email template for OTP
      const template = generateEmailTemplateForOTP(admin.firstName, admin.lastName, otp);

      // Send OTP to admin email
      const response = (await sendEmail({
        to: admin.email,
        from: config.get("senderEmail"),
        subject: "Email Verification, Sanjeevini",
        html: template,
      })) as boolean;

      // If failed to send OTP
      if (!response) {
        const failedEmailMessage = "Failed to send OTP";
        sendResponse(res, 400, false, null, failedEmailMessage);
      }

      // Send success response
      const successMessage = "OTP sent successfully";
      sendResponse(res, 200, true, null, successMessage);
    } catch (error) {
      // Skip function with error if any error occurs
      next(error);
    }
  };

  verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
    // Check existing admin
    try {
      const admin = (await this.service.getAdmin({ email: req.body.email })) as AdminSI;
      if (!admin) {
        const failedMessage = "Invalid email or password";
        sendResponse(res, 403, false, null, failedMessage);
        return;
      }

      // Compare verification code
      const compare = (await bcrypt.compare(req.body.verificationCode, admin.verificationCode)) as boolean;

      // If verification code doesn't match
      if (!compare) {
        const verificationFailedMessage = "Verification Failed";
        sendResponse(res, 403, false, null, verificationFailedMessage);
        return;
      }

      // sign a access token
      const accessToken = (await this.service.signAccessToken(admin)) as string;

      // sign a refresh token
      const refreshToken = (await this.service.signRefreshToken(admin)) as string;

      // Send success response
      const successMessage = "Logged in successfully";
      sendResponse(res, 200, true, { accessToken, refreshToken }, successMessage);
    } catch (error) {
      // Skip function with error if any error occurs
      next(error);
    }
  };
}