import Joi from "joi";

const AuthValidator = {
  registerUser: (req, res, next) => {
    try {
      const data = req.body;
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      });
      const { error, value } = schema.validate(data);
      if (error) {
        return res.status(422).json({
          message: "Unprocessable Entity",
          error: error.message,
        });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Internal Server Error",
      });
    }
  },
  loginUser: (req, res, next) => {
    try {
      const data = req.body;
      const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      });
      const { error, value } = loginSchema.validate(data);
      if (error) {
        return res.status(422).json({
          message: "Unprocessable Entity",
          error: error.message,
        });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Internal Server Error",
      });
    }
  },
};

export default AuthValidator;
