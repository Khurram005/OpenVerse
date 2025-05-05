import { Router } from "express";
import AuthRouter from "./AuthRouter/AuthRouter.js";
import SearchHistoryRouter from "./SearchHistoryRouter/SearchHistoryRouter.js";

const allRouter = Router();

allRouter.use("/auth", AuthRouter);
allRouter.use("/search-history", SearchHistoryRouter);

export default allRouter;
