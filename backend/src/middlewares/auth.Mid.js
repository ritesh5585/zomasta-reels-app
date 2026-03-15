import foodModel from "../models/foodPartner.js";
import jwt from "jsonwebtoken";
import userModel from "../models/user.js";

export const verifyFoodPartner = async (req, res, next) => {
  const token = req.cookies.token;

  try {
    if (!token) {
      return res
        .status(401)
        .json({ message: "please login first to access this resource" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const foodPartner = await foodModel.findById(decoded.id);

    if (!foodPartner) {
      return res.status(401).json({
        message: "Food partner not found",
      });
    }

    req.foodPartner = foodPartner;
  } catch (error) {
    console.log(
      "Error verifying JWT in food partner verification middleware:",
      error,
    );
    return res
      .status(401)
      .json({ message: "Invalid token in verifyFoodItem middleware" });
  }
  next();
};

export const authUserMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "please login first to access this resource" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded:", decoded)

    
    const user = await userModel.findById(decoded.id);
    console.log("user from auth mid:", user);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error verifying JWT in user verification middleware:", error);
    return res
      .status(401)
      .json({ message: "Invalid token in authUserMiddleware" });
  }
};
