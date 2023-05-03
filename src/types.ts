export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type SigninMethod = { userId: string } | { alias: string } | { autofill: boolean };

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


export type Success<T> = {
    [P in keyof T]: T[P];
} & { error: undefined };

export type Error<T> = {
    [P in keyof T]: undefined;
} & { error: ProblemDetails };

export type Result<T> = Success<T> | Error<T>;

export type PromiseResult<T> = Promise<Result<T>>;

export interface SigninResponse {
    token: string
}

export type SigninBeginResponse = { data: PublicKeyCredentialRequestOptions; sessionId: string; error: undefined }

export interface ProblemDetails {
    errorCode: string;
    title: string;
    status: number;
    detail: string;
}