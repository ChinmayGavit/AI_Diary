import mongoose, { Schema } from "mongoose";

const canvaSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    frontPage: {
      type: "string",
    },
    backPage: {
      type: "string",
    },
    middlePage: {
      type: "string",
    },
    aipages: {
      type: [String]
    },
  },
  { timestamps: true }
);

export const Canva = mongoose.model("Canva",canvaSchema)
