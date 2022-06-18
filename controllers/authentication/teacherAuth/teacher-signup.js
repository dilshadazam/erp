//packages
import bcrypt from "bcryptjs";

//models
import Teacher from "../../../models/teacher.js";

//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";
// EXPORT FUNCTION NAME FOR ROUTE
export const teacherSignup = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {
    name,
    email,
    password,
    joiningdate,
    higherqualification,
    gender,
    phone,
    adharcardno,
    classteacher,
  } = req.body;

  try {
    const teacherdata = await Teacher.findOne({
      where: {
        email,
        accountantId: req.accountantId,
      },
    });
    if (teacherdata) {
      const error = new Error("Teacher already exists");
      error.statusCode = 403;
      return next(error);
    }
    const encryptedPassword = await bcrypt.hash(password, 12);
    console.log(encryptedPassword);
    const result = await Teacher.create({
      name,
      email,
      joiningdate,
      higherqualification,
      gender,
      phone,
      adharcardno,
      classteacher,
      password: encryptedPassword,
      isActive: true,
      isAuthorized: true,
      isTeacher: true,
      accountantId: req.accountantId,
    });

    res.status(201).json({
      msg: `Teacher Registered successfull`,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
