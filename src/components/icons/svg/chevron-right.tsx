import React from "react";
import {IconComponentProps} from "../IconComponentProps";

export const ChevronRight: React.FC<IconComponentProps> = ({ size = 24, color = "currentColor", className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M8.59 16.58L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.42z"
        fill={color}
        className={className}
      />
    </svg>
  )
}
