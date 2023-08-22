"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    const logout = () => {
        signOut().then(() => {
            router.push("/");
            router.refresh();
        });
    }

    return (
        <button className="btn transition" onClick={logout}>Log out</button>
    )
}