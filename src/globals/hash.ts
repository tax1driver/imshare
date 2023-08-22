import bcrypt from 'bcrypt'

export async function createHash(str: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(str, salt);
}