import express from "express";

import { body } from "express-validator";

import { adminSignup } from "../controllers/authentication/administrator/admin-signup.js";

import { administratorLogin } from "../controllers/authentication/administrator/admin-login.js";

const router = express.Router();

//ADMIN LOGIN USING EMAIL + PASSWORD
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
  "/administrator/login",
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
  administratorLogin
);

export default router;
