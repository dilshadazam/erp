import express from "express";

//BODY VALIDATOR IMPORT
import { body } from "express-validator";

const router = express.Router();

//MIDDLEWARE OF LOANPROVIDER
import { isUser } from "../middleware/is-user.js";

export default router;
