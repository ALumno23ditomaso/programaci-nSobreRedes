import { Router } from "express";
import {signup, signin, profile} from '../controllers/authController'
export const Auth = Router()
const router: Router = Router();

router.post("/signup",signup);
router.post('/signin', signin);
router.get('/profile', profile);

export default router;