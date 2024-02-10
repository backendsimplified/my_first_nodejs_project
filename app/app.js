import express from "express";
import {
  getAllContracts,
  createContract,
  getContractByUUID,
  modifyContract,
} from "./database/repositories/contract.js";
import { createContractSchema } from "./input_validation/contract.js";

const app = express();

// Parse incoming requests:
app.use(express.json());

app.get("/contracts", async (req, res) => {
  try {
    const contracts = await getAllContracts();
    res.send(contracts);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/contract", async (req, res) => {
  const { error, value } = createContractSchema.validate(req.body);
  if (error) {
    return res.status(400).send("Input Validation Error");
  }

  const { firstName, lastName, phoneNumber } = value;

  try {
    const contract = await createContract({ firstName, lastName, phoneNumber });
    res.status(201).send({ uuid: contract.uuid });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/contract/:id", async (req, res) => {
  const contractUUID = req.params.id;

  try {
    const contract = await getContractByUUID({ uuid: contractUUID });
    if (contract) {
      return res.status(200).json(contract);
    }

    return res.status(404).send("Could not find Contract");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});

app.put("/contract/:id", async (req, res) => {
  const { error, value } = createContractSchema.validate(req.body);
  if (error) {
    return res.status(400).send("Input Validation Error");
  }

  const { firstName, lastName, phoneNumber } = value;

  const contractUUID = req.params.id;

  try {
    const contract = await getContractByUUID({ uuid: contractUUID });
    if (contract) {
      await modifyContract({
        contract,
        newFirstName: firstName,
        newLastName: lastName,
        newPhoneNumber: phoneNumber,
      });
      return res.status(200).json(contract.uuid);
    }

    return res.status(404).send("Could not find Contract");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});

export default app;
