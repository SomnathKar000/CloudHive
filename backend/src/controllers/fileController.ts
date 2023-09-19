import { Response } from "express";
import { generatePreSignedUrl } from "../services/s3Service";
import { AuthenticatedRequest } from "../middleware/authentication";
import { validationResult } from "express-validator";
import { ValidationError } from "../middleware/errorHandling";
// import { File } from "../models/File";

const uploadFile = async (req: AuthenticatedRequest, res: Response) => {
  res.status(200).json({ success: true, message: "file uploaded" });
};
const getPreSignedUrl = async (req: AuthenticatedRequest, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ValidationError(errors.array()[0].msg);
  }

  const { fileName, fileType } = req.body;
  const userId = req.user?.id;
  const filePath = userId + "/" + fileName;
  const s3PreSignedUrl = await generatePreSignedUrl(filePath, fileType);

  res
    .status(200)
    .json({ success: true, message: "get pre signed url", s3PreSignedUrl });
};

const getFile = (req: AuthenticatedRequest, res: Response) => {
  res.status(200).json({ success: true, message: "file fetched" });
};

const deleteFile = (req: AuthenticatedRequest, res: Response) => {
  res.status(200).json({ success: true, message: "file deleted" });
};

export { uploadFile, getPreSignedUrl, getFile, deleteFile };
