import { Router, Request, Response } from 'express';
import * as jwt from 'express-jwt';

import { AuthConfig } from '../config/auth-config';
import AdoptionRequest from '../db-models/adoption-request';

class AdoptionRequestRouter {
  router: Router;
  uploadPath = '../../uploads';

  constructor() {
    this.router = Router();
    this.init();
  }

  createAdoptionRequets(req: Request, res: Response) {
    const adoptionRequest = new AdoptionRequest(req.body);
    adoptionRequest.save(err => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json(adoptionRequest);
    });
  }

  init() {
    this.router.post('/', jwt({ secret: AuthConfig.jwtSecret }), this.createAdoptionRequets.bind(this));
  }
}
export default new AdoptionRequestRouter().router;
