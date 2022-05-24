import express from "express";
const orderRouter = express.Router();
import orderController from "../controller/order.controller";
import verifyMiddleware from "../middleware/verifyUser";
const { verifyUser, verifyAdmin } = verifyMiddleware;

orderRouter.post("/new", verifyUser, orderController.AddNewOrder);

orderRouter.get("/all", verifyUser, verifyAdmin, orderController.AllOrder);

orderRouter.get("/my", verifyUser, orderController.MyOrder);

orderRouter.get("/search", verifyUser, orderController.searchOrder);

orderRouter.get(
  "/pending",
  verifyUser,
  verifyAdmin,
  orderController.PendingOrder
);

orderRouter.post(
  "/orderstatus",
  verifyUser,
  verifyAdmin,
  orderController.UpdateOrderStatus
);

export default orderRouter;
