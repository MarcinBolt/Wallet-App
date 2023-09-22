import Joi from 'joi';

export const userRegisterReqBodySchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(7).required(),
  firstName: Joi.string().min(3).required(),
});

export const userLoginReqBodySchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(7).required(),
});

export const userEmailReqBodySchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});
