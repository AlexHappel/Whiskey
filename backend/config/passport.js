const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
});

paspport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(
    new GoogleStrategy(
        {
            clientID: provess.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_UR,
        },
        (accessToken, refreshToken, profile, done) => {
            const user = {
                googleID: profile.id,
                displayName: profile.displayName,
                email: profile.emails[0].value,
                photo: profile.photos[0].value,
            };

            done(null, user);
        }
    )
);