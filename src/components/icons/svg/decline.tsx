import React from "react";
import {IconComponentProps} from "../IconComponentProps";

export const Decline: React.FC<IconComponentProps> = ({ size = 24, color = "currentColor", className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M13 13h-2V7h2m0 10h-2v-2h2M12 2A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z"
        fill={color}
        className={className}
      />
    </svg>
  )
}
