import React from "react";
import {IconComponentProps} from "../IconComponentProps";

export const RadioBlank: React.FC<IconComponentProps> = ({ size = 24, color = "currentColor", className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 20a8 8 0 110-16 8 8 0 010 16zm0-18a10 10 0 100 20 10 10 0 000-20z"
        fill={color}
        className={className}
      />
    </svg>
  )
}
