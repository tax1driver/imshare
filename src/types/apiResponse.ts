import { ClientFile } from "./file";

export interface APIResponse {
    success: boolean,
    errorMessage?: string | any
};

export interface UploadAPIResponse extends APIResponse {
    fileToken?: string
}

export interface GetFilesAPIResponse extends APIResponse {
    files?: ClientFile[]
};
export function apiError(error: string): APIResponse {
    const resp: APIResponse = {
        success: false,
        errorMessage: error
    }

    return resp;
}