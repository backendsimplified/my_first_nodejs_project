import { Sequelize, DataTypes } from "sequelize";

import loadContact from "./models/contract.js";

const sequelize = new Sequelize("project1", "user", "password", {
  host: "localhost",
  dialect: "postgres",
});

// Load Models:
const Contract = loadContact(sequelize, DataTypes);

// Setup Models:
const models = { Contract };

export { sequelize, models };
