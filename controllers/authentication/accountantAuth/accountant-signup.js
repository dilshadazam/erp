//packages
import bcrypt from "bcryptjs";

//models
import Accountant from "../../../models/accountant.js";

//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";
// EXPORT FUNCTION NAME FOR ROUTE
export const accountantSignup = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { name, email, password } = req.body;

  try {
    const accountantdata = await Accountant.findOne({
      where: {
        email,
        adminId: req.adminId,
      },
    });
    if (accountantdata) {
      const error = new Error("Accountant already exists");
      error.statusCode = 403;
      return next(error);
    }
    const encryptedPassword = await bcrypt.hash(password, 12);
    console.log(encryptedPassword);
    const result = await Accountant.create({
      name,
      email,
      password: encryptedPassword,
      isActive: true,
      isAuthorized: true,
      isAccountant: true,
      adminId: req.adminId,
    });

    res.status(201).json({
      msg: `Accountant Registered successfull`,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
