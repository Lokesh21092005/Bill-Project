import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

import Bill from "../models/bill.model.js";

import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async(userId) => {
  try{
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken() 
    const refreshToken = user.generateRefreshToken()
    user.refreshToken = refreshToken
    await user.save({validateBeforeSave : false})
    return {accessToken , refreshToken}


  } catch(error){
    throw new ApiError(500 , "Something went wrong while generating refresh and access token")
  }
}

const registerUser = asyncHandler(async (req, res) => {
  const {fullName, email, username, organisationName , password } = req.body;

  if ([fullName, email, username, organisationName , password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with same username or email already exists");
  }

  

  const user = await User.create({
    fullName,
    email,
    username: username.toLowerCase(),
    organisationName : organisationName.toUpperCase(),
    password,
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res.status(201).json(
    new ApiResponse(201, createdUser, "User registered successfully")
  );
});


const uploadBill = asyncHandler(async (req, res) => {
  const {
    serialNo,
    vehicleNo,
    party,
    grossWeight,
    tareWeight,
    netWeight,
    bags,
    material,
    charges,
    inTime,
    outTime,
  } = req.body;

  if (!serialNo || !vehicleNo || !party || !material || !bags) {
    throw new ApiError(400, "Missing required fields.");
  }

  if (!grossWeight && !tareWeight) {
    throw new ApiError(400, "At least grossWeight or tareWeight is required.");
  }

  const existedBill = await Bill.findOne({ serialNo });
  if (existedBill) {
    throw new ApiError(409, "Bill with same serial no. already exists");
  }

  const computedNetWeight =
    grossWeight !== undefined && tareWeight !== undefined
      ? Number(grossWeight) - Number(tareWeight)
      : undefined;

  const bill = await Bill.create({
    serialNo,
    vehicleNo,
    party,
    grossWeight: grossWeight !== undefined ? Number(grossWeight) : undefined,
    tareWeight: tareWeight !== undefined ? Number(tareWeight) : undefined,
    netWeight: computedNetWeight,
    bags: Number(bags),
    material,
    charges: charges !== undefined ? Number(charges) : undefined,
    inTime: inTime ? new Date(inTime) : new Date(),
    outTime: outTime ? new Date(outTime) : undefined,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, bill, "Bill Uploaded Successfully"));
});


const searchBills = asyncHandler(async (req, res) => {
  const { field, value } = req.body;

  const allowedFields = ["serialNo", "party", "material"];
  if (!field || !value || !allowedFields.includes(field)) {
    throw new ApiError(400, "Invalid search field or value");
  }

  const query = {};
  query[field] = { $regex: value.trim(), $options: "i" };

  const bills = await Bill.find(query);

  if (!bills.length) {
    throw new ApiError(404, "No bills found");
  }

  res.status(200).json(new ApiResponse(200, bills, "Bills fetched successfully"));
});



const loginUser = asyncHandler(async (req, res) =>{
 
  const{email , username , password} = req.body

  if(!email && !username){
    throw new ApiError(400 , "username or email is required")
  }
  const user = await User.findOne({
    $or : [{username} , {email}]
  })
  
  if(!user){
    throw new ApiError(404 , "User does not exists")
  }

  const isPasswordValid = await user.isPasswordCorrect(password)
  
  if(!isPasswordValid){
    throw new ApiError(401 , "Invalid user credentials")
  }

  const {accessToken , refreshToken} = await generateAccessAndRefreshTokens(user._id)

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
  const options = {
    httpOnly : true,
    secure : true
  }

  return res.status(201)
  .cookie("accessToken" , accessToken , options)
  .cookie("refreshToken" , refreshToken , options)
  .json(
    new ApiResponse(
      201,
      {
        user: loggedInUser, accessToken, refreshToken
      },
      "User logged in successfully"
    )
  )
});







export {
  registerUser,
  loginUser,
  uploadBill,
  searchBills
}