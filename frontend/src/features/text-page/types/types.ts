import { ReactNode } from "react";

export type QuestionAnswer = {
    question: string | ReactNode;
    answer: string | ReactNode;
}