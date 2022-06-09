//models
import LoantypeName from "../../../models/types-of-loan.js";

//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";
// EXPORT FUNCTION NAME FOR ROUTE
export const deleteLoantypeNmae = async (req, res, next) => {
  validationErrorHandler(req, next);
  try {
    const result = await LoantypeName.destroy({
      where: {
        id: req.params.loantypesnameId,
      },
    });
    if (result[0] === 0) {
      const error = new Error("loan types not found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(201).json({
      message: "Loan type Deleted successfull",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
