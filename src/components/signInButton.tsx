import { useSession } from "next-auth/react";
import ActiveLink from "./activeLink";

export default function SignInButton() {
    const { data: session, status } = useSession();

    if (status === "authenticated") {
        return (
            <>
                <span className="text-sm text-slate-200">
                    Logged in as <b></b>
                </span>
                <ActiveLink href="/logout" className="btn transition" activeClassName="invisible">Log out</ActiveLink>
            </>
        )
    } else {
        <ActiveLink href="/login" className="btn transition" activeClassName="invisible">Log in</ActiveLink>
    }
}