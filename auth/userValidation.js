import Joi from '@hapi/joi';

export const registerUserValidation = data => {
  const schema = Joi.object({
    firstname: Joi.string()
      .max(64)
      .required(),
    lastname: Joi.string()
      .max(64)
      .required(),
    email: Joi.string()
      .min(6)
      .max(120)
      .required()
      .email({ minDomainSegments: 2 }),
    password: Joi.string()
      .min(6)
      .required(),
  });
  return schema.validate(data);
};

export const loginUserValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .max(120)
      .required()
      .email({ minDomainSegments: 2 }),
    password: Joi.string()
      .min(6)
      .required()
  });
  return schema.validate(data);
};