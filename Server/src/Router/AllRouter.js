import { Router } from "express";
import AuthRouter from "./AuthRouter/AuthRouter.js";

const allRouter = Router();

allRouter.use("/auth", AuthRouter);

export default allRouter;
