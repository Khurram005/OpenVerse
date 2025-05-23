import { Router } from "express";
import AuthValidator from "../../Validator/AuthValidator/AuthValidator.js";
import AuthController from "../../Controller/AuthController/AuthController.js";

const AuthRouter = Router();

AuthRouter.post(
  "/register",
  AuthValidator.registerUser,
  AuthController.registerUser
);

AuthRouter.post("/login", AuthValidator.loginUser, AuthController.loginUser);

export default AuthRouter;
