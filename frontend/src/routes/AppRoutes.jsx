import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ChooseRegister from "../pages/auth/chooseRegister";
import PartnerRegister from "../pages/auth/partnerRegister";
import PartnerLogin from "../pages/auth/partnerLogin";
import UserRegister from "../pages/auth/userRegister";
import UserLogin from "../pages/auth/userLogin";
import UserReset from "../pages/auth/userReset";
import Home from "../pages/general/Home";
import Saved from "../pages/general/Saved";
import Createfood from "../pages/food-partner/Createfood";
import Profile from "../pages/food-partner/Profile";
import ProtectedRoute from "../components/ProtectedRoutes";
import MainLayout from "../layout/MainLayout";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/choose-register" element={<ChooseRegister />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/partner/register" element={<PartnerRegister />} />
        <Route path="/partner/login" element={<PartnerLogin />} />
        <Route path="/user/reset" element={<UserReset />} />
        
        <Route path="/create-food" element={<Createfood />} />
        <Route path="/auth/:id" element={<Profile />} />
        <Route path="/saved-content" element={<Saved />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
