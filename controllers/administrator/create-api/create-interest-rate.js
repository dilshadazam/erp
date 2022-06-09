//models
import InterestRate from "../../../models/loanIntrstRate.js";
import {validationErrorHandler} from "../../../helpers/validation-error-handler.js";

// EXPORT FUNCTION NAME FOR ROUTE
export const createInterestRate = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {interestnameId,rateofinterest,penaltyrate} = req.body;
  try {
    const preExistingInterestRate = await InterestRate.findOne({
      where: {
        rateofinterest
      }
    });
    
    if (preExistingInterestRate) {
      const error = new Error('Already Exists!');
      error.statusCode = 403;
      return next(error);
    }
   
    //response in postman when data successfully inserted
    const response = await InterestRate.create({
    interestnameId,rateofinterest,penaltyrate});
    res.status(201).json({
      message: "Interest Rate add successfully",
      response
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};