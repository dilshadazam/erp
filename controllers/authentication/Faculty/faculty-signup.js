//packages
import bcrypt from "bcryptjs";

//models
import Faculty from "../../../models/faculty.js";

//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";
// EXPORT FUNCTION NAME FOR ROUTE
export const facultySignup = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {
    name,
    email,
    password,
    joiningdate,
    higherqualification,
    gender,
    address,
    phone,
    adharcardno,
    classteacher,
  } = req.body;

  try {
    const teacherdata = await Faculty.findOne({
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
    const result = await Faculty.create({
      name,
      email,
      joiningdate,
      higherqualification,
      gender,
      phone,
      adharcardno,
      address,
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
