import { Router } from "express";
import {
  loginUser,
  registerUser,
  refreshaccessToken,
} from "../controllers/user.controller.js";
// import { upload } from "../middlewares/multer.middleware.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";
// import { refreshaccessToken } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/refresh-token").post(refreshaccessToken);

export default router;
 