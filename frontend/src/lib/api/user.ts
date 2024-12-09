import { UserRegistration, UserValidateField } from "@/lib/api/responses/users";
import { API_BASE_URL } from "./locals";
import { User } from "@/types/db-types";
import { UserCreate, UserOnboard } from "@/lib/api/schemas/userSchemas";
import { log } from "console";
import { json } from "stream/consumers";
import { useReducer } from "react";

export async function fetchUserFieldValidation(
  field: string,
  proposed_value: string
): Promise<Boolean> {
  const queryString = `?field=${field}&proposed_value=${proposed_value}`;
  const response = await fetch(`${API_BASE_URL}/users/validate${queryString}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  const result: UserValidateField = await response.json();

  console.log(result.message);

  return result.exists;
}

export async function createUserRegistration(
  email: string,
  password: string
): Promise<UserRegistration> {
  const user_create_details: UserCreate = {
    email: email,
    password: password,
  };

  const response = await fetch(`${API_BASE_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user_create_details),
  });

  if (!response.ok) {
    throw new Error("registration failed");
  }

  const result: UserRegistration = await response.json();

  console.log(result);

  return result;
}

export async function onboardUser(
  user_details: UserOnboard,
  token: string
): Promise<User> {
  console.log("Request body:", JSON.stringify(user_details));
  const response = await fetch(`${API_BASE_URL}/users/onboard`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user_details),
  });

  if (!response.ok) {
    console.log(await response.json());
    throw new Error("onboarding failed");
  }

  const result: User = await response.json();

  return result;
}
