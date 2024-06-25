import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import { allRoutes } from "./routes";
import { printMiddleware } from "./middlewares/printMiddleware";
import cors from "cors";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(printMiddleware);
app.use(allRoutes);
app.use(errorHandlerMiddleware);

const API_PORT = process.env.API_PORT || 3000;
app.listen(API_PORT, () => {
  console.log(`🚀 http://localhost:${API_PORT}`);
});
