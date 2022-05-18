import { Joi } from "celebrate";

const ProductSchema = {
  body: {
    category_id: Joi.number().required(),
    product_name: Joi.string().required(),
    product_description: Joi.string().required(),
    available_qty: Joi.number().required(),
    price: Joi.number().required(),
    image: Joi.string(),
  },
};

export default {
  ProductSchema,
};
