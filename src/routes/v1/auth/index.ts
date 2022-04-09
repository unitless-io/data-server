import passport from 'passport';
import { Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth2';
import express from 'express';

const authRouter = express.Router();

import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_DOMAIN } from '@app/config';
import { UserDocument } from '@app/types';
import { User } from '@app/db';

passport.serializeUser((user, done) => {
  // @ts-ignore
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findOne<UserDocument>({ _id: id }, {}, { lean: true }).exec();
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${GOOGLE_REDIRECT_DOMAIN}/api/v1/auth/google/callback`,
      passReqToCallback: true,
    },
    async (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
      try {
        const user = await User.findOneAndUpdate<UserDocument>(
          {
            id: profile.id,
            email: profile._json.email,
            family_name: profile._json.family_name,
            given_name: profile._json.given_name,
            verified_email: profile._json.email_verified,
          },
          {},
          {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
            lean: true,
          }
        ).exec();
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

/** api/v1/auth/google */
authRouter.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

/** api/v1/auth/google/callback */
authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${GOOGLE_REDIRECT_DOMAIN}/login-error`,
    successRedirect: `${GOOGLE_REDIRECT_DOMAIN}/app`,
  })
);

/** api/v1/auth/log-out?backUrl=http://.... */
authRouter.get('/log-out', (req, res) => {
  req.logout();
  res.redirect(302, (req.query.backUrl as string) || `${GOOGLE_REDIRECT_DOMAIN}/`);
});

export { passport };

export default authRouter;
