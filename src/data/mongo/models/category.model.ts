import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const CategoryModel = mongoose.model('Category', categorySchema);
