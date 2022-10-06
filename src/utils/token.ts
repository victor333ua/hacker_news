import jwt, { JwtPayload } from 'jsonwebtoken';

export const createToken = (id: number): string => {
    const token = jwt.sign(
        { userId: id },
        process.env.TOKEN_SECRET as string,
        { expiresIn: "3 days" }
    );
    return token;
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
