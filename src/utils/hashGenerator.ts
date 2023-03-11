import bcrypt from 'bcrypt';

export function createHash(password: string): string {
    return bcrypt.hashSync(
        password,
        bcrypt.genSaltSync(10)
    )
}

