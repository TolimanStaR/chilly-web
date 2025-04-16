import React from "react";
import {IconComponentProps} from "../IconComponentProps";

export const Plus: React.FC<IconComponentProps> = ({ size = 24, color = "currentColor", className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
        fill={color}
        className={className}
      />
    </svg>
  )
}
