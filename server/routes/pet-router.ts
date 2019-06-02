import { Router, Request, Response } from 'express';
import { IncomingForm } from 'formidable';
import * as path from 'path';
import * as fs from 'fs';

class PetRouter {
  uploadPath = '../../uploads';
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  async addPet(req: Request, res: Response) {
    let uploadName: string;

    const form = new IncomingForm();
    form.uploadDir = path.join(__dirname, `${this.uploadPath}/`);
    form.keepExtensions = true;

    form.on('fileBegin', (name, file) => {
      console.log(file, name);
      // uploadName = `${Date.now()}_${file.name}`;
      // file.path = path.join(form.uploadDir, uploadName);
    });

    form.on('error', (err) => {
      // logger.error('UploadFile' + err.message);
      // res.status(500).json(err);
      console.log(err);
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        // logger.error('UploadParseFile' + err.message);
        // res.status(500).json(err);
        console.log(err);
      }
      console.log(files, fields);
      // const file = await this.fileManagement.insertFile(fields, files, uploadName, res);
      // if (file) {
      //   const stakeholders = await this.stakeholderManagement.insertStakeholders(JSON.parse(fields.stakeholders), [file], res);
      //   if (stakeholders) {
      //     const threads: Thread[] = this.fileDetailsAggregator.setFilesPerThread([file], stakeholders);
      //     const message: Message = new UpdateMessage(fileAction.upload);
      //     await this.fileMailSender.sendFileUpdateMail(threads[0], message, res);
      //     await this.mailScheduler.scheduleEmails(threads[0]);
      //   }
      // }
    });
  }

  init() {
    this.router.post('/', this.addPet.bind(this));
  }
}
export default new PetRouter().router;
