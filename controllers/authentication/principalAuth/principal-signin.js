//packages
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//models
import Principal from "../../../models/principal.js";

//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";

export const principalSignin = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { email, password } = req.body;
  try {
    const principal = await Principal.findOne({
      where: {
        email,
        isPrincipal: true,
        isActive: true,
      },
      raw: true,
    });
    if (!principal) {
      const error = new Error("principal not found");
      error.statusCode = 404;
      return next(error);
    }
    const isPwdEqual = await bcrypt.compare(password, principal["password"]);
    if (!isPwdEqual) {
      const error = new Error("Wrong Password");
      error.statusCode = 401;
      return next(error);
    }
    const id = principal["id"];
    const name = principal["name"];
    const mail = principal["email"];
    const token = jwt.sign({ id, email: mail }, process.env.TOKEN_SIGNING_KEY, {
      expiresIn: "1 day",
    });
    const refreshToken = jwt.sign(
      { id, email: mail, name },
      process.env.REFRESH_TOKEN_SIGNING_KEY
    );
    await Principal.update(
      { refreshToken: refreshToken },
      { where: { email, isprincipal: true } }
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
