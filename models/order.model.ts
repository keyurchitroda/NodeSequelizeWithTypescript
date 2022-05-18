import {
  Sequelize,
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

interface OrderModel
  extends Model<
    InferAttributes<OrderModel>,
    InferCreationAttributes<OrderModel>
  > {
  id: CreationOptional<number>;
  order_number: string;
  product_id: number;
  buyer_id: number;
  qty: number;
  price: number;
  payment_status: string;
  order_status: string;
}

module.exports = (sequelize: Sequelize, Sequelize: any) => {
  const Order = sequelize.define<OrderModel>(
    "order",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      order_number: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
      },
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "product",
          key: "id",
        },
      },
      buyer_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },
      qty: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      payment_status: {
        type: Sequelize.ENUM("Pending", "Success"),
        defaultValue: "Pending",
      },
      order_status: {
        type: Sequelize.ENUM("Pending", "Approved"),
        defaultValue: "Pending",
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );
  return Order;
};
