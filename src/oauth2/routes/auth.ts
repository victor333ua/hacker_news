import express from 'express'
import passport from 'passport';
import { onlinePublish } from '../../modules/user/users';
import { createToken } from './../../utils/token';
import {pubsub, prisma } from '../../index'

const router = express.Router();

const cb = async (res: any, err: any, user: {id: number}, info: any) => {
    let errorMessage = ''; let token = '';
    if (err) errorMessage = err.message; // with errorCode from prisma
    else if (!user) errorMessage = info.message;
    else {
        const id = user.id;       
        token = createToken(id);
        // res.cookie('tokenOauth', token);
        await onlinePublish({ pubsub, prisma, userId: null }, id, null);
    }
    res.redirect(`${process.env.CORS_ORIGIN}/oauth2Login`+
        `?error=${errorMessage}&token=${token}`);   
};  

router.get('/oauth2/google/login', passport.authenticate('google', {
    scope: ['email', 'profile'],
    session: false 
}));

router.get(process.env.GOOGLE_URI_REDIRECT as string, (req, res, next) => {
    passport.authenticate(
        'google', {
            session: false
            // successRedirect: URL,
            // failureRedirect: '../login/failed',
            // failureMessage: true, // don't work
        }, 
        (err, user, info) => {
            (async () => await cb(res, err, user, info))();
        }        
    )(req, res, next)
});

router.get('/oauth2/github/login', passport.authenticate('github', {
    scope: ['user:email', 'read:user'],
    session: false 
}));

router.get(process.env.GITHUB_URI_REDIRECT as string, (req, res, next) => {
    passport.authenticate('github', {
            session: false
        }, 
        (err, user, info) => {
            (async () => await cb(res, err, user, info))();
        }        
    )(req, res, next)
});

export default router;