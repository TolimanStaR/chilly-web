import {Question} from "@/types/faq.types.ts";
import React from "react";

interface QuestionCardProps {
  question: Question;
  isOpened: boolean;
  setIsOpened: (id: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isOpened,
  setIsOpened
}) => {
  return (
    <div className={"border rounded-2xl shadow-sm transition-all duration-300 overflow-hidden"}>
      <button
        className={"w-full text-left px-6 py-4 font-medium text-h5 hover:bg-gray-50 flex justify-between items-center"}
        onClick={() => setIsOpened(question.id)}
      >
        {question.title}
        <span className={"ml-2 text-base-40 transition-transform duration-300 transform"}>
          {isOpened ? "−" : "+"}
        </span>
      </button>

      <div
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpened
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="text-bodyM text-base-80 whitespace-pre-line py-4">
          {question.answer}
        </div>
      </div>
    </div>
  )
}