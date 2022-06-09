//models
import LoanInterestName from "../../../models/loaneIntrstName.js";

// EXPORT FUNCTION NAME FOR ROUTE
export const getAllLoanInterestNames = async (req, res, next) => {
  const  loantypesnameId = req.params.loantypesnameId;
  try {
    const Result = await LoanInterestName.findAll({
      where: {
        loantypesnameId,
        isActive:true
      },
      attributes: [ "id","interestname","rateofinterest","penaltyrate","isActive", "createdAt"],
      raw: true,
    });
     //response in postman when data successfully inserted
    res.status(200).json({
      message: `List of Loan Types interest Rate by loantypesnameId No =${loantypesnameId}`,
      Result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};