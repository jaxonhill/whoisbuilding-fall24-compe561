import { ReactNode } from "react";
import { QAContainer } from "./qa-container";
import { QuestionAnswer } from "../types/types";

interface TextPageProps {
    title: string;
    description?: ReactNode;
    questions: QuestionAnswer[];
}

export function TextPage({ title, description, questions }: TextPageProps) {
    return (
        <article className="flex flex-col w-full gap-16 pt-16">
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-medium">{title}</h1>
                {description && (
                    <p className="text-slate-700 text-xl">
                        {description}
                    </p>
                )}
            </div>
            <div className="flex flex-col gap-8">
                {questions.map((qa, index) => (
                    <QAContainer key={index} question_answer={qa} />
                ))}
            </div>
        </article>
    );
} 