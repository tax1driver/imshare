export interface ClientUser {
    id: string,
    username: string,
    dateJoined: number
};

export interface InternalUser extends ClientUser {
    passwordHash: string,
    email: string
}

export interface CreateUserOptions extends Record<string, string> {
    username: string,
    password: string,
    passwordRepeat: string,
    email: string
}