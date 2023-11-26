"use client";

import { useState } from "react"
import { redirect, useRouter } from "next/navigation";
import { createUser } from "@/actions/userActions";
import { CreateUserOptions } from "@/types/user";
import classNames from "classnames";
import MultilineSpan from "@/components/multilineSpan";

export default function Page() {
    const [errors, setErrors] = useState<string[]>(null);
    const router = useRouter();

    const formSubmit = (e: any) => {
        e.preventDefault();

        const userOptions: CreateUserOptions = {
            username: e.target["username"].value,
            password: e.target["password"].value,
            passwordRepeat: e.target["passwordRepeat"].value,
            email: e.target["email"].value
        };

        createUser(userOptions.username, userOptions.password, userOptions.passwordRepeat, userOptions.email)
        .then(response => {
            if (!response.success) {
                setErrors(response.errorMessage);
            } else {
                setErrors(null);
                router.push("/login");
            }
        })

    }

    return (
        <form onSubmit={formSubmit} className="card transition">
            <span className="text-2xl font-medium mx-auto mb-8">Register</span>
            <span className={classNames("text-sm text-red-400 transition-all", { "opacity-0 h-0": !errors })}>
                <b>Register failed</b> 
                <MultilineSpan>{errors}</MultilineSpan>
            </span>

            <div className="flex flex-col gap-2">
                <span className="text-sm">Username</span>
                <input type="text" className="input" name="username" />
            </div>

            <div className="flex flex-col gap-2">
                <span className="text-sm">Email address</span>
                <input type="text" className="input" name="email" />
            </div>

            <div className="flex flex-col gap-2">
                <span className="text-sm">Password</span>
                <input type="password" className="input" name="password" />
            </div>

            <div className="flex flex-col gap-2">
                <span className="text-sm">Repeat password</span>
                <input type="password" className="input" name="passwordRepeat" />
            </div>

            <span className="my-4 text-sm text-slate-400">
                By registering you agree to our <b>Terms of Service</b> and <b>Privacy policy</b>.
            </span>

            <button type="submit" className="btn btn-secondary">Create account</button>
        </form>
    )
}