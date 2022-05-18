import { Request, Response, NextFunction } from "express";

import db from "../models";
const { User } = db;
const jwt = require("jsonwebtoken");

interface MyUserRequest extends Request {
  user?: any;
}

const verifyUser = async (
  req: MyUserRequest,
  res: Response,
  next: NextFunction
) => {
  const { x_auth_token } = req.headers as any;
  if (!x_auth_token) {
    return res.status(400).json({ message: "Inavalid token..!", status: 400 });
  }

  jwt.verify(x_auth_token, "kkkeeeyyy", async (err: Error, payload: any) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Inavalid username or password..!", status: 400 });
    }
    let { id } = payload;

    let user = await User.findOne({ where: { id } });
    req.user = user;
    next();
  });
};

const verifyAdmin = async (
  req: MyUserRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role == "admin") {
    next();
  } else {
    return res
      .status(400)
      .json({ message: "you have no permission..!", status: 400 });
  }
};

export default {
  verifyUser,
  verifyAdmin,
};
