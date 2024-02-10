import { models } from "../initDb.js";

const { Contract } = models;

const publicAttribtues = { exclude: ["id"] };

const getAllContracts = async () =>
  Contract.findAll({ attributes: publicAttribtues });

const createContract = async ({ firstName, lastName, phoneNumber }) =>
  Contract.create({ firstName, lastName, phoneNumber });

const getContractByUUID = async ({ uuid }) =>
  Contract.findOne({ where: { uuid } });

const modifyContract = async ({
  contract,
  newFirstName,
  newLastName,
  newPhoneNumber,
}) => {
  contract.firstName = newFirstName;
  contract.lastName = newLastName;
  contract.phoneNumber = newPhoneNumber;

  await contract.save();
  return contract;
};
export { getAllContracts, createContract, getContractByUUID, modifyContract };
