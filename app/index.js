import app from "./app.js";
import { sequelize } from "./database/dbInit.js";

const PORT = 3000;

async function assertDBConnection() {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.log(error);
  }
}

async function init() {
  console.log("Starting the app");

  try {
    await assertDBConnection();
    await sequelize.sync({ force: false }); // Starting with True, and after first creation - change it.
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
}

init();
