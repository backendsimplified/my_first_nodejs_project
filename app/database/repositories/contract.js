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

const getContractByUUID = async ({ uuid }) => {
  return Contract.findOne({ where: { uuid }, attributes: publicAttributes });
};

export { getAllContracts, getContractByUUID };
