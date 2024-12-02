import { ReactNode } from "react";

export type QuestionAnswer = {
    question: string | ReactNode;
    answer: string | ReactNode;
}

export interface InternalLinkProps {
    href: string;
    text: string;
}

export interface QuestionAnswerContainerProps {
    question_answer: QuestionAnswer
}

export interface QASectionProps {
    title: string;
    description?: ReactNode;
    questions: QuestionAnswer[];
}