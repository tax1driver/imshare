import Link from "next/link";

export default function Page() {
    return (
        <div className="card transition">
            <span className="text-2xl font-medium mx-auto mb-8">Login</span>
            
            <div className="flex flex-col gap-2">
                <span className="text-sm">Username</span>
                <input type="text" className="input" />
            </div>

            <div className="flex flex-col gap-2">
                <span className="text-sm">Password</span>
                <input type="password" className="input" />
            </div>

            <div className="flex flex-col gap-1 my-4">
                <Link href="/lost" className="text-sm text-slate-400 font-bold">Password recovery</Link>
                <Link href="/register" className="text-sm text-slate-400 font-bold">Register</Link>
            </div>

            <button className="btn btn-secondary">Log in</button>
        </div>
    )
}