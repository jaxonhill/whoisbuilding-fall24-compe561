import { TextPage } from "@/features/text-page/components/text-page"
import { QuestionAnswer } from "@/features/text-page/types/types"

const ABOUT_QUESTION_ANSWERS: QuestionAnswer[] = [
    {
        question: "What is WhoisBuilding?",
        answer: "WhoisBuilding is an interactive web platform tailored for computer science students to showcase, explore, and collaborate on projects. Our platform creates a community-driven space where students can easily upload their academic or personal projects, browse those of others, and find other students to collaborate with.",
    },
    {
        question: "Who can use WhoisBuilding?",
        answer: "WhoisBuilding is open to all computer science students and enthusiasts who want to share their projects, learn from others, and build connections within the tech community.",
    },
    {
        question: "How can I get started?",
        answer: "Getting started is easy! Simply sign up for an account, create your profile, and start uploading your projects. You can also explore other projects and connect with fellow developers right away.",
    },
    {
        question: "What types of projects can I share?",
        answer: "You can share any type of software project, whether it's a school assignment, personal project, or collaborative work. This includes web applications, mobile apps, games, algorithms, or any other computer science-related project.",
    },
]

export default function AboutPage() {
    return (
        <TextPage
            title="About Us"
            description="Here's a bit more about WhoisBuilding."
            questions={ABOUT_QUESTION_ANSWERS}
        />
    )
} 