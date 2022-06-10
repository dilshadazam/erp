import jwt from "jsonwebtoken";

//importing driver model
import user from "../models/user.js";
export const isTeacher = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  try {
    if (!authHeader) {
      const err = new Error("Not authorized");
      err.statusCode = 401;
      return next(err);
    }
    const token = authHeader.split(" ")[1]; //Authorization header looks like {Authorization: 'Bearer ' + this.props.token}
    let decodedToken;
    decodedToken = jwt.verify(token, process.env.TOKEN_SIGNING_KEY);
    if (!decodedToken) {
      const error = new Error("Not Authorized");
      error.statusCode = 401;
      next(error);
    }
    const teacher = await user.findOne({
      where: {
        email: decodedToken.email,

        isActive: true,
      },
    });
    if (!teacher) {
      const error = new Error("teacher not found");
      error.statusCode = 404;
      next(error);
    }
    if ((!teacher, ["dataValues"]["isVerified"])) {
      const error = new Error("Not Verified Teacher");
      error.statusCode = 403;
      return next(error);
    }
    req.userId = decodedToken.id;
    req.email = decodedToken.email;
    next();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
