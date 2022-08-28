import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
  {
    waiter: {
      type: String,
      required: [true, "please provide a name"],
      trim: true,
    },
    totalPrice: {
      type: Number,
      required: [true, "please provide a price"],
    },

    numberOfRes: {
      type: String,
      required: [true, "please provide annumberOfRes"],
      trim: true,
    },
    cartItems: {
      type: Array,
      
      required: [true, "please provide an the array "],
    },
    user: {
      type: String,
      
      required: [true, "please provide an the array "],
    },
    table: {
      type: Number,
      
      required: [true, "please provide an the table "],
    },

    // createdBy: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User",
    //   required: [true, "please provide createdBy"],
    // },
  },
  { timestamps: true }
);

export default mongoose.model("Bills", billSchema);
