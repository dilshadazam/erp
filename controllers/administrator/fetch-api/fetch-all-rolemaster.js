//models
import RoleMaster from "../../../models/rolemaster.js";
// EXPORT FUNCTION NAME FOR ROUTE
export const getAllRoleMatster = async (req, res, next) => {
  try {
    const Result = await RoleMaster.findAll({
      attributes: ["id", "rolemastertitle", "createdAt"],
      raw: true,
    });
    res.status(200).json({
      message: `Fetched all type of Role Master `,
      Result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
