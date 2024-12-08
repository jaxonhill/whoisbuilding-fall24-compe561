import { UserValidateField } from "@/core/responses/users";
import { API_BASE_URL } from "./locals";

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
