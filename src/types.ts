export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

/**
 * Represents a sign-in method.
 */
export type SigninMethod =
  | { userId: string }
  | { alias: string }
  | { autofill: boolean }
  | { discoverable: boolean };

/**
 * Represents a step-up request to initiate a specific action or operation.
 *
 * @interface StepupRequest
 */
export interface StepupRequest {
  signinMethod: SigninMethod;
  purpose: string;
}

export type RegisterBeginResponse = {
  session: string;
  data: PublicKeyCredentialCreationOptions;
};

export type Success<T> = {
  [P in keyof T]: T[P];
} & { error: undefined };

export type Error<T> = {
  [P in keyof T]?: undefined;
} & { error: ProblemDetails };

export type Result<T> = Success<T> | Error<T>;

export type PromiseResult<T> = Promise<Result<T>>;

export interface TokenResponse {
  token: string;
}

export type SigninBeginResponse = { data: PublicKeyCredentialRequestOptions; session: string };

export interface ProblemDetails {
  from: string;
  errorCode: string;
  title: string;
  status?: number;
  detail?: string;
}
