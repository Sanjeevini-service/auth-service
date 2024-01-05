import { injectable } from "tsyringe";
import AdminSI from "../interfaces/admin.interface";
import AdminModel from "../models/admin.model";
import BaseService from "./base.service";

import { signJwt } from "../utils/jwt";
import config from "config";

@injectable()
export default class AdminService<T> extends BaseService<AdminSI> {
  constructor(modelI?: AdminModel) {
    super(modelI);
  }

  getAdmin = async (data: T): Promise<T> => {
    console.log(data);
    const admin: any = {
      firstName: "Vinayak",
      lastName: "Naik",
      email: "vinayaknaik7259@gmail.com",
      role: "admin --fake response",
      verificationCode: "$2b$10$pOlMhmTuExQtPH1HBivORu95PcduOVXlFwDGF.qR67tBORws58i7u",
      balance: 0,
    };
    return admin;
  };
  findAdminAndUpdate = async (match: T, update: T): Promise<T> => {
    console.log("match=============", match);
    console.log("update=============", update);
    const admin: any = {
      firstName: "Vinayak",
      lastName: "Naik",
      email: "vinayaknaik7259@gmail.com",
      role: "admin --fake response",
      verificationCode: "1234566",
      balance: 0,
    };
    return admin;
  };

  signAccessToken = async (admin: AdminSI): Promise<string> => {
    // const payload = omit(admin.toJSON(), ["password"]);

    const accessTokenPayload = {
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
    };

    const accessToken = signJwt(accessTokenPayload, "accessTokenPrivateKey", {
      expiresIn: config.get("accessTokenExpiration"),
    });

    return accessToken;
  };
  signRefreshToken = async (admin: AdminSI): Promise<string> => {
    const refreshTokenPayload = {
      adminId: admin._id,
    };
    const refreshToken = signJwt(refreshTokenPayload, "refreshTokenPrivateKey", {
      expiresIn: config.get("refreshTokenExpiration"),
    });
    return refreshToken;
  };
}
