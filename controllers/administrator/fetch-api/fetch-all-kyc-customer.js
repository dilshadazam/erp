//models
import Customer from  "../../../models/customer.js";
// EXPORT FUNCTION NAME FOR ROUTE
export const getCustomerKycInfo = async (req, res, next) => {
  try {
    const customer = await Customer.findAll({
      attributes: ["customerUniqueNo", "f_name","l_name","company_name","email","gender", "contact_no","d_o_b","city","student","employee","self_employed","pan_no","adhar_no", "createdAt"],
      raw: true,
    });
    res.status(200).json({
      message: "Fetched kyc completed customer!",
      customer,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};