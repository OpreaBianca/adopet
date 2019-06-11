import { Router, Request, Response } from 'express';
import { IncomingForm } from 'formidable';
import * as jwt from 'express-jwt';
import * as path from 'path';
import * as fs from 'fs';

import { AuthConfig } from '../config/auth-config';
import User from '../db-models/user';

class UserRouter {
  router: Router;
  uploadPath = '../../uploads';

  constructor() {
    this.router = Router();
    this.init();
  }

  async getUserById(req: Request, res: Response) {
    try {
      const users = await User.find({ _id: req.params.id });
      return res.json(users[0]);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async getUserProfileImage(req: Request, res: Response) {
    try {
      const users = await User.find({ _id: req.params.id });

      const filePath = path.join(__dirname, `${this.uploadPath}/${users[0]._id}/${users[0].profileImage}`);
      res.sendFile(filePath);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  updateUserProfileImage(req: Request, res: Response) {
    const filesPath = path.join(__dirname, `${this.uploadPath}/${req.user.user._id}`);
    if (!fs.existsSync(filesPath)) {
      fs.mkdirSync(filesPath);
    }

    const form = new IncomingForm();
    form.uploadDir = filesPath;
    form.keepExtensions = true;

    let image: string = '';

    form.on('fileBegin', (name, file) => {
      const uploadName = `${Date.now()}_${file.name}`;
      file.path = path.join(form.uploadDir, uploadName);
      image = uploadName;
    });

    form.on('error', (err) => {
      return res.status(500).json(err);
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json(err);
      }

      User.update({ _id: req.user.user._id }, { $set: { profileImage: image } }, err => {
        if (err) {
          return res.status(500).json(err);
        }
        return res.json('OK');
      });
    });
  }

  init() {
    this.router.get('/:id', this.getUserById.bind(this));
    this.router.get('/image/:id', this.getUserProfileImage.bind(this));
    this.router.put('/', jwt({ secret: AuthConfig.jwtSecret }), this.updateUserProfileImage.bind(this));
  }
}
export default new UserRouter().router;
