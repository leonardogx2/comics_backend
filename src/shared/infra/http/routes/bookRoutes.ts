import { getAllBooksController } from "@/modules/Book/useCases/GetAllBooks";
import { Router } from "express";
import { paginationMiddleware } from "../middlewares/paginationMiddleware";
import { findBookByIdController } from "@/modules/Book/useCases/FindBookById";
import { createBookController } from "@/modules/Book/useCases/CreateBook";
import { uploadFileMiddleware } from "../middlewares/uploadFileMiddleware";
import { updateBookController } from "@/modules/Book/useCases/UpdateBook";
import { ensureAuthMiddleware } from "../middlewares/ensureAuthMiddleware";

const bookRoutes = Router();
bookRoutes.use(ensureAuthMiddleware);

bookRoutes.get("/:id", findBookByIdController.handle);
bookRoutes.get("/", paginationMiddleware, getAllBooksController.handle);
bookRoutes.post(
  "/",
  ensureAuthMiddleware,
  uploadFileMiddleware,
  createBookController.handle
);
bookRoutes.put(
  "/:id",
  ensureAuthMiddleware,
  uploadFileMiddleware,
  updateBookController.handle
);

export { bookRoutes };
