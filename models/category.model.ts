import {
  Sequelize,
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

interface CategoryModel
  extends Model<
    InferAttributes<CategoryModel>,
    InferCreationAttributes<CategoryModel>
  > {
  id: CreationOptional<number>;
  category_name: string;
}

module.exports = (sequelize: Sequelize, Sequelize: any) => {
  const Category = sequelize.define<CategoryModel>(
    "category",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      category_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );
  return Category;
};
