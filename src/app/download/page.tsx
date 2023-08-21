export default function Page() {
    return (
        <div className="card transition">
            <span className="text-2xl font-medium mx-auto mb-8">Download file</span>
            
            <div className="flex flex-col gap-2">
                <span className="text-sm">File words</span>
                <div className="flex flex-row gap-2">
                    <input type="text" className="input w-1/3" />
                    <input type="text" className="input w-1/3" />
                    <input type="text" className="input w-1/3" />
                </div>
                
            </div>

            <div className="flex flex-col gap-2">
                <span className="text-sm">Password <span className="font-light">(if needed)</span></span>
                <input type="password" className="input" />
            </div>

            <span className="text-sm">You can also download files via <b>QR code</b> or <b>link</b> if provided.</span>

            <button className="btn btn-secondary mt-8">Submit</button>

        </div>
    )
}