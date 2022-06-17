//packages
import bcrypt from "bcryptjs";

//models
import User from "../../../models/admin.js";

//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";

export const adminSignup = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { name, email, password } = req.body;
  console.log(name, email, password);
  try {
    const admin = await User.findOne({ where: { email } });
    if (admin) {
      const error = new Error("Entered Email-Id already exists");
      error.statusCode = 403;
      return next(error);
    }
    const encryptedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      name,
      email,
      password: encryptedPassword,
      isActive: true,
      isAdmin: true,
    });
    res.status(201).json({
      msg: `Admin registered successfully`,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
