import foodPartnerModel from "../models/foodPartner.js";
import userModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const isUserExists = await userModel.findOne({ email });

    if (isUserExists) {
      return res.status(400).json({
        userExists: true,
        message: "User already exists try to login instead",
        email: isUserExists.email,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
    );

    res.cookie("token", token);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        fullname: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error from line 56",
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  const isPasseordValid = await bcrypt.compare(password, user.password);

  if (!isPasseordValid) {
    console.log("Invalid password from loginUser API");
    return res
      .status(400)
      .json({ success: false, message: "Invalid password" });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET || "adac02bb125040f3c46e040f0314236a",
  );
  res.cookie("token", token);
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
  });
};

export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};

export const registerFoodPartner = async (req, res) => {
  const { name, email, password, contactName, phoneNumber, address } = req.body;

  const isAccountExists = await foodPartnerModel.findOne({ phoneNumber });

  if (isAccountExists)
    return res
      .status(400)
      .json({ success: false, message: "Food Partner account already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const foodPartner = await foodPartnerModel.create({
    name,
    email,
    password: hashedPassword,
    contactName,
    phoneNumber,
    address,
  });

  const token = jwt.sign(
    {
      id: foodPartner._id,
      email: foodPartner.email,
    },
    process.env.JWT_SECRET || "adac02bb125040f3c46e040f0314236a",
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "Food Partner registered successfully",
    foodPartner: {
      id: foodPartner._id,
      name: foodPartner.name,
      email: foodPartner.email,
      contactName: foodPartner.contactName,
      phoneNumber: foodPartner.phoneNumber,
      address: foodPartner.address,
    },
  });
};

export const loginFoodPartner = async (req, res) => {
  const { email, password } = req.body;

  const foodPartner = await foodPartnerModel.findOne({ email });

  if (!foodPartner) {
    return res
      .status(400)
      .json({ success: false, message: "Food Partner not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid password" });
  }

  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_SECRET || "adac02bb125040f3c46e040f0314236a",
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.status(200).json({
    success: true,
    message: "Food Partner logged in successfully",
    token,
    foodPartner: {
      id: foodPartner._id,
      name: foodPartner.name,
      email: foodPartner.email,
    },
  });
};

export const logoutFoodPartner = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Food Partner logged out successfully",
  });
};
