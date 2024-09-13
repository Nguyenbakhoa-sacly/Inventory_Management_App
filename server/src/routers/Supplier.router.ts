import { supplierController } from "../controllers/Supplier.controller";

const router = require('express').Router();

router.post('/add-supplier', supplierController.newSupplier);
//1:08:08 / 2:02:40

export default router