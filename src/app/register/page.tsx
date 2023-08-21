import Link from "next/link";

export default function Page() {
    return (
        <div className="card transition">
            <span className="text-2xl font-medium mx-auto mb-8">Register</span>

            <div className="flex flex-col gap-2">
                <span className="text-sm">Username</span>
                <input type="text" className="input" />
            </div>

            <div className="flex flex-col gap-2">
                <span className="text-sm">Email address</span>
                <input type="text" className="input" />
            </div>

            <div className="flex flex-col gap-2">
                <span className="text-sm">Password</span>
                <input type="password" className="input" />
            </div>

            <div className="flex flex-col gap-2">
                <span className="text-sm">Repeat password</span>
                <input type="password" className="input" />
            </div>

            <span className="my-4 text-sm text-slate-400">
                By registering you agree to our <b>Terms of Service</b> and <b>Privacy policy</b>.
            </span>

            <button className="btn btn-secondary">Create account</button>
        </div>
    )
}