import { models } from "../dbInit.js";

const { Contract } = models;

const publicAttributes = { exclude: ["id"] };
const getAllContracts = async () => {
  const contracts = await Contract.findAll({
    attributes: publicAttributes,
  });
  console.log(contracts);
  return contracts;
};

const createContract = async ({ firstName, lastName, phoneNumber }) => {
  const user = await Contract.create({ firstName, lastName, phoneNumber });
  return user;
};
export { getAllContracts, createContract };