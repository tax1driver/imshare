"use client";

import { getUserFiles, removeFiles } from "@/actions/fileActions"
import { humanFileSize } from "@/globals/humanSize";
import Link from 'next/link'
import classNames from "classnames";
import RefreshPage from "@/components/refreshPage";
import { GetFilesAPIResponse } from "@/types/apiResponse";

import { useEffect, useState } from "react";


export default function Page() {
    const [pageState, setPageState] = useState<GetFilesAPIResponse>({
        success: true,
        files: []
    });

    useEffect(() => {
        getUserFiles().then(response => setPageState(response));
    }, []);

    const deleteFile = (token: string) => {
        const backupPageState = Object.assign({}, pageState);

        setPageState((prevState) => {
            return {
                ...prevState,
                files: prevState.files.filter((v) => token !== v.fileToken),
            }
        });

        removeFiles([token]).then(res => {
            if (!res.success) setPageState(backupPageState);
        }).catch(r => setPageState(backupPageState));
    }

    return (
        <div className="card transition !max-w-none !w-auto">
            <RefreshPage />
            <span className="text-2xl font-medium mx-auto mb-8">Uploaded files</span>
            <span className={classNames("text-sm text-red-400 transition-all", { "opacity-0 h-0": pageState.success ?? true })}>
                <b>Error:</b> {pageState.errorMessage ?? ""}
            </span>

            <table className="border-collapse table-auto">
                <thead className="border-b border-gray-500">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Time</th>
                        <th>Links</th>
                    </tr>
                </thead>
                <tbody>
                    {pageState.files.map((file, i) => {
                        const timeFormat = new Intl.RelativeTimeFormat('en', { style: 'short', numeric: 'auto' })
                        const timestamp = timeFormat.format(Math.floor((file.timestamp - Date.now()) / (3600 * 1000)), "hour");

                        return (
                            <tr key={i} className="border-b border-gray-800 text-sm">
                                <td>{i+1}</td>
                                <td>{file.fullName}</td>
                                <td>{humanFileSize(file.size, true)}</td>
                                <td>{timestamp}</td>
                                <td className="flex flex-col items-center">
                                    <button onClick={() => deleteFile(file.fileToken)} className="text-sm text-red-500 font-bold">Delete</button>
                                </td>
                            </tr> 
                        )
                    })}
                                 
                </tbody>
            </table>
        </div>
    )
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;