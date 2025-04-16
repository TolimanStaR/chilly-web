import React, {HTMLInputTypeAttribute, InputHTMLAttributes, useState} from "react";
import clsx from "clsx";
import {Icon, icons} from "@/components/icons/Icon";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & InputHTMLAttributes<HTMLTextAreaElement> & {
  title: string;
  animatedLabel?: boolean;
  type?: HTMLInputTypeAttribute | "area";
  inputSize?: "S" | "M";
  errorMessage?: string;
  icon?: keyof typeof icons,
  tooltipText?: string;
  className?: string
};

export const TextInput: React.FC<TextInputProps> = ({
  title,
  animatedLabel= true,
  type,
  inputSize = "M",
  errorMessage,
  tooltipText,
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const isError = !!errorMessage;

  const sizeClass = {
    S: "h-[32px] px-[12px] py-[8px] text-bodyS rounded-[8px] border",
    M: "h-[44px] px-[12px] py-[8px] text-bodyM rounded-[8px] border",
  }[inputSize];

  return (
    <div className={"relative flex flex-col w-full gap-0 group"}>
      {/* Title with animation */}
      {animatedLabel && (
        <label className={clsx(
          "flex flex-row h-fit select-none gap-1",
          "pointer-events-none transition-colors",
          inputSize == "M" ? "text-bodyS" : "text-caption",
          "group-focus-within:text-red-50",
          "text-base-40",
          isError && "text-red-50"
        )}>
          {title}
          {props.required && <p className="text-red-50">*</p>}
        </label>
      )}

      {/* Input Field */}
      <div className="flex relative w-full flex-row group">
        {type != "area" ? (
          <input
            id={props.id}
            name={props.name}
            value={props.value}
            type={type == "password" ? (showPassword ? "text" : "password") : type}
            onFocus={(e) => {
              if (props.onFocus) props.onFocus(e);
            }}
            onBlur={(e) => {
              if (props.onBlur) props.onBlur(e);
            }}
            disabled={props.disabled}
            placeholder={props.placeholder ? props.placeholder : title}
            className={clsx(
              sizeClass,
              "focus:border-red-50",
              "placeholder-base-40 transition-opacity placeholder:overflow-visible",
              "block w-full z-[1] outline-none placeholder:italic focus:placeholder:opacity-0",
              props.disabled && "bg-base-5 cursor-not-allowed",
              isError ? "bg-red-5 border-red-70" : "bg-base-0 border-base-20",
              className
            )}
            onChange={(e) => {
              if (props.onChange) props.onChange(e);
            }}
            {...props}
          />
        ) : (
          <textarea
            id={props.id}
            name={props.name}
            onFocus={(e) => {
              if (props.onFocus) props.onFocus(e);
            }}
            onBlur={(e) => {
              if (props.onBlur) props.onBlur(e);
            }}
            disabled={props.disabled}
            placeholder={title}
            className={clsx(
              sizeClass,
              "focus:border-red-50",
              props.icon ? "border-t border-r border-b rounded-r-md" : "border rounded-md",
              "placeholder-base-40 transition-opacity",
              "block w-full z-[1] outline-none placeholder:italic focus:placeholder:opacity-0",
              props.disabled && "bg-base-5 cursor-not-allowed",
              isError ? "bg-red-5 border-red-70" : "bg-base-0 border-base-20",
              className
            )}
            onChange={(e) => {
              if (props.onChange) props.onChange(e);
            }}
            {...props}
          />
        )}


        {/* Show/Hide Password Icon */}
        {type === "password" && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-40"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <Icon name={showPassword ? "eyeOff" : "eye"} size={inputSize == "S" ? 16 : 24} color={"gray"}/>
          </button>
        )}

        {tooltipText && (
          <div
            className="ml-2 relative flex items-center"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <Icon name={"info"} size={16} color={"#C6C6C6"}/>
            {showTooltip && (
              <div
                className="absolute right-0 z-30 top-6 w-48 bg-base-90 text-white text-caption_regular select-none p-2 rounded shadow-md">
                {tooltipText}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Helper Text (for error messages) */}
      {isError && (
        <span
          className={clsx(
            "text-red-50",
            inputSize === "M" ? "text-bodyS_regular" : "text-caption_regular"
          )}
        >
          {errorMessage}
        </span>
      )}
    </div>
  );
};
