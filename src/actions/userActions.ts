'use server';

import { ObjectStringValidator } from "@/globals/validation";
import { CreateUserOptions } from "@/types/user";

export default async function createUser(userOptions: CreateUserOptions) {
    const validator = new ObjectStringValidator(userOptions);
    
    validator
        .field("username").displayName("Username").min(6).max(16).alphanumericUnderscore().end()
        .field("password").displayName("Password").min(8).end()
        .field("email").displayName("E-mail").email().end();

    
    

}