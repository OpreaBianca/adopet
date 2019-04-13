import { Router } from 'express';
import TestRouter from './testRouter';

const router: Router = Router();

router.use('/', TestRouter);

export default router;
