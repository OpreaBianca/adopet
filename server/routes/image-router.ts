import { Router, Request, Response } from 'express';
import * as path from 'path';

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
    this.router.get('/', this.getImageByName.bind(this));
  }
}
export default new ImageRouter().router;
