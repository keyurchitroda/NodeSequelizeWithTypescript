import { Request, Response } from "express";
import db from "../models";
const { Category } = db;

const AddNewCategory = async (req: Request, res: Response) => {
  try {
    const { category_name } = req.body;
    if (!category_name) {
      return res
        .status(401)
        .json({ message: "Please add all fields..!", status: 401 });
    }

    const category: string = await Category.findOne({
      where: { category_name },
    });

    if (category) {
      return res
        .status(401)
        .json({ message: "Category already exist..!", status: 401 });
    } else {
      const newcategory = await Category.create(req.body);
      if (!newcategory) {
        return res
          .status(401)
          .json({ message: "Something went wrong..!", status: 401 });
      } else {
        return res
          .status(201)
          .json({ message: "New category successfully added..!", status: 201 });
      }
    }
  } catch (err) {
    console.log("err - AddNewCategory", err);
  }
};

export default { AddNewCategory };
