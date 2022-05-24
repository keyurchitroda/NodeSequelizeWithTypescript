import { Request, Response, NextFunction } from "express";
import db from "../models";
const { User } = db;
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

interface MyUserRequest extends Request {
  user?: any;
}

const postRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please add all fields..!", state: 400 });
    }

    const users = await User.findOne({ where: { email: email } });
    if (users) {
      return res.status(400).json({ message: "User already exist..!" });
    } else {
      const hashPassword = await bcryptjs.hashSync(password, 12);
      const newuser = await User.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
        role,
      });
      if (!newuser) {
        return res
          .status(401)
          .json({ message: "something went wrong..!", status: 401 });
      } else {
        return res
          .status(200)
          .json({ message: "New user successfully register", status: 200 });
      }
    }
  } catch (err) {
    console.log("err - postRegister()", err);
  }
};

const postLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "please add all fields..!", status: 400 });
    }

    const users = await User.findOne({ where: { email: email } });
    if (!users) {
      return res
        .status(400)
        .json({ message: "You need to register first..!", status: 400 });
    } else {
      let passwordMatched = bcryptjs.compareSync(password, users.password);
      if (!passwordMatched) {
        return res
          .status(401)
          .json({ message: "Invalid username or password", status: 401 });
      } else {
        const token = jwt.sign({ id: users.id, role: users.role }, "kkkeeeyyy");
        let data = {
          firstname: users.firstName,
          lastname: users.lastName,
          email: users.email,
          role: users.role,
          token: token,
        };
        return res.status(200).json({
          message: "Signin successfully done..!",
          status: 200,
          response_data: data,
        });
      }
    }
  } catch (err) {
    console.log("err - postLogin()", err);
  }
};

const allUser = async (req: Request, res: Response) => {
  try {
    let users = await User.findAndCountAll();
    if (!users) {
      return res.status(400).json({ message: "User not found" });
    } else {
      return res
        .status(200)
        .json({ message: "User successfully fetched", response_data: users });
    }
  } catch (err) {
    console.log("err - allUser()", err);
  }
};

export default {
  postRegister,
  postLogin,
  allUser,
};
