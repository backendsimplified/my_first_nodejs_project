import express from "express";

import { createContractSchema } from "./input_validation/createContract.js";
import {
  getAllContracts,
  createContract,
  getContractByUUID,
  modifyContact,
} from "./database/repositories/contract.js";

const app = express();
// Parse incoming requests
app.use(express.json());

app.get("/contracts", async (req, res) => {
  const contracts = await getAllContracts();
  res.send(contracts);
});

app.post("/contract", async (req, res) => {
  const { error, value } = createContractSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: "InputValidationError" });
  }

  const { firstName, lastName, phoneNumber } = value;

  try {
    const contract = await createContract({ firstName, lastName, phoneNumber });
    res
      .status(201)
      .json({ message: "Contract created successfully", uuid: contract?.uuid });
  } catch {
    console.error("Error creating contract:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/contract/:id", async (req, res) => {
  const contractUUID = req.params.id;

  try {
    // Fetch the contract by ID
    const contract = await getContractByUUID({ uuid: contractUUID });

    if (contract) {
      res.status(200).json(contract);
    } else {
      res.status(404).json({ message: "Contract not found" });
    }
  } catch (error) {
    console.error("Error fetching contract:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/contract/:id", async (req, res) => {
  const { error, value } = createContractSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: "InputValidationError" });
  }
  const {
    firstName: newFirstName,
    lastName: newLastName,
    phoneNumber: newPhoneNumber,
  } = value;

  const contractUUID = req.params.id;
  try {
    // Fetch the contract by ID
    const contract = await getContractByUUID({ uuid: contractUUID });

    if (contract) {
      const modifiedContract = await modifyContact({
        contract,
        newFirstName,
        newLastName,
        newPhoneNumber,
      });
      res.status(200).json(modifiedContract.uuid);
    } else {
      res.status(404).json({ message: "Contract not found" });
    }
  } catch (error) {
    console.error("Error fetching contract:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default app;
