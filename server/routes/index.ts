import { Router } from 'express';

import TestRouter from './test-router';
import AuthRouter from './auth-router';

const router: Router = Router();

router.use('/', TestRouter);
router.use('/auth', AuthRouter);

export default router;
