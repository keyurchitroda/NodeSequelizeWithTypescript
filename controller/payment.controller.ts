import { Request, Response } from "express";
import db from "../models";
const { Order, Product, User, Category } = db;
import { v4 as uuidv4 } from "uuid";
import Sequelize from "sequelize";
const { col, Op } = Sequelize;

const stripe = require("stripe")(
  "sk_test_51L3YnpSGF5MQb5T896VBhieE4Ij48XoAsqP7FSfUSq8qE9bLIWdUb5f5E9KmbjoYOe6nC0prg7H8U9tISqi358RI00TyVtd6hI"
);

const endpointSecret =
  "whsec_d9491a34bcc304d93d23fe6e4e4a0405b0aff07d5c2b0d4fe09bc7141aaee4d9";
interface MyUserRequest extends Request {
  user?: any;
}

const StripePayment = async (req: MyUserRequest, res: Response) => {
  try {
    const { order_id, token } = req.body;

    const orders = await Order.findOne({
      where: { id: order_id },
    });

    const idempontencyKey = uuidv4();

    return stripe.customers
      .create({
        email: token.email,
        source: token.id,
        address: {
          line1: "510 Townsend St",
          postal_code: "98140",
          city: "San Francisco",
          state: "CA",
          country: "US",
        },
      })
      .then(async (customer: any) => {
        console.log("customer", customer);
        await stripe.charges.create(
          {
            amount: orders.price * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: "All product is nice",
            shipping: {
              name: token.card.name,
              address: {
                country: token.card.address_country,
              },
            },
          }
          // { idempontencyKey }
        );
      })
      .then((result: any) => {
        res.status(200).json(result);
      })
      .catch((err: any) => {
        console.log("errr=-=-=-=-=-=-=-=-=-=", err);
      });
  } catch (err) {
    console.log("err - StripePayment", err);
  }
};

const CheckoutPayment = async (req: MyUserRequest, res: Response) => {
  const { order_id, success_url, cancel_url } = req.body;

  const orders: any = await Order.findOne({
    where: { id: order_id },
  });
  if (!orders) {
    return res.status(400).json("Image not found");
  }

  // orders = orders.toJSON();

  const session = await stripe.checkout.sessions.create({
    client_reference_id: orders.id,
    customer_email: req.user.email,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "TV",
            // images: [image.fileUrl],
          },
          unit_amount: orders.price * 100,
        },
        quantity: 1,
      },
    ],
    metadata: {
      orderId: orders.id,
      buyerId: req.user.id.toString(),
    },
    mode: "payment",
    success_url: success_url,
    cancel_url: cancel_url,
  });

  res.json({ session: session.url });
};

const webhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];

  const event = req.body;

  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      console.log("data", data);
      const order = await Order.update(
        { payment_status: "Success" },
        { where: { id: data.metadata.orderId } }
      );

      res.sendStatus(200);
      break;
    default:
      res.sendStatus(200);
  }
};

export default {
  StripePayment,
  CheckoutPayment,
  webhook,
};
