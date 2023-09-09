import { Request, Response } from "express";

const createUser = (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "user created" });
};

const loginUser=(req: Request, res: Response) => {
    res.status(200).json({ success: true, message: "user logged in" });
}

const getUser = (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "user fetched" });
};

const updateUser = (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "user updated" });
};

const deleteUser = (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "user deleted" });
};

export { createUser,loginUser, getUser, updateUser, deleteUser };
