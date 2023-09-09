import "express-async-errors";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import fileRoutes from "./routes/fileRoutes";
import { errorHandler, notFound } from "./middleware/errorHandling";

const app = express();

app.use(bodyParser.json());

app.use(cors());
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/files", fileRoutes);

app.use(errorHandler);
app.use(notFound);

export default app;
