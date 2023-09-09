import { Request, Response } from "express";

const uploadFile = (req: Request, res: Response) => {
  res.status(200).json({ success: false, message: "file uploaded" });
};
const getPreSignedUrl = (req: Request, res: Response) => {
  res.status(200).json({ success: false, message: "get pre signed url" });
};

const getFile = (req: Request, res: Response) => {
  res.status(200).json({ success: false, message: "file fetched" });
};

const deleteFile = (req: Request, res: Response) => {
  res.status(200).json({ success: false, message: "file deleted" });
};

export { uploadFile, getPreSignedUrl, getFile, deleteFile };
