export interface APIResponse {
    success: boolean,
    errorMessage?: string
};

export interface UploadAPIResponse extends APIResponse {
    fileToken?: string
}