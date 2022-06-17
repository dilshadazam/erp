import express from "express";

import { body } from "express-validator";

import { adminSignup } from "../controllers/authentication/adminAuth/admin-signup.js";

import { adminSignin } from "../controllers//authentication/adminAuth/admin-signin.js";

import { PrincipalSignup } from "../controllers/authentication/principalAuth/principal-signup.js";

const router = express.Router();
import { isAdministrator } from "../middleware/is-admin.js";
// import { isLoanprovider } from "../middleware/is-loanprovider.js";

//ADMIN signup USING EMAIL + PASSWORD
router.post(
  "/administrator/signup",
  [
    body("name").trim().not().isEmpty().withMessage("Name is required"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Should be in a valid email format"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Minimum 6 characters"),
  ],
  adminSignup
);

//ADMIN LOGIN USING EMAIL + PASSWORD
router.post(
  "/administrator/signin",
  [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Should be in a valid email format"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Minimum 6 characters"),
  ],
  adminSignin
);

//principal signup by admin
router.post(
  "/principal/principal-signup",
  [
    body("name").trim().not().isEmpty().withMessage("Name is required"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Should be in a valid email format"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Minimum 6 characters"),
  ],
  isAdministrator,
  PrincipalSignup
);

export default router;
