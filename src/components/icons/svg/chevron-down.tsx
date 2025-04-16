import React from "react";
import {IconComponentProps} from "../IconComponentProps";

export const ChevronDown: React.FC<IconComponentProps> = ({ size = 24, color = "currentColor", className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6-6-6 1.41-1.42z"
        fill={color}
        className={className}
      />
    </svg>
  )
}
