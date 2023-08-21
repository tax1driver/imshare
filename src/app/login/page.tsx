"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";


export default function Page() {
    const [error, setError] = useState(null);

    const formSubmit = (e: any) => {
        e.preventDefault();
        
        if (!e.target.username || !e.target.password) {
            return;
        }
        
        signIn("credentials", {
            username: e.target.username,
            password: e.target.password,
            twofactorAuth: "",
            redirect: false
        }).then(result => {
            if (result.error) {
                setError(result.error);
            } else {
                redirect("/");
            }
        });
    }

    return (
        <form onSubmit={formSubmit} className="card transition">
            <span className="text-2xl font-medium mx-auto mb-8">Login</span>
            {
                error ? <span className="text-sm text-red-400"><b>Sign in failed:</b> {error}</span> : ""
            }

            <div className="flex flex-col gap-2">
                <span className="text-sm">Username</span>
                <input type="text" className="input" name="username" />
            </div>

            <div className="flex flex-col gap-2">
                <span className="text-sm">Password</span>
                <input type="password" className="input" name="password" />
            </div>

            <div className="flex flex-col gap-1 my-4">
                <Link href="/lost" className="text-sm text-slate-400 font-bold">Password recovery</Link>
                <Link href="/register" className="text-sm text-slate-400 font-bold">Register</Link>
            </div>

            <button type="submit" className="btn btn-secondary">Log in</button>
        </form>
    )
}