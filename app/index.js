import app from "./app.js";
import { sequelize } from "./database/initDb.js";

const PORT = 3000;

async function assertDbConnection() {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.log(error);
  }
}

async function init() {
  console.log("Starting the app");

  try {
    await assertDbConnection();
    await sequelize.sync({ force: false }); // Make sure it set to false after first run.
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
}

init();
