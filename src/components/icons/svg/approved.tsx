import React from "react";
import {IconComponentProps} from "../IconComponentProps";

export const Approved: React.FC<IconComponentProps> = ({ size = 24, color = "currentColor", className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M10 17l-5-5 1.41-1.42L10 14.17l7.59-7.59L19 8m-7-6A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z"
        fill={color}
        className={className}
      />
    </svg>
  )
}
