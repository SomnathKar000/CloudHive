import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import becryptjs from "bcryptjs";
import { User } from "../models/User";
import { AppError } from "../middleware/errorHandling";

dotenv.config();

const jwtSecret = process.env.jwt_secret!;

interface TokenData {
  user: {
    id: string;
  };
}

const createToken = (id: string) => {
  const data: TokenData = {
    user: {
      id,
    },
  };
  const token = jwt.sign(data, jwtSecret);
  return token;
};

const validator = (token: string): TokenData | null => {
  try {
    const data = jwt.verify(token, jwtSecret) as TokenData;
    return data;
  } catch (error) {
    return null;
  }
};

const generateHashPassword = (password: string) => {
  const salt = becryptjs.genSaltSync(10);
  return becryptjs.hashSync(password, salt);
};

const validateName = (name: string | undefined) => {
  if (name && name.length < 3) throw new AppError("Enter a valid name", 400);
};

const validatePassword = (password: string | undefined) => {
  if (password && password.length < 5) {
    throw new AppError("Enter a valid password", 400);
  }
};

const updateUserData = (
  user: User,
  password: string | undefined,
  name: string | undefined
) => {
  if (password) {
    user.password = generateHashPassword(password);
  }
  if (name) {
    user.name = name;
  }
};

const passwordMatch = (user: User, password: string) => {
  const compare = becryptjs.compareSync(password, user.password);
  if (!compare) {
    throw new AppError("Invalid password", 400);
  }
};

export {
  createToken,
  validator,
  generateHashPassword,
  validateName,
  validatePassword,
  updateUserData,
  passwordMatch,
};