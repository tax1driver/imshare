export interface APIResponse {
    success: boolean,
    errorMessage?: string
};

export interface UploadAPIResponse extends APIResponse {
    fileToken?: string
}

export function apiError(error: string): APIResponse {
    const resp: APIResponse = {
        success: false,
        errorMessage: error
    }

    return resp;
}