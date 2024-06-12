import Joi from "joi";

export const produtoSchema = Joi.object({
  nome: Joi.string().min(3).max(100).required(),
  preco: Joi.number().required(),
  estoque: Joi.number().positive().integer().required().messages({
    "number.positive": "O {#label} precisa ser positivo",
  }),
});
