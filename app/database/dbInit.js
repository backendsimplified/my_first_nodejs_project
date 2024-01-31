import { Sequelize, DataTypes } from "sequelize";
import loadContract from "./models/contract.js";
const sequelize = new Sequelize("project1", "user", "password", {
  host: "localhost",
  dialect: "postgres",
});

// Load Models
const Contract = loadContract(sequelize, DataTypes);

// Setup models:
const models = { Contract };
export { sequelize, models };
