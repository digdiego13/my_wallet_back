import Joi from 'joi';

const newCashSchema = Joi.object().keys({
    description: Joi.string().alphanum().min(1).max(20).required(),
    transaction: Joi.number().min(0).max(1000000).required()
});

const signUpSchema = Joi.object().keys({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ tlds: { allow: false } }),
    password: Joi.string().min(6).max(15)
});

export {
    newCashSchema,
    signUpSchema
}