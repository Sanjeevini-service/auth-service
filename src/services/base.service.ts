import * as mongoose from "mongoose";
import ModelI from "../interfaces/model.interface";

export default class BaseService<T> {
  model: mongoose.Model<any, any>;
  constructor(modelI?: ModelI) {
    this.model = modelI.model;
  }
}
