import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../../widgets/Header/Header";
import { HomePage } from "../../pages/HomePage";
import { TravelPage } from "../../pages/TravelPage";
import { CommunityPage } from "../../pages/CommunityPage";
import { SignupPage } from "../../pages/SignupPage";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { AuthProvider } from "../providers/AuthProvider";
import TravelPathPage from '../../pages/TravelPage/path';

export const AppRoutes = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* 1. 전체 레이아웃을 감싸는 컨테이너 */}
        <div className="flex h-screen flex-col">
          <Header />
          
          {/* 2. 페이지 콘텐츠 영역이 남은 공간을 모두 차지하도록 설정 */}
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/travel" element={<TravelPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/travel/path" element={<TravelPathPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};
