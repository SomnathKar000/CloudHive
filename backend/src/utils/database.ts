import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { Client } from "pg";

dotenv.config();

// console.log(
//   process.env.db_name!,
//   process.env.db_user!,
//   process.env.db_password!,
//   process.env.db_host!
// );

const sequelize = new Sequelize({
  database: process.env.db_name!,
  username: process.env.db_user!,
  password: process.env.db_password!,
  host: process.env.db_host!,
  dialect: "postgres",
});

const client = new Client({
  host: process.env.db_host!,
  user: process.env.db_user!,
  port: 5432,
  password: process.env.db_password!,
  database: process.env.db_name!,
});

export { sequelize, client };
