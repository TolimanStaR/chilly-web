import React, {InputHTMLAttributes, useState} from "react";
import clsx from "clsx";

type FileInputProps = InputHTMLAttributes<HTMLInputElement> & {
  title: string;
  errorMessage?: string;
  className?: string
};

export const FileInput: React.FC<FileInputProps> = ({
  errorMessage,
  className,
  ...props
}) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      if (props.onChange) props.onChange(event);
      setFileName(event.target.files[0].name);
    } else {
      setFileName(null);
    }
  };

  const isError = !!errorMessage;

  return (
    <div className={"relative flex flex-col w-full gap-0"}>
      {/* Title */}
      <label
        className={clsx(
          "flex flex-row h-fit select-none gap-1",
          "pointer-events-none",
          "text-bodyS text-base-40",
        )}
      >
        {props.title}
        {props.required && <p className={"text-red-50"}>*</p>}
      </label>

      {/* Input Field */}
      <div className="relative w-full">
        {/* Скрытый file input */}
        <input
          data-testid={"file-input"}
          id={props.id}
          name={props.name}
          type="file"
          accept={props.accept}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          disabled={props.disabled}
        />

        <div
          className={clsx(
            "flex items-center w-full h-[2.75rem] rounded-md border transition overflow-hidden",
            "cursor-pointer bg-base-0 border-base-20 hover:border-red-50",
            props.disabled && "bg-base-5 cursor-not-allowed",
            isError ? "border-red-70 bg-red-5" : "border-base-20",
            className
          )}
        >
          <div className="flex bg-red-50 text-nowrap h-full text-white px-3 py-1 text-bodyM items-center select-none">
            Выберите файл
          </div>

          <span className={clsx(
            "truncate px-3",
            fileName ? "text-base-80" : "text-base-40",
          )}>
            {fileName || props.placeholder || "Файл не выбран"}
          </span>
        </div>
      </div>

      {isError && (
        <span
          className={clsx(
            "text-red-50",
            "text-bodyS"
          )}
        >
          {errorMessage}
        </span>
      )}
    </div>
  );
};
