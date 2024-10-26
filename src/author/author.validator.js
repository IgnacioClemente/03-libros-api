import Joi, { string } from "joi";

export const createAuthorSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    nationality: Joi(string).min(4).max(60).required()
});

export const updateAuthorSchema = Joi.object({
    firstName: Joi.string().min(3).max(30),
    lastName: Joi.string().min(3).max(30),
    nationality: Joi(string).min(4).max(60)
});