import { InternalLink } from "@/components/internal-link";
import { TextPage } from "@/features/text-page/components/text-page";
import { QuestionAnswer } from "@/features/text-page/types/types";

const SUPPORT_QUESTION_ANSWERS: QuestionAnswer[] = [
    {
        question: "Found a bug?",
        answer: <span>Email a bug report to <InternalLink href="mailto:support@whoisbuilding.io" text="support@whoisbuilding.io" /> and we will fix it.</span>,
    },
    {
        question: "Account question?",
        answer: <span>Email us at <InternalLink href="mailto:support@whoisbuilding.io" text="support@whoisbuilding.io" /> and we will assist you.</span>,
    },
    {
        question: "Feature suggestion?",
        answer: <span>Email us at <InternalLink href="mailto:support@whoisbuilding.io" text="support@whoisbuilding.io" /> and we will reply to you.</span>,
    },
    {
        question: "Anything else?",
        answer: <span>Email us at <InternalLink href="mailto:support@whoisbuilding.io" text="support@whoisbuilding.io" /> and we will get back to you.</span>,
    },
];

export default function SupportPage() {
    return (
        <TextPage
            title="Support"
            description={
                <span>
                    Find your answer in the FAQ or reach us at{' '}
                    <InternalLink href="mailto:support@whoisbuilding.io" text="support@whoisbuilding.io" />
                </span>
            }
            questions={SUPPORT_QUESTION_ANSWERS}
        />
    );
}