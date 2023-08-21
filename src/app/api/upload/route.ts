import uploadFile from "@/actions/uploadFile";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const form = await request.formData();

    if (form == null || !form.has("file")) return;

    return NextResponse.json(await uploadFile(form));
}