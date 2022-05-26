import express from "express";
const router = express.Router();
import authRouter from "./user.route";
import categoryRouter from "./category.route";
import productRouter from "./product.route";
import orderRouter from "./order.route";
import paymentRouter from "./payment.route";

router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);
router.use("/payment", paymentRouter);

export default router;
