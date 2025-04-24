import React from "react";

interface InfoFieldProps {
  label: string,
  value: string
}

export const InfoField: React.FC<InfoFieldProps> = ({
  label,
  value
}) => {
  return (
    <div>
      <span className="block text-bodyM font-medium text-base-70">{label}:</span>
      <span className="block text-bodyM text-base-900">{value}</span>
    </div>
  )
}
