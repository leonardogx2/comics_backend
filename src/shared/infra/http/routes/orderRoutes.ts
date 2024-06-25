import { createOrderController } from "@/modules/Order/useCases/CreateOrder";
import { Router } from "express";
import { ensureAuthMiddleware } from "../middlewares/ensureAuthMiddleware";
import { getAllOrdersController } from "@/modules/Order/useCases/GetAllOrders";

const orderRoutes = Router();
orderRoutes.use(ensureAuthMiddleware);

orderRoutes.post("/", createOrderController.handle);
orderRoutes.get("/", getAllOrdersController.handle);

export { orderRoutes };
