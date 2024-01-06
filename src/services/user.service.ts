import { injectable } from "tsyringe";
import UserSI from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import BaseService from "./base.service";
import { signJwt } from "../utils/jwt";
import config from "config";
import axios from "axios";
import { httpRequest } from "../utils/httpRequest";

@injectable()
export default class UserService<T> extends BaseService<UserSI> {
  constructor(modelI?: UserModel) {
    super(modelI);
  }

  getUserByEmail = async (email: string) => {
    return httpRequest("POST", "/user", { email });
  };

  signAccessToken = async (user: UserSI) => {
    // const payload = omit(user.toJSON(), ["password"]);

    const accessTokenPayload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    const accessToken = signJwt(accessTokenPayload, "accessTokenPrivateKey", {
      expiresIn: config.get("accessTokenExpiration"),
    });

    return accessToken;
  };

  signRefreshToken = async (user: UserSI) => {
    const refreshTokenPayload = {
      userId: user._id,
    };
    const refreshToken = signJwt(refreshTokenPayload, "refreshTokenPrivateKey", {
      expiresIn: config.get("refreshTokenExpiration"),
    });
    return refreshToken;
  };
}
