import app from "./app.js";

const PORT = 3000;

async function init() {
  console.log("Starting the app");

  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
}

init();
