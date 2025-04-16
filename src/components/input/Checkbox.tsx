import React, {InputHTMLAttributes, useEffect} from "react";
import {Icon} from "@/components/icons/Icon";
import clsx from "clsx";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  onClick?: () => void;
  text: string;
  tooltipText?: string;
  disabled?: boolean;
  className?: string;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  onClick,
  text,
  tooltipText,
  disabled= false,
  className,
  ...props
}) => {
  const [checked, setChecked] = React.useState(props.checked ? props.checked : false);
  const [showTooltip, setShowTooltip] = React.useState(false);

  useEffect(() => {
    setChecked(props.checked ? props.checked : false);
  }, [props.checked]);

  return (
    <div className={clsx("flex flex-row w-full gap-1 items-center", className)} onClick={() => {
      setChecked(!checked);
      if (onClick) onClick();
    }}>
      <input name={props.name} hidden type={"checkbox"} checked={checked} onChange={() => setChecked(!checked)}/>

      <Icon name={checked ? "checkboxChecked" : "checkboxBlank"} size={24}
            color={disabled ? "#C6C6C6" : (checked ? "#FB3B42" : "#9B9B9B")}/>

      <p className={clsx(
        "w-full h-full text-bodyS select-none",
        disabled ? " text-base-50" : "text-base-95",
      )}>{text}</p>

      {tooltipText && (
        <div
          className="ml-2 relative flex items-center"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Icon name={"info"} size={16} color={"#C6C6C6"}/>
          {showTooltip && (
            <div
              className="absolute right-0 top-6 w-48 bg-base-90 text-white text-caption_regular select-none p-2 rounded shadow-md">
              {tooltipText}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
