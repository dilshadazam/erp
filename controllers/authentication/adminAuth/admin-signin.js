//packages
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//models
import User from "../../../models/admin.js";

//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";

export const adminSignin = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { email, password } = req.body;
  try {
    const admin = await User.findOne({
      where: {
        email,
        isAdmin: true,
      },
      raw: true,
    });
    if (!admin) {
      const error = new Error("Admin not found");
      error.statusCode = 404;
      return next(error);
    }
    const isPwdEqual = await bcrypt.compare(password, admin["password"]);
    if (!isPwdEqual) {
      const error = new Error("Wrong Password");
      error.statusCode = 401;
      return next(error);
    }
    const id = admin["id"];
    const name = admin["name"];
    const mail = admin["email"];
    const token = jwt.sign({ id, email: mail }, process.env.TOKEN_SIGNING_KEY, {
      expiresIn: "1 day",
    });
    const refreshToken = jwt.sign(
      { id, email: mail, name },
      process.env.REFRESH_TOKEN_SIGNING_KEY
    );
    await User.update(
      { refreshToken: refreshToken },
      { where: { email, isAdmin: true } }
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
