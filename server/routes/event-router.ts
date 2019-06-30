import { Router, Request, Response } from 'express';
import { IncomingForm } from 'formidable';
import * as jwt from 'express-jwt';
import * as path from 'path';
import * as fs from 'fs';

import { AuthConfig } from '../config/auth-config';
import { LocalEvent } from '../models/local-event.interface';
import Event from '../db-models/event';

class EventRouter {
  router: Router;
  uploadPath = '../../uploads';

  constructor() {
    this.router = Router();
    this.init();
  }

  async getAllEvents(req: Request, res: Response) {
    try {
      const events = await Event.find({ date: { $gte: new Date() } })
        .sort({ date: 1 });
      return res.json(events);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async getEventsByCreator(req: Request, res: Response) {
    try {
      const events = await Event.find({ creatorID: req.user.user._id })
        .sort({ date: -1 });
      return res.json(events);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  insertEvent(req: Request, res: Response) {
    const filesPath = path.join(__dirname, `${this.uploadPath}/${req.user.user._id}`);
    if (!fs.existsSync(filesPath)) {
      fs.mkdirSync(filesPath);
    }

    const form = new IncomingForm();
    form.uploadDir = filesPath;
    form.keepExtensions = true;

    let image: string = ''

    form.on('fileBegin', (name, file) => {
      const uploadName = `${Date.now()}_${file.name}`;
      file.path = path.join(form.uploadDir, uploadName);
      image = uploadName;
    });

    form.on('error', (err) => {
      return res.status(500).json(err);
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json(err);
      }

      const localEvent: LocalEvent = JSON.parse(fields.event);
      localEvent.creatorID = req.user.user._id;
      localEvent.image = image;

      const event = new Event(localEvent);
      event.save(err => {
        if (err) {
          return res.status(500).json(err);
        }
        return res.json(event);
      });
    });
  }

  deleteEvent(req: Request, res: Response) {
    const filesPath = path.join(__dirname, `${this.uploadPath}/${req.user.user._id}`);
    const localEvent: LocalEvent = JSON.parse(req.query.event);

    Event.remove({ _id: localEvent._id }, err => {
      if (err) {
        return res.status(500).json(err);
      }

      if (localEvent.image !== '') {
        fs.unlinkSync(`${filesPath}/${localEvent.image}`);
      }

      return res.json('OK');
    });
  }

  init() {
    this.router.get('/', jwt({ secret: AuthConfig.jwtSecret }), this.getEventsByCreator.bind(this));
    this.router.get('/all', this.getAllEvents.bind(this));
    this.router.post('/', jwt({ secret: AuthConfig.jwtSecret }), this.insertEvent.bind(this));
    this.router.delete('/', jwt({ secret: AuthConfig.jwtSecret }), this.deleteEvent.bind(this));
  }
}
export default new EventRouter().router;
