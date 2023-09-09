import express from "express";
import {
  uploadFile,
  getPreSignedUrl,
  getFile,
  deleteFile,
} from "../controllers/fileController";

const router = express.Router();

router.route("/upload").post(uploadFile);
router.route("/presigned-url").post(getPreSignedUrl);

router.route("/:id").get(getFile);
router.route("/:id").delete(deleteFile);

export default router;
