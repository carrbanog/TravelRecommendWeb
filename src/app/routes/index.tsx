import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../../widgets/Header/Header";
import { HomePage } from "../../pages/HomePage";
import { TravelPage } from "../../pages/TravelPage";
import { CommunityPage } from "../../pages/CommunityPage";
import { SignupPage } from "../../pages/SignupPage";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { AuthProvider } from "../providers/AuthProvider";

export const AppRoutes = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/travel" element={<TravelPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
