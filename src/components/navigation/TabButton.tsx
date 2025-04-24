import React from "react";

interface TabButtonProps {
  isActive: boolean,
  onClick: () => void,
  label: string,
}

export const TabButton: React.FC<TabButtonProps> = ({
  isActive,
  onClick,
  label,
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 font-medium text-bodyM border-b-2 ${
      isActive ? "border-red-60 text-red-60" : "border-transparent text-base-60 hover:text-base-90"
    } transition`}
  >
    {label}
  </button>
);
