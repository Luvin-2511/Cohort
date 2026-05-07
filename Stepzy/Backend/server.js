import app from "./src/app.js";
import { CONFIG } from "./src/config/config.js";
import connectToDB from "./src/config/db.js";

const port = CONFIG.PORT || 3000;

connectToDB();

app.listen(port, () => {
  console.log(`Server listening at port : ${port}`);
});
