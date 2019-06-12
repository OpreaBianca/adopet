import { Router, Request, Response } from 'express';
import { IncomingForm } from 'formidable';
import * as jwt from 'express-jwt';
import * as path from 'path';
import * as fs from 'fs';

import { AuthConfig } from '../config/auth-config';
import User from '../db-models/user';
import { LocalUser } from '../models/local-user.interface';

class UserRouter {
  router: Router;
  uploadPath = '../../uploads';

  constructor() {
    this.router = Router();
    this.init();
  }

  async getCurrentUser(req: Request, res: Response) {
    try {
      const users = await User.find({ _id: req.user.user._id });
      return res.json(users[0]);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const users = await User.find({ _id: req.params.id });
      return res.json(users[0]);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async updateUser(req: Request, res: Response) {
    const user: LocalUser = req.body;

    User.update({ _id: req.user.user._id }, { $set: user }, err => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json('OK');
    });
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
    this.router.get('/', jwt({ secret: AuthConfig.jwtSecret }), this.getCurrentUser.bind(this));
    this.router.get('/:id', this.getUserById.bind(this));
    this.router.put('/', jwt({ secret: AuthConfig.jwtSecret }), this.updateUser.bind(this));
    this.router.put('/image', jwt({ secret: AuthConfig.jwtSecret }), this.updateUserProfileImage.bind(this));
  }
}
export default new UserRouter().router;
