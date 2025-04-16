import React from "react";
import {IconComponentProps} from "../IconComponentProps";

export const ChevronLeft: React.FC<IconComponentProps> = ({ size = 24, color = "currentColor", className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.42z"
        fill={color}
        className={className}
      />
    </svg>
  )
}
