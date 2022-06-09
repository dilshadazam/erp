//models
import Customer from "../../../models/customer.js";
// EXPORT FUNCTION NAME FOR ROUTE
export const getCustomerBasicInfo = async (req, res, next) => {
  try {
    const customer = await Customer.findAll({
      attributes: [
        "customerUniqueNo",
        "f_name",
        "l_name",
        "company_name",
        "email",
        "gender",
        "contact_no",
        "d_o_b",
        "city",
        "student",
        "employee",
        "self_employed",
        "createdAt",
      ],
      raw: true,
    });
    res.status(200).json({
      message: "Fetched only those customer who have not taken any loan yet!",
      customer,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
