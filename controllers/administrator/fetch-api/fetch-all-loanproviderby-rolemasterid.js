//models
import LoanProviders from "../../../models/loanprovider.js";

// EXPORT FUNCTION NAME FOR ROUTE
export const getAllLoanProviderbyrolemaster = async (req, res, next) => {
  const  rolemasterId = req.params. rolemasterId;
  try {
    const Result = await LoanProviders.findAll({
      where: {
        rolemasterId,
      },
      attributes: [ "id","name","email","rolemasterId","loanprovidercode", "isLoanproviderActive","isAuthorized", "createdAt"],
      raw: true,
    });
     //response in postman when data successfully inserted
    res.status(200).json({
      message: `List of Loan Provider  by rolemasterId No =${rolemasterId}`,
      Result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};