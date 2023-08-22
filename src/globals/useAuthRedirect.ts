"use client"

import { getSession } from "@/actions/userActions"
import { useRouter } from "next/navigation"

export default function useAuthRedirect(to: string) {
    const router = useRouter();
    getSession().then((session) => {
        if (!session) {
            router.push(to);
        }
    });
}