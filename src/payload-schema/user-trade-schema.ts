const Joi = require("@hapi/joi");

export const userTradeSchema = Joi.object({
    id: Joi.number().required(),
    type: Joi.string().trim().required(),
    user: Joi.object({
        name: Joi.string().trim().required(),
    }).required(),
    symbol: Joi.string().trim().required(),
    shares: Joi.number().required(),
    price: Joi.number().precision(2).required(),
}).required();