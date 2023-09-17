import { Request, Response } from "express";
import { User } from "../models/User";
import { validationResult } from "express-validator";
import { AppError, ValidationError } from "../middleware/errorHandling";
import {
  createToken,
  validateName,
  validatePassword,
  generateHashPassword,
  updateUserData,
  passwordMatch,
} from "../services/UserService";
import { AuthenticatedRequest } from "../middleware/authentication";

const createUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ValidationError(errors.array()[0].msg);
  }

  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    throw new AppError("Email already exists", 400);
  }

  const newUser = {
    name,
    email,
    password: generateHashPassword(password),
  };
  try {
    const { id } = await User.create(newUser);
    const token = createToken(id);
    res
      .status(200)
      .json({ success: true, message: "User created succesfully", token });
  } catch (error) {
    console.log(error);
    throw new AppError("Error creating user", 500);
  }
};

const loginUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError(errors.array()[0].msg, 400);
  }
  const { email, password } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (!existingUser) {
    throw new AppError("User not found", 404);
  }
  passwordMatch(existingUser, password);

  const token = createToken(existingUser.id);

  res
    .status(200)
    .json({ success: true, message: "User logged in succesfully", token });
};

const getUser = async (req: AuthenticatedRequest, res: Response) => {
  const { user } = req;
  const existingUser = await User.findOne({
    where: {
      id: user?.id,
    },
    attributes: ["email", "name"],
  });
  if (!existingUser) {
    throw new AppError("User not found", 404);
  }
  res
    .status(200)
    .json({ success: true, message: "user fetched", user: existingUser });
};

const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  const { user } = req;
  const existingUser = await User.findByPk(user?.id);
  if (!existingUser) {
    throw new AppError("User not found", 404);
  }
  const { name, password } = req.body;
  validateName(name);
  validatePassword(password);
  updateUserData(existingUser, password, name);

  await existingUser.save();
  res.status(200).json({ success: true, message: "User updated succesfully" });
};

const deleteUser = async (req: AuthenticatedRequest, res: Response) => {
  const id = req.user?.id;
  const user = await User.findByPk(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  await user.destroy();
  res.status(200).json({ success: true, message: "User deleted succesfully" });
};

export { createUser, loginUser, getUser, updateUser, deleteUser };
