import NextAuth from "next-auth"
import CredentialsProvider, { CredentialInput } from "next-auth/providers/credentials"

import { User } from "next-auth"
import { prisma } from "@/db";

import bcrypt from "bcrypt"
import { Prisma } from "@prisma/client";
import { InternalUser } from "@/types/user";

interface Credentials extends Record<string, string> {
    username: string, 
    password: string,
    twofactorAuth: string
}

const nextAuth = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
                twofactorAuth: {label: 'Two-factor authentication', type: 'text'}
            },
            async authorize(credentials: Credentials, req) {
                const user: InternalUser = await prisma.user.findUnique({
                    where: {
                        username: credentials.username
                    }
                })

                if (!user) return Promise.reject(new Error("Invalid username"));

                const correctPassword = await bcrypt.compare(credentials.password, user.passwordHash);
                
                if (correctPassword) {
                    return user;
                } else return Promise.reject(new Error("Invalid password"));;
            }
        })
    ],
    pages: {
        signIn: "/login",
        signOut: "/logout",
        error: "/error"
    }
});

export { nextAuth as GET, nextAuth as POST };

