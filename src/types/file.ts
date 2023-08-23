import { ClientUser } from "./user";

export interface ClientFile {
    fullName: string,
    size: number,
    storageId: string,
    timestamp: number,
    fileToken: string,
    uploader: ClientUser
};