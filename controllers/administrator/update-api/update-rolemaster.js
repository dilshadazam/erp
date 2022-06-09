//models
import RoleMasters from "../../../models/rolemaster.js";

//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";

export const editRoleMaster = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { rolemastertitle } = req.body;
  try {
    const result = await RoleMasters.update(
      {
        rolemastertitle,
      },
      {
        where: {
          id: req.params.rolemasterId,
        },
      }
    );
    if (result[0] === 0) {
      const error = new Error(" Role Master not found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(201).json({
      message: "Role Master update successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
