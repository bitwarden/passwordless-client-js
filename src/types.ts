export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type SigninMethod =
  | { userId: string }
  | { alias: string }
  | { autofill: boolean }
  | { discoverable: boolean };

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
