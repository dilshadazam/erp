//models
import Customer from "../../../models/customer.js";

import {validationErrorHandler} from "../../../helpers/validation-error-handler.js";
// EXPORT FUNCTION NAME FOR ROUTE
export const createCustomer = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {  customerUniqueNo,  company_name, f_name,l_name,email,contact_no,gender, d_o_b,city,student,employee,self_employed,pan_no,adhar_no} = req.body;
  try {
    const preExistingCustomer = await Customer.findOne({
      where: {
        customerUniqueNo
      }
    });
    if (preExistingCustomer) {
      const error = new Error('Customer already Exists!');
      error.statusCode = 403;
      return next(error);
    }
    const response = await Customer.create({
        customerUniqueNo,  company_name, f_name,l_name,email,contact_no,gender, d_o_b,city,student,employee,self_employed,pan_no,adhar_no
    });
    res.status(201).json({
      message: "Customer created successfully",
      response
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};