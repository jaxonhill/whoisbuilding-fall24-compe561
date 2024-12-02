import { QuestionAnswer } from "../types/types";

interface QAContainerProps {
    question_answer: QuestionAnswer;
}

export function QAContainer({ question_answer }: QAContainerProps) {
    return (
        <section className="flex flex-col gap-2">
            <h2 className="text-xl">{question_answer.question}</h2>
            <p className="text-slate-700">{question_answer.answer}</p>
        </section>
    );
}