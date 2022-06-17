//packages
import bcrypt from "bcryptjs";

//models
import Principal from "../../../models/principal.js";

//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";
// EXPORT FUNCTION NAME FOR ROUTE
export const PrincipalSignup = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { name, email, password } = req.body;

  try {
    const principaldata = await Principal.findOne({
      where: {
        email,
        adminId: req.adminId,
      },
    });
    if (principaldata) {
      const error = new Error("Prinpal already exists");
      error.statusCode = 403;
      return next(error);
    }
    const encryptedPassword = await bcrypt.hash(password, 12);
    console.log(encryptedPassword);
    const result = await Principal.create({
      name,
      email,
      password: encryptedPassword,
      isActive: true,
      isAuthorized: true,
      isPrincipal: true,
      adminId: req.adminId,
    });

    res.status(201).json({
      msg: `Principal Registered successfull`,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
