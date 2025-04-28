import React from "react";
import {IconComponentProps} from "../IconComponentProps";

export const Pending: React.FC<IconComponentProps> = ({ size = 24, color = "currentColor", className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2m4.3 13.2L11 12.3V7h1.5v4.4l4.5 2.5-.7 1.3z"
        fill={color}
        className={className}
      />
    </svg>
  )
}
