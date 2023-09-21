import express from "express";
import {
  uploadFile,
  getPreSignedUrl,
  getFile,
  deleteFile,
  getAllFiles,
} from "../controllers/fileController";
import {
  presignedUrlValidation,
  getAndDeleteFileValidation,
} from "../middleware/validators";

const router = express.Router();

router.route("/").get(getAllFiles);
router.route("/upload/:fileName").post(getAndDeleteFileValidation, uploadFile);
router.route("/presigned-url").post(presignedUrlValidation, getPreSignedUrl);
router.route("/:fileName").get(getAndDeleteFileValidation, getFile);
router.route("/:fileName").delete(getAndDeleteFileValidation, deleteFile);

export default router;
