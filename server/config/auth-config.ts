import * as jwt from 'jsonwebtoken';

export class AuthConfig {
  static jwtSecret = 'ADOPeT';

  static constructUserToken(user: any): string {
    return jwt.sign({ user: user }, this.jwtSecret, { expiresIn: 60 * 60 * 12 });
  }
}
