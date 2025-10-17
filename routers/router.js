import Router from 'express';
import { getUserInfo } from '../controllers/controller.js'; 

const router = Router();

// Define routes and associate them with controller functions
router.get('/me', getUserInfo);

export default router;
