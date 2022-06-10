import jwt from "jsonwebtoken";

//importing driver model
import user from "../models/student.js";
export const isStudent = async (req, res, next) => {
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
    const student = await user.findOne({
      where: {
        email: decodedToken.email,

        isActive: true,
      },
    });
    if (!student) {
      const error = new Error("student not found");
      error.statusCode = 404;
      next(error);
    }
    if ((!student, ["dataValues"]["isVerified"])) {
      const error = new Error("Not Verified student");
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
