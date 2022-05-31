import express from 'express'
import passport from 'passport';
import { onlinePublish } from '../../resolvers/users';
import { createToken } from './../../utils/token';
import {pubsub, prisma } from '../../index'

const router = express.Router();

router.get('/google/login', passport.authenticate('google', {
    scope: ['email', 'profile'],
    session: false 
}));

router.get('/google/callback', (req, res, next) => {
    passport.authenticate(
        'google', {
            session: false
            // successRedirect: URL,
            // failureRedirect: '../login/failed',
            // failureMessage: true, // don't work
        }, 
        async (err, user, info) => {
            let errorMessage = ''; let token = '';
            if (err) errorMessage = err.message; // with errorCode from prisma
            else if (!user) errorMessage = info.message;
            else {
                const id = user.id;       
                token = createToken({ id }).token;
                // res.cookie('tokenOauth', token);
                await onlinePublish({ pubsub, prisma, userId: null }, id, null)
            }
            res.redirect(`${process.env.CORS_ORIGIN}/oauth2Login`+
                `?error=${errorMessage}&token=${token}`);   
        }
    )(req, res, next)
});

export default router;