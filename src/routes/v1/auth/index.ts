import passport from 'passport';
import { Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth2';
import express from 'express';

const authRouter = express.Router();

import { APP_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_DOMAIN } from '@app/config';
import { UserDocument } from '@app/types';
import { User } from '@app/db';
import { getToken } from '@app/helpers';

passport.serializeUser((user, done) => {
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
    },
    async (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
      try {
        let user = await User.findOneAndUpdate<UserDocument>(
          {
            googleId: profile.id,
          },
          {
            googleId: profile.id,
            google: {
              ...profile._json,
              accessToken,
              refreshToken,
            },
          },
          {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
            lean: true,
          }
        ).exec();

        if (!user.appToken) {
          user = await User.findOneAndUpdate<UserDocument>(
            { _id: user._id },
            { appToken: await getToken() },
            { lean: true, new: true, upsert: true }
          ).exec();
        }
        done(null, user);
      } catch (error) {
        console.error(error);
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
    failureRedirect: `${APP_URL}/login-error`,
    successRedirect: `${APP_URL}/app`,
  })
);

/** api/v1/auth/log-out?backUrl=http://.... */
authRouter.get('/log-out', (req, res) => {
  req.logout();
  res.redirect(302, (req.query.backUrl as string) || `${APP_URL}/`);
});

export { passport };

export default authRouter;
