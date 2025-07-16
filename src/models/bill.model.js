import mongoose, { Schema } from "mongoose";

const billSchema = new Schema(
  {
    serialNo: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    vehicleNo: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    party: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    grossWeight: {
      type: Number,
      required: false, 
    },
    tareWeight: {
      type: Number,
      required: false,
    },
    netWeight: {
      type: Number,
      required: false, 
    },
    bags: {
      type: Number,
      required: true,
    },
    material: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    charges: {
      type: Number,
      required: false, 
    },
    inTime: {
      type: Date,
      required: false,
    },
    outTime: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Bill = mongoose.model("Bill", billSchema);
export default Bill;
