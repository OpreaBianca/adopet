import { Router, Request, Response } from 'express';
import * as jwt from 'express-jwt';

import { AuthConfig } from '../config/auth-config';
import { LocalAdoptionRequest } from '../models/local-adoption-request.interface';
import AdoptionRequest from '../db-models/adoption-request';

const mongoose = require('mongoose');

class AdoptionRequestRouter {
  router: Router;
  uploadPath = '../../uploads';

  constructor() {
    this.router = Router();
    this.init();
  }

  async getReceivedRequests(req: Request, res: Response) {
    try {
      const adoptionRequests = await AdoptionRequest.find({ owner: req.user.user._id })
        .populate({ path: "pet" })
        .populate({ path: "owner", select: "name email phone" })
        .populate({ path: "adopter", select: "name email phone" });
      return res.json(adoptionRequests);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async getSentRequests(req: Request, res: Response) {
    try {
      const adoptionRequests = await AdoptionRequest.find({ adopter: req.user.user._id })
        .populate({ path: "pet" })
        .populate({ path: "owner", select: "name email phone" })
        .populate({ path: "adopter", select: "name email phone" });
      return res.json(adoptionRequests);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  createAdoptionRequets(req: Request, res: Response) {
    const localRequest: LocalAdoptionRequest = req.body;

    const adoptionRequest = new AdoptionRequest({
      pet: mongoose.Types.ObjectId(localRequest.petID),
      owner: mongoose.Types.ObjectId(localRequest.ownerID),
      adopter: mongoose.Types.ObjectId(localRequest.adopterID),
      requestMessage: localRequest.requestMessage,
      requestStatus: localRequest.requestStatus
    });

    adoptionRequest.save(err => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json(adoptionRequest);
    });
  }

  init() {
    this.router.get('/received', jwt({ secret: AuthConfig.jwtSecret }), this.getReceivedRequests.bind(this));
    this.router.get('/sent', jwt({ secret: AuthConfig.jwtSecret }), this.getSentRequests.bind(this));
    this.router.post('/', jwt({ secret: AuthConfig.jwtSecret }), this.createAdoptionRequets.bind(this));
  }
}
export default new AdoptionRequestRouter().router;
