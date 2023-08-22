import CredentialsProvider from "next-auth/providers/credentials"

import { Account, AuthOptions, Session, User } from "next-auth"
import { prisma } from "@/db";

import bcrypt from "bcrypt"
import { Prisma } from "@prisma/client";
import { ClientUser, InternalUser } from "@/types/user";
import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt";

export interface Credentials extends Record<string, string> {
    username: string,
    password: string,
    twofactorAuth: string
}


const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
                twofactorAuth: { label: 'Two-factor authentication', type: 'text' }
            },
            async authorize(credentials: Credentials, req): Promise<ClientUser> {
                const user: InternalUser = await prisma.user.findUnique({
                    where: {
                        username: credentials.username
                    }
                })

                if (!user) throw new Error("Invalid username");

                const correctPassword = await bcrypt.compare(credentials.password, user.passwordHash);

                if (correctPassword) {
                    //console.log(user)
                    return {
                        username: user.username,
                        dateJoined: user.dateJoined,
                        id: user.id,
                    };
                } else throw new Error("Invalid password");
            }
        })
    ],
    pages: {
        signIn: "/login",
        signOut: "/logout",
        error: "/error",
    },
    callbacks: {
        async session({session, token}) {
            session.user = token.user;
            return session;
        },
        async jwt({token, user, account}) {
            if (user) token.user = user;
            return token;
        },
    }
}

export default authOptions;