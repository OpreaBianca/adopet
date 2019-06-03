import { Router } from 'express';
import * as passport from 'passport';

import { setupSignUpStrategy, setupLoginStrategy } from '../config/passport-strategy';
import { AuthConfig } from '../config/auth-config';

class AuthRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
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
          res.json({ token: AuthConfig.constructUserToken(user) });
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
          return res.json({ token: AuthConfig.constructUserToken(user) });
        }
      })(req, res, next)
    });
  }
}
export default new AuthRouter().router;
