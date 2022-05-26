import express from "express";
const paymentRouter = express.Router();
import paymentController from "../controller/payment.controller";
import verifyMiddleware from "../middleware/verifyUser";
const { verifyUser, verifyAdmin } = verifyMiddleware;

paymentRouter.post("/new", paymentController.StripePayment);

paymentRouter.post(
  "/checkout_payment",
  verifyUser,
  paymentController.CheckoutPayment
);

paymentRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  paymentController.webhook
);

export default paymentRouter;
