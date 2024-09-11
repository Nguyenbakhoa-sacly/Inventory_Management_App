'use strict'

import { Request, Response } from "express";

class ProductsController {
  getProducts = async (req: Request, res: Response) => {

    return res.status(200).json({
      message: "Danh sách sản phẩm",
      data: [] // Replace with actual data from your database
    })
  }

}

export const productsController = new ProductsController();