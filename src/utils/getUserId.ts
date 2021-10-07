import { verifyToken } from './token.js';
import { Request } from  "express";

export const getUserId = (req: Request) => {
    const authHeader = req.headers.authorization;
    let token = null;
    if (authHeader?.includes('Bearer'))
        token = authHeader.replace('Bearer ', '');
    if (!token) return null;
    
    const { userId } = verifyToken(token);
    return userId;
};