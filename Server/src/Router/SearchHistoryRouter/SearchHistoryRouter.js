import { Router } from "express";
import SearchHistoryController from "../../Controller/SearchHistoryController/SearchHistoryController.js";
import SearchHistoryValidator from "../../Validator/SearchHistoryValidator/SearchHistoryValidator.js";
import AuthMiddleware from "../../Middleware/AuthMiddleware.js";

const SearchHistoryRouter = Router();

SearchHistoryRouter.post(
  "/",
  AuthMiddleware,
  SearchHistoryValidator.saveSearchHistory,
  SearchHistoryController.saveSearchHistory
);

SearchHistoryRouter.get(
  "/",
  AuthMiddleware,
  SearchHistoryController.getAllSearchHistory
);

SearchHistoryRouter.get(
  "/:searchId",
  AuthMiddleware,
  SearchHistoryController.getSingleSearchHistory
);

export default SearchHistoryRouter;
