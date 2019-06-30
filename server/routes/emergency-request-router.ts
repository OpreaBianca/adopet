import { Router, Request, Response } from 'express';
import * as jwt from 'express-jwt';

import { AuthConfig } from '../config/auth-config';
import EmergencyCase from '../db-models/emergency-case';
import { LocalEmergencyCase } from '../models/local-emergency-case.interface';

class EmergencyRequestRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  async getAllRequests(req: Request, res: Response) {
    try {
      const emergencyCases = await EmergencyCase.find();
      // { takenOverID: { $exists: false } });
      return res.json(emergencyCases);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async getRequestsByTakenOver(req: Request, res: Response) {
    try {
      const emergencyCases = await EmergencyCase.find({ takenOver: req.user.user._id })
        .sort({ creationDate: -1 });
      return res.json(emergencyCases);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  createEmergencyRequest(req: Request, res: Response) {
    const localRequest: LocalEmergencyCase = req.body;

    const emergencyCase = new EmergencyCase(localRequest);
    emergencyCase.save(err => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json(emergencyCase);
    });
  }

  updateEmergencyRequest(req: Request, res: Response) {
    const localRequest: LocalEmergencyCase = req.body;

    EmergencyCase.update({ _id: localRequest._id }, { $set: localRequest }, err => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json(localRequest);
    });
  }


  init() {
    this.router.get('/', jwt({ secret: AuthConfig.jwtSecret }), this.getRequestsByTakenOver.bind(this));
    this.router.get('/all', this.getAllRequests.bind(this));
    this.router.post('/', this.createEmergencyRequest.bind(this));
    this.router.put('/', this.updateEmergencyRequest.bind(this));
  }
}
export default new EmergencyRequestRouter().router;
