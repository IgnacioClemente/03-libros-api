import Joi from "joi";

export const createUserSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

export const updateUserSchema = Joi.object({
    firstName: Joi.string().min(3).max(30),
    lastName: Joi.string().min(3).max(30),
    email: Joi.string().min(6)
})