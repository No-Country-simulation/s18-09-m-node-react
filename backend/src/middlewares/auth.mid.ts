import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';

import { User } from '../entity.users/model';
import { JWT_SECRET } from '../config/environment';

passport.use(
  'userJWT',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      try {
        if (!payload._id) {
          return done(null, false);
        }
        return done(null, payload);
      } catch (error: any) {
        return done(error);
      }
    }
  )
);

passport.use(
  'adminJWT',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findOne({ _id: payload._id }).exec();
        if (!user || user.role !== 'ADMIN') {
          return done(null, false);
        }
        return done(null, user);
      } catch (error: any) {
        return done(error);
      }
    }
  )
);

export const generateToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });
}


export default passport;
