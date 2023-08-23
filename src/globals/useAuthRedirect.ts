"use client"

import { getSession } from "@/actions/userActions"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function useAuthRedirect(to: string) {
    const router = useRouter();

    useEffect(() => {
        getSession().then((session) => {
            if (!session) {
                router.push(to);
            }
        });
    }, []);
}