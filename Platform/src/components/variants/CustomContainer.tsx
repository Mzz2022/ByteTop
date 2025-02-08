import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const CustomContainer = ({ children, className = "" }: ContainerProps) => {
  return (
    <div
      className={`
        mx-auto 
        h-full
        w-full
        rounded-xl
        border border-white/20
        bg-white/30
        backdrop-blur-lg
        shadow-lg
        p-2
        mb-1
        transition-all
        duration-300
        hover:shadow-xl
        dark:bg-gray-800/40
        dark:border-gray-700/30
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default CustomContainer;
