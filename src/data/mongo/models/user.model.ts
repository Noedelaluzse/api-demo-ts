import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    lastname: {
      type: String,
      required: [true, "Lastname is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    email: {
      type: String,
      required: [true, "Phone number is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    gender: {
      type: String,
      enum: ["male", "famale"],
      required: [true, "Gender is required"],
    },
    status: {
      type: Boolean,
      default: false,
    },
    wasValidated: {
      type: Boolean,
      default: false,
    },
    image_url: {
      type: String,
    },
    rol: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = mongoose.model("User", userSchema);
