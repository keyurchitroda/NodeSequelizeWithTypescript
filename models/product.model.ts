import {
  Sequelize,
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

interface ProductModel
  extends Model<
    InferAttributes<ProductModel>,
    InferCreationAttributes<ProductModel>
  > {
  id: CreationOptional<number>;
  category_id: number;
  product_name: string;
  product_description: string;
  available_qty: number;
  qty: number;
  price: number;
  image: string;
}

module.exports = (sequelize: Sequelize, Sequelize: any) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "category",
          key: "id",
        },
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      product_description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      available_qty: {
        type: Sequelize.INTEGER,
      },
      qty: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );
  return Product;
};
