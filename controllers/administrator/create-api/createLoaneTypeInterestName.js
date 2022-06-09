//IMPORT MODELS
import LoanInterestName from "../../../models/loaneIntrstName.js";

import {validationErrorHandler} from "../../../helpers/validation-error-handler.js";
 
// EXPORT FUNCTION NAME FOR ROUTE
export const createLoanInterestRate = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {loantypesnameId}= req.body;
  const {interestname} = req.body;

  try {

    const preExistingLoanInterest = await LoanInterestName.findOne({
      where: { 
        interestname,
        loantypesnameId
      } 

    }); 

    if (preExistingLoanInterest) {
      const error = new Error('already Exists!');
      error.statusCode = 403;
      return next(error);
    }

    const response = await LoanInterestName.create({
      loantypesnameId,
      interestname,
      isActive:true,
    });

    //Response in postman when data successfully inserted

    res.status(201).json({
      message: "Loan type interest name Add successfully !!",
      response
    });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);

  }

};