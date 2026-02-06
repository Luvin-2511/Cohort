const app = require("./src/app");
const PORT = 3000;
const connectToDb = require("./config/connection");
connectToDb();

app.listen(PORT, () => {
  console.log(`Listening at port:${PORT}`);
});
