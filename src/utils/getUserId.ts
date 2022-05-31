import { verifyToken } from './token';

export const getUserId = (auth: string | null) => { 
    let userId = null;   
    if (auth?.includes('Bearer')) {
        const token = auth.replace('Bearer ', '');
        if (token === 'undefined') return null;
        try {  
            userId = verifyToken(token)?.userId;
        } catch (err: any) {
            console.log('verify token error: ', err.message)
        }
    }
    return userId;
};