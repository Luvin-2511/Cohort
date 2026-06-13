import app from "./src/app.js";
import { CONFIG } from "./src/config/config.js";

const port = CONFIG.PORT || 3000;

app.listen(port,()=> {
    console.log(`Server listening at Port :${port}`);
})