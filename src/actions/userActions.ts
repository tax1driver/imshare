'use server';

import { prisma } from "@/db";
import { getServerSession } from "next-auth/next";
import authOptions from "@/globals/authOptions";
import { createHash } from "@/globals/hash";
import { ObjectStringValidator } from "@/globals/validation";
import { APIResponse, GetFilesAPIResponse, apiError } from "@/types/apiResponse";
import { CreateUserOptions } from "@/types/user";

export async function createUser(userOptions: CreateUserOptions): Promise<APIResponse> {
    const validator = new ObjectStringValidator(userOptions);
    
    validator
        .field("username").displayName("Username").min(6).max(16).alphanumericUnderscore().end()
        .field("password").displayName("Password").min(8).end()
        .field("passwordRepeat").displayName("Repeat password").matchesString(userOptions.password).end()
        .field("email").displayName("E-mail").email().end();

    if (!validator.valid()) {
        return {
            success: false,
            errorMessage: validator.errorsDisplay()
        };
    }

    const hash = await createHash(userOptions.password);

    try {
        const u = await prisma.user.findUnique({
            where: {
                username: userOptions.username
            }
        })

        if (u) {
            return {
                success: false,
                errorMessage: ["Duplicate user name"]
            }
        }

        await prisma.user.create({
            data: {
                username: userOptions.username,
                passwordHash: hash,
                email: userOptions.email,
                dateJoined: Date.now()
            }
        });
    } catch(e) {
        console.log(e);
        return {
            success: false,
            errorMessage: ["Internal server error", e]
        }
    }

    return {
        success: true
    };
}



export async function getSession() {
    const session = await getServerSession(authOptions);
    return session;
}