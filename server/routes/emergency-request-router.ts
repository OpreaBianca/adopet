import { Router, Request, Response } from 'express';
import * as jwt from 'express-jwt';
import * as webpush from 'web-push';

import { AuthConfig } from '../config/auth-config';
import EmergencyCase from '../db-models/emergency-case';
import User from '../db-models/user';
import { LocalEmergencyCase } from '../models/local-emergency-case.interface';
import { LocalUser } from '../models/local-user.interface';

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
      const emergencyCases = await EmergencyCase.find({ takenOverID: req.user.user._id })
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

      this.sendNotifications(emergencyCase);

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

  private async sendNotifications(emergencyCase: LocalEmergencyCase) {
    const payload = {
      notification: {
        title: `Emergency reported at: ${emergencyCase.address}`,
        body: emergencyCase.description
      }
    }

    try {
      const users = await User.find({ subscription: { $exists: true, $ne: null } });
      users.forEach((user: LocalUser) => {
        webpush.sendNotification(user.subscription, JSON.stringify(payload))
          .then(res => console.log(res))
          .catch(err => console.log(err));
      });

    } catch (err) {
      console.log(err);
    }
  }

  init() {
    this.router.get('/', jwt({ secret: AuthConfig.jwtSecret }), this.getRequestsByTakenOver.bind(this));
    this.router.get('/all', this.getAllRequests.bind(this));
    this.router.post('/', this.createEmergencyRequest.bind(this));
    this.router.put('/', this.updateEmergencyRequest.bind(this));
  }
}
export default new EmergencyRequestRouter().router;
