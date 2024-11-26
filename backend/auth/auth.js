const express = require('express');
const passport = require('passport');
const session = require ('express-session');
const GoogleStrategy = require ('passport-google-oauth20').Strategy;
require('dotenv').config();

const router = express.Router();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails[0].value,
                    photo: profile.photos[0].value,
                };
                return done(null, user);
            } catch(error) {
                console.error('Error in Google OAuth callback', error);
                return done (error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

router.use(
    session({
        secret: process.env.SESSION_SECRET || 'secret',
        resave: false,
        saveUninitialized: false,
    })
);

router.use(passport.initialize());
router.use(passport.session());

router.get('/google', passport.authenticate('google', { scope: ['openid', 'profile', 'email'] }));

router.get(
    '/google/callback',
    passport.authenticate('google', { failterRedirect: '/' }),
    (req, res) => {
        res.redirect('/dashboard');
    }
);

router.get('status', (req, res) => {
    is (req.isAuthenticated()) {
        res.json({ authenticated: true, user: req.user });
    } else {
        res.json({ authenticated: false });
    }
});

router.get(/'logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
});

module.exports = router;