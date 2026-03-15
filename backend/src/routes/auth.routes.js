import express from "express";
import { verifyFoodPartner } from "../middlewares/auth.Mid.js";
import  getFoodPartnerById  from "../controller/foodpartner-controller.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
} from "../controller/auth.controller.js";

const Router = express.Router();

//user routes
Router.post("/register", registerUser);
Router.post("/login", loginUser);
Router.get("/logout", logoutUser);

//food partner routes
Router.post("/foodpartner/register", registerFoodPartner);
Router.post("/foodpartner/login", loginFoodPartner);
Router.get("/foodpartner/logout", logoutFoodPartner);

//food partner profile
export default Router;
