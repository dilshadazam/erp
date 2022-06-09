//models
import Customer from "../../../models/customer.js";

//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";
// EXPORT FUNCTION NAME FOR ROUTE
export const updateCustomerKyc = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { pan_no,adhar_no } = req.body;
  try {
    const result = await Customer.update(
      {
        pan_no,adhar_no
      },
      {
        where: {
          customerUniqueNo: req.params.customerUniqueNo,
          
        },
      }
    );
    if (result[0] === 0) {
      const error = new Error("Customer not found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(201).json({
      message: "Customer KYC updated successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};