import Link from "next/link";
import { getServerSession } from "next-auth";
import authOptions from "@/globals/authOptions";
import LogoutButton from "./logoutButton";

export default async function AccountSection() {
    const session = await getServerSession(authOptions);
    
    if (session) {
        return (
            <>
                <span className="text-sm text-slate-200">
                    Logged in as <b></b>
                </span>
                <LogoutButton />
            </>
        )
    } else {
        return <Link href="/login" className="btn transition">Log in</Link>
    }
}