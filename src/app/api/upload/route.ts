import { NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache"
import { uploadFile } from "@/actions/fileActions";

export async function POST(request: Request) {
    const form = await request.formData();

    if (form == null || !form.has("file")) return;


    return NextResponse.json(await uploadFile(form));
}