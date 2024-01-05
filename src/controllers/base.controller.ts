import BaseService from "../services/base.service";

export default class BaseController {
  service: BaseService<any>;
  constructor(service: BaseService<any>) {
    this.service = service;
  }
}
