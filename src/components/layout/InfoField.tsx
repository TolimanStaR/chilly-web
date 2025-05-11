import React from "react";
import clsx from "clsx";

interface InfoFieldProps {
  label: string,
  value: string,
  className?: string,
}

export const InfoField: React.FC<InfoFieldProps> = ({
  label,
  value,
  className
}) => {
  return (
    <div>
      <span className={"block text-bodyM font-medium text-base-70"}>{label}:</span>
      <span className={clsx("block text-bodyM text-base-900", className)}>{value}</span>
    </div>
  )
}
