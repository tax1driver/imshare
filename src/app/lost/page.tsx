export default function Page() {
    return (
        <div className="card transition">
            <span className="text-2xl font-medium mx-auto mb-8">Password recovery</span>

            <div className="flex flex-col gap-2">
                <span className="text-sm">Username or email</span>
                <input type="text" className="input" />
            </div>

            <button className="btn btn-secondary mt-8">Reset password</button>
        </div>
    )
}