import { Response } from "express";
import {
  generatePreSignedUrl,
  Method,
  deleteObject,
  checkFileExists,
} from "../services/s3Service";
import {
  createPath,
  deleteFileData,
  createFileData,
  getAllFilesData,
} from "../services/FileService";
import { AuthenticatedRequest } from "../middleware/authentication";
import { validationResult } from "express-validator";
import { ValidationError, AppError } from "../middleware/errorHandling";

const uploadFile = async (req: AuthenticatedRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError(errors.array()[0].msg);
  }
  const fileName = req.params.fileName;
  const userId = req.user?.id;
  const filePath = createPath(userId, fileName);

  const exists = await checkFileExists(filePath);

  if (!exists) {
    throw new AppError("File not found", 404);
  }
  await createFileData(userId, fileName);
  res.status(200).json({ success: true, message: "file uploaded" });
};
const getPreSignedUrl = async (req: AuthenticatedRequest, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ValidationError(errors.array()[0].msg);
  }

  const { fileName, fileType } = req.body;

  const filePath = createPath(req.user?.id, fileName);
  const s3PreSignedUrl = await generatePreSignedUrl(
    Method.putObject,
    filePath,
    fileType
  );

  res
    .status(200)
    .json({ success: true, message: "get pre signed url", s3PreSignedUrl });
};

const getAllFiles = async (req: AuthenticatedRequest, res: Response) => {
  const files = await getAllFilesData(req.user?.id);
  res.status(200).json({ success: true, message: "files fetched", files });
};

const getFile = async (req: AuthenticatedRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError(errors.array()[0].msg);
  }
  const { fileName } = req.params;
  const filePath = createPath(req.user?.id, fileName);
  const url = await generatePreSignedUrl(Method.getObject, filePath);
  console.log(filePath);
  res
    .status(200)
    .json({ success: true, message: "file fetched", url, fileName });
};

const deleteFile = async (req: AuthenticatedRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError(errors.array()[0].msg);
  }
  const { fileName } = req.params;
  const filePath = createPath(req.user?.id, fileName);
  await deleteObject(filePath);
  await deleteFileData(req.user?.id, fileName);
  res.status(200).json({ success: true, message: "file deleted" });
};

export { uploadFile, getPreSignedUrl, getFile, getAllFiles, deleteFile };
