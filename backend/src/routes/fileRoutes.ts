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
  handleValidationErrors,
} from "../middleware/validators";

const router = express.Router();

router.route("/").get(getAllFiles);
router
  .route("/upload")
  .post(presignedUrlValidation, handleValidationErrors, uploadFile);
router
  .route("/presigned-url")
  .post(presignedUrlValidation, handleValidationErrors, getPreSignedUrl);
router
  .route("/:fileName")
  .get(getAndDeleteFileValidation, handleValidationErrors, getFile);
router
  .route("/:fileName")
  .delete(getAndDeleteFileValidation, handleValidationErrors, deleteFile);

export default router;
