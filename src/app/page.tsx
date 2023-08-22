import authOptions from "@/globals/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const authorized = await getServerSession(authOptions);
    if (!authorized) redirect("/login");
    else redirect("/upload");
}
