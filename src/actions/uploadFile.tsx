'use server';

import { UploadAPIResponse, apiError } from "@/types/apiResponse";
import { promises as fs } from "fs";
import path from "path";

import { MAX_FILE_SIZE, TOKEN_SIZE } from "@/globals/uploadConstants";


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
    const file = form.get("file") as File;

    if (file.size >= MAX_FILE_SIZE) return apiError("File size too big!");

    const token = generateToken(TOKEN_SIZE);
    const buf = Buffer.from(await file.arrayBuffer());

    return fs.writeFile(path.join(".", "files", token), buf)
    .then(() => {
        return Promise.resolve({ success: true, fileToken: token } as UploadAPIResponse) 
    })
    .catch((e) => {
        return Promise.resolve({ success: false, errorMessage: e } as UploadAPIResponse)
    });
}