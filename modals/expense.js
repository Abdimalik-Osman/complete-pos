import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a name"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "please provide a price"],
    },

    image: {
      type: String,
      required: [true, "please provide an image url"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["fastfoods", "fruits", "meats"],
      required: [true, "please provide an the foods "],
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide createdBy"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("product", productSchema);
