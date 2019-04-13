import * as express from 'express';
import * as path from 'path';
import IndexRouter from './routes';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.config();
    this.api();
    this.setRoutes();
  }

  public config(): void {
    this.express.use(express.static(path.join(__dirname, '../public')));
  }

  public api(): void {
    this.express.use('/api/v1', IndexRouter);
  }

  public setRoutes(): void {
    this.express.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });
  }
}
export default new App().express;
