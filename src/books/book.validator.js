import Joi from "joi";

export const createBookSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    year: Joi.number().integer().min(4).required(),
    publisher: Joi.string().min(4).max(50).required()
});

export const updateBookSchema = Joi.object({
    title: Joi.string().min(3).max(30),
    year: Joi.number().integer().min(1800).max(10000),
    publisher: Joi.string().min(2).max(50)
});
