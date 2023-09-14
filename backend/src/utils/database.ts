import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.db_name!,
  username: process.env.db_user!,
  password: process.env.db_password!,
  host: process.env.db_host!,
  dialect: "postgres",
});

export { sequelize };
