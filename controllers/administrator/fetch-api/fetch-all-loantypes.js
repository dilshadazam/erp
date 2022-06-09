//models
import LoanTypes from "../../../models/types-of-loan.js";
// EXPORT FUNCTION NAME FOR ROUTE
export const getAllLoanTypes = async (req, res, next) => {
  try {
    const Result = await LoanTypes.findAll({
      attributes: ["id", "loantypename", "isActive", "createdAt"],
      raw: true,
    });
    res.status(200).json({
      message: `Fetched all types by loan `,
      Result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
