import React from "react";
import {IconComponentProps} from "../IconComponentProps";

export const Info: React.FC<IconComponentProps> = ({ size = 24, color = "currentColor", className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M13 9h-2V7h2m0 10h-2v-6h2m-1-9a10 10 0 100 20 10 10 0 000-20z"
        fill={color}
        className={className}
      />
    </svg>
  )
}
