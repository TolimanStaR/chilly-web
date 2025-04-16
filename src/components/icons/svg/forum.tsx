import React from "react";
import {IconComponentProps} from "../IconComponentProps";

export const Forum: React.FC<IconComponentProps> = ({ size = 24, color = "currentColor", className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M17 12V3a1 1 0 00-1-1H3a1 1 0 00-1 1v14l4-4h10a1 1 0 001-1m4-6h-2v9H6v2a1 1 0 001 1h11l4 4V7a1 1 0 00-1-1z"
        fill={color}
        className={className}
      />
    </svg>
  )
}
