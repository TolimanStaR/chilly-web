import React, {InputHTMLAttributes, useEffect} from "react";
import {Icon} from "@/components/icons/Icon";
import clsx from "clsx";

type RadioProps = InputHTMLAttributes<HTMLInputElement> & {
  onClick?: () => void;
  text: string;
  disabled?: boolean;
  className?: string;
};

export const Radio: React.FC<RadioProps> = ({
  onClick,
  text,
  disabled= false,
  className,
  ...props
}) => {
  const [checked, setChecked] = React.useState(props.checked ? props.checked : false);

  useEffect(() => {
    setChecked(props.checked ? props.checked : false);
  }, [props.checked]);

  return (
    <div className={clsx("flex flex-row w-full gap-1 items-center", className)} onClick={() => {
      setChecked(!checked);
      if (onClick) onClick();
    }}>
      <input name={props.name} hidden type={"radio"} checked={checked} onChange={() => setChecked(!checked)}/>

      <Icon name={checked ? "radioChecked" : "radioBlank"} size={24}
            color={disabled ? "#C6C6C6" : (checked ? "#FB3B42" : "#9B9B9B")}/>

      <p className={clsx(
        "text-bodyS",
        disabled ? " text-base-50" : "text-base-95",
      )}>{text}</p>
    </div>
  )
}
