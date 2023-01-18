
export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type SigninMethod = {userId: string} | {alias: string} | { conditional: boolean};

export interface RegisterBeginResponse {
  sessionId: string;
  data: PublicKeyCredentialCreationOptions;
}

export interface RegisterCompleteResponse {
  sessionId: string;
  data: {
    result: {
      publicKey: string;
      user: {
        id: string;
        name: string;
        displayName: string;
      };
      credType: string;
      aaguid: string;
      credentialId: string;
      counter: number;
      status: string | null;
      errorMessage: string | null;
    };
    status: 'ok' | string;
    errorMessage: string;
  }
}

export interface SigninBeginResponse {
  data: PublicKeyCredentialRequestOptions;
  sessionId: string;
}

export interface SigninCompleteResponse {
  data: string;
  sessionId: string;
}
