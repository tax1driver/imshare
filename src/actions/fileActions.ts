"use server";

import { prisma } from "@/db";
import authOptions from "@/globals/authOptions";
import { APIResponse, GetFilesAPIResponse, UploadAPIResponse, apiError } from "@/types/apiResponse";
import { ClientFile } from "@/types/file";
import { getServerSession } from "next-auth"
import { promises as fs } from "fs";
import path from "path";

import { MAX_FILE_SIZE, TOKEN_SIZE } from "@/globals/uploadConstants";


const generateToken = (length: number): string => {
    var a: string[] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b: string[] = [];
    for (var i = 0; i < length; i++) {
        var j = Math.trunc(Math.random() * (a.length - 1));
        b[i] = a[j];
    }
    return b.join("");
}

export async function uploadFile(form: FormData): Promise<UploadAPIResponse> {
    const session = await getServerSession(authOptions);

    if (!session) {
        return apiError("Unauthorized");
    }

    const file = form.get("file") as File;

    if (!file) {
        return apiError("`file` was null");
    }

    if (file.size >= MAX_FILE_SIZE) return apiError("File size too big");

    const token = generateToken(TOKEN_SIZE);
    const buf = Buffer.from(await file.arrayBuffer());

    try {
        await prisma.sharedFile.create({
            data: {
                fullName: file.name,
                size: file.size,
                fileToken: token,
                storageId: token,
                timestamp: Date.now(),
                uploader: {
                    connect: {
                        id: session.user.id
                    }
                }
            }
        });
    } catch (e) {
        return apiError("DB error");
    }

    try {
        await fs.writeFile(path.join(".", "files", token), buf)
    } catch (e) {
        return apiError("Write error");
    }

    return { success: true, fileToken: token } as UploadAPIResponse;
}

export async function getUserFiles(): Promise<GetFilesAPIResponse> {
    const session = await getServerSession(authOptions);

    if (!session) return apiError("Unauthorized");

    const files: ClientFile[] = await prisma.sharedFile.findMany({
        where: {
            uploaderId: session.user.id
        },
        select: {
            fullName: true,
            size: true,
            storageId: true,
            timestamp: true,
            fileToken: true,
            uploader: true
        },
        
    });

    if (!files) {
        return apiError("Failed to fetch files");
    }

    return { success: true, files: files } as GetFilesAPIResponse;

}

export async function removeFiles(fileTokens: string[]): Promise<APIResponse> {
    const session = await getServerSession(authOptions);

    if (!session) {
        return apiError("Unauthorized");
    }

    const files: ClientFile[] = await prisma.sharedFile.findMany({
        where: {
            fileToken: { in: fileTokens }
        },
        include: {
            uploader: true
        }
    });

    for (let file of files) {
        if (file.uploader.id !== session.user.id) {
            return apiError("Unauthorized to delete this file");
        }

        await fs.rm(path.join(".", "files", file.storageId));
    }

    await prisma.sharedFile.deleteMany({
        where: {
            fileToken: { in: fileTokens }
        }
    });
    
    return { success: true };
}