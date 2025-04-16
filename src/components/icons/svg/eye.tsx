import React from "react";
import {IconComponentProps} from "../IconComponentProps";

export const Eye: React.FC<IconComponentProps> = ({ size = 24, color = "currentColor", className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 9a3 3 0 110 6 3 3 0 010-6zm0-4.5c5 0 9.27 3.11 11 7.5-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5zM3.18 12a9.821 9.821 0 0017.64 0 9.821 9.821 0 00-17.64 0z"
        fill={color}
        className={className}
      />
    </svg>
  )
}
