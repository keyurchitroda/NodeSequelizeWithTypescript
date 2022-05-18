import express from "express";
const prodRouter = express.Router();
import productController from "../controller/product.controller";
import prodScehma from "../schema/product.schema";
import verifyMiddleware from "../middleware/verifyUser";
import { celebrate } from "celebrate";
const { verifyUser, verifyAdmin } = verifyMiddleware;

prodRouter.post(
  "/add",
  celebrate(prodScehma.ProductSchema),
  verifyUser,
  verifyAdmin,
  productController.AddNewProduct
);

prodRouter.get(
  "/all",
  verifyMiddleware.verifyUser,
  productController.showAllProduct
);

export default prodRouter;
