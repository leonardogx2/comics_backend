import { validateRefreshTokenController } from "@/modules/RefreshToken/useCases/ValidateRefreshToken";
import { signInController } from "@/modules/User/useCases/SignIn";
import { Router } from "express";

const authRoutes = Router();
authRoutes.post("/signIn", signInController.handle);
authRoutes.post("/refresh", validateRefreshTokenController.handle);

export { authRoutes };
