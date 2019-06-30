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

  async getAllPets(req: Request, res: Response) {
    try {
      const pets = await Pet.find({ $or: [{ status: 'Placed for adoption/foster' }, { status: 'Looking for the owner' }] })
        .sort({ creationDate: -1 });
      return res.json(pets);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async getPetsByOwner(req: Request, res: Response) {
    try {
      const pets = await Pet.find({ ownerID: req.user.user._id })
        .sort({ creationDate: -1 });
      return res.json(pets);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async getFavoritePets(req: Request, res: Response) {
    try {
      const pets = await Pet.find({ favorites: { $all: [req.user.user._id] } })
        .sort({ creationDate: -1 });
      return res.json(pets);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  insertOrUpdatePet(req: Request, res: Response) {
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
    });
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

    Pet.update({ _id: localPet._id }, { $set: localPet }, err => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json(localPet);
    });
  }

  updatePetFavorites(req: Request, res: Response) {
    const localPet: LocalPet = req.body;

    Pet.update({ _id: localPet._id }, { $set: { favorites: localPet.favorites } }, err => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json('OK');
    });
  }

  deletePet(req: Request, res: Response) {
    const filesPath = path.join(__dirname, `${this.uploadPath}/${req.user.user._id}`);
    const localPet: LocalPet = JSON.parse(req.query.pet);

    Pet.remove({ _id: localPet._id }, err => {
      if (err) {
        return res.status(500).json(err);
      }
      localPet.images.forEach((imageName: string) => {
        fs.unlinkSync(`${filesPath}/${imageName}`);
      });

      return res.json('OK');
    });
  }

  init() {
    this.router.get('/', jwt({ secret: AuthConfig.jwtSecret }), this.getPetsByOwner.bind(this));
    this.router.get('/all', this.getAllPets.bind(this));
    this.router.get('/favorites', jwt({ secret: AuthConfig.jwtSecret }), this.getFavoritePets.bind(this));
    this.router.post('/', jwt({ secret: AuthConfig.jwtSecret }), this.insertOrUpdatePet.bind(this));
    this.router.put('/', jwt({ secret: AuthConfig.jwtSecret }), this.insertOrUpdatePet.bind(this));
    this.router.put('/favorites', jwt({ secret: AuthConfig.jwtSecret }), this.updatePetFavorites.bind(this));
    this.router.delete('/', jwt({ secret: AuthConfig.jwtSecret }), this.deletePet.bind(this));
  }
}
export default new PetRouter().router;
