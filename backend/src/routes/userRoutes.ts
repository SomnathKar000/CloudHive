import express from "express";
import {
  createUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import {
  createUserValidation,
  loginUserValidation,
} from "../middleware/userValidators";
import { authenticate } from "../middleware/authentication";

const router = express.Router();

router.route("/").post(createUserValidation, createUser);
router.route("/").delete(authenticate, deleteUser);
router.route("/login").post(loginUserValidation, loginUser);
router.route("/profile").get(authenticate, getUser);
router.route("/profile").put(authenticate, updateUser);

export default router;
