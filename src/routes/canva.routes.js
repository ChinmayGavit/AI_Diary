import { Router } from "express";
import {
  frontPageAndCreateCanva,
  backpageUpload,
  middlePageUpload,
  aipagesGenerateAndUpload,
  previewImage,
  download
  // aipagesGenerateAndUpload,
} from "../controllers/canva.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { refreshaccessToken } from "../controllers/user.controller.js";

const router = Router();

router.route("/fp").post(verifyJWT, frontPageAndCreateCanva);

router.route("/bp").post(verifyJWT, backpageUpload);

router.route("/mp").post(verifyJWT, middlePageUpload);

router.route("/generate").post(verifyJWT, aipagesGenerateAndUpload);

router.route("/preview").post(verifyJWT, previewImage);

router.route("/download").post(verifyJWT, download);

export default router;
