import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/app/providers/AuthProvider";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Icons
import { Map, Users, LogOut, User as UserIcon, Plane } from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    // [Header] 배경: 화이트, 투명도 80%, 블러 효과, 하단 연한 회색 선
    <header className="sticky top-0 z-50 w-full border-b border-slate-300 bg-white/80 backdrop-blur-md">
      {/* [Container] 최대 너비 1280px, 중앙 정렬, 양끝 배치 */}
      <div className="mx-auto flex h-20 max-w-screen-xl items-center justify-between px-6">
        {/* 1. 로고 영역 */}
        <Link to="/" className="flex items-center gap-3 group">
          {/* 아이콘: 블루 그라데이션 박스 */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md transition-transform group-hover:scale-105">
            <Plane className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Traveller
            </span>
            <span className="text-[11px] font-medium text-slate-500">
              Find your dream trip
            </span>
          </div>
        </Link>

        {/* 2. 네비게이션 (데스크탑) */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/travel"
            className="group flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
              <Map className="h-4 w-4" />
            </div>
            여행 추천
          </Link>
          <Link
            to="/community"
            className="group flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
              <Users className="h-4 w-4" />
            </div>
            커뮤니티
          </Link>
        </nav>

        {/* 3. 유저/인증 버튼 영역 */}
        <div className="flex items-center gap-4">
          {user ? (
            // [로그인 상태]: 드롭다운 메뉴
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full border border-slate-200 hover:bg-slate-100"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 font-bold">
                      {user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate("/profile")}
                  className="cursor-pointer"
                >
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>내 프로필</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 focus:text-red-600 cursor-pointer focus:bg-red-50"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>로그아웃</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // [비로그인 상태]: 로그인(Ghost) & 시작하기(Solid Blue)
            <div className="flex items-center gap-2">
              <Button
                asChild
                className="rounded-full bg-orange-500 hover:bg-blue-700 text-white px-6 shadow-md shadow-blue-200"
              >
                <Link to="/login">시작하기</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
