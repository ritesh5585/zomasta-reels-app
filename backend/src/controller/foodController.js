import foodModel from "../models/foodItem.js";
import { uploadFile } from "../services/storage.js";
import { v4 as uuidv4 } from "uuid";
const uniqueId = uuidv4();

export const createFood = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const fileUploadResult = await uploadFile(
    req.file.buffer,
    `${uniqueId}-${req.file.originalname}`,
  );
  console.log("File uploaded to storage service:", fileUploadResult);

  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
  });
  res.status(201).json({
    message: "Food item created and saved to database",
    food: foodItem,
  });
};

export const getFoodItems = async (req, res) => {
  try {
    const foodItems = await foodModel.find({})
    res
    .status(200)
    .json({ message: "Food items fetched successfully", foodItems });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching food items from database (at getFoodItems)",
        error,
      });
  }
};
