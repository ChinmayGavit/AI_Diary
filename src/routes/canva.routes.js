import { Router } from "express";
import {
  frontPageAndCreateCanva,
  backpageUpload,
  middlePageUpload,
  aipagesGenerateAndUpload,
  // aipagesGenerateAndUpload,
} from "../controllers/canva.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { refreshaccessToken } from "../controllers/user.controller.js";

const router = Router();

router
  .route("/fp")
  .post(verifyJWT, upload.single("fp"), frontPageAndCreateCanva);

router.route("/bp").post(verifyJWT, upload.single("bp"), backpageUpload);

router.route("/mp").post(verifyJWT,upload.single("mp"),middlePageUpload);

router.route("/ai").post(verifyJWT,aipagesGenerateAndUpload)

export default router;
