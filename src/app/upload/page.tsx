'use client'

import { APIResponse, UploadAPIResponse } from '@/types/apiResponse';
import classNames from 'classnames';
import { redirect } from 'next/navigation';
import { useState } from 'react';

function Uploading(props: {progress: number}) {
    return (
        <>
            <span className="text-2xl font-medium mx-auto mb-8">Uploading...</span>
            <div className="h-6 border-2 rounded-lg border-zinc-700 p-[2px]">
                <div className="h-full w-2/3 rounded-[5px] bg-zinc-700"></div>
            </div>
            <span className="text-gray-200 text-center animate-pulse text-sm">66%</span>
            <span className="text-gray-200 text-center animate-pulse text-sm mt-auto">Please wait...</span>
        </>
    )
}

export default function Page() {
    const [isUploading, setUploading] = useState(false);
    
    const uploadFile = (file: File | undefined) => {
        if (file == null) return;
        
        setUploading(true);
        const formData = new FormData();
        formData.set("file", file);

        // fetch("/api/upload", {
        //     method: "POST",
        //     body: formData
        // })
        // .then((res: Response) => res.json())
        // .then((res: UploadAPIResponse) => {
        //     if (res.success) {
        //         redirect(`/details/${res.fileToken}`);
        //     } else {
                
        //     }

        // })
    }

    return (
        <div className={classNames({ "upload-card" : !isUploading, "card": isUploading }, "transition")}>
            {
                isUploading ? 
                   <Uploading progress={0} />
                :
                    <>
                        <span className="text-sm text-gray-500 animate-pulse"><b>Click to upload</b> or drag and drop</span>
                        <span className="text-sm text-gray-500 animate-pulse">Files are stored for 24 hours</span>
                        <label htmlFor="file"></label>
                        <input id="file" type="file" hidden onChange={(e) => uploadFile(e.target.files?.[0])} />
                    </>
            }
        </div>
    )
}