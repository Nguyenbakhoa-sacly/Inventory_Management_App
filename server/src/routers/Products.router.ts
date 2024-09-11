import { productsController } from "../controllers/Products.controller";
import { verifyToken } from "../middlewares/verifyToken";

const router = require('express').Router();

router.get('/products', verifyToken, productsController.getProducts);


export default router