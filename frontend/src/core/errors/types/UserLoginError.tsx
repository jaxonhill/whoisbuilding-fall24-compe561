export enum UserLoginErrorName {
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  LOGIN_ATTEMPT_THRESHOLD_MET = "LOGIN_ATTEMPT_THRESHOLD_MET",
}

interface UserConstructorParams {
  name: UserLoginErrorName;
  message: string;
}
// custom type to handle the two types of HTTP errors on login - invalid creds and rate limit
export class UserLoginError extends Error {
  name: UserLoginErrorName;
  message: string;

  constructor({
    name,
    message,
  }: {
    name: UserLoginErrorName;
    message: string;
  }) {
    super();
    this.name = name;
    this.message = message;
  }
}
