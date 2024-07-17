import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const CategoryModel = mongoose.model('Category', categorySchema);
