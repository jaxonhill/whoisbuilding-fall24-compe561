export type User = {
  id: number;
  email: string;
  // `hashed_password` is also a column, but this should never make it to the frontend
  first_name: string;
  last_name: string;
  profile_image_url: string;
  username: string;
  biography: string;
  github_username: string;
  discord: string | null;
  linkedin: string | null;
  created_at: string;
  is_onboarding_complete: boolean;
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

// Used for displaying users in the frontend (avatar and username) and to link to their profile
export type UserDisplay = {
  username: string;
  profile_image_url: string;
};

export type Project = {
  id: number;
  image_url: string;
  title: string;
  description: string;
  liked_by: UserDisplay[];
  collaborators: UserDisplay[];
  tags: string[];
  live_site_link: string;
  github_link: string;
  created_by_user_id: number;
};

export type PaginatedProjects = {
  projects: Project[];
  limit: number;
  page: number;
};

// TODO: If we wanted to expand tags for users to submit their own, we could do something like this
// export type Tag = {
//   id: number;
//   name: string;
//   is_highlighted: boolean;  // used for frontend display
//   is_approved: boolean;
//   created_by_user_id: number;
//   created_at: string;
// }