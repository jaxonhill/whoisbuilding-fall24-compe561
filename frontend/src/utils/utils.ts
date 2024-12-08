import { Project, Status, User } from "@/types/db-types";

export function create_profile_page_link(whois_username: string): string {
    return `/user/${whois_username}`;
}

export const fakeUsers: User[] = [
    {
        id: 1,
        email: "john@example.com",
        first_name: "John",
        last_name: "Doe",
        avatar_url: "https://i.pravatar.cc/150?img=1",
        username: "johndoe",
        bio: "Full-stack developer passionate about React and Node.js",
        github_username: "johndoe",
        discord_username: "johndoe#1234",
        linkedin_url: "https://www.linkedin.com/in/johndoe",
        created_at: "2023-01-01T00:00:00Z"
    },
    {
        id: 2,
        email: "jane@example.com",
        first_name: "Jane",
        last_name: "Smith",
        avatar_url: "https://i.pravatar.cc/150?img=2",
        username: "janesmith",
        bio: "UI/UX designer with a love for clean and intuitive interfaces",
        github_username: "janesmith",
        discord_username: null,
        linkedin_url: "https://www.linkedin.com/in/janesmith",
        created_at: "2023-02-15T00:00:00Z"
    },
    {
        id: 3,
        email: "alex@example.com",
        first_name: "Alex",
        last_name: "Johnson",
        avatar_url: "https://i.pravatar.cc/150?img=3",
        username: "alexj",
        bio: "Machine learning enthusiast and Python developer",
        github_username: "alexj",
        discord_username: "alexj#5678",
        linkedin_url: "https://www.linkedin.com/in/alexjohnson",
        created_at: "2023-03-20T00:00:00Z"
    },
];

export const fakeProjects: Project[] = [
    {
        id: 1,
        image_url: "https://picsum.photos/seed/project1/800/450",
        title: "WhoIsBuilding",
        description: "A platform for CS students to share and collaborate on side projects. This innovative web application aims to connect aspiring developers and designers, fostering a community of innovation and learning. Key features include: Project showcasing with detailed descriptions, Collaboration tools for team formation, Skill-based matching for finding ideal project partners.",
        liked_by: [fakeUsers[0], fakeUsers[1], fakeUsers[2]],
        status: "in_progress" as Status,
        contributors: [fakeUsers[0], fakeUsers[1]],
        tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
        live_site_link: "https://whoisbuilding.vercel.app",
        github_link: "https://github.com/whoisbuilding/webapp"
    },
    {
        id: 2,
        image_url: "https://picsum.photos/seed/project2/800/450",
        title: "EcoTrack",
        description: "An environmental monitoring system that uses IoT devices to collect and analyze data on air quality, water pollution, and noise levels in urban areas. The project includes: A network of low-cost sensors deployed across the city, Real-time data visualization dashboard, Predictive models for environmental trend analysis.",
        liked_by: [fakeUsers[1], fakeUsers[2]],
        status: "just_starting" as Status,
        contributors: [fakeUsers[1], fakeUsers[2]],
        tags: ["IoT", "Python", "Machine Learning", "Data Visualization"],
        live_site_link: "https://ecotrack.example.com",
        github_link: "https://github.com/ecotrack/main"
    },
    {
        id: 3,
        image_url: "https://picsum.photos/seed/project3/800/450",
        title: "CodeMentor AI",
        description: "An AI-powered coding assistant that helps beginners learn programming concepts and debug their code. This innovative tool combines natural language processing with code analysis to provide personalized learning experiences. Features include: Interactive coding challenges with real-time feedback, AI-generated explanations of complex programming concepts, Intelligent code suggestions and error detection.",
        liked_by: [fakeUsers[0], fakeUsers[2]],
        status: "complete" as Status,
        contributors: [fakeUsers[0], fakeUsers[2]],
        tags: ["Artificial Intelligence", "Natural Language Processing", "Education Tech", "Web Development"],
        live_site_link: "https://codementor-ai.example.com",
        github_link: "https://github.com/codementor-ai/platform"
    },
];