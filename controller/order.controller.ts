import { Request, Response } from "express";
import db from "../models";
const { Order, Product, User, Category } = db;
import { v4 as uuidv4 } from "uuid";
import Sequelize from "sequelize";
const { col, Op } = Sequelize;

interface MyUserRequest extends Request {
  user?: any;
}

const AddNewOrder = async (req: MyUserRequest, res: Response) => {
  console.log(req.body);

  try {
    const {
      order_number,
      product,
      buyer_id,
      qty,
      total_price,
      payment_status,
      order_status,
    } = req.body;
    if (!product || !total_price) {
      return res
        .status(401)
        .json({ message: "Please add all fields..!", status: 401 });
    }

    // const products = await Product.findOne({ where: { id: product_id } });

    // if (qty > product.available_qty) {
    //   return res
    //     .status(400)
    //     .json({ message: `Only ${product.available_qty} QTY available..!` });
    // }

    // let total_price = product.price * qty;

    const neworder = await Order.create({
      order_number: uuidv4(),
      product: JSON.stringify(product),
      buyer_id: req.user.id,
      qty: 1,
      price: total_price,
      payment_status,
      order_status,
    });
    if (!neworder) {
      return res
        .status(401)
        .json({ message: "Something went wrong..!", status: 401 });
    } else {
      // let total_available_qty = products.available_qty - qty;
      // console.log();

      // await Product.update(
      //   { available_qty: total_available_qty },
      //   { where: { id: products.id } }
      // );

      return res
        .status(200)
        .json({ message: "New Order successfully added..!", status: 200 });
    }
  } catch (err) {
    console.log("err - AddNewOrder", err);
  }
};

const AllOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findAll({
      attributes: { exclude: ["updatedAt", "createdAt"] },
      include: [
        {
          model: User,
          as: "buyer",
          attributes: { exclude: ["id", "updatedAt", "createdAt", "password"] },
        },
      ],
    });
    if (!order) {
      return res
        .status(400)
        .json({ message: "Order not found..!", status: 400 });
    } else {
      return res.status(200).json({
        message: "Order successfully fetched..!",
        status: 200,
        response_data: order,
      });
    }
  } catch (err) {
    console.log("err - AllOrder", err);
  }
};

const PendingOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findAll({
      where: {
        order_status: "Pending",
        payment_status: "Success",
      },
      attributes: { exclude: ["updatedAt", "createdAt"] },
      include: [
        {
          model: User,
          as: "buyer",
          attributes: { exclude: ["id", "updatedAt", "createdAt", "password"] },
        },
      ],
    });
    if (!order) {
      return res
        .status(400)
        .json({ message: "Order not found..!", status: 400 });
    } else {
      return res.status(200).json({
        message: "Order successfully fetched..!",
        status: 200,
        response_data: order,
      });
    }
  } catch (err) {
    console.log("err - AllOrder", err);
  }
};

const MyOrder = async (req: MyUserRequest, res: Response) => {
  try {
    const order = await Order.findAll({
      where: {
        buyer_id: req.user.id,
      },
      attributes: { exclude: ["updatedAt", "createdAt"] },
    });
    if (!order) {
      return res
        .status(400)
        .json({ message: "Order not found..!", status: 400 });
    } else {
      return res.status(200).json({
        message: "Order successfully fetched..!",
        status: 200,
        response_data: order,
      });
    }
  } catch (err) {
    console.log("err - AllOrder", err);
  }
};

const searchOrder = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const order = await Order.findAll({
      where: {
        [Op.or]: [
          {
            id: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
      order: [["id", "ASC"]],
      attributes: { exclude: ["id", "updatedAt", "createdAt"] },
      include: [
        {
          model: Product,
          as: "product",
          attributes: { exclude: ["id", "updatedAt", "createdAt"] },
          include: {
            model: Category,
            as: "category",
            attributes: ["category_name"],
          },
        },
        {
          model: User,
          as: "buyer",
          attributes: { exclude: ["id", "updatedAt", "createdAt", "password"] },
        },
      ],
    });

    if (!order) {
      return res
        .status(400)
        .json({ message: "Order not found..!", status: 400 });
    } else {
      return res.status(200).json({
        message: "Order successfully fetched..!",
        status: 200,
        response_data: order,
      });
    }
  } catch (err) {}
};

const UpdateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { order_id, type } = req.body;
    let order = await Order.update(
      { order_status: type == "Approve" ? "Approved" : "Rejected" },
      { where: { id: order_id } }
    );

    console.log(order);

    if (!order) {
      return res
        .status(400)
        .json({ message: "Order not found..!", status: 400 });
    } else {
      return res.status(200).json({
        message: "Order status successfully Updated..!",
        status: 200,
        response_data: order,
      });
    }
  } catch (err) {
    console.log("err - OrderApproved", err);
  }
};

export default {
  AddNewOrder,
  AllOrder,
  MyOrder,
  searchOrder,
  PendingOrder,
  UpdateOrderStatus,
};
