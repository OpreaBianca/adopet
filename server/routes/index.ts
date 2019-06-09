import { Router } from 'express';

import TestRouter from './test-router';
import AuthRouter from './auth-router';
import PetRouter from './pet-router';
import ImageRouter from './image-router';
import UserRouter from './user-router';
import AdoptionRequestRouter from './adoption-request-router';

const router: Router = Router();

router.use('/', TestRouter);
router.use('/auth', AuthRouter);
router.use('/pet', PetRouter);
router.use('/image', ImageRouter);
router.use('/user', UserRouter)
router.use('/adoption-request', AdoptionRequestRouter)

export default router;
