import express from "express";
import {
  verifyFoodPartner,
  authUserMiddleware,
} from "../middlewares/auth.Mid.js";
import getFoodPartnerById from "../controller/foodpartner-controller.js";
import {
  getFoodItems,
  createFood
} from "../controller/foodController.js";
import multer from "multer";
const Router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

Router.get("/foodpartner/:id", verifyFoodPartner, getFoodPartnerById);

Router.get("/", authUserMiddleware, getFoodItems);

Router.post("/", verifyFoodPartner, upload.single("video"), createFood);

export default Router;
