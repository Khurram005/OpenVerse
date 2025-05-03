import { hash, compare } from "bcrypt";
import UserModel from "../../Model/UserModel.js";

const AuthService = {
  registerUser: async (req) => {
    try {
      const { name, email, password } = req.body;
      // check if user exists
      const checkUser = await UserModel.findOne({ where: { email } });
      if (checkUser) {
        const error = new Error("User already exists");
        error.status = 400;
        throw error;
      }
      const hashedPassword = await hash(password, 10);
      // create user
      const user = await UserModel.create({
        name,
        email,
        password: hashedPassword,
      });
      return;
    } catch (error) {
      throw error;
    }
  },
};

export default AuthService;
