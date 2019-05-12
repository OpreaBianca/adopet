import { Router } from 'express';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';

import { setupSignUpStrategy, setupLoginStrategy } from '../config/passport-strategy';

class AuthRouter {
  jwtSecret = 'ADOPeT';
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private constructUserToken(user: any): string {
    return jwt.sign({ user: user }, this.jwtSecret, { expiresIn: 60 * 60 * 12 });
  }

  private init() {
    this.router.post('/sign-up', (req, res, next) => {
      setupSignUpStrategy(passport);
      passport.authenticate('sign-up', { session: false }, async (err: any, user: any, info: any) => {
        if (err) {
          return res.status(500).json(err);
        }

        if (!user) {
          // 409: Conflict - Duplicate user
          return res.status(409).json(info);
        } else {
          res.json({ token: this.constructUserToken(user) });
        }
      })(req, res, next)
    });

    this.router.post('/login', (req, res, next) => {
      setupLoginStrategy(passport);
      passport.authenticate('login', { session: false }, async (err: any, user: any, info: any) => {
        if (err) {
          return res.status(500).json(err);
        }

        if (!user) {
          // 403: Forbidden - Wrong email or password
          return res.status(403).json(info);
        }

        if (user) {
          return res.json({ token: this.constructUserToken(user) });
        }
      })(req, res, next)
    });
  }
}
export default new AuthRouter().router;
