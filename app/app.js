import express from "express";

import {
  getAllContracts,
  getContractByUUID,
} from "./database/repositories/contract.js";

const app = express();
// Parse incoming requests
app.use(express.json());

app.get("/contracts", async (req, res) => {
  const contracts = await getAllContracts();
  res.send(contracts);
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
export default app;
