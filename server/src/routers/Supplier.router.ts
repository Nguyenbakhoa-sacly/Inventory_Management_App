import { supplierController } from "../controllers/Supplier.controller";

const router = require('express').Router();

router.post('/add-supplier', supplierController.newSupplier);
router.get('/suppliers', supplierController.getAllSupplier);
router.put('/update-supplier', supplierController.updateSupplier);
router.delete('/del-supplier', supplierController.delSupplier);

export default router