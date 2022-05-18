import { Joi } from "celebrate";

const CategorySchema = {
  body: {
    category_name: Joi.string().required(),
  },
};

export default {
  CategorySchema,
};
