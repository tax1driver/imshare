'use server';

import { UploadAPIResponse, apiError } from "@/types/apiResponse";
import { promises as fs } from "fs";
import path from "path";

import { MAX_FILE_SIZE, TOKEN_SIZE } from "@/globals/uploadConstants";
import { prisma } from "@/db";
import { getServerSession } from "next-auth";
import authOptions from "@/globals/authOptions";

const generateToken = (length: number) : string => {
    var a : string[] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b : string[] = [];
    for (var i = 0; i < length; i++) {
        var j = Math.trunc(Math.random() * (a.length - 1));
        b[i] = a[j];
    }
    return b.join("");
}

export default async function uploadFile(form: FormData): Promise<UploadAPIResponse> {
    const session = await getServerSession(authOptions);

    if (!session) {
        return apiError("Unauthorized");
    }

    const file = form.get("file") as File;

    if (file.size >= MAX_FILE_SIZE) return apiError("File size too big!");

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
    } catch(e) {
        return apiError("DB error");
    }
    
    try {
        await fs.writeFile(path.join(".", "files", token), buf)
    } catch (e) {
        return apiError("Write error");
    }

    return { success: true, fileToken: token } as UploadAPIResponse;
}