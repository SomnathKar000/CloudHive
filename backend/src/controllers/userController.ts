import { Request, Response } from "express";
import { User } from "../models/User";
import { validationResult } from "express-validator";
import { AppError, ValidationError } from "../middleware/errorHandling";
import { genSaltSync, hashSync } from "bcryptjs";
import { createToken } from "../utils/validation";
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

  const salt = genSaltSync(10);
  const hashedPassword = hashSync(password, salt);
  const newUser = {
    name,
    email,
    password: hashedPassword,
  };
  try {
    const { id } = await User.create(newUser);
    const token = createToken(id);
    res.status(200).json({ success: true, message: "user created", token });
  } catch (error) {
    console.log(error);
    throw new AppError("Error creating user", 500);
  }
};

const loginUser = (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "user logged in" });
};

const getUser = async (req: AuthenticatedRequest, res: Response) => {
  const { user } = req;
  const existingUser = await User.findOne({
    where: {
      id: user!.id,
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

const updateUser = (req: AuthenticatedRequest, res: Response) => {
  res.status(200).json({ success: true, message: "user updated" });
};

const deleteUser = (req: AuthenticatedRequest, res: Response) => {
  res.status(200).json({ success: true, message: "user deleted" });
};

export { createUser, loginUser, getUser, updateUser, deleteUser };
