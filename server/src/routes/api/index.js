import { Router } from 'express';
import usersRoutes from './users';
import animalsRoutes from './animals';
const router = Router();

router.use('/users', usersRoutes);
router.use('/animals', animalsRoutes);

export default router;
