import AuthService from "../../Services/AuthService/AuthService.js";

const AuthController = {
  registerUser: async (req, res) => {
    try {
      await AuthService.registerUser(req);
      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Registration Error:", error); 
      return res
        .status(error.status || 500)
        .json({ message: error.message || "Internal server error" });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { token, data } = await AuthService.loginUser(req);
      return res.status(200).json({ message: "Login successful", token, data });
    } catch (error) {
      return res
        .status(error.status || 500)
        .json({ message: error.message || "Internal server error" });
    }
  },
};

export default AuthController;
