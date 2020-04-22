import * as express from 'express';
import * as path from 'path';
import * as passport from 'passport';
import * as bodyParser from 'body-parser';
import * as expressSession from 'express-session';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as webpush from 'web-push';

import IndexRouter from './routes';

const mongoose = require('mongoose');

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.config();
    this.api();
    this.setRoutes();
    this.connectToDb();
  }

  public config(): void {
    this.express.use(express.static(path.join(__dirname, '../../adopet/dist/adopet/')));
    //this.express.use(express.static(path.join(__dirname, '../public')));
    this.express.use(cors());
    this.express.use(cookieParser());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(expressSession({ secret: 'shh', resave: true, saveUninitialized: false }));
    this.express.use(passport.initialize());
    this.express.use(passport.session());

    webpush.setVapidDetails(
      'http://localhost:3000',
      // 'mailto:bianca.oprearand@gmail.com',
      'BO96fFlC_JWjliSJ8KbIvU-juIecaSkKus27FBrDsSF8pctCQ4JdE3spcM2xH7hC7Qr5lAGIWZ8VRvYhHMn_uTQ',
      '91zgm9Bh_nc3wMvNYpGhZKeEiaJjVplMWftkupf1AR8'
    )
  }

  public api(): void {
    this.express.use('/api/v1', IndexRouter);
  }

  public setRoutes(): void {
    this.express.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../../adopet/dist/adopet/index.html'));
      // res.sendFile(path.join(__dirname, '../public/index.html'));
    });
  }

  public connectToDb() {
    mongoose.connect('mongodb://adopet:adopet1234@ds155396.mlab.com:55396/adopet', { useNewUrlParser: true }, err => {
      if (err) {
        console.log('Mongoose connection failed: ' + err);
      } else {
        console.log('The Mongoose connection is ready');
      }
    });
  }
}
export default new App().express;
