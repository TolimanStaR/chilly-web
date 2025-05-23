import React from "react";
import {IconComponentProps} from "../IconComponentProps";

export const Members: React.FC<IconComponentProps> = ({ size = 24, color = "currentColor", className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 5.5A3.5 3.5 0 0115.5 9a3.5 3.5 0 01-3.5 3.5A3.5 3.5 0 018.5 9 3.5 3.5 0 0112 5.5M5 8c.56 0 1.08.15 1.53.42-.15 1.43.27 2.85 1.13 3.96C7.16 13.34 6.16 14 5 14a3 3 0 01-3-3 3 3 0 013-3m14 0a3 3 0 013 3 3 3 0 01-3 3c-1.16 0-2.16-.66-2.66-1.62a5.536 5.536 0 001.13-3.96c.45-.27.97-.42 1.53-.42M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13v-1.75M0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9-.59.68-.95 1.62-.95 2.65V20H0m24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65 2.56.34 4.45 1.51 4.45 2.9V20z"
        fill={color}
        className={className}
      />
    </svg>
  )
}
