import express from "express";

const app = express();
// Parse incoming requests
app.use(express.json());

export default app;
