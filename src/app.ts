require("dotenv").config();
import "reflect-metadata";
import express from "express";
import cors from "cors";
import indexRouter from "./routes/index.route";
import sendResponse from "./utils/sendResponse";
import errorHandler from "./middleware/error/api-error-handler";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", indexRouter);

app.use(errorHandler);

export default app;
