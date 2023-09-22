import Joi from 'joi';

export const userRegisterReqBodySchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(7).required(),
  firstName: Joi.string().min(3).max(30).required(),
});

export const userLoginReqBodySchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(7).required(),
});

export const userEmailReqBodySchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

export const transactionBodySchema = Joi.object({
  date: Joi.string().required(),
  year: Joi.string().required(),
  month: Joi.string()
    .valid(
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    )
    .required(),
  type: Joi.string().valid('income', 'expense').required(),
  category: Joi.string()
    .valid(
      'Main expenses',
      'Products',
      'Car',
      'Self care',
      'Child care',
      'Household products',
      'Education',
      'Leisure',
      'Other expenses',
      'Entertainment',
    )
    .required(),
  comment: Joi.string(),
  sum: Joi.number().required(),
});

export const transactionDateBodySchema = Joi.object({
  year: Joi.string().required(),
  month: Joi.string()
    .valid(
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    )
    .required(),
});

export const transactionCategoryBodySchema = Joi.string()
  .valid(
    'Main expenses',
    'Products',
    'Car',
    'Self care',
    'Child care',
    'Household products',
    'Education',
    'Leisure',
    'Other expenses',
    'Entertainment',
  )
  .required();
