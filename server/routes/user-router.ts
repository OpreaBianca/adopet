import { Router, Request, Response } from 'express';

import User from '../db-models/user';

class UserRouter {
  router: Router;

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

  init() {
    this.router.get('/:id', this.getUserById.bind(this));
  }
}
export default new UserRouter().router;
