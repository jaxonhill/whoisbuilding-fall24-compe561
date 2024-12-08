export type User = {
  id: number;
  email: string;
  // `hashed_password` is also a column, but this should never make it to the frontend
  first_name: string;
  last_name: string;
  profile_image_url: string;
  username: string;
  bio: string;
  github_username: string;
  discord: string | null;
  linkedin: string | null;
  created_at: string;
};

// unique fields from db
export enum UniqueUserFields {
  USERNAME = "username",
  EMAIL = "email",
  GITHUB_USERNAME = "github_username",
}

export type UserCreate = User & {
  // used for sign up ONLY. Passwords should never be exposed otherwise
  password: string;
};

export type Project = {
  id: number;
  image_url: string;
  title: string;
  description: string;
  liked_by: User[];
  status: Status;
  contributors: User[];
  tags: string[];
  live_site_link: string;
  github_link: string;
};

export type Status = "just_starting" | "in_progress" | "complete";
