import express from "express";
import {
  createUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";

const router = express.Router();

router.route("/").post(createUser);
router.route("/").delete(deleteUser);
router.route("/login").post(loginUser);
router.route("/profile").get(getUser);
router.route("/profile").put(updateUser);

export default router;
