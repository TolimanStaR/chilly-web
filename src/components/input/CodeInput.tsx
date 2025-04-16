import React, { useEffect, useRef } from "react";
import clsx from "clsx";

interface CodeInputProps {
  length?: number;
  value: string;
  onChange: (val: string) => void;
  onComplete?: (code: string) => void;
  error?: string;
  className?: string;
}

export const CodeInput: React.FC<CodeInputProps> = ({
  length = 6,
  value,
  onChange,
  onComplete,
  error,
  className
}) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const code = value.split("").concat(Array(length).fill("")).slice(0, length);

  useEffect(() => {
    inputsRef.current = inputsRef.current.slice(0, length);
  }, [length]);

  const focusInput = (index: number) => {
    const input = inputsRef.current[index];
    if (input) input.focus();
  };

  const handleChange = (val: string, index: number) => {
    if (!/^\d*$/.test(val)) return;

    const newCode = [...code];
    newCode[index] = val;
    const fullCode = newCode.join("");
    onChange(fullCode);

    if (val && index < length - 1) {
      focusInput(index + 1);
    }

    if (newCode.every((digit) => digit !== "") && onComplete) {
      onComplete(fullCode);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").slice(0, length);
    const digits = pasteData.split("").filter((char) => /^\d$/.test(char));
    const newCode = digits.concat(Array(length).fill("")).slice(0, length);
    const joined = newCode.join("");

    onChange(joined);
    if (digits.length === length && onComplete) {
      onComplete(joined);
    }

    focusInput(Math.min(digits.length, length - 1));
  };

  useEffect(() => {
    focusInput(0);
  }, []);

  return (
    <div className={clsx("flex flex-col items-center", className)}>
      <div className="flex gap-4 mb-2">
        {code.map((char, index) => (
          <input
            key={index}
            ref={(el) => {inputsRef.current[index] = el}}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={char}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            autoComplete={"off"}
            className={clsx(
              "w-[36px] h-[48px] text-center text-2xl font-medium border rounded-md",
              "focus:outline-none focus:border-red-500",
              error ? "border-red-700 bg-red-5" : "border-gray-300"
            )}
          />
        ))}
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};
