import { User } from '.prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';


export const createToken = (user: User | { id: number }) => {
    const token = jwt.sign(
        { userId: user.id },
        process.env.TOKEN_SECRET as string,
        { expiresIn: "3 days" }
    );
    return { token, user };
};

export const verifyToken = (token: string) => {
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.TOKEN_SECRET as string) as JwtPayload;
    } catch(err: any) {
        throw new Error(err.message);
    }
    return decoded;
};
