'use client'

import { MAX_FILE_SIZE } from '@/globals/uploadConstants';
import useAuthRedirect from '@/globals/useAuthRedirect';
import { UploadAPIResponse } from '@/types/apiResponse';
import axios from 'axios';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';

import { useState, useEffect } from 'react';

function Uploading(props: {progress: number}) {
    const progress = props.progress.toFixed(1);

    return (
        <>
            <span className="text-2xl font-medium mx-auto mb-8">Uploading...</span>
            <div className="h-6 border-2 rounded-lg border-zinc-700 p-[2px]">
                <div className="h-full rounded-[5px] bg-zinc-700" style={{
                    width: progress + "%"
                }}></div>
            </div>
            <span className="text-gray-200 text-center animate-pulse text-sm">{progress}%</span>
            <span className="text-gray-200 text-center animate-pulse text-sm mt-auto">Please wait...</span>
        </>
    )
}

export default function Page() {
    const [uploadState, setUploadState] = useState("waiting");
    const [uploadError, setUploadError] = useState<any>();
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    
    useAuthRedirect("/");

    const router = useRouter();

    const startFileUpload = (file: File | undefined) => {
        if (file == null) return;
        
        setUploadState("uploading");
        
        if (file.size >= MAX_FILE_SIZE) {
            setUploadState("error");
            setUploadError({message: `File is too big (max ${(MAX_FILE_SIZE / 1024 / 1024).toFixed(0)} MB)`});

            return;
        }

        const form = new FormData();
        form.set("file", file);

        axios({
            method: "POST",
            url: "/api/upload",
            data: form,
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (e) => {
                setUploadProgress((e.progress ?? 0) * 100);
            },
        })
        .then(res => res.data)
        .then((res: UploadAPIResponse) => {
            if (!res.success) return Promise.reject({message: res.errorMessage});

            router.push(`/details/${res.fileToken}`);
        })
        .catch(e => {
            setUploadState("error");
            setUploadError(e);
        })
    }

    let element;

    if (uploadState == "waiting") {
        element = <>
            <span className="text-sm text-gray-500 animate-pulse"><b>Click to upload</b> or drag and drop</span>
            <span className="text-sm text-gray-500 animate-pulse">Files are stored for 24 hours</span>
            <label htmlFor="file"></label>
            <input id="file" type="file" hidden onChange={(e) => startFileUpload(e.target.files?.[0])} />
        </>;
    } else if (uploadState == "uploading") {
        element = <Uploading progress={uploadProgress} />;
    } else if (uploadState == "error") {
        element = <>
            <span className="text-2xl font-medium mx-auto mb-8">Upload failed</span>
            <span className="text-gray-200 text-center text-sm">{uploadError.message}</span>
            <a href="/upload" className="text-sm text-slate-400 font-bold text-center" onClick={(e) => {
                e.preventDefault();
                setUploadState("waiting");
                setUploadProgress(0);
                setUploadError(null);
            }}>Go back</a>
        </>
    }

    return (
        <div className={classNames({ "upload-card" : uploadState == "waiting", "card": uploadState != "waiting" }, "transition")}>
            {element}
        </div>
    )
}