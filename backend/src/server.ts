import app from "./app";
import { sequelize } from "./utils/database";

const port = 5000;

const start = async () => {
  try {
    // Database connection
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Start the server
    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

start();
