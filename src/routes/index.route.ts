import { Router } from "express";
import adminRouter from "./admin.route";
import userRouter from "./user.route";

const indexRouter = Router();

indexRouter.get("/", (req, res) => res.send("Server is running"));

indexRouter.use("/admin", adminRouter);

indexRouter.use("/user", userRouter);

export default indexRouter;
