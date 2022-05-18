import express from "express";
const router = express.Router();
import authRouter from "./user.route";
import categoryRouter from "./category.route";
import productRouter from "./product.route";

router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);

export default router;
