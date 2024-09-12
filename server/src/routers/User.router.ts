import { usersController } from "../controllers/Users.controller";
import { verifyToken } from "../middlewares/verifyToken";

const router = require('express').Router();

router.post('/auth/register', usersController.register);
router.post('/auth/login', usersController.LogIn);
router.post('/auth/login-google', usersController.loginWithGoogle);

export default router