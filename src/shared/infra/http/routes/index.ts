import express, { Router } from "express";
import { bookRoutes } from "./bookRoutes";
import path, { join } from "path";
import { userRoutes } from "./userRoutes";
import { authRoutes } from "./authRoutes";
import { orderRoutes } from "./orderRoutes";

const allRoutes = Router();
allRoutes.use(
  "/public/uploads",
  express.static(
    join(__dirname, "..", "..", "..", "..", "..", "public", "uploads")
  )
);
allRoutes.use("/book", bookRoutes);
allRoutes.use("/user", userRoutes);
allRoutes.use("/auth", authRoutes);
allRoutes.use("/order", orderRoutes);

export { allRoutes };
