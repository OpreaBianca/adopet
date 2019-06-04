import { Router, Request, Response } from 'express';
import { IncomingForm } from 'formidable';
import * as jwt from 'express-jwt';
import * as path from 'path';
import * as fs from 'fs';

import { AuthConfig } from '../config/auth-config';
import { LocalPet } from '../models/local-pet.interface';
import Pet from '../db-models/pet';

class PetRouter {
  router: Router;
  uploadPath = '../../uploads';

  constructor() {
    this.router = Router();
    this.init();
  }

  async getPetsByOwner(req: Request, res: Response) {
    try {
      const pets = await Pet.find({ ownerID: req.user.user._id });
      return res.json(pets);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  insertOrUpdate(req: Request, res: Response) {
    const filesPath = path.join(__dirname, `${this.uploadPath}/${req.user.user._id}`);
    if (!fs.existsSync(filesPath)) {
      fs.mkdirSync(filesPath);
    }

    const form = new IncomingForm();
    form.uploadDir = filesPath;
    form.keepExtensions = true;

    const images: string[] = [];

    form.on('fileBegin', (name, file) => {
      const uploadName = `${Date.now()}_${file.name}`;
      file.path = path.join(form.uploadDir, uploadName);
      images.push(uploadName);
    });

    form.on('error', (err) => {
      return res.status(500).json(err);
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json(err);
      }

      const localPet: LocalPet = JSON.parse(fields.pet);
      localPet.ownerID = req.user.user._id;

      req.route.methods.put ? this.update(localPet, images, fields, filesPath, res)
        : this.insert(localPet, images, res);
    });
  }

  private insert(localPet: LocalPet, images: string[], res: Response) {
    // add new photos
    localPet.images = images;

    const pet = new Pet(localPet);
    pet.save(err => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json(pet);
    })
  }

  private update(localPet: LocalPet, images: string[], fields: any, filesPath: string, res: Response) {
    // add new photos
    localPet.images = localPet.images.concat(images);

    // delete removed photos
    const removed: string[] = JSON.parse(fields.removed);
    removed.forEach((imageName: string) => {
      const imgIdx = localPet.images.indexOf(imageName);
      if (imgIdx !== -1) {
        localPet.images.splice(imgIdx, 1);
        fs.unlinkSync(`${filesPath}/${imageName}`);
      }
    });

    try {
      Pet.updateOne({ _id: localPet._id }, localPet);
      return res.json(localPet);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  init() {
    this.router.get('/', jwt({ secret: AuthConfig.jwtSecret }), this.getPetsByOwner.bind(this));
    this.router.post('/', jwt({ secret: AuthConfig.jwtSecret }), this.insertOrUpdate.bind(this));
    this.router.put('/', jwt({ secret: AuthConfig.jwtSecret }), this.insertOrUpdate.bind(this));
  }
}
export default new PetRouter().router;
