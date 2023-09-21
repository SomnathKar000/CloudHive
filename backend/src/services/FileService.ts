import { AppError } from "../middleware/errorHandling";
import { File } from "../models/File";

const createPath = (userId: string | undefined, fileName: string) => {
  if (userId === undefined) throw new AppError("User not found", 404);
  return userId + "/" + fileName;
};

const deleteFileData = async (userId: string | undefined, fileName: string) => {
  if (userId === undefined) throw new AppError("User not found", 404);
  const file = await File.findOne({ where: { userId, fileName } });

  if (!file) throw new AppError("File not found", 404);
  await file.destroy();
};

const createFileData = async (userId: string | undefined, fileName: string) => {
  if (userId === undefined) throw new AppError("User not found", 404);
  await File.create({ userId, fileName });
};

const getAllFilesData = async (userId: string | undefined) => {
  if (userId === undefined) throw new AppError("User not found", 404);
  const files = await File.findAll({
    where: { userId },
    attributes: ["id", "fileName", "createdAt", "updatedAt"],
    order: [["createdAt", "DESC"]],
  });
  return files;
};

export { createPath, deleteFileData, createFileData, getAllFilesData };
