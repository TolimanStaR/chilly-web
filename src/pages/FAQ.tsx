import {useEffect, useState} from "react";
import {QuestionCard, questions} from "@/components/faq";

export const FAQ = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    document.title = "FAQ — Часто задаваемые вопросы"
  }, []);

  return (
    <div className="h-full bg-white py-12 px-4 sm:px-8 max-w-3xl mx-auto">
      <h1 className="text-h4 font-bold text-center mb-10">FAQ — Часто задаваемые вопросы</h1>

      <div className="space-y-4">
        {questions.map((q) => (
          <QuestionCard key={q.id} question={q} isOpened={openId == q.id} setIsOpened={() => toggle(q.id)}/>
        ))}
      </div>
    </div>
  );
}