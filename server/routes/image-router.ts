import { Router, Request, Response } from 'express';
import * as jwt from 'express-jwt';
import * as path from 'path';

import { AuthConfig } from '../config/auth-config';

class ImageRouter {
  router: Router;
  uploadPath = '../../uploads';

  constructor() {
    this.router = Router();
    this.init();
  }

  async getImageByName(req: Request, res: Response) {
    const filePath = path.join(__dirname, `${this.uploadPath}/${req.query.userId}/${req.query.imageName}`);
    res.sendFile(filePath);
  }

  init() {
    this.router.get('/', jwt({ secret: AuthConfig.jwtSecret }), this.getImageByName.bind(this));
  }
}
export default new ImageRouter().router;
