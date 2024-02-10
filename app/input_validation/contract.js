import Joi from "joi";

const createContractSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phoneNumber: Joi.string().max(40).required(),
});

export { createContractSchema };
