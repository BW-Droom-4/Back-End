import Joi from '@hapi/joi';

export const registerCompanyValidation = data => {
  const schema = Joi.object({
    companyName: Joi.string()
      .max(120)
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

export const loginCompanyValidation = data => {
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