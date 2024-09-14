
'use strict'

import { Request, Response } from "express";
import SupplierModel from "../models/Supplier.model";

class SupplierController {

  getAllSupplier = async (req: Request, res: Response) => {
    try {
      const supplier = await SupplierModel.find()
      if (!supplier) {
        return res.status(404).json({
          message: 'Không tìm thấy nhà cung cấp nào'
        })
      }
      return res.status(200).json({
        message: 'Danh sách nhà cung cấp',
        data: supplier,
      })

    } catch (err: any) {
      return res.status(404).json({
        error: err,
        message: 'Lấy danh sách nhà cung cập thất bại'
      })
    }
  }

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
  updateSupplier = async (req: Request, res: Response) => {
    const body = req.body
    const { id } = req.query
    try {
      const supplier = await SupplierModel.findByIdAndUpdate(id, body, { new: true })
      if (!supplier) {
        return res.status(404).json({
          message: 'Không tìm thấy nhà cung cấp để cập nhật'
        })
      }
      return res.status(200).json({
        message: 'Update nhà cung cấp thành công',
        data: []
      })
    } catch (err: any) {
      return res.status(404).json({
        error: err,
        message: 'Update nhà cung cấp không thành công',
      })
    }
  }
  delSupplier = async (req: Request, res: Response) => {
    const { id } = req.query
    try {
      const supplier = await SupplierModel.findByIdAndDelete(id)
      if (!supplier) {
        return res.status(404).json({
          message: 'Không tìm thấy nhà cung cấp để xoá'
        })
      }
      return res.status(200).json({
        message: 'Xóa nhà cung cấp thành công',
        data: []
      })
    } catch (err: any) {
      return res.status(404).json({
        error: err,
        message: 'Xóa nhà cung cấp không thành công',
      })
    }
  }
}

export const supplierController = new SupplierController();