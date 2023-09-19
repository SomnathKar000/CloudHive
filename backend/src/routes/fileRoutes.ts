import express from "express";
import {
  uploadFile,
  getPreSignedUrl,
  getFile,
  deleteFile,
} from "../controllers/fileController";
import { presignedUrlValidation } from "../middleware/validators";

const router = express.Router();

router.route("/upload").post(uploadFile);
router.route("/presigned-url").post(presignedUrlValidation, getPreSignedUrl);

router.route("/:id").get(getFile);
router.route("/:id").delete(deleteFile);

export default router;
