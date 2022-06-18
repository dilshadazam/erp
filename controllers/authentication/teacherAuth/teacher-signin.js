//packages
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//models
import Teacher from "../../../models/teacher.js";

//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";

export const teacherSignin = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { email, password } = req.body;
  try {
    const teacher = await Teacher.findOne({
      where: {
        email,
        isTeacher: true,
        isActive: true,
      },
      raw: true,
    });
    if (!teacher) {
      const error = new Error("Teacher not found");
      error.statusCode = 404;
      return next(error);
    }
    const isPwdEqual = await bcrypt.compare(password, teacher["password"]);
    if (!isPwdEqual) {
      const error = new Error("Wrong Password");
      error.statusCode = 401;
      return next(error);
    }
    const id = teacher["id"];
    const name = teacher["name"];
    const mail = teacher["email"];
    const token = jwt.sign({ id, email: mail }, process.env.TOKEN_SIGNING_KEY, {
      expiresIn: "1 day",
    });
    const refreshToken = jwt.sign(
      { id, email: mail, name },
      process.env.REFRESH_TOKEN_SIGNING_KEY
    );
    await Teacher.update(
      { refreshToken: refreshToken },
      { where: { email, isTeacher: true } }
    );
    res.status(200).json({
      msg: `Login with email Successful`,
      token: token,
      refreshToken: refreshToken,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
