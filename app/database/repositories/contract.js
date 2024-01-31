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

const getContractByUUID = async ({ uuid }) => {
  return Contract.findOne({ where: { uuid }, attributes: publicAttributes });
};

const modifyContact = async ({
  contract,
  newFirstName,
  newLastName,
  newPhoneNumber,
}) => {
  contract.firstName = newFirstName;
  contract.lastName = newLastName;
  contract.phoneNumber = newPhoneNumber;

  // Save the modified contract to the database
  await contract.save();
  return contract;
};

export { getAllContracts, createContract, getContractByUUID, modifyContact };
