import express from "express";

import { getAllContracts } from "./database/repositories/contract.js";

const app = express();
// Parse incoming requests
app.use(express.json());

app.get("/contracts", async (req, res) => {
  const contracts = await getAllContracts();
  res.send(contracts);
});

export default app;
