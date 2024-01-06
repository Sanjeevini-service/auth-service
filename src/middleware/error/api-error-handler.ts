import logger from "../../utils/logger";
import sendResponse from "../../utils/sendResponse";

const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  if (error.message.startsWith("connect")) {
    const failedEmailMessage = "Failed to communicate with user-service";
    sendResponse(res, 400, false, null, failedEmailMessage);
    return;
  }
  logger.info(error.message);
  sendResponse(res, 500, false, null, "Internal Server Error");
};

export default errorHandler;
