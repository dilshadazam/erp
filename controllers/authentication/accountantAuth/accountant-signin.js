//packages
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//models
import Accountant from "../../../models/accountant.js";

//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";

export const accountantSignin = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { email, password } = req.body;
  try {
    const accountant = await Accountant.findOne({
      where: {
        email,
        isAccountant: true,
        isActive: true,
      },
      raw: true,
    });
    if (!accountant) {
      const error = new Error("Accountant not found");
      error.statusCode = 404;
      return next(error);
    }
    const isPwdEqual = await bcrypt.compare(password, accountant["password"]);
    if (!isPwdEqual) {
      const error = new Error("Wrong Password");
      error.statusCode = 401;
      return next(error);
    }
    const id = accountant["id"];
    const name = accountant["name"];
    const mail = accountant["email"];
    const token = jwt.sign({ id, email: mail }, process.env.TOKEN_SIGNING_KEY, {
      expiresIn: "1 day",
    });
    const refreshToken = jwt.sign(
      { id, email: mail, name },
      process.env.REFRESH_TOKEN_SIGNING_KEY
    );
    await Accountant.update(
      { refreshToken: refreshToken },
      { where: { email, isAccountant: true } }
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
