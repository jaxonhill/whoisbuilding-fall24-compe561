export interface UserCreate {
  email: string;
  password: string;
}

export interface UserOnboard {
  first_name: string;
  last_name: string;
  username: string;
  github_username: string;
  linkedin: string | null;
  discord: string | null;
  biography: string;
  is_onboarding_complete: boolean;
}
