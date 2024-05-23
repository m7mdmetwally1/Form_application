const Joi = require("joi");

exports.addUser = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  country: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(8)
    .required(),
  passwordConfirm: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Password confirmation does not match password",
    }),
  acceptTerms: Joi.boolean().required(),
  mobile: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(10)
    .max(15)
    .required(),
  otpMethod: Joi.string()
    .valid("mobile", "email")
    .required(),
});
