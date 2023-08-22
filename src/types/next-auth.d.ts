import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface User {
        username: string,
        id: string,
        dateJoined: number
    }

    interface Session {
        user: User
    }
}

declare module "next-auth/jwt" {
    interface JWT  {
        user: User
    }
}