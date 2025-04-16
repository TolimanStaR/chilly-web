import React from "react";
import {IconComponentProps} from "../IconComponentProps";

export const Template: React.FC<IconComponentProps> = ({ size = 24, color = "currentColor", className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx={12} cy={12} r={7} fill={color} className={className}/>
    </svg>
  )
}
