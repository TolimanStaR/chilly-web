import React from "react";
import {IconComponentProps} from "../IconComponentProps";

export const Menu: React.FC<IconComponentProps> = ({ size = 24, color = "currentColor", className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M3 6H21V8H3V6ZM3 11H21V13H3V11ZM3 16H21V18H3V16Z"
        fill={color}
        className={className}
      />
    </svg>
  )
}
