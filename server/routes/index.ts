import { Router } from 'express';

import TestRouter from './test-router';
import AuthRouter from './auth-router';
import PetRouter from './pet-router';

const router: Router = Router();

router.use('/', TestRouter);
router.use('/auth', AuthRouter);
router.use('/pet', PetRouter);

export default router;
