import internal from "stream";

export interface UserValidateField {
  message: string;
  field: string;
  exists: boolean;
}

export interface UserRegistration {
  id: number;
  email: string;
  created_at: Date;
  is_on_boarding_complete: boolean;
}
