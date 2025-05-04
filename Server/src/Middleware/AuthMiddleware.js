const AuthMiddleware = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    token = token.replace("Bearer ", "");

    jwt.verify(token, process.env.JWT_SECRET);

    if (!req.session.user || !req.session.token) {
      return res.status(401).json({
        message: "Please login",
      });
    }
    if (req.session.token !== token) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid request",
    });
  }
};

export default AuthMiddleware;
