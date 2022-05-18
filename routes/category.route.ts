import express from "express";
const catRouter = express.Router();
import categoryController from "../controller/category.controller";
import catScehma from "../schema/category.schema";
import verifyMiddleware from "../middleware/verifyUser";

import { celebrate } from "celebrate";

const { verifyUser, verifyAdmin } = verifyMiddleware;

catRouter.post(
  "/add",
  celebrate(catScehma.CategorySchema),
  verifyUser,
  verifyAdmin,
  categoryController.AddNewCategory
);

export default catRouter;
