import { Request, Response } from "express";
import db from "../models";
const { Product, Category } = db;
import Sequelize from "sequelize";
const { col, Op } = Sequelize;

const AddNewProduct = async (req: Request, res: Response) => {
  try {
    const {
      category_id,
      product_name,
      product_description,
      available_qty,
      price,
      image,
      qty
    } = req.body;
    if (
      !category_id ||
      !product_name ||
      !product_description ||
      !available_qty ||
      !price ||
      !image
    ) {
      return res
        .status(401)
        .json({ message: "Please add all fields..!", status: 401 });
    }

    const product = await Product.findOne({ where: { product_name } });

    if (product) {
      return res
        .status(401)
        .json({ message: "Product already exist..!", status: 401 });
    } else {
      const newproduct = await Product.create(req.body);
      if (!newproduct) {
        return res
          .status(401)
          .json({ message: "Something went wrong..!", status: 401 });
      } else {
        return res
          .status(200)
          .json({ message: "New product successfully added..!", status: 200 });
      }
    }
  } catch (err) {
    console.log("err - AddNewProduct", err);
  }
};

const showAllProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findAll({
      attributes: { exclude: ["updatedAt", "createdAt"] },
      include: {
        model: Category,
        as: "category",
        attributes: ["category_name"],
      },
    });
    if (!product) {
      return res
        .status(400)
        .json({ message: "Product not found..!", status: 400 });
    } else {
      return res.status(200).json({
        message: "Product successfully fetched..!",
        status: 200,
        response_data: product,
      });
    }
  } catch (err) {
    console.log("err - showAllProduct", err);
  }
};

const searchProduct = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const product = await Product.findAll({
      where: {
        [Op.or]: [
          {
            product_name: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
      order: [["id", "ASC"]],
      attributes: { exclude: ["id", "updatedAt", "createdAt"] },
      include: {
        model: Category,
        as: "category",
        attributes: ["category_name"],
      },
    });

    if (!product) {
      return res
        .status(400)
        .json({ message: "Product not found..!", status: 400 });
    } else {
      return res.status(200).json({
        message: "Product successfully fetched..!",
        status: 200,
        response_data: product,
      });
    }
  } catch (err) {
    console.log("err- searchProduct", err);
  }
};

export default {
  AddNewProduct,
  showAllProduct,
  searchProduct,
};
