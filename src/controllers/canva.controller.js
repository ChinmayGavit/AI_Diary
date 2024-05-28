import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiError } from "../utils/ApiError.js";

import { ApiResponse } from "../utils/ApiResponse.js";

import { Canva } from "../models/canva.model.js";

import { uploadCloudinary } from "../utils/cloudinary.js";

import { client, Status, GenerationStyle } from "imaginesdk";

import { v2 as cloudinary } from "cloudinary";

import sharp from "sharp";
import archiver from "archiver";

import https from "https";
import fs, { createWriteStream,readdir } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const frontPageAndCreateCanva = asyncHandler(async (req, res) => {
  const fpLoaclPath = "C:/Users/HP/Downloads/Untitled.png";

  if (!fpLoaclPath) {
    throw new ApiError(400, "Front page is missing");
  }

  const fpUrl = await uploadCloudinary(fpLoaclPath);

  if (!fpUrl.url) {
    throw new ApiError(500, "Error while uploading the avatar");
  }

  const canva = await Canva.create({
    owner: req.user._id,
    frontPage: fpUrl.url,
  });

  if (canva) {
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          "Canva created and front page created successfully"
        )
      );
  }
});

const backpageUpload = asyncHandler(async (req, res) => {
  const bpLoaclPath = "C:/Users/HP/Downloads/Untitled.png";
  // console.log(bpLoaclPath);
  if (!bpLoaclPath) {
    throw new ApiError(400, "back page is missing");
  }

  const bpUrl = await uploadCloudinary(bpLoaclPath);

  if (!bpUrl.url) {
    throw new ApiError(500, "Error while uploading the back page");
  }

  // const User = await User.findById(req.user?._id);

  // console.log(req.user._id)

  const canva = await Canva.findOneAndUpdate(
    { owner: req.user._id }, // Query condition to find the document by owner
    { $set: { backPage: bpUrl.url } }, // Update operation
    { new: true } // Options: return the updated document
  );

  return res
    .status(201)
    .json(new ApiResponse(200, canva, "back page created successfully"));
});

const middlePageUpload = asyncHandler(async (req, res) => {
  const mpLoaclPath = "C:/Users/HP/Downloads/Untitled.png";
  // console.log(mpLoaclPath);

  if (!mpLoaclPath) {
    throw new ApiError(400, "middle page is missing");
  }

  const mpUrl = await uploadCloudinary(mpLoaclPath);

  if (!mpUrl.url) {
    throw new ApiError(500, "Error while uploading the middle page");
  }

  const canva = await Canva.findOneAndUpdate(
    { owner: req.user._id }, // Query condition to find the document by owner
    { $set: { middlePage: mpUrl.url } }, // Update operation
    { new: true } // Options: return the updated document
  );

  return res
    .status(201)
    .json(new ApiResponse(200, canva, "back page created successfully"));
});

const aipagesGenerateAndUpload = asyncHandler(async (req, res) => {
  console.log(req.user);
  const { prompt } = req.body;
  const imagine = client("vk-kIn6jXf3z6DLYGaJm01OOWBm1sOy4s6ZIfV2pbPWexNZD");
  const aipages = [];
  for (let i = 0; i < 2; i++) {
    const response = await imagine.generations(prompt, {
      style: GenerationStyle.IMAGINE_V5,
    });

    if (response.status() === Status.OK) {
      const image = response.data();
      console.log(image);
      if (image) image.asFile(`./public/temp/result${i}.png`);
      const aipage = await uploadCloudinary(`./public/temp/result${i}.png`);
      aipages.push(aipage.url);
    } else {
      console.log(`Status Code: ${response.status()}`);
    }
  }
  const canva = await Canva.findOneAndUpdate(
    { owner: req.user._id }, // Query condition to find the document by owner
    { $set: { aipages: aipages } }, // Update operation
    { new: true } // Options: return the updated document
  );
  return res
    .status(200)
    .json(new ApiResponse(200, canva, "ai page created successfully"));
});

const previewImage = asyncHandler(async (req, res) => {
  const canva = await Canva.findOne(req.user._id);
  canvaPages = {
    fp: canva.frontPage,
    aifirst: aipages[0],
    mp: canva.middlePage,
    aisecond: aipages[1],
    bp: canva.backPage,
  };
  return res
    .status(200)
    .json(new ApiResponse(200, canvaPages, "ai page created successfully"));
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extractPublicId = (url) => {
  const parts = url.split("/");
  const publicIdWithExtension = parts[parts.length - 1];
  const publicId = publicIdWithExtension.split(".")[0];
  return publicId;
};

const downloadImage = (publicId) => {
  return new Promise((resolve, reject) => {
    const imageUrl = cloudinary.url(publicId, { secure: true });
    const filePath = path.resolve(__dirname, "downloads", `${publicId}.jpg`);
    console.log(filePath);

    const file = fs.createWriteStream(filePath);
    https
      .get(imageUrl, (response) => {
        response.pipe(file);

        file.on("finish", () => {
          file.close(resolve);
        });

        file.on("error", (err) => {
          fs.unlink(filePath, () => reject(err));
        });
      })
      .on("error", (err) => {
        fs.unlink(filePath, () => reject(err));
      });
  });
};

const ensureDownloadDirectoryExists = () => {
  const downloadDir = path.resolve(__dirname, "downloads");
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir);
  }
};

const download = asyncHandler(async (req, res) => {
  const canva = await Canva.findOne({ owner: req.user._id });
  if (!canva) {
    return res.status(404).json({ message: "Canva not found" });
  }

  const canvaPages = [
    extractPublicId(canva.frontPage),
    extractPublicId(canva.aipages[0]),
    extractPublicId(canva.middlePage),
    extractPublicId(canva.aipages[1]),
    extractPublicId(canva.backPage),
  ];

  ensureDownloadDirectoryExists();

  for (const publicId of canvaPages) {
    await downloadImage(publicId);
  }

  res.status(200).json({ message: "Images downloaded successfully" });
});


export {
  frontPageAndCreateCanva,
  backpageUpload,
  middlePageUpload,
  aipagesGenerateAndUpload,
  previewImage,
  download
};
