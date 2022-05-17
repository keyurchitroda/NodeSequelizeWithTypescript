const { celebrate, Joi, errors, Segments } = require('celebrate');


const SigninSchema = {
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
};

const SignupSchema = {
    body: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        role: Joi.string()

    }
};



export default {
    SignupSchema,
    SigninSchema
};
