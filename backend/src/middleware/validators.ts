import { body } from "express-validator";

const createUserValidation = [
  body("name").isLength({ min: 3 }).withMessage("Enter a valid name"),
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password").isLength({ min: 5 }).withMessage("Enter a valid password"),
];

const loginUserValidation = [
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password").isLength({ min: 5 }).withMessage("Enter a valid password"),
];

const presignedUrlValidation = [
  body("fileName").isLength({ min: 2 }).withMessage("Enter a valid file name"),
  body("fileType").isLength({ min: 2 }).withMessage("Enter a valid file type"),
];

export { createUserValidation, loginUserValidation, presignedUrlValidation };
