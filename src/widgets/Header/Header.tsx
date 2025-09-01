import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-slate-100 to-slate-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* 로고 영역 */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
              <span className="text-3xl">✈️</span>
            </div>
            <div className="text-slate-800">
              <h1 className="text-2xl font-bold tracking-wide">TravelDream</h1>
              <p className="text-sm text-slate-600">
                당신의 꿈의 여행을 찾아보세요
              </p>
            </div>
          </Link>

          {/* 네비게이션 메뉴 */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/travel"
              className="text-slate-700 hover:text-blue-600 transition-colors duration-300 flex items-center space-x-2 group"
            >
              <span className="text-xl">🗺️</span>
              <span className="font-medium group-hover:scale-105 transition-transform duration-300">
                여행 추천
              </span>
            </Link>
            <Link
              to="/community"
              className="text-slate-700 hover:text-blue-600 transition-colors duration-300 flex items-center space-x-2 group"
            >
              <span className="text-xl">👥</span>
              <span className="font-medium group-hover:scale-105 transition-transform duration-300">
                커뮤니티
              </span>
            </Link>
          </nav>

          {/* 로그인 영역 */}
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-slate-700 hover:text-blue-600 transition-colors duration-300 font-medium"
            >
              로그인
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
