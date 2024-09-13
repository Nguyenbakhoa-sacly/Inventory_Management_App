
'use strict'

import { Request, Response } from "express";
import SupplierModel from "../models/Supplier.model";

class SupplierController {
  newSupplier = async (req: Request, res: Response) => {
    const body = req.body
    try {
      const newSupplier = new SupplierModel(body);
      newSupplier.save();
      return res.status(200).json({
        message: 'Thêm mới nhà cung cấp thành công!',
        data: newSupplier,
      })
    } catch (err: any) {
      return res.status(404).json({
        error: err,
        message: 'Thêm mới nhà cung cấp không thành công!',
      })
    }
  }

}

export const supplierController = new SupplierController();