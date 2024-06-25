import { addBookInCartController } from "@/modules/Cart/useCases/AddBookInCart";
import { delBookInCartController } from "@/modules/Cart/useCases/DelBookInCart";
import { registerUserControler } from "@/modules/User/useCases/RegisterUser";
import { verifyAvailableEmailController } from "@/modules/User/useCases/VerifyAvailableEmail";
import { Router } from "express";
import { ensureAuthMiddleware } from "../middlewares/ensureAuthMiddleware";
import { getDashboardController } from "@/modules/Dashboard/useCases/GetDashboard";

const userRoutes = Router();

userRoutes.post("/register", registerUserControler.handle);
userRoutes.get("/available/email", verifyAvailableEmailController.handle);
userRoutes.use(ensureAuthMiddleware);
userRoutes.post("/cart/:id", addBookInCartController.handle);
userRoutes.delete("/cart/:id", delBookInCartController.handle);
userRoutes.get("/dashboard", getDashboardController.handle);

export { userRoutes };
