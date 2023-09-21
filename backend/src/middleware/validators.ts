import { body, param } from "express-validator";

const createUserValidation = [
  body("name").trim().isLength({ min: 3 }).withMessage("Enter a valid name"),
  body("email").trim().isEmail().withMessage("Enter a valid email"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Enter a valid password"),
];

const loginUserValidation = [
  body("email").trim().isEmail().withMessage("Enter a valid email"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Enter a valid password"),
];

const updateUserValidation = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Enter a valid name"),
  body("password")
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage("Enter a valid password"),
  body("currentPassword")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Enter a valid password"),
];

const presignedUrlValidation = [
  body("fileName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Enter a valid file name"),
  body("fileType")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Enter a valid file type"),
];

const getAndDeleteFileValidation = [
  param("fileName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Enter a valid file name"),
];

export {
  createUserValidation,
  loginUserValidation,
  presignedUrlValidation,
  getAndDeleteFileValidation,
  updateUserValidation,
};
