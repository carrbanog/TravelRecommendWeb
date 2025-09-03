import { Children } from "react";

type AuthButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit";
};

export const AuthButton = ({ children, type }: AuthButtonProps) => {
  return (
    <button
      type={type}
      className="w-full bg-blue-600 text-white py-4 px-5 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 font-semibold text-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
    >
      {children}
    </button>
  );
};
