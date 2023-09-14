import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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

export { createToken, validator };
