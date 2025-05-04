import { hash, compare } from "bcrypt";
import UserModel from "../../Model/UserModel.js";
import jwt from "jsonwebtoken";

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
  loginUser: async (req) => {
    try {
      const { email, password } = req.body;
      // check if user exists
      const user = await UserModel.findOne({ where: { email } });
      if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
      }
      // check password
      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
        const error = new Error("Invalid password");
        error.status = 401;
        throw error;
      }

      const data = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      const token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      req.session.token = token;
      req.session.user = data;
      await req.session.save();

      return { token, data };
    } catch (error) {
      throw error;
    }
  },
};

export default AuthService;
