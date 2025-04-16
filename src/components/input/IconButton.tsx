import React, {ButtonHTMLAttributes} from "react";
import clsx from "clsx";
import {Icon, icons} from "@/components/icons/Icon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  palette?: "red" | "gray";
  size?: "S" | "M";
  variant?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  icon: keyof typeof icons;
  onClick?: () => void;
  isLoading?: boolean;
  className?: string;
};

export const IconButton: React.FC<ButtonProps> = ({
  palette = "red",
  size = "M",
  variant = "primary",
  disabled = false,
  icon,
  onClick,
  isLoading,
  className,
  ...props
}) => {
  const baseClass = "flex items-center justify-center focus:outline-none";

  /* Size styles */
  const sizeClass = {
    S: "h-[40px] w-[40px] rounded-[8px]",
    M: "h-[52px] w-[52px] rounded-[8px]",
  }[size];

  /* Color styles */
  const paletteClass = {
    red: {
      primary: "bg-red-50 text-base-0 hover:bg-red-60 active:bg-red-70 disabled:bg-base-20",
      secondary: "border border-2 border-red-50 text-red-50 hover:border-red-60 hover:text-red-60 active:border-red-70 active:text-red-70 disabled:border-base-20 disabled:text-base-20",
      tertiary: "text-red-50 hover:text-red-60 hover:bg-red-5 active:text-red-70 active:bg-red-5 disabled:text-base-30 disabled:bg-transparent",
    },
    gray: {
      primary: "bg-base-70 text-base-0 hover:bg-base-80 active:bg-base-95 disabled:bg-base-20",
      secondary: "border border-2 border-base-70 text-base-70 hover:border-base-80 hover:text-base-80 active:border-base-95 active:text-base-95 disabled:border-base-20 disabled:text-base-20",
      tertiary: "text-base-80 hover:bg-base-5 active:text-base-95 active:bg-base-5 disabled:text-base-30 disabled:bg-transparent",
    },
  }[palette][variant];

  /* State styles */
  const stateClass = disabled ? "cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      type={props.type}
      className={clsx(baseClass, sizeClass, paletteClass, stateClass, className)}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {
        isLoading ? (
          <div className="h-6 w-6 border-4 border-transparent border-r-inherit rounded-full animate-spin"/>
        ) : (
          <Icon name={icon} size={size == "M" ? 32 : 24}/>
        )
      }
    </button>
  );
};
