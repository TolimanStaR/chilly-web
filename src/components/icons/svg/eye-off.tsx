import React from "react";
import {IconComponentProps} from "../IconComponentProps";

export const EyeOff: React.FC<IconComponentProps> = ({ size = 24, color = "currentColor", className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M2 5.27L3.28 4 20 20.72 18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58-5 0-9.27-3.11-11-7.5.69-1.76 1.79-3.31 3.19-4.54L2 5.27zM12 9a3 3 0 012.83 4L11 9.17A3 3 0 0112 9zm0-4.5c5 0 9.27 3.11 11 7.5a11.79 11.79 0 01-4 5.19l-1.42-1.43A9.862 9.862 0 0020.82 12 9.821 9.821 0 0012 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97zM3.18 12A9.821 9.821 0 0012 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 019 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13z"
        fill={color}
        className={className}
      />
    </svg>
  )
}
