import AuthService from "../../Services/AuthService/AuthService.js";

const AuthController = {
    registerUser: async (req, res) => {
      try {
        await AuthService.registerUser(req);
        return res.status(201).json({ message: "User created successfully" });
      } catch (error) {
        return res
          .status(error.status || 500)
          .json({ message: error.message || "Internal server error" });
      }
    },
  };
  
  export default AuthController;
  