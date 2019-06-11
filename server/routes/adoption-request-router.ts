import { Router, Request, Response } from 'express';
import * as jwt from 'express-jwt';

import { AuthConfig } from '../config/auth-config';
import { LocalAdoptionRequest } from '../models/local-adoption-request.interface';
import AdoptionRequest from '../db-models/adoption-request';
import Pet from '../db-models/pet';
import { Message } from '../models/message.interface';
import { request } from 'https';

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
        .sort({ creationDate: -1 })
        .populate({ path: 'pet' })
        .populate({ path: 'owner', select: 'name email phone address' })
        .populate({ path: 'adopter', select: 'name email phone address' });
      return res.json(adoptionRequests);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async getSentRequests(req: Request, res: Response) {
    try {
      const adoptionRequests = await AdoptionRequest.find({ adopter: req.user.user._id })
        .sort({ creationDate: -1 })
        .populate({ path: 'pet' })
        .populate({ path: 'owner', select: 'name email phone address' })
        .populate({ path: 'adopter', select: 'name email phone address' });
      return res.json(adoptionRequests);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  createAdoptionRequest(req: Request, res: Response) {
    const localRequest: LocalAdoptionRequest = req.body;

    const adoptionRequest = new AdoptionRequest({
      pet: mongoose.Types.ObjectId(localRequest.petID),
      owner: mongoose.Types.ObjectId(localRequest.ownerID),
      adopter: mongoose.Types.ObjectId(localRequest.adopterID),
      requestMessage: localRequest.requestMessage,
      requestStatus: localRequest.requestStatus,
      creationDate: localRequest.creationDate,
      messages: localRequest.messages
    });

    adoptionRequest.save(err => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json(adoptionRequest);
    });
  }

  addRequestMessage(req: Request, res: Response) {
    const message: Message = req.body;

    AdoptionRequest.findOneAndUpdate({ _id: req.params.id }, { $push: { messages: message } }, { new: true }, (err, request) => {
      if (err) {
        return res.status(500).json(err);
      }
      const len = request.messages.length;
      return res.json(request.messages[len - 1]);
    });
  }

  updateRequestStatus(req: Request, res: Response) {
    const request: any = req.body;

    AdoptionRequest.update({ _id: request._id }, { $set: { requestStatus: request.requestStatus } }, err => {
      if (err) {
        return res.status(500).json(err);
      }
      this.updatePet(request, res);
    });
  }

  private updatePet(request: any, res: Response) {
    if (request.requestStatus === 'Accepted') {
      if (request.pet.status === 'Placed for adoption/foster') {
        request.pet.status = 'Adopted';
        request.pet.adopter = request.adopter;
        request.pet.adopter.otherDetails = 'Adopted through the application. Find more details on the adoption requests page.'
      }

      if (request.pet.status === 'Looking for the owner') {
        request.pet.status = 'Returned to owner';
        request.pet.adopter = request.adopter;
        request.pet.adopter.otherDetails = 'Returned to the owner through the application. Find more details on the adoption requests page.'
      }
    }

    Pet.update({ _id: request.pet._id }, {
      $set: {
        status: request.pet.status,
        adopter: request.pet.adopter
      }
    }, err => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json(request);
    });
  }

  init() {
    this.router.get('/received', jwt({ secret: AuthConfig.jwtSecret }), this.getReceivedRequests.bind(this));
    this.router.get('/sent', jwt({ secret: AuthConfig.jwtSecret }), this.getSentRequests.bind(this));
    this.router.post('/', jwt({ secret: AuthConfig.jwtSecret }), this.createAdoptionRequest.bind(this));
    this.router.put('/:id', jwt({ secret: AuthConfig.jwtSecret }), this.addRequestMessage.bind(this))
    this.router.put('/', jwt({ secret: AuthConfig.jwtSecret }), this.updateRequestStatus.bind(this));
  }
}
export default new AdoptionRequestRouter().router;
