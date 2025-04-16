import React from "react";
import {IconComponentProps} from "../IconComponentProps";

export const ChevronUp: React.FC<IconComponentProps> = ({ size = 24, color = "currentColor", className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"
        fill={color}
        className={className}
      />
    </svg>
  )
}
