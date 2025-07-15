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
      required: true,
      trim: true,
    },
    tareWeight: {
      type: Number,
      required: true,
      trim: true,
    },
    netWeight: {
      type: Number,
      required: true,
      trim: true,
    },
    bags: {
      type: Number,
      required: true,
      trim: true,
    },
    material: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    charges: {
      type: Number,
      required: true,
      trim: true,
    },
    inTime: {
      type: Date, 
      required : false
    },
    outTime: {
      type: Date,
      required: false
    },
  },
  {
    timestamps: true, 
  }
);

export const Bill = mongoose.model("Bill", billSchema);
