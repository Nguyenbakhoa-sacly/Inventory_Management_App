import { userController } from "../controllers/User.controller";

const router = require('express').Router();

router.post('/auth/register', userController.register);
router.post('/auth/login', userController.LogIn);


export default router