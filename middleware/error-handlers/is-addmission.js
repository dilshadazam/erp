// import jwt from "jsonwebtoken";

// //importing driver model
// import Accountant from "../models/accountant.js";

// export const isAccountant = async (req, res, next) => {
//   const authHeader = req.get("Authorization");
//   try {
//     if (!authHeader) {
//       const err = new Error("Not authorized");
//       err.statusCode = 401;
//       return next(err);
//     }
//     console.log("run isAccountant auth header ");
//     const token = authHeader.split(" ")[1]; //Authorization header looks like {Authorization: 'Bearer ' + this.props.token}
//     let decodedToken;
//     decodedToken = jwt.verify(token, process.env.TOKEN_SIGNING_KEY);
//     console.log(process.env.TOKEN_SIGNING_KEY);
//     if (!decodedToken) {
//       const error = new Error("Not Authorized");
//       error.statusCode = 401;
//       next(error);
//     }
//     const accountant = await Accountant.findOne({
//       where: {
//         email: decodedToken.email,
//         isActive: true,
//       },
//     });
//     if (!accountant) {
//       const error = new Error("Accountant not found");
//       error.statusCode = 404;
//       next(error);
//     }
//     if ((!accountant, ["dataValues"]["isVerified"])) {
//       const error = new Error("Not Verified Accountant");
//       error.statusCode = 403;
//       return next(error);
//     }
//     req.accountantId = decodedToken.id;
//     req.email = decodedToken.email;
//     next();
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// };
