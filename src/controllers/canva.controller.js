import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiError } from "../utils/ApiError.js";

import { ApiResponse } from "../utils/ApiResponse.js";

import { Canva } from "../models/canva.model.js";

import { uploadCloudinary } from "../utils/cloudinary.js";

import fetch from 'node-fetch';

// import { DeleteCloudinaryAsset } from "../utils/deleteCloudinary.js";

const frontPageAndCreateCanva = asyncHandler(async (req, res) => {
  const fpLoaclPath = req.file?.path;

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
  const bpLoaclPath = req.file?.path;
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
  const mpLoaclPath = req.file?.path;
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
  const prompt = req.body;
  console.log(prompt);
  const resp = await fetch(`https://api.limewire.com/api/image/generation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Version": "v1",
      Accept: "application/json",
      Authorization:
        "Bearer lmwr_sk_EUdGj5ReVW_363g2PeNWuciEGpbvcRSUTRz5sj3HpK9Yd7xy",
    },
    body: JSON.stringify({
      prompt: prompt,
      negative_prompt: "darkness, fog",
      samples: 3,
      quality: "LOW",
      guidance_scale: 50,
      aspect_ratio: "1:1",
      style: "PHOTOREALISTIC",
    }),
  });

  const data = await resp.json();
  console.log(data);
  const pages = [];
  for (let i = 0; i < 3; i++) {
    pages.push(data.data[i].asset_url);
  }

  const canva = await Canva.findOneAndUpdate(
    { owner: req.user._id }, // Query condition to find the document by owner
    { $set: { aipages: pages } }, // Update operation
    { new: true } // Options: return the updated document
  );

  return res
    .status(201)
    .json(new ApiResponse(200, canva, "back page created successfully"));
});

export {
  frontPageAndCreateCanva,
  backpageUpload,
  middlePageUpload,
  aipagesGenerateAndUpload,
};
