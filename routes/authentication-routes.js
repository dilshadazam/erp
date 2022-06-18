import express from "express";

import { body } from "express-validator";
//admin authenciation import
import { adminSignup } from "../controllers/authentication/adminAuth/admin-signup.js";
import { adminSignin } from "../controllers//authentication/adminAuth/admin-signin.js";
//principal authenciation import
import { PrincipalSignup } from "../controllers/authentication/principalAuth/principal-signup.js";
import { principalSignin } from "../controllers/authentication/principalAuth/principal-signin.js";
//accountant authentication import
import { accountantSignup } from "../controllers/authentication/accountantAuth/accountant-signup.js";
import { accountantSignin } from "../controllers/authentication/accountantAuth/accountant-signin.js";
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

//PRINCIPAL SIGNUP USING EMAIL + PASSWORD
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

//PRINCIPAL LOGIN USING EMAIL + PASSWORD
router.post(
  "/principal/principal-signin",
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

  principalSignin
);

//ACCOUNTANT SIGNUP USING EMAIL + PASSWORD
router.post(
  "/accountant/accountant-signup",
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
  accountantSignup
);

//ACCOUNTANT SIGNIN USING EMAIL + PASSWORD
router.post(
  "/accountant/accountant-signin",
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
  accountantSignin
);

export default router;
