import mongoose from "mongoose";


const placeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Name is required"],
    },
    short_description: {
      type: String,
      required: [true, "Short description is required"],
    },
    location: {
      latitude: {
        type: String,
        required: [true, "Latitude is required"],
      },
      longitude: {
        type: String,
        required: [true, "Longitude is required"],
      },
    },
    long_description: {
      type: String,
      required: [true, "Long description is required"],
    },
    image_url: {
      type: String,
    },
    categories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, "At least one category is required"],
    }],
    
    id_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
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

export const PlaceModel = mongoose.model('Place', placeSchema);
