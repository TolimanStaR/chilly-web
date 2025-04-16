import React from "react";
import {IconComponentProps} from "../IconComponentProps";

export const Submit: React.FC<IconComponentProps> = ({ size = 24, color = "currentColor", className }) => {
  return (
    <svg
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        className={className}
        d="M9 20.42l-6.21-6.21 2.83-2.83L9 14.77l9.88-9.89 2.83 2.83L9 20.42z"
      />
    </svg>
  )
}
