import express from "express";

import { body } from "express-validator";

import { adminSignup } from "../controllers/authentication/adminAuth/admin-signup.js";

import { adminSignin } from "../controllers//authentication/adminAuth/admin-signin.js";

const router = express.Router();

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
//USER SIGN-UP
// router.post(
//   "/user/signup",
//   [
//     body("name").trim().not().isEmpty().withMessage("Name is required"),
//     body("email").isEmail().withMessage("Should be in a valid email format"),
//     body("phone")
//       .trim()
//       .isInt()
//       .isLength({ min: 10, max: 12 })
//       .withMessage("phone number must be an integer"),
//     body("password")
//       .trim()
//       .isLength({ min: 6 })
//       .withMessage("Minimum 6 characters"),
//   ],
//   userSignup
// );

// //USER SIGNUP EMAIL VERIFY
// router.post("/user/verify-email", signupotpVerification);

// //USER PASSWORD RESET
// router.post("/user/user-password-reset", userResetPasswordUsingOTP);

// //USER LOGIN USING EMAIL + PASSWORD
// router.post(
//   "/user/signin",
//   [
//     body("email")
//       .isEmail()

//       .withMessage("Should be in a valid email format"),
//     body("password")
//       .trim()
//       .isLength({ min: 6 })
//       .withMessage("Minimum 6 characters"),
//   ],
//   userSignin
// );

// //re_verify-email
// router.post("/user/reverify", userNotVerified);

// router.post(
//   "/user/psw-reset",
//   [
//     body("email")
//       .isEmail()

//       .withMessage("Should be in a valid email format"),
//     body("password")
//       .trim()
//       .isLength({ min: 6 })
//       .withMessage("Minimum 6 characters"),
//     body("confirmpassword")
//       .trim()
//       .isLength({ min: 6 })
//       .withMessage("Minimum 6 characters"),
//     body("otp").trim().isLength({ min: 6 }).withMessage("otp must be 6 digit"),
//   ],
//   passwordReset
// );

export default router;
