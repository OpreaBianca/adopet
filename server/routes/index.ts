import { Router } from 'express';

import TestRouter from './test-router';
import AuthRouter from './auth-router';
import PetRouter from './pet-router';
import ImageRouter from './image-router';

const router: Router = Router();

router.use('/', TestRouter);
router.use('/auth', AuthRouter);
router.use('/pet', PetRouter);
router.use('/image', ImageRouter);

export default router;
