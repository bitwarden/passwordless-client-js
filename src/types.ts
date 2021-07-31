
export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export interface RegisterBeginResponse {
  sessionId: string;
  data: PublicKeyCredentialCreationOptions;
  /*
  data: {
    rp: {
      id?: string;
      name: string;
    };
    user: {
      id: ArrayBuffer;
      name: string;
      displayName: string;
    };
    challenge: ArrayBuffer;
    pubKeyCredParams: unknown[];
    timeout: number;
    attestation: string;
    authenticatorSelection: unknown;
    excludeCredentials: {
      id: ArrayBuffer;
    }[];
    extensions: unknown;
    status: string;
    errorMessage: string;
  }
  */
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
