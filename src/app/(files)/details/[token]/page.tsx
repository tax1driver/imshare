"use server";

import { prisma } from "@/db";
import { humanFileSize } from "@/globals/humanSize";


export default async function Page({params} : {params: {token: string}}) { 
    const file = await prisma.sharedFile.findUnique({
        where: {
            fileToken: params.token
        },
        select: {
            fullName: true,
            size: true,
            timestamp: true,
            uploader: {
                select: {
                    username: true
                }
            }
        }
    });

    if (!file) {
        return (
            <div className="card transition">
                <span className="text-2xl font-medium mx-auto mb-8">File</span>
                <span className="text-sm text-red-400"><b>Error:</b> the requested file does not exist.</span>
            </div>
        )
    }

    const timeFormat = new Intl.RelativeTimeFormat('en', { style: 'short', numeric: 'auto' })
    const timestamp = timeFormat.format(Math.floor((file.timestamp - Date.now()) / (3600 * 1000)), "hour");

    return (
        <div className="card transition">
            <span className="text-2xl font-medium mx-auto mb-8">File</span>
            <div className="flex flex-col gap-2">
                <span className="text-sm"><b>Filename: </b>{file.fullName}</span>
                <span className="text-sm"><b>Size: </b>{humanFileSize(file.size, true)}</span>
                <span className="text-sm"><b>Time: </b>{timestamp}</span>
                <span className="text-sm"><b>Uploaded by: </b>{file.uploader.username}</span>
            </div>

            <button className="btn btn-secondary mt-8">Download</button>
        </div>
    )
}