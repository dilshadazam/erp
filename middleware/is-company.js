import jwt from "jsonwebtoken";

//importing driver model
import Company from "../models/admin.js";

export const isCompany = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  try {
    if (!authHeader) { 
      const err = new Error("Not authorized");
      err.statusCode = 401;
      return next(err);
    } console.log("run isLoanProvider auth header ");
    const token = authHeader.split(" ")[1]; //Authorization header looks like {Authorization: 'Bearer ' + this.props.token}
    let decodedToken;
    decodedToken = jwt.verify(token, process.env.TOKEN_SIGNING_KEY);
    if (!decodedToken) {
      const error = new Error("Not Authorized");
      error.statusCode = 401;
      next(error);
    }
    const company = await Company.findOne({
      where: {
        email: decodedToken.email,
        isLoanproviderActive:true,
    
      },
    });
    if (!company) {
      const error = new Error("Loan provider not found");
      error.statusCode = 404;
      next(error);
    }
    if ((!company, ["dataValues"]["isVerified"])) {
      const error = new Error("Not Verified Loanprovider");
      error.statusCode = 403;
      return next(error);
    }
    req.companyId = decodedToken.id;
    req.email = decodedToken.email;
    next();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};