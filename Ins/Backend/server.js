require("dotenv").config();
const app = require("./src/app");
const PORT = 3000;
const connectToDatabase = require("./src/config/connection");

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server listening at PORT :${PORT}`);
});
