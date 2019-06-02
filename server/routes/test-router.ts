import { Router, Request, Response } from 'express';

class TestRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  async getTest(req: Request, res: Response) {
    res.json('Hello World of ADOPeT!');
  }

  init() {
    this.router.get('/', this.getTest.bind(this));
  }
}
export default new TestRouter().router;
