import { useState } from "react";
import { Link } from "react-router-dom";
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
// 모바일 메뉴를 위한 Sheet 컴포넌트 추가
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Icons
import { Map, Users, LogOut, Plane, Menu } from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // 모바일 사이드바 열림 상태 관리

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  // 네비게이션 메뉴 아이템 데이터 (중복 코드 방지 및 관리 용이성)
  const navItems = [
    { to: "/travel", label: "여행 경로 찾기", icon: <Map className="h-4 w-4" /> },
    { to: "/community", label: "커뮤니티", icon: <Users className="h-4 w-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-300 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-screen-xl items-center justify-between px-6">
        
        {/* 1. 로고 영역 */}
        <Link to="/" className="flex items-center gap-3 group z-50">
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

        {/* 2. 데스크탑 네비게이션 (md 이상에서만 표시) */}
        <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                {item.icon}
              </div>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 3. 우측 영역 (우측 정렬 유지 및 모바일 햄버거 추가) */}
        <div className="flex items-center gap-3">
          {/* 유저/인증 버튼 영역 */}
          <div className="flex items-center gap-4">
            {user ? (
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
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
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
              <Button
                asChild
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-5 h-9 text-sm shadow-md shadow-blue-200"
              >
                <Link to="/login">시작하기</Link>
              </Button>
            )}
          </div>

          {/* 4. 모바일 햄버거 메뉴 슬라이더 (md 미만에서만 표시) */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl border border-slate-200">
                  <Menu className="h-5 w-5 text-slate-700" />
                  <span className="sr-only">메뉴 열기</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] pt-12">
                <SheetHeader className="text-left mb-6">
                  <SheetTitle className="text-lg font-bold text-slate-900">전체 메뉴</SheetTitle>
                </SheetHeader>
                
                {/* 모바일 메뉴 리스트 */}
                <nav className="flex flex-col gap-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsOpen(false)} // 링크 이동 시 사이드바 닫기
                      className="flex items-center gap-3 p-3 rounded-xl text-slate-700 font-semibold hover:bg-slate-50 hover:text-blue-600 transition-all"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                        {item.icon}
                      </div>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;